import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { name, email, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { message: "All fields are required." },
        { status: 400 },
      );
    }

    const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        message,
        access_key: accessKey,
      }),
    });

    if (response.ok) {
      return NextResponse.json({ message: "Form submitted successfully" });
    } else {
      const data = await response.json();
      return NextResponse.json(
        { message: data.message || "Something went wrong." },
        { status: response.status },
      );
    }
  } catch (error) {
    return NextResponse.json(
      { message: "Network error. Please try again later." },
      { status: 500 },
    );
  }
}
