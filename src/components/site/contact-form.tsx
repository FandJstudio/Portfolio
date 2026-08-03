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

/*
  Underlined fields, not boxes. Boxed inputs would reintroduce the rounded
  container language the rest of the page has dropped; a rule under the text
  matches the ruled rows used everywhere else and keeps the form quiet until
  it is focused, at which point the rule turns red.
*/
const fieldClass =
  "h-12 rounded-none border-0 border-b border-line bg-transparent px-0 text-body text-foreground transition-colors duration-300 placeholder:text-muted-foreground/80 hover:border-line-strong focus-visible:border-brand focus-visible:ring-0 focus-visible:outline-none aria-invalid:border-destructive md:text-note dark:bg-transparent";

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
            "h-auto min-h-32 resize-none pt-2 pb-3.5 leading-relaxed",
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

      <div className="mt-1 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
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
      <label htmlFor={id} className="label text-muted-foreground">
        {label}
      </label>
      {children}
      {hint && !error && (
        <p className="text-micro text-muted-foreground">{hint}</p>
      )}
      {error && (
        <p
          id={errorId}
          className="flex items-center gap-1.5 text-micro text-destructive"
        >
          <WarningCircle size={14} weight="bold" className="shrink-0" />
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
      className="group inline-flex h-14 items-stretch bg-brand text-white transition-colors duration-300 hover:bg-[color-mix(in_oklch,var(--brand),white_14%)] disabled:opacity-70"
    >
      <span className="flex items-center px-7 text-note font-medium whitespace-nowrap">
        {pending ? pendingLabel : idle}
      </span>
      <span className="grid w-12 shrink-0 place-items-center border-l border-white/25">
        {pending ? (
          <CircleNotch size={16} weight="bold" className="animate-spin" />
        ) : (
          <ArrowUpRight
            size={16}
            weight="bold"
            className="transition-transform duration-300 ease-swift group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        )}
      </span>
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
        "flex items-start gap-2 text-micro",
        success ? "text-foreground" : "text-destructive",
      )}
    >
      <Glyph
        size={15}
        weight="bold"
        className={cn("mt-0.5 shrink-0", success && "text-brand-bright")}
      />
      {message}
    </p>
  );
}
