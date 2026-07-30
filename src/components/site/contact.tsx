import { Reveal } from "@/components/motion/reveal";
import { ContactForm } from "@/components/site/contact-form";
import { SECTION_IDS, type Dictionary, type Locale } from "@/lib/i18n";
import { CONTACT_EMAIL, CONTACT_PHONE } from "@/lib/site";

export function Contact({ dict, lang }: { dict: Dictionary; lang: Locale }) {
  const details = [
    { label: dict.contact.emailLabel, value: CONTACT_EMAIL, wrap: true },
    { label: dict.contact.phoneLabel, value: CONTACT_PHONE, wrap: false },
  ];

  return (
    <section
      id={SECTION_IDS.contact}
      className="relative z-10 px-4 pt-24 pb-28 sm:px-6 lg:pt-32"
    >
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <div className="glass relative overflow-hidden rounded-3xl px-6 py-14 sm:px-12 sm:py-16">
            <div className="absolute -bottom-40 left-1/4 size-[32rem] rounded-full bg-[radial-gradient(closest-side,color-mix(in_oklch,var(--brand)_26%,transparent),transparent)] blur-3xl" />

            <div className="relative grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-5">
                <h2 className="max-w-[16ch] text-3xl leading-[1.1] font-semibold tracking-tight text-balance-tight sm:text-4xl">
                  {dict.contact.headline}
                </h2>
                <p className="mt-5 max-w-[46ch] text-base leading-relaxed text-muted-foreground">
                  {dict.contact.body}
                </p>

                <dl className="mt-10 space-y-4 text-sm">
                  {details.map((detail) => (
                    <div key={detail.label}>
                      <dt className="text-muted-foreground">{detail.label}</dt>
                      <dd
                        className={`mt-1 font-medium ${detail.wrap ? "break-all" : ""}`}
                      >
                        {detail.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>

              <div className="lg:col-span-7">
                <ContactForm dict={dict} lang={lang} />
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
