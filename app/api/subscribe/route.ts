import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend("re_T6AeaNay_LiEEkxadjMWLLAsfjcsDUaya");

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email } = body;

    const data = await resend.emails.send({
      from: "MonkDB <onboarding@resend.dev>",
      to: ["support@monkdb.com"],
      subject: "New Demo Request",
      html: `
        <h2>New Demo Request</h2>
        <p><strong>Email:</strong> ${email}</p>
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
