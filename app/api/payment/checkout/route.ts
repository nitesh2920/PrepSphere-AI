import { NextRequest, NextResponse } from "next/server";
import Stripe from 'stripe'

export async function POST(req: NextRequest) {
    const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
    if (!stripeSecretKey) {
        return NextResponse.json(
            { error: 'Stripe secret key is not configured' },
            { status: 500 }
        );
    }

    const stripe = new Stripe(stripeSecretKey)

    const { priceId } = await req.json();

    if (!priceId) {
        return NextResponse.json(
            { error: 'Price ID is required' },
            { status: 400 }
        );
    }

    const session = await stripe.checkout.sessions.create({
        mode: 'subscription',
        line_items: [
            {
                price: priceId,
                quantity: 1,
            },
        ],
        // {CHECKOUT_SESSION_ID} is a string literal; do not change it!
        // the actual Session ID is returned in the query parameter when your customer
        // is redirected to the success page.
        success_url: `${process.env.HOST_URL}payment-success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: process.env.HOST_URL,
    });


    return NextResponse.json({ session })
}