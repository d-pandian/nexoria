import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, company, subject, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // In production: send email via nodemailer or similar
    // For now, log and return success
    console.log("Contact form submission:", { name, email, company, subject, message });

    // TODO: Integrate nodemailer
    // await sendEmail({ to: "hello@nexoria.com", from: email, name, subject, message });

    return NextResponse.json({ success: true, message: "Message received" });
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
