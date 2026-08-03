import { MaskReveal, Reveal } from "@/components/motion/reveal";
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
      className="relative z-10 border-t border-line py-section"
    >
      <div className="mx-auto max-w-[100rem] px-5 sm:px-8">
        <Reveal>
          <p className="label text-brand-bright">{dict.nav.cta}</p>
        </Reveal>

        <div className="mt-6 grid grid-cols-1 gap-rhythm lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <h2 className="max-w-[13ch] text-display">
              <MaskReveal text={dict.contact.headline} />
            </h2>
            <Reveal delay={0.1}>
              <p className="mt-8 max-w-[44ch] text-lead text-muted-foreground">
                {dict.contact.body}
              </p>
            </Reveal>

            <Reveal delay={0.16}>
              <dl className="mt-12">
                {details.map((detail) => (
                  <div
                    key={detail.label}
                    className="flex items-baseline justify-between gap-6 border-t border-line py-4 last:border-b"
                  >
                    <dt className="label shrink-0 text-muted-foreground">
                      {detail.label}
                    </dt>
                    <dd
                      className={`text-note font-medium tabular ${detail.wrap ? "break-all" : ""}`}
                    >
                      {detail.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <ContactForm dict={dict} lang={lang} />
          </div>
        </div>
      </div>
    </section>
  );
}
