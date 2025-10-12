import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(req: NextRequest) {
  try {
    const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
    if (!stripeSecretKey) {
      console.error("❌ Missing STRIPE_SECRET_KEY");
      return NextResponse.json(
        { error: "Stripe secret key is not configured" },
        { status: 500 }
      );
    }

    const stripe = new Stripe(stripeSecretKey);

    const { customerId } = await req.json();
    if (!customerId) {
      return NextResponse.json(
        { error: "Customer ID is required" },
        { status: 400 }
      );
    }

    const portalSession = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: process.env.HOST_URL || "http://localhost:3000",
    });

    return NextResponse.json({ url: portalSession.url });
  } catch (err: any) {
    console.error("🔥 Stripe Manage Payment Error:", err);

    return NextResponse.json(
      { error: err.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
