import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      // Client details
      plan,
      planLabel,
      firstName,
      lastName,
      email,
      company,
      phone,
      timezone,
      goals,
      challenges,
      preferredDate,
      preferredTime,
      // Demo flag
      demo,
    } = body;

    const PLAN_PRICES_USD: Record<string, number> = {
      launch: 36, core: 48, advance: 84, pinnacle: 192,
    };
    const PLAN_PRICES_INR: Record<string, string> = {
      launch: "₹3,000", core: "₹4,000", advance: "₹7,000", pinnacle: "₹16,000",
    };

    const bookingRef = "NX-" + Math.random().toString(36).slice(2, 8).toUpperCase();

    // ── Demo mode verification ─────────────
    if (demo) {
      console.log("Demo booking confirmed:", {
        bookingRef,
        plan: planLabel,
        client: `${firstName} ${lastName}`,
        email,
        company,
      });

      return NextResponse.json({
        success: true,
        bookingRef,
        plan:       planLabel,
        priceUSD:   PLAN_PRICES_USD[plan] || 0,
        priceINR:   PLAN_PRICES_INR[plan] || "",
        firstName,
        lastName,
        email,
        paymentId:  "demo_" + bookingRef,
        orderId:    razorpay_order_id,
      });
    }

    // ── Real Razorpay signature verification ─
    const razorpayKeySecret = process.env.RAZORPAY_KEY_SECRET;
    if (!razorpayKeySecret) {
      return NextResponse.json({ error: "Server misconfigured" }, { status: 500 });
    }

    const expectedSignature = crypto
      .createHmac("sha256", razorpayKeySecret)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      console.warn("Razorpay signature mismatch!", {
        expected: expectedSignature,
        received: razorpay_signature,
      });
      return NextResponse.json(
        { error: "Payment verification failed. Please contact support." },
        { status: 400 }
      );
    }

    // ── Signature verified — save booking ───
    console.log("✅ Razorpay payment verified:", {
      bookingRef,
      paymentId: razorpay_payment_id,
      orderId:   razorpay_order_id,
      plan:      planLabel,
      client:    `${firstName} ${lastName}`,
      email,
    });

    // TODO: Save to MongoDB
    // await Booking.create({ bookingRef, plan, planLabel, client: { firstName, ... }, payment: { ... } });

    // TODO: Send confirmation email
    // await sendConfirmationEmail({ to: email, bookingRef, planLabel, firstName });

    return NextResponse.json({
      success:    true,
      bookingRef,
      plan:       planLabel,
      priceUSD:   PLAN_PRICES_USD[plan] || 0,
      priceINR:   PLAN_PRICES_INR[plan] || "",
      firstName,
      lastName,
      email,
      paymentId:  razorpay_payment_id,
      orderId:    razorpay_order_id,
    });

  } catch (error) {
    console.error("Payment verification error:", error);
    return NextResponse.json(
      { error: "Internal server error during verification" },
      { status: 500 }
    );
  }
}
