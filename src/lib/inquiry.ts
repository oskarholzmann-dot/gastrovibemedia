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

/** Fehlertexte in der Sprache der Seite, siehe contact.errors in der Site-Konfiguration. */
export type InquiryErrorMessages = {
  business: string;
  goal: string;
  email: string;
  emailInvalid: string;
  phone: string;
  phoneInvalid: string;
};

export const emptyInquiry: Inquiry = { business: "", goal: "", package: "", email: "", phone: "" };

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE = /^[+()\d\s/-]{6,}$/;

export function validateInquiry(inquiry: Inquiry, messages: InquiryErrorMessages): InquiryErrors {
  const errors: InquiryErrors = {};

  if (inquiry.business.trim() === "") {
    errors.business = messages.business;
  }

  if (inquiry.goal.trim() === "") {
    errors.goal = messages.goal;
  }

  if (inquiry.email.trim() === "") {
    errors.email = messages.email;
  } else if (!EMAIL.test(inquiry.email.trim())) {
    errors.email = messages.emailInvalid;
  }

  if (inquiry.phone.trim() === "") {
    errors.phone = messages.phone;
  } else if (!PHONE.test(inquiry.phone.trim())) {
    errors.phone = messages.phoneInvalid;
  }

  return errors;
}
