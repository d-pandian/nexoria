import { NextRequest, NextResponse } from "next/server";

const PLAN_PRICES: Record<string, number> = {
  launch: 36,
  core: 48,
  advance: 84,
  pinnacle: 192,
};

const PLAN_NAMES: Record<string, string> = {
  launch: "Launch Plan",
  core: "Core Plan",
  advance: "Advance Plan",
  pinnacle: "Pinnacle Plan",
};

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { plan, firstName, lastName, email, company, phone, timezone, goals, challenges, preferredDate, preferredTime } = body;

    if (!plan || !firstName || !email || !goals) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const price = PLAN_PRICES[plan];
    if (!price) {
      return NextResponse.json({ error: "Invalid plan" }, { status: 400 });
    }

    // Check if Stripe keys are configured
    const stripeKey = process.env.STRIPE_SECRET_KEY;
    if (stripeKey && stripeKey !== "sk_test_your_secret_key_here") {
      // Create Stripe checkout session
      const stripe = require("stripe")(stripeKey);
      const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        mode: "payment",
        line_items: [
          {
            price_data: {
              currency: "usd",
              product_data: {
                name: `Nexoria — ${PLAN_NAMES[plan]}`,
                description: `Professional consulting session (${PLAN_NAMES[plan]})`,
              },
              unit_amount: price * 100, // cents
            },
            quantity: 1,
          },
        ],
        customer_email: email,
        metadata: {
          plan,
          firstName,
          lastName,
          email,
          company: company || "",
          goals,
          challenges: challenges || "",
          preferredDate: preferredDate || "",
          preferredTime: preferredTime || "",
          timezone: timezone || "UTC",
        },
        success_url: `${appUrl}/booking/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${appUrl}/booking?plan=${plan}`,
      });

      return NextResponse.json({ checkoutUrl: session.url });
    }

    // Demo mode — generate a booking ref
    const bookingRef = "NX-" + Math.random().toString(36).slice(2, 8).toUpperCase();

    // In production: save to MongoDB
    console.log("New booking (demo):", {
      bookingRef,
      plan: PLAN_NAMES[plan],
      price,
      client: `${firstName} ${lastName}`,
      email,
      company,
    });

    return NextResponse.json({
      success: true,
      bookingRef,
      plan: PLAN_NAMES[plan],
      price,
    });
  } catch (error) {
    console.error("Booking API error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function GET() {
  // Return bookings (admin use — add auth in production)
  return NextResponse.json({
    bookings: [],
    message: "Connect MongoDB to see bookings",
  });
}
