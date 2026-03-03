import { NextRequest, NextResponse } from "next/server";

/* ── Plan config ─────────────────────── */
// Amounts in paise (INR × 100). USD reference shown on UI.
const PLAN_CONFIG: Record<string, { amountPaise: number; nameINR: string; nameUSD: string; priceUSD: number }> = {
  launch:   { amountPaise: 300000,  nameINR: "₹3,000",  nameUSD: "$36",  priceUSD: 36 },
  core:     { amountPaise: 400000,  nameINR: "₹4,000",  nameUSD: "$48",  priceUSD: 48 },
  advance:  { amountPaise: 700000,  nameINR: "₹7,000",  nameUSD: "$84",  priceUSD: 84 },
  pinnacle: { amountPaise: 1600000, nameINR: "₹16,000", nameUSD: "$192", priceUSD: 192 },
};

const PLAN_LABELS: Record<string, string> = {
  launch:   "Launch Plan",
  core:     "Core Plan",
  advance:  "Advance Plan",
  pinnacle: "Pinnacle Plan",
};

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { plan, firstName, lastName, email } = body;

    const planConfig = PLAN_CONFIG[plan];
    if (!planConfig) {
      return NextResponse.json({ error: "Invalid plan selected" }, { status: 400 });
    }

    const razorpayKeyId     = process.env.RAZORPAY_KEY_ID;
    const razorpayKeySecret = process.env.RAZORPAY_KEY_SECRET;

    // ── Live Razorpay mode ─────────────────
    if (razorpayKeyId && razorpayKeySecret &&
        razorpayKeyId !== "rzp_test_your_key_id_here") {
      const Razorpay = require("razorpay");
      const instance = new Razorpay({
        key_id:     razorpayKeyId,
        key_secret: razorpayKeySecret,
      });

      const receiptId = "NX-" + Math.random().toString(36).slice(2, 8).toUpperCase();

      const order = await instance.orders.create({
        amount:   planConfig.amountPaise,
        currency: "INR",
        receipt:  receiptId,
        notes: {
          plan:      plan,
          planLabel: PLAN_LABELS[plan],
          client:    `${firstName} ${lastName}`,
          email:     email,
          priceUSD:  String(planConfig.priceUSD),
        },
      });

      return NextResponse.json({
        orderId:    order.id,
        amount:     order.amount,
        currency:   order.currency,
        receipt:    receiptId,
        planLabel:  PLAN_LABELS[plan],
        priceINR:   planConfig.nameINR,
        priceUSD:   planConfig.nameUSD,
        keyId:      razorpayKeyId,
      });
    }

    // ── Demo mode (no keys configured) ────
    const demoReceiptId = "NX-" + Math.random().toString(36).slice(2, 8).toUpperCase();
    return NextResponse.json({
      orderId:    "order_demo_" + demoReceiptId,
      amount:     planConfig.amountPaise,
      currency:   "INR",
      receipt:    demoReceiptId,
      planLabel:  PLAN_LABELS[plan],
      priceINR:   planConfig.nameINR,
      priceUSD:   planConfig.nameUSD,
      keyId:      razorpayKeyId || "demo",
      demo:       true,
    });

  } catch (error) {
    console.error("Razorpay order creation error:", error);
    return NextResponse.json(
      { error: "Failed to create payment order" },
      { status: 500 }
    );
  }
}
