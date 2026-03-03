import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature");
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!webhookSecret || !sig) {
    return NextResponse.json({ error: "Webhook not configured" }, { status: 400 });
  }

  try {
    const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
    const event = stripe.webhooks.constructEvent(body, sig, webhookSecret);

    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object;
        const { plan, firstName, lastName, email, company, goals, challenges, preferredDate, preferredTime, timezone } = session.metadata;

        // TODO: Save to MongoDB
        const bookingRef = "NX-" + Math.random().toString(36).slice(2, 8).toUpperCase();

        console.log("Payment confirmed:", {
          bookingRef,
          plan,
          email,
          amount: session.amount_total / 100,
        });

        // TODO: Send confirmation email to client
        // TODO: Notify admin
        break;
      }

      case "payment_intent.payment_failed": {
        console.log("Payment failed:", event.data.object.id);
        break;
      }

      default:
        console.log("Unhandled event type:", event.type);
    }

    return NextResponse.json({ received: true });
  } catch (err) {
    console.error("Webhook error:", err);
    return NextResponse.json({ error: "Webhook error" }, { status: 400 });
  }
}
