import Stripe from 'stripe'
import { NextResponse, NextRequest } from 'next/server';
import { USER_TABLE } from '@/configs/schema';
import { db } from '@/configs/db';
import { eq } from 'drizzle-orm';
export async function POST(req: NextRequest) {
    const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
    console.log('ffff', process.env.STRIPE_SECRET_KEY)

    if (!stripeSecretKey) {
        return NextResponse.json(
            { error: 'Stripe secret key is not configured' },
            { status: 500 }
        );
    }
    const stripe = new Stripe(stripeSecretKey)

    app.post("/webhook", async (req, res) => {
        let data;
        let eventType;
        // Check if webhook signing is configured.
        const webhookSecret = process.env.STRIPE_WEB_HOOK_KEY
        if (webhookSecret) {
            // Retrieve the event by verifying the signature using the raw body and secret.
            let event;
            let signature = req.headers["stripe-signature"];

            try {
                event = stripe.webhooks.constructEvent(
                    req.body,
                    signature,
                    webhookSecret
                );
            } catch (err) {
                console.log(`⚠️  Webhook signature verification failed.`);
                return res.sendStatus(400);
            }
            // Extract the object from the event.
            data = event.data;
            eventType = event.type;
        } else {
            // Webhook signing is recommended, but if the secret is not configured in `config.js`,
            // retrieve the event data directly from the request body.
            data = req.body.data;
            eventType = req.body.type;
        }

        switch (eventType) {
            case 'checkout.session.completed':
                const result = await db.update(USER_TABLE).set({
                    isMember: true
                }).where(eq(USER_TABLE.email, data.customer_details.email))
                break;
            case 'invoice.paid':

                //record to payment record table
                break;
            case 'invoice.payment_failed':
                await db.update(USER_TABLE).set({
                    isMember: false
                }).where(eq(USER_TABLE.email, data.customer_details.email))
                break;
                break;
            default:
            // Unhandled event type
        }
    }
    )
    return NextResponse.json({ result: 'success' })
}