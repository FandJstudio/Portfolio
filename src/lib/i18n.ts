export const locales = ["pl", "en"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "pl";

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

/** Section anchors. Language neutral so both versions share the same fragments. */
export const SECTION_IDS = {
  top: "top",
  about: "about",
  services: "services",
  work: "work",
  contact: "contact",
} as const;

const pl = {
  meta: {
    /* Browser tab and search result heading. Kept short on purpose. */
    title: "F&J Studio",
    /* Longer, descriptive variant for link previews on social platforms. */
    shareTitle: "F&J Studio, projektowanie i rozwój stron internetowych",
    description:
      "F&J Studio projektuje, koduje i prowadzi szybkie, responsywne strony internetowe dla firm. Hosting, aktualizacje, bezpieczeństwo i wsparcie techniczne.",
  },
  nav: {
    links: [
      { href: `#${SECTION_IDS.about}`, label: "O nas" },
      { href: `#${SECTION_IDS.services}`, label: "Co robimy" },
      { href: `#${SECTION_IDS.work}`, label: "Projekty" },
    ],
    cta: "Napisz do nas",
    openMenu: "Otwórz menu",
    closeMenu: "Zamknij menu",
    languageLabel: "Język strony",
  },
  hero: {
    headline: "Projektujemy i prowadzimy strony firmowe.",
    subtext:
      "Dwuosobowe studio. Kodujemy szybkie, responsywne strony dla firm i zostajemy przy nich po starcie.",
    primaryCta: "Napisz do nas",
    secondaryCta: "Co robimy",
    caption: "Fabian i Jakub",
  },
  about: {
    headline: "Dwie osoby, jeden zespół.",
    body: "F&J Studio to Fabian i Jakub. Obaj projektujemy i kodujemy, więc między makietą a gotową stroną nie ma etapu przekazywania pracy komuś, kto nie zna projektu. Rozmawiasz z osobami, które faktycznie budują Twoją stronę.",
    role: "Web Designer & Developer",
    stackHeadline: "Czym pracujemy",
    stackBody:
      "Jeden zestaw narzędzi, którym operujemy na co dzień. Dobieramy z niego tyle, ile wymaga projekt.",
  },
  services: {
    headline: "Pełna obsługa, od pierwszego szkicu do bieżącej opieki.",
    body: "Robimy stronę i zostajemy przy niej. Nie musisz szukać osobno projektanta, programisty i firmy od hostingu.",
    items: {
      design: {
        title: "Projekt strony",
        body: "Układ, typografia i hierarchia budowane pod Twoją firmę, a nie odziedziczone po szablonie. Zaczynamy od tego, co ma robić strona, a nie od tego, jak ma wyglądać.",
      },
      code: {
        title: "Kod",
        body: "Next.js i TypeScript. Bez ciężkich wtyczek i przypadkowych dodatków.",
      },
      speed: {
        title: "Szybkość i responsywność",
        body: "Ten sam komfort na telefonie i na desktopie. Optymalizujemy obrazy, czcionki i wynik Core Web Vitals.",
      },
      hosting: {
        title: "Hosting i wdrożenie",
        body: "Domena, certyfikat i serwer po naszej stronie. Konfigurujemy środowisko, przenosimy stronę i pilnujemy, żeby po publikacji nic nie zostało do zrobienia przez Ciebie.",
      },
      updates: {
        title: "Aktualizacje i zmiany",
        body: "Nowe treści, podstrony i poprawki wprowadzamy na bieżąco, bez czekania na wolny termin.",
      },
      security: {
        title: "Bezpieczeństwo i wsparcie",
        body: "Kopie zapasowe, aktualizacje zależności i monitoring dostępności. Jeśli coś przestaje działać, reagujemy my, nie Ty.",
      },
    },
  },
  work: {
    headline: "Projekty",
    emptyHeadline: "Pierwsze realizacje pojawią się tutaj wkrótce.",
    emptyBody:
      "Studio dopiero startuje, więc zamiast wypełniać tę sekcję cudzymi szablonami, zostawiamy ją pustą. Chcesz zobaczyć, jak pracujemy? Pokażemy koncepcję przygotowaną pod Twoją firmę.",
    cta: "Napisz do nas",
  },
  contact: {
    headline: "Powiedz, czego potrzebujesz.",
    body: "Wypełnij formularz, a wiadomość trafi prosto na naszą skrzynkę. Odpiszemy z propozycją zakresu, terminu i ceny.",
    emailLabel: "E-mail",
    phoneLabel: "Telefon",
    form: {
      name: "Imię",
      email: "E-mail",
      message: "Wiadomość",
      namePlaceholder: "Anna Zielińska",
      emailPlaceholder: "anna@twojafirma.pl",
      messagePlaceholder:
        "Potrzebujemy strony dla gabinetu stomatologicznego, z cennikiem i formularzem zapisów.",
      hint: "Czym zajmuje się Twoja firma i czego oczekujesz od strony.",
      submit: "Wyślij wiadomość",
      sending: "Wysyłamy",
      honeypotLabel: "Nazwa firmy",
      errors: {
        name: "Podaj imię, minimum dwa znaki.",
        email: "Podaj poprawny adres e-mail.",
        message: "Opisz krótko sprawę, minimum dziesięć znaków.",
      },
      success: "Dziękujemy, wiadomość wysłana. Odpowiemy na podany adres.",
      unavailable:
        "Wysyłka jest chwilowo niedostępna. Napisz bezpośrednio na nasz adres e-mail.",
      failed:
        "Nie udało się wysłać wiadomości. Spróbuj ponownie za chwilę lub napisz do nas bezpośrednio.",
    },
  },
  footer: {
    tagline: "Projektowanie i rozwój stron internetowych.",
    backToTop: "Wróć na górę strony",
  },
};

/** Structural contract. A missing or misspelled key in `en` fails the build. */
export type Dictionary = typeof pl;

const en: Dictionary = {
  meta: {
    title: "F&J Studio",
    shareTitle: "F&J Studio, web design and development",
    description:
      "F&J Studio designs, builds and runs fast, responsive websites for companies. Hosting, updates, security and technical support included.",
  },
  nav: {
    links: [
      { href: `#${SECTION_IDS.about}`, label: "About" },
      { href: `#${SECTION_IDS.services}`, label: "What we do" },
      { href: `#${SECTION_IDS.work}`, label: "Work" },
    ],
    cta: "Get in touch",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    languageLabel: "Site language",
  },
  hero: {
    headline: "We design and run business websites.",
    subtext:
      "A two person studio. We build fast, responsive sites for companies and stay with them after launch.",
    primaryCta: "Get in touch",
    secondaryCta: "What we do",
    caption: "Fabian and Jakub",
  },
  about: {
    headline: "Two people, one team.",
    body: "F&J Studio is Fabian and Jakub. We both design and code, so nothing gets handed over to someone who does not know the project. You talk to the people who actually build your site.",
    role: "Web Designer & Developer",
    stackHeadline: "What we work with",
    stackBody:
      "One toolset we use every day. We take from it only as much as the project needs.",
  },
  services: {
    headline: "Full service, from the first sketch to ongoing care.",
    body: "We build the site and stay with it. No need to hire a designer, a developer and a hosting company separately.",
    items: {
      design: {
        title: "Design",
        body: "Layout, typography and hierarchy built around your company, not inherited from a template. We start with what the site has to do, not with how it should look.",
      },
      code: {
        title: "Code",
        body: "Next.js and TypeScript. No heavy plugins, no accidental extras.",
      },
      speed: {
        title: "Speed and responsiveness",
        body: "The same comfort on a phone and on a desktop. We optimise images, fonts and Core Web Vitals.",
      },
      hosting: {
        title: "Hosting and deployment",
        body: "Domain, certificate and server on our side. We set up the environment, move the site over and make sure nothing is left for you to do after launch.",
      },
      updates: {
        title: "Updates and changes",
        body: "New content, extra pages and fixes go live as they come up, with no waiting for a free slot.",
      },
      security: {
        title: "Security and support",
        body: "Backups, dependency updates and uptime monitoring. If something stops working, we react, not you.",
      },
    },
  },
  work: {
    headline: "Work",
    emptyHeadline: "The first projects will show up here soon.",
    emptyBody:
      "The studio is just starting, so instead of filling this section with someone else's templates we leave it empty. Want to see how we work? We will put together a concept for your company.",
    cta: "Get in touch",
  },
  contact: {
    headline: "Tell us what you need.",
    body: "Fill in the form and your message lands straight in our inbox. We will reply with a proposed scope, timeline and price.",
    emailLabel: "Email",
    phoneLabel: "Phone",
    form: {
      name: "Name",
      email: "Email",
      message: "Message",
      namePlaceholder: "Sarah Whitfield",
      emailPlaceholder: "sarah@yourcompany.com",
      messagePlaceholder:
        "We need a site for a dental practice, with a price list and an appointment form.",
      hint: "What your company does and what you expect from the site.",
      submit: "Send message",
      sending: "Sending",
      honeypotLabel: "Company name",
      errors: {
        name: "Enter your name, at least two characters.",
        email: "Enter a valid email address.",
        message: "Describe your case briefly, at least ten characters.",
      },
      success: "Thank you, your message is on its way. We will reply by email.",
      unavailable:
        "Sending is temporarily unavailable. Please write to our email address directly.",
      failed:
        "We could not send your message. Try again in a moment or write to us directly.",
    },
  },
  footer: {
    tagline: "Web design and development.",
    backToTop: "Back to top",
  },
};

const dictionaries: Record<Locale, Dictionary> = { pl, en };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}
