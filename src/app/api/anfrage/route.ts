import { defaultLocale, getSite, hasLocale } from "@/config/i18n";
import { emptyInquiry, validateInquiry } from "@/lib/inquiry";
import type { Inquiry } from "@/lib/inquiry";

/**
 * Nimmt Anfragen aus dem Formular entgegen.
 *
 * Platzhalter: Die Anfrage wird nur im Server-Log ausgegeben. Hier dein
 * CRM, deinen E-Mail-Dienst oder einen Webhook anbinden (siehe TODO).
 */
export async function POST(request: Request) {
  let body: Record<string, unknown>;

  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "invalid_json" }, { status: 400 });
  }

  const inquiry = Object.fromEntries(
    Object.keys(emptyInquiry).map((key) => [key, typeof body[key] === "string" ? String(body[key]).slice(0, 500) : ""]),
  ) as Inquiry;

  const lang = hasLocale(body.lang) ? body.lang : defaultLocale;
  const errors = validateInquiry(inquiry, getSite(lang).contact.errors);

  if (Object.keys(errors).length > 0) {
    return Response.json({ errors }, { status: 422 });
  }

  // TODO: Anfrage an CRM / E-Mail-Postfach weiterleiten.
  console.info("[GastroVibe] Neue Anfrage", { ...inquiry, lang, receivedAt: new Date().toISOString() });

  return Response.json({ ok: true }, { status: 201 });
}
