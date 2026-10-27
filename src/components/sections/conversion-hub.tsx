"use client";

import { AnimatePresence, motion } from "motion/react";
import { CalendarCheck, CircleCheck, LoaderCircle, TrendingUp } from "lucide-react";
import { useState } from "react";
import type { FormEvent, ReactNode } from "react";
import { cn } from "cn";
import { usePackageSelection } from "@/components/package-selection";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { site } from "@/config/site";
import { emptyInquiry, validateInquiry } from "@/lib/inquiry";
import type { Inquiry, InquiryErrors } from "@/lib/inquiry";

const euro = new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR", maximumFractionDigits: 0 });

type SliderSetting = { label: string; min: number; max: number; step: number; default: number };

function CalculatorSlider({ setting, value, onChange, format }: { setting: SliderSetting; value: number; onChange: (value: number) => void; format: (value: number) => string }) {
  return (
    <div>
      <div className="flex items-baseline justify-between gap-3">
        <span className="text-sm text-cream-muted/80">{setting.label}</span>
        <span className="font-heading text-lg font-semibold text-cream tabular-nums">{format(value)}</span>
      </div>
      <Slider
        className="mt-3"
        min={setting.min}
        max={setting.max}
        step={setting.step}
        value={value}
        onValueChange={(next) => onChange(Array.isArray(next) ? next[0] : next)}
        aria-label={setting.label}
      />
    </div>
  );
}

function Calculator() {
  const { calculator } = site;
  const [seats, setSeats] = useState(calculator.seats.default);
  const [averageSpend, setAverageSpend] = useState(calculator.averageSpend.default);
  const [openDays, setOpenDays] = useState(calculator.openDays.default);
  const [uplift, setUplift] = useState(calculator.uplift.default);

  const extraGuests = Math.round(seats * openDays * (uplift / 100));
  const extraRevenue = extraGuests * averageSpend;

  return (
    <div className="flex h-full flex-col rounded-3xl border border-border bg-slate-warm p-6 sm:p-8">
      <div className="flex items-center gap-3">
        <span className="flex size-10 items-center justify-center rounded-xl bg-amber-gold/15 text-amber-gold">
          <TrendingUp className="size-5" aria-hidden="true" />
        </span>
        <div>
          <h3 className="text-xl font-semibold text-cream">{calculator.title}</h3>
          <p className="text-sm text-cream-muted/65">{calculator.text}</p>
        </div>
      </div>

      <div className="mt-8 space-y-7">
        <CalculatorSlider setting={calculator.seats} value={seats} onChange={setSeats} format={(value) => `${value}`} />
        <CalculatorSlider setting={calculator.averageSpend} value={averageSpend} onChange={setAverageSpend} format={euro.format} />
        <CalculatorSlider setting={calculator.openDays} value={openDays} onChange={setOpenDays} format={(value) => `${value} Tage`} />
        <CalculatorSlider setting={calculator.uplift} value={uplift} onChange={setUplift} format={(value) => `+${value} %`} />
      </div>

      <div className="mt-8 rounded-2xl bg-gradient-to-br from-amber-gold to-copper p-6 text-charcoal" aria-live="polite">
        <p className="text-sm font-medium opacity-80">Möglicher Mehrumsatz pro Monat</p>
        <p className="mt-1 font-heading text-4xl font-bold tabular-nums">{euro.format(extraRevenue)}</p>
        <p className="mt-1 text-sm opacity-80">≈ {extraGuests.toLocaleString("de-DE")} zusätzliche Gäste</p>
      </div>
      <p className="mt-3 text-xs text-cream-muted/50">{calculator.disclaimer}</p>
    </div>
  );
}

