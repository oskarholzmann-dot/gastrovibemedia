/**
 * Prüfung von Anfragen – gemeinsam genutzt von Formular und API-Route,
 * damit beide dieselben Regeln anwenden.
 */

export type Inquiry = {
  business: string;
  goal: string;
  package: string;
  email: string;
  phone: string;
};

export type InquiryErrors = Partial<Record<keyof Inquiry, string>>;

export const emptyInquiry: Inquiry = { business: "", goal: "", package: "", email: "", phone: "" };

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE = /^[+()\d\s/-]{6,}$/;

export function validateInquiry(inquiry: Inquiry): InquiryErrors {
  const errors: InquiryErrors = {};

  if (inquiry.business.trim() === "") {
    errors.business = "Bitte gib den Namen deines Betriebs an.";
  }

  if (inquiry.goal.trim() === "") {
    errors.goal = "Bitte wähle dein Hauptziel.";
  }

  if (inquiry.email.trim() === "") {
    errors.email = "Bitte gib deine E-Mail-Adresse an.";
  } else if (!EMAIL.test(inquiry.email.trim())) {
    errors.email = "Bitte gib eine gültige E-Mail-Adresse an.";
  }

  if (inquiry.phone.trim() === "") {
    errors.phone = "Bitte gib eine Telefonnummer an.";
  } else if (!PHONE.test(inquiry.phone.trim())) {
    errors.phone = "Bitte gib eine gültige Telefonnummer an.";
  }

  return errors;
}
