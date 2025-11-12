import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend("re_T6AeaNay_LiEEkxadjMWLLAsfjcsDUaya");

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, company, phone, message, acceptCommunications } = body;

    const data = await resend.emails.send({
      from: "MonkDB <onboarding@resend.dev>",
      to: ["support@monkdb.com"],
      subject: "New Contact Form Submission",
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Company:</strong> ${company}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Message:</strong> ${message}</p>
        <p><strong>Accepts Communications:</strong> ${
          acceptCommunications ? "Yes" : "No"
        }</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 },
    );
  }
}
