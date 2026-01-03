import { NextResponse } from "next/server";
import { GenderType, getPricesByGender, discounted, getPackagesByGender } from "@/lib/laser-prices";

type RequestBody = {
  name: string;
  email: string;
  phone: string;
  gender: GenderType;
  zones?: string[];
  zone?: string;
  packages?: string[];
  preferredDate: string; // yyyy-mm-dd
  preferredTime?: string; // HH:mm (optional)
  message?: string;
};


async function trySendViaLoops(recipientEmail: string, templateIdEnv: string, data: Record<string, unknown>) {
  const apiKey = process.env.LOOPS_API_KEY;
  const templateId = process.env[templateIdEnv];
  if (!apiKey || !templateId) {
    return { success: false, error: `Missing: ${!apiKey ? 'LOOPS_API_KEY' : templateIdEnv}` };
  }
  try {
    const res = await fetch("https://app.loops.so/api/v1/transactional", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        email: recipientEmail,
        transactionalId: templateId,
        dataVariables: data,
      }),
    });
    const result = await res.json().catch(() => ({}));
    if (!res.ok) {
      return { success: false, error: result.message || `HTTP ${res.status}` };
    }
    return { success: true };
  } catch (err) {
    return { success: false, error: err instanceof Error ? err.message : "Unknown error" };
  }
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as RequestBody;
    const zones = Array.isArray(body.zones) && body.zones.length > 0 ? body.zones : (body.zone ? [body.zone] : []);
    const packages = Array.isArray(body.packages) ? body.packages : [];
    if (
      !body.name ||
      !body.email ||
      !body.phone ||
      (zones.length === 0 && packages.length === 0) ||
      !body.preferredDate ||
      (body.gender !== "damen" && body.gender !== "herren")
    ) {
      return NextResponse.json({ error: "Ungültige Eingaben" }, { status: 400 });
    }

    const studioEmail = process.env.STUDIO_EMAIL || "hey@skinlux.at";

    // Build payload for Loops templates
    const allPrices = getPricesByGender(body.gender);
    const allPackages = getPackagesByGender(body.gender);
    const rows = zones.map((z) => {
      const orig = allPrices.find((p) => p.zone === z)?.priceEuro ?? 0;
      const disc = discounted(orig, 50);
      return { zone: z, original: orig, discounted: disc };
    });
    const rowsPackages = packages.map((p) => {
      const orig = allPackages.find((x) => x.name === p)?.priceEuro ?? 0;
      const disc = discounted(orig, 50);
      return { name: p, original: orig, discounted: disc };
    });
    const totalOriginal = rows.reduce((s, r) => s + r.original, 0) + rowsPackages.reduce((s, r) => s + r.original, 0);
    const totalDiscounted = rows.reduce((s, r) => s + r.discounted, 0) + rowsPackages.reduce((s, r) => s + r.discounted, 0);

    // Remove duplicates and format zone selection
    const uniqueZones = [...new Set(zones)];
    const uniquePackages = [...new Set(packages)];
    const allSelections = [...uniqueZones, ...uniquePackages];

    // Loops only accepts primitive values (strings, numbers, booleans) in dataVariables
    const emailData: Record<string, string | number> = {
      name: body.name,
      email: body.email,
      phone: body.phone,
      gender: body.gender === "damen" ? "Damen" : "Herren",
      zone: allSelections.join(", "),
      zones: uniqueZones.join(", ") || "-",
      packages: uniquePackages.join(", ") || "-",
      preferredDate: body.preferredDate,
      preferredTime: body.preferredTime || "",
      message: body.message || "",
      originalPriceEuro: `€${totalOriginal}`,
      discountedPriceEuro: `€${totalDiscounted}`,
    };

    // Send via Loops for USER
    const userResult = await trySendViaLoops(
      body.email,
      "LOOPS_BOOKING_USER_TEMPLATE_ID",
      emailData
    );

    if (!userResult.success) {
      return NextResponse.json(
        { error: `E-Mail-Versand fehlgeschlagen (User): ${userResult.error}` },
        { status: 500 }
      );
    }

    // Send via Loops for ADMIN
    const adminResult = await trySendViaLoops(
      studioEmail,
      "LOOPS_BOOKING_ADMIN_TEMPLATE_ID",
      emailData
    );

    if (!adminResult.success) {
      return NextResponse.json(
        { error: `E-Mail-Versand fehlgeschlagen (Admin): ${adminResult.error}` },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Serverfehler" },
      { status: 500 }
    );
  }
}



