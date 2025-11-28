import { NextResponse } from "next/server";
import { Resend } from "resend";
import { GenderType, getPricesByGender, discounted } from "@/lib/laser-prices";

type RequestBody = {
  name: string;
  email: string;
  phone: string;
  gender: GenderType;
  zone: string;
  preferredDate: string; // yyyy-mm-dd
  preferredTime: string; // HH:mm
  message?: string;
};

function htmlEscape(input: string) {
  return input.replace(/[&<>"']/g, (m) => {
    switch (m) {
      case "&":
        return "&amp;";
      case "<":
        return "&lt;";
      case ">":
        return "&gt;";
      case '"':
        return "&quot;";
      case "'":
        return "&#039;";
      default:
        return m;
    }
  });
}

function buildEmailHTML(kind: "user" | "admin", data: RequestBody) {
  const prices = getPricesByGender(data.gender);
  const item = prices.find((p) => p.zone === data.zone);
  const original = item?.priceEuro ?? 0;
  const sale = discounted(original, 50);

  const title =
    kind === "user"
      ? "Deine Termin-Anfrage ist eingegangen"
      : "Neue Termin-Anfrage (Laser-Aktion)";

  const intro =
    kind === "user"
      ? `Hallo ${htmlEscape(data.name)},<br/>vielen Dank für deine Anfrage. Wir melden uns zur Bestätigung deines Termins.`
      : "Es ist eine neue Termin-Anfrage eingegangen.";

  return `<!doctype html>
<html>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${title}</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f9fafb; margin: 0; padding: 0; }
    .container { max-width: 640px; margin: 0 auto; background: #fff; }
    .header { background: #111827; color: #fff; padding: 24px; text-align: center; }
    .content { padding: 24px; }
    .section { background: #f9fafb; border: 1px solid #e5e7eb; margin: 16px 0; padding: 16px; }
    .row { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #f3f4f6; }
    .label { color: #6b7280; font-weight: 600; }
    .val { color: #111827; }
    .muted { color: #6b7280; font-size: 12px; margin-top: 12px; }
    .price { color: #16a34a; font-weight: 700; }
    .strike { text-decoration: line-through; color: #9ca3af; margin-right: 8px; }
    .footer { background: #f9fafb; padding: 16px; text-align: center; color: #6b7280; font-size: 12px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div style="font-size:20px; letter-spacing: 2px;">SKINLUX POTTENDORF</div>
    </div>
    <div class="content">
      <h1 style="margin:0 0 12px 0; font-weight:500; color:#111827;">${title}</h1>
      <p style="margin:0 0 16px 0; color:#374151;">${intro}</p>

      <div class="section">
        <div class="row"><div class="label">Name</div><div class="val">${htmlEscape(data.name)}</div></div>
        <div class="row"><div class="label">E-Mail</div><div class="val">${htmlEscape(data.email)}</div></div>
        <div class="row"><div class="label">Telefon</div><div class="val">${htmlEscape(data.phone)}</div></div>
        <div class="row"><div class="label">Geschlecht</div><div class="val">${data.gender === "damen" ? "Damen" : "Herren"}</div></div>
        <div class="row"><div class="label">Zone</div><div class="val">${htmlEscape(data.zone)}</div></div>
        <div class="row"><div class="label">Preis</div><div class="val"><span class="strike">€${original}</span> <span class="price">€${sale}</span></div></div>
        <div class="row"><div class="label">Wunschtermin</div><div class="val">${htmlEscape(
          `${data.preferredDate} ${data.preferredTime}`
        )}</div></div>
      </div>

      ${
        data.message
          ? `<div class="section"><div class="label" style="margin-bottom:6px;">Nachricht</div><div class="val" style="white-space:pre-wrap;">${htmlEscape(
              data.message
            )}</div></div>`
          : ""
      }

      <p class="muted">Diese Anfrage bezieht sich auf die aktuelle 50%-Aktion (gilt für die ersten zwei Behandlungen).</p>
    </div>
    <div class="footer">
      Skinlux Pottendorf • Marktplatz 14, 2486 Pottendorf • hey@skinlux.at • 0664 91 88 632
    </div>
  </div>
</body>
</html>`;
}

async function trySendViaLoops(recipientEmail: string, templateIdEnv: string, data: Record<string, unknown>) {
  const apiKey = process.env.LOOPS_API_KEY;
  const templateId = process.env[templateIdEnv];
  if (!apiKey || !templateId) return false;
  try {
    // Loops transactional API (template upload via Loops UI).
    const res = await fetch("https://app.loops.so/api/v1/transactional", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        email: recipientEmail,
        transactionalId: templateId,
        data,
      }),
    });
    return res.ok;
  } catch {
    return false;
  }
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as RequestBody;
    if (
      !body.name ||
      !body.email ||
      !body.phone ||
      !body.zone ||
      !body.preferredDate ||
      !body.preferredTime ||
      (body.gender !== "damen" && body.gender !== "herren")
    ) {
      return NextResponse.json({ error: "Ungültige Eingaben" }, { status: 400 });
    }

    const studioEmail = process.env.STUDIO_EMAIL || "hey@skinlux.at";

    // Build payload for Loops templates
    const priceItem = getPricesByGender(body.gender).find((p) => p.zone === body.zone);
    const original = priceItem?.priceEuro ?? 0;
    const sale = discounted(original, 50);
    const emailData = {
      name: body.name,
      email: body.email,
      phone: body.phone,
      gender: body.gender,
      zone: body.zone,
      preferredDate: body.preferredDate,
      preferredTime: body.preferredTime,
      message: body.message || "",
      originalPriceEuro: `€${original}`,
      discountedPriceEuro: `€${sale}`,
    };

    // Try Loops for USER
    const userSentViaLoops = await trySendViaLoops(
      body.email,
      "LOOPS_BOOKING_USER_TEMPLATE_ID",
      emailData
    );

    // Try Loops for ADMIN
    const adminSentViaLoops = await trySendViaLoops(
      studioEmail,
      "LOOPS_BOOKING_ADMIN_TEMPLATE_ID",
      emailData
    );

    // Fallback to Resend if Loops not configured
    if (!userSentViaLoops || !adminSentViaLoops) {
      const resendKey = process.env.RESEND_API_KEY;
      if (!resendKey) {
        return NextResponse.json(
          { error: "E-Mail-Service nicht konfiguriert" },
          { status: 500 }
        );
      }
      const resend = new Resend(resendKey);
      const userHTML = buildEmailHTML("user", body);
      const adminHTML = buildEmailHTML("admin", body);
      // Send user
      if (!userSentViaLoops) {
        await resend.emails.send({
          from:
            process.env.NODE_ENV === "production"
              ? "Skinlux Pottendorf <noreply@skinlux.at>"
              : "Skinlux <onboarding@resend.dev>",
          to: [body.email],
          subject: "Deine Termin-Anfrage ist eingegangen",
          html: userHTML,
        });
      }
      // Send admin
      if (!adminSentViaLoops) {
        await resend.emails.send({
          from:
            process.env.NODE_ENV === "production"
              ? "Skinlux System <noreply@skinlux.at>"
              : "Skinlux System <onboarding@resend.dev>",
          to: [studioEmail],
          subject: "Neue Termin-Anfrage (Laser-Aktion)",
          html: adminHTML,
        });
      }
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Serverfehler" },
      { status: 500 }
    );
  }
}

