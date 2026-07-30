"use client";

import { useActionState, useId } from "react";
import { useFormStatus } from "react-dom";
import {
  ArrowUpRight,
  CheckCircle,
  CircleNotch,
  WarningCircle,
} from "@phosphor-icons/react";

import { sendContactMessage } from "@/app/actions/contact";
import {
  initialContactState,
  type ContactFieldName,
} from "@/lib/contact-state";
import type { Dictionary, Locale } from "@/lib/i18n";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

const fieldClass =
  "h-12 rounded-xl border-white/12 bg-white/[0.03] px-4 text-base text-foreground transition-colors placeholder:text-muted-foreground hover:border-white/20 focus-visible:border-ring focus-visible:ring-ring/40 aria-invalid:border-destructive/60 md:text-sm dark:bg-white/[0.03]";

export function ContactForm({
  dict,
  lang,
}: {
  dict: Dictionary;
  lang: Locale;
}) {
  const [state, formAction] = useActionState(
    sendContactMessage,
    initialContactState,
  );
  const baseId = useId();
  const copy = dict.contact.form;

  const fieldId = (name: ContactFieldName) => `${baseId}-${name}`;
  const errorId = (name: ContactFieldName) => `${baseId}-${name}-error`;
  const errorOf = (name: ContactFieldName) => state.errors?.[name];

  return (
    <form action={formAction} noValidate className="flex flex-col gap-5">
      <input type="hidden" name="locale" value={lang} />

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field
          label={copy.name}
          id={fieldId("name")}
          errorId={errorId("name")}
          error={errorOf("name")}
        >
          <Input
            id={fieldId("name")}
            name="name"
            defaultValue={state.values?.name ?? ""}
            autoComplete="name"
            placeholder={copy.namePlaceholder}
            aria-invalid={Boolean(errorOf("name"))}
            aria-describedby={errorOf("name") ? errorId("name") : undefined}
            className={fieldClass}
          />
        </Field>

        <Field
          label={copy.email}
          id={fieldId("email")}
          errorId={errorId("email")}
          error={errorOf("email")}
        >
          <Input
            id={fieldId("email")}
            name="email"
            defaultValue={state.values?.email ?? ""}
            type="email"
            autoComplete="email"
            placeholder={copy.emailPlaceholder}
            aria-invalid={Boolean(errorOf("email"))}
            aria-describedby={errorOf("email") ? errorId("email") : undefined}
            className={fieldClass}
          />
        </Field>
      </div>

      <Field
        label={copy.message}
        id={fieldId("message")}
        errorId={errorId("message")}
        error={errorOf("message")}
        hint={copy.hint}
      >
        <Textarea
          id={fieldId("message")}
          name="message"
          defaultValue={state.values?.message ?? ""}
          rows={5}
          placeholder={copy.messagePlaceholder}
          aria-invalid={Boolean(errorOf("message"))}
          aria-describedby={errorOf("message") ? errorId("message") : undefined}
          className={cn(
            fieldClass,
            "h-auto min-h-36 resize-none py-3.5 leading-relaxed",
          )}
        />
      </Field>

      {/* Honeypot. Hidden from people, irresistible to bots. */}
      <div aria-hidden className="hidden">
        <label htmlFor={`${baseId}-company`}>{copy.honeypotLabel}</label>
        <input
          id={`${baseId}-company`}
          name="company"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <SubmitButton idle={copy.submit} pendingLabel={copy.sending} />
        <StatusMessage status={state.status} message={state.message} />
      </div>
    </form>
  );
}

function Field({
  label,
  id,
  error,
  errorId,
  hint,
  children,
}: {
  label: string;
  id: string;
  error?: string;
  errorId: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-sm font-medium text-foreground">
        {label}
      </label>
      {children}
      {hint && !error && <p className="text-xs text-muted-foreground">{hint}</p>}
      {error && (
        <p
          id={errorId}
          className="flex items-center gap-1.5 text-xs text-destructive"
        >
          <WarningCircle size={14} weight="bold" />
          {error}
        </p>
      )}
    </div>
  );
}

function SubmitButton({
  idle,
  pendingLabel,
}: {
  idle: string;
  pendingLabel: string;
}) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="group inline-flex h-12 items-center justify-center gap-2 rounded-full bg-brand px-7 text-[0.95rem] font-medium whitespace-nowrap text-white transition-colors hover:bg-[color-mix(in_oklch,var(--brand),white_10%)] focus-visible:ring-3 focus-visible:ring-ring focus-visible:outline-none active:translate-y-px disabled:opacity-70"
    >
      {pending ? (
        <>
          <CircleNotch size={18} weight="bold" className="animate-spin" />
          {pendingLabel}
        </>
      ) : (
        <>
          {idle}
          <ArrowUpRight
            size={18}
            weight="bold"
            className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </>
      )}
    </button>
  );
}

function StatusMessage({
  status,
  message,
}: {
  status: "idle" | "success" | "error";
  message?: string;
}) {
  if (!message || status === "idle") return null;

  const success = status === "success";
  const Glyph = success ? CheckCircle : WarningCircle;

  return (
    <p
      role="status"
      aria-live="polite"
      className={cn(
        "flex items-start gap-2 text-sm",
        success ? "text-foreground" : "text-destructive",
      )}
    >
      <Glyph
        size={16}
        weight="bold"
        className={cn("mt-0.5 shrink-0", success && "text-brand-bright")}
      />
      {message}
    </p>
  );
}