function Field({ id, label, error, children }: { id: string; label: string; error?: string; children: ReactNode }) {
  return (
    <div className="grid gap-2">
      <Label htmlFor={id} className="text-cream-muted">
        {label}
      </Label>
      {children}
      {error && (
        <p id={`${id}-error`} className="text-sm text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}

function InquiryForm() {
  const { contact, packages } = site;
  const { selectedPackage, selectPackage } = usePackageSelection();
  const [inquiry, setInquiry] = useState<Inquiry>(emptyInquiry);
  const [errors, setErrors] = useState<InquiryErrors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "failed">("idle");

  const form = { ...inquiry, package: selectedPackage };
  const packageItems = [
    { value: "", label: contact.packageUndecided },
    ...packages.tiers.map((tier) => ({ value: tier.id, label: `${tier.name} (${tier.price})` })),
  ];

  const update = (field: keyof Inquiry, value: string) => {
    if (field === "package") {
      selectPackage(value);
    } else {
      setInquiry((current) => ({ ...current, [field]: value }));
    }

    setErrors((current) => ({ ...current, [field]: undefined }));
  };

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    const validation = validateInquiry(form);

    if (Object.keys(validation).length > 0) {
      setErrors(validation);
      document.getElementById(`inquiry-${Object.keys(validation)[0]}`)?.focus();

      return;
    }

    setStatus("sending");

    try {
      const response = await fetch("/api/anfrage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (response.status === 422) {
        setErrors((await response.json()).errors ?? {});
        setStatus("idle");

        return;
      }

      setStatus(response.ok ? "sent" : "failed");
    } catch {
      setStatus("failed");
    }
  };

  const inputClass = "h-12 rounded-xl bg-charcoal px-4 text-base text-cream";

  return (
    <div className="h-full rounded-3xl border border-amber-gold/30 bg-charcoal p-6 sm:p-8">
      <AnimatePresence mode="wait">
        {status === "sent" ? (
          <motion.div key="sent" role="status" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="flex h-full flex-col items-start justify-center py-10">
            <CircleCheck className="size-12 text-amber-gold" aria-hidden="true" />
            <h3 className="mt-4 text-3xl font-semibold text-cream">{contact.success.title}</h3>
            <p className="mt-2 text-cream-muted/75">{contact.success.text}</p>
            <Button
              variant="link"
              className="mt-4 px-0 text-amber-gold"
              onClick={() => {
                setInquiry(emptyInquiry);
                selectPackage("");
                setStatus("idle");
              }}
            >
              Weitere Anfrage senden
            </Button>
          </motion.div>
        ) : (
          <motion.form key="form" onSubmit={submit} noValidate exit={{ opacity: 0 }} className="grid gap-6">
            <Field id="inquiry-business" label="Name des Betriebs / Restaurant" error={errors.business}>
              <Input
                id="inquiry-business"
                value={form.business}
                onChange={(event) => update("business", event.target.value)}
                autoComplete="organization"
                aria-invalid={errors.business ? true : undefined}
                aria-describedby={errors.business ? "inquiry-business-error" : undefined}
                className={inputClass}
              />
            </Field>

            <fieldset className="grid gap-3">
              <legend className="mb-1 text-sm font-medium text-cream-muted">Was ist dein aktuelles Hauptziel?</legend>
              <div id="inquiry-goal" tabIndex={-1} className="grid grid-cols-1 gap-2 outline-none sm:grid-cols-2">
                {contact.goals.map((goal) => (
                  <label
                    key={goal}
                    className={cn(
                      "flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 text-sm transition-colors",
                      form.goal === goal ? "border-amber-gold bg-accent text-cream" : "border-border text-cream-muted/80 hover:border-cream/30",
                    )}
                  >
                    <input type="radio" name="goal" value={goal} checked={form.goal === goal} onChange={() => update("goal", goal)} className="accent-amber-gold" />
                    {goal}
                  </label>
                ))}
              </div>
              {errors.goal && <p className="text-sm text-destructive">{errors.goal}</p>}
            </fieldset>

            <Field id="inquiry-package" label="Wunsch-Budget / Paket">
              <Select items={packageItems} value={form.package} onValueChange={(value) => update("package", value ?? "")}>
                <SelectTrigger id="inquiry-package" className={cn(inputClass, "w-full data-[size=default]:h-12")}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {packageItems.map((item) => (
                    <SelectItem key={item.value || "none"} value={item.value}>
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>

            <div className="grid gap-6 sm:grid-cols-2">
              <Field id="inquiry-email" label="E-Mail" error={errors.email}>
                <Input
                  id="inquiry-email"
                  type="email"
                  value={form.email}
                  onChange={(event) => update("email", event.target.value)}
                  autoComplete="email"
                  aria-invalid={errors.email ? true : undefined}
                  aria-describedby={errors.email ? "inquiry-email-error" : undefined}
                  className={inputClass}
                />
              </Field>
              <Field id="inquiry-phone" label="Telefon" error={errors.phone}>
                <Input
                  id="inquiry-phone"
                  type="tel"
                  value={form.phone}
                  onChange={(event) => update("phone", event.target.value)}
                  autoComplete="tel"
                  aria-invalid={errors.phone ? true : undefined}
                  aria-describedby={errors.phone ? "inquiry-phone-error" : undefined}
                  className={inputClass}
                />
              </Field>
            </div>

            {status === "failed" && (
              <p role="alert" className="rounded-xl bg-destructive/10 px-4 py-3 text-sm text-destructive">
                Etwas ist schiefgelaufen. Bitte versuche es erneut oder schreib uns an{" "}
                <a className="underline" href={`mailto:${site.brand.email}`}>
                  {site.brand.email}
                </a>
                .
              </p>
            )}

            <Button type="submit" disabled={status === "sending"} className="h-14 rounded-full text-base font-semibold">
              {status === "sending" ? <LoaderCircle className="animate-spin" aria-hidden="true" /> : <CalendarCheck aria-hidden="true" />}
              {status === "sending" ? "Wird gesendet …" : contact.submit}
            </Button>
            <p className="-mt-2 text-center text-xs text-cream-muted/50">{contact.privacy}</p>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

export function ConversionHub() {
  const { contact } = site;

  return (
    <section id="anfrage" aria-labelledby="anfrage-title" className="scroll-mt-16 bg-charcoal py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading eyebrow={contact.eyebrow} title={contact.title} intro={contact.intro} />
        <div className="mt-12 grid gap-5 lg:grid-cols-[1fr_1.25fr]">
          <Reveal className="order-2 min-w-0 lg:order-1">
            <Calculator />
          </Reveal>
          <Reveal delay={0.1} className="order-1 min-w-0 lg:order-2">
            <InquiryForm />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
