import Stripe from 'stripe'
import { NextResponse, NextRequest } from 'next/server';
import { USER_TABLE } from '@/configs/schema';
import { db } from '@/configs/db';
import { eq } from 'drizzle-orm';

export async function POST(req: NextRequest) {
    const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

    if (!stripeSecretKey) {
        return NextResponse.json(
            { error: 'Stripe secret key is not configured' },
            { status: 500 }
        );
    }

    const stripe = new Stripe(stripeSecretKey);

    try {
        let data;
        let eventType;

        // Check if webhook signing is configured.
        const webhookSecret = process.env.STRIPE_WEB_HOOK_KEY;

        if (webhookSecret) {
            // Retrieve the event by verifying the signature using the raw body and secret.
            let event;
            const signature = req.headers.get("stripe-signature");
            const body = await req.text();

            try {
                event = stripe.webhooks.constructEvent(
                    body,
                    signature!,
                    webhookSecret
                );
            } catch (err) {
                return NextResponse.json({ error: 'Webhook signature verification failed' }, { status: 400 });
            }

            // Extract the object from the event.
            data = event.data;
            eventType = event.type;
        } else {
            // Webhook signing is recommended, but if the secret is not configured,
            // retrieve the event data directly from the request body.
            const body = await req.json();
            data = body.data;
            eventType = body.type;
        }

        switch (eventType) {
            case 'checkout.session.completed':
                const session = data.object;
                const customerEmail = session.customer_details?.email || session.metadata?.userEmail;
                const customerId = session.customer;

                if (customerEmail) {
                    await db.update(USER_TABLE).set({
                        isMember: true,
                        credits: 50, // Pro users get 50 credits
                        customerId: customerId // Store Stripe customer ID
                    }).where(eq(USER_TABLE.email, customerEmail));

                    console.log(`✅ User ${customerEmail} upgraded to Pro with customer ID: ${customerId}`);
                }
                break;

            case 'invoice.paid':
                // Recurring payment successful - refresh credits for Pro users
                const invoice = data.object;
                const invoiceCustomerId = invoice.customer;

                // Find user by customer ID first, then by email as fallback
                if (invoiceCustomerId) {
                    await db.update(USER_TABLE).set({
                        isMember: true,
                        credits: 50 // Refresh to 50 credits each billing cycle
                    }).where(eq(USER_TABLE.customerId, invoiceCustomerId));
                } else if (invoice.customer_email) {
                    await db.update(USER_TABLE).set({
                        isMember: true,
                        credits: 50
                    }).where(eq(USER_TABLE.email, invoice.customer_email));
                }
                break;

            case 'invoice.payment_failed':
                // Payment failed - downgrade to basic plan with 5 credits
                const failedInvoice = data.object;
                const failedCustomerId = failedInvoice.customer;

                if (failedCustomerId) {
                    await db.update(USER_TABLE).set({
                        isMember: false,
                        credits: 5 // Back to basic 5 credits
                    }).where(eq(USER_TABLE.customerId, failedCustomerId));
                } else if (failedInvoice.customer_email) {
                    await db.update(USER_TABLE).set({
                        isMember: false,
                        credits: 5
                    }).where(eq(USER_TABLE.email, failedInvoice.customer_email));
                }
                break;

            case 'customer.subscription.deleted':
                // Subscription cancelled - downgrade to basic plan
                const subscription = data.object;
                const subCustomerId = subscription.customer;

                if (subCustomerId) {
                    await db.update(USER_TABLE).set({
                        isMember: false,
                        credits: 5
                    }).where(eq(USER_TABLE.customerId, subCustomerId));

                    console.log(`❌ Subscription cancelled for customer: ${subCustomerId}`);
                }
                break;

            default:
                console.log(`Unhandled event type: ${eventType}`);
        }

        return NextResponse.json({ result: 'success' });

    } catch (error) {
        console.error('Webhook error:', error);
        return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 });
    }
}