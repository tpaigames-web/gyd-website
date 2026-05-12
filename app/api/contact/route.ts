import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();

  // TODO: integrate Resend / Formspree once API keys are set in .env.local
  // For now, just echo back so the form wiring can be tested end-to-end.
  console.log("Contact form submission:", body);

  return NextResponse.json({ ok: true });
}
