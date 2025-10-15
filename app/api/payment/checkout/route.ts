import { NextRequest, NextResponse } from "next/server";
import Stripe from 'stripe'
import { currentUser } from '@clerk/nextjs/server';

export async function POST(req: NextRequest) {
    const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
    if (!stripeSecretKey) {
        return NextResponse.json(
            { error: 'Stripe secret key is not configured' },
            { status: 500 }
        );
    }

    const stripe = new Stripe(stripeSecretKey)
    const user = await currentUser();

    if (!user?.primaryEmailAddress?.emailAddress) {
        return NextResponse.json(
            { error: 'User email is required' },
            { status: 400 }
        );
    }

    const { priceId } = await req.json();

    if (!priceId) {
        return NextResponse.json(
            { error: 'Price ID is required' },
            { status: 400 }
        );
    }

    const session = await stripe.checkout.sessions.create({
        mode: 'subscription',
        customer_email: user.primaryEmailAddress.emailAddress,
        line_items: [
            {
                price: priceId,
                quantity: 1,
            },
        ],
        metadata: {
            userEmail: user.primaryEmailAddress.emailAddress,
            userId: user.id,
        },
        // Redirect to dashboard after successful payment
        success_url: `${process.env.HOST_URL}dashboard?payment=success`,
        cancel_url: `${process.env.HOST_URL}dashboard/upgrade?payment=cancelled`,
    });

    return NextResponse.json({ session })
}