export const locales = ["pl", "en"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "pl";

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

/** Section anchors. Language neutral so both versions share the same fragments. */
export const SECTION_IDS = {
  top: "top",
  fit: "fit",
  services: "services",
  process: "process",
  work: "work",
  faq: "faq",
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
      { href: `#${SECTION_IDS.services}`, label: "Co robimy" },
      { href: `#${SECTION_IDS.work}`, label: "Projekty" },
      { href: `#${SECTION_IDS.faq}`, label: "FAQ" },
    ],
    cta: "Napisz do nas",
    openMenu: "Otwórz menu",
    closeMenu: "Zamknij menu",
    languageLabel: "Język strony",
  },
  hero: {
    headline: "Projektujemy i prowadzimy strony firmowe.",
    subtext: "Projektujemy, wdrażamy i rozwijamy strony internetowe.",
    primaryCta: "Napisz do nas",
    secondaryCta: "Co robimy",
  },
  fit: {
    headline: "Czy to oferta dla Ciebie?",
    yesLabel: "Tak, jeśli szukasz",
    noLabel: "Nie, jeśli szukasz",
    yes: [
      "profesjonalnej strony firmowej lub wizytówki",
      "nowoczesnego i indywidualnego projektu",
      "strony z 1-10 podstronami",
      "formularza kontaktowego, mapy i integracji z mediami społecznościowymi",
      "szybkiej i responsywnej strony działającej na każdym urządzeniu",
      "pomocy z domeną, hostingiem i certyfikatem SSL",
      "strony zoptymalizowanej pod podstawowe SEO",
      "możliwości dalszego rozwoju strony w przyszłości",
      "stałej opieki technicznej i wsparcia po wdrożeniu",
    ],
    no: [
      "sklepu internetowego z koszykiem i płatnościami online",
      "kont użytkowników lub panelu klienta",
      "zaawansowanego systemu rezerwacji lub kalendarza",
      "rozbudowanego portalu internetowego lub aplikacji webowej",
      "integracji z systemami magazynowymi, księgowymi lub ERP",
      "niestandardowych systemów wymagających dedykowanego backendu",
    ],
    note: "Obecnie specjalizujemy się w tworzeniu nowoczesnych stron firmowych. Rozbudowane systemy i sklepy internetowe nie są jeszcze częścią naszej oferty.",
  },
  services: {
    headline: "Pełna obsługa, od pierwszego szkicu do bieżącej opieki.",
    body: "Zajmujemy się całym procesem tworzenia strony, od projektu graficznego, przez programowanie, aż po hosting, aktualizacje i wsparcie techniczne. Dzięki temu nie musisz współpracować z kilkoma różnymi firmami.",
    items: {
      design: {
        title: "Projekt strony",
        body: "Projektujemy nowoczesne strony dopasowane do charakteru Twojej firmy i potrzeb klientów. Każdy projekt powstaje od podstaw z myślą o czytelności, użyteczności i skutecznej prezentacji oferty.",
      },
      code: {
        title: "Kod",
        body: "Tworzymy strony w nowoczesnych technologiach, dzięki czemu są szybkie, stabilne i łatwe w dalszym rozwijaniu. Korzystamy z takich technologii jak Next.js, React i TypeScript.",
      },
      speed: {
        title: "Szybkość i responsywność",
        body: "Strona działa płynnie na telefonach, tabletach i komputerach. Dbamy o szybkie ładowanie, optymalizację obrazów oraz wysokie wyniki Core Web Vitals, co wpływa na komfort użytkowników i SEO.",
      },
      hosting: {
        title: "Hosting i wdrożenie",
        body: "Pomagamy w wyborze hostingu i domeny lub korzystamy z obecnej infrastruktury klienta. Konfigurujemy certyfikat SSL, publikujemy stronę i dbamy o poprawne uruchomienie.",
      },
      updates: {
        title: "Aktualizacje",
        body: "Po uruchomieniu strony nadal możesz na nas liczyć. Dodajemy nowe treści, rozbudowujemy stronę i wprowadzamy zmiany wtedy, gdy są potrzebne.",
      },
      security: {
        title: "Bezpieczeństwo",
        body: "Regularnie wykonujemy kopie zapasowe, monitorujemy działanie strony i aktualizujemy wykorzystywane technologie. W razie problemów zajmujemy się ich rozwiązaniem, aby Twoja strona działała bez przerw.",
      },
      seo: {
        title: "SEO",
        body: "Optymalizujemy stronę pod wyszukiwarki już na etapie tworzenia. Dbamy o strukturę kodu, metadane, szybkość działania oraz podstawy technicznego SEO.",
      },
      integrations: {
        title: "Formularze i integracje",
        body: "Integrujemy formularze kontaktowe, mapy, analitykę, media społecznościowe, newslettery oraz inne narzędzia potrzebne do prowadzenia biznesu.",
      },
    },
  },
  process: {
    headline: "Jak pracujemy",
    steps: [
      {
        title: "Kontakt",
        body: "Wypełnij formularz kontaktowy lub napisz do nas. Opisz swoją firmę i oczekiwania dotyczące strony.",
      },
      {
        title: "Wycena",
        body: "Analizujemy Twój projekt i przygotowujemy indywidualną wycenę oraz przewidywany termin realizacji.",
      },
      {
        title: "Pierwsza wersja strony",
        body: "W ciągu 1-3 dni roboczych przygotowujemy pierwszą wersję strony. Możesz zgłosić swoje uwagi, a my wprowadzimy potrzebne poprawki.",
      },
      {
        title: "Wdrożenie",
        body: "Po akceptacji finalnej wersji publikujemy stronę, konfigurujemy domenę, hosting oraz certyfikat SSL, aby była gotowa do działania.",
      },
      {
        title: "Opieka",
        body: "Jeśli zdecydujesz się na naszą opiekę techniczną, zajmiemy się aktualizacjami, monitoringiem, kopiami zapasowymi oraz bieżącymi zmianami na stronie.",
      },
    ],
  },
  work: {
    headline: "Projekty",
    emptyHeadline: "Pierwsze realizacje pojawią się tutaj wkrótce.",
    emptyBody:
      "Studio dopiero startuje, więc zamiast wypełniać tę sekcję cudzymi szablonami, zostawiamy ją pustą. Chcesz zobaczyć, jak pracujemy? Pokażemy koncepcję przygotowaną pod Twoją firmę.",
    cta: "Napisz do nas",
  },
  faq: {
    headline: "Najczęstsze pytania",
    supportText: "Nie znalazłeś tu swojego pytania?",
    /* Double asterisks mark emphasis; the FAQ renderer turns them into <strong>. */
    items: [
      {
        q: "Ile kosztuje strona?",
        a: "Każdy projekt wyceniamy indywidualnie. Ostateczna cena zależy od liczby podstron, wymaganych funkcjonalności oraz zakresu prac. Po zapoznaniu się z Twoimi wymaganiami przygotujemy bezpłatną i niezobowiązującą wycenę.",
      },
      {
        q: "Ile trwa realizacja?",
        a: "Pierwszą wersję projektu otrzymasz zazwyczaj w ciągu **1-3 dni roboczych**. W zależności od stopnia rozbudowania strony pełna realizacja zajmuje najczęściej od **1 do 2 tygodni**.",
      },
      {
        q: "Jak wygląda współpraca?",
        a: "Cała współpraca odbywa się zdalnie za pośrednictwem poczty e-mail. Na każdym etapie informujemy o postępach, konsultujemy ważne decyzje i przesyłamy kolejne wersje projektu do akceptacji. Dzięki temu cały proces jest przejrzysty i wygodny.",
      },
      {
        q: "Czy opieka nad stroną jest obowiązkowa?",
        a: "Nie. Po zakończeniu realizacji możesz samodzielnie zarządzać swoją stroną lub skorzystać z naszej opieki technicznej w formie miesięcznego abonamentu. To Ty decydujesz, która opcja będzie dla Ciebie najlepsza.",
      },
      {
        q: "Czy pomagacie z domeną i hostingiem?",
        a: "Tak. Pomagamy w wyborze odpowiedniej domeny i hostingu oraz zajmujemy się ich konfiguracją. Wdrażamy również certyfikat SSL i przygotowujemy stronę do bezpiecznego działania po publikacji.",
      },
      {
        q: "Czy mogę samodzielnie edytować stronę?",
        a: "Tak, jeśli projekt obejmuje wdrożenie systemu CMS. Dzięki niemu możesz samodzielnie zmieniać treści, zdjęcia oraz inne elementy strony bez konieczności znajomości programowania.",
      },
      {
        q: "Czy strona będzie responsywna?",
        a: "Tak. Wszystkie tworzone przez nas strony są w pełni responsywne i poprawnie wyświetlają się na komputerach, tabletach oraz smartfonach, zapewniając wygodne korzystanie niezależnie od urządzenia.",
      },
      {
        q: "Czy strona jest zoptymalizowana pod SEO?",
        a: "Tak. Każda strona jest przygotowana zgodnie z podstawowymi zasadami technicznego SEO. Dbamy o odpowiednią strukturę kodu, szybkość działania, metadane oraz inne elementy wpływające na widoczność strony w wyszukiwarkach.",
      },
      {
        q: "Czy mogę rozbudować stronę w przyszłości?",
        a: "Oczywiście. Strona może być rozwijana o nowe podstrony, funkcjonalności i integracje wraz z rozwojem Twojej firmy. Dodatkowe prace realizujemy na podstawie indywidualnej wyceny.",
      },
    ],
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
      { href: `#${SECTION_IDS.services}`, label: "What we do" },
      { href: `#${SECTION_IDS.work}`, label: "Work" },
      { href: `#${SECTION_IDS.faq}`, label: "FAQ" },
    ],
    cta: "Get in touch",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    languageLabel: "Site language",
  },
  hero: {
    headline: "We design and run business websites.",
    subtext: "We design, build and grow websites.",
    primaryCta: "Get in touch",
    secondaryCta: "What we do",
  },
  fit: {
    headline: "Is this offer for you?",
    yesLabel: "Yes, if you need",
    noLabel: "No, if you need",
    yes: [
      "a professional company website or a single page presence",
      "a modern design made specifically for you",
      "a site with 1 to 10 pages",
      "a contact form, a map and social media integrations",
      "a fast, responsive site that works on every device",
      "help with the domain, hosting and SSL certificate",
      "a site optimised for the SEO fundamentals",
      "the option to grow the site later",
      "ongoing technical care and support after launch",
    ],
    no: [
      "an online shop with a cart and online payments",
      "user accounts or a client panel",
      "an advanced booking or calendar system",
      "a large web portal or a web application",
      "integrations with warehouse, accounting or ERP systems",
      "custom systems that need a dedicated backend",
    ],
    note: "We currently specialise in modern company websites. Larger systems and online shops are not part of our offer yet.",
  },
  services: {
    headline: "Full service, from the first sketch to ongoing care.",
    body: "We handle the entire process of building a site, from the visual design, through the code, to hosting, updates and technical support. You never have to coordinate several different companies.",
    items: {
      design: {
        title: "Design",
        body: "We design modern sites shaped around your company and the people it sells to. Every project starts from scratch, built for clarity, usability and a convincing presentation of what you offer.",
      },
      code: {
        title: "Code",
        body: "We build in modern technologies, so the site stays fast, stable and easy to extend later. We work with Next.js, React and TypeScript.",
      },
      speed: {
        title: "Speed and responsiveness",
        body: "The site runs smoothly on phones, tablets and desktops. We take care of load times, image optimisation and strong Core Web Vitals, which affects both comfort and search ranking.",
      },
      hosting: {
        title: "Hosting and deployment",
        body: "We help you choose hosting and a domain, or work with the infrastructure you already have. We configure the SSL certificate, publish the site and make sure the launch goes cleanly.",
      },
      updates: {
        title: "Updates",
        body: "You can still count on us after launch. We add content, extend the site and make changes whenever they are needed.",
      },
      security: {
        title: "Security",
        body: "We run regular backups, monitor the site and keep its technologies current. If something breaks, we deal with it, so your site stays up.",
      },
      seo: {
        title: "SEO",
        body: "We optimise for search engines while the site is still being built: code structure, metadata, load speed and the technical SEO foundations.",
      },
      integrations: {
        title: "Forms and integrations",
        body: "We connect contact forms, maps, analytics, social media, newsletters and any other tool the business runs on.",
      },
    },
  },
  process: {
    headline: "How we work",
    steps: [
      {
        title: "Contact",
        body: "Fill in the contact form or write to us. Tell us about your company and what you expect from the site.",
      },
      {
        title: "Quote",
        body: "We analyse your project and prepare an individual quote along with an expected delivery date.",
      },
      {
        title: "First version",
        body: "Within 1-3 working days we prepare the first version of the site. You send your comments and we make the changes you need.",
      },
      {
        title: "Launch",
        body: "Once you approve the final version we publish the site and configure the domain, hosting and SSL certificate so it is ready to run.",
      },
      {
        title: "Care",
        body: "If you choose our technical care, we handle updates, monitoring, backups and ongoing changes to the site.",
      },
    ],
  },
  work: {
    headline: "Work",
    emptyHeadline: "The first projects will show up here soon.",
    emptyBody:
      "The studio is just starting, so instead of filling this section with someone else's templates we leave it empty. Want to see how we work? We will put together a concept for your company.",
    cta: "Get in touch",
  },
  faq: {
    headline: "Frequently asked questions",
    supportText: "Cannot find your question here?",
    items: [
      {
        q: "How much does a website cost?",
        a: "Every project is quoted individually. The final price depends on the number of pages, the functionality required and the scope of work. Once we know your requirements we prepare a free quote with no obligation.",
      },
      {
        q: "How long does it take?",
        a: "You will usually have the first version of the design within **1-3 working days**. Depending on how large the site is, the full build most often takes **1 to 2 weeks**.",
      },
      {
        q: "How does working together look?",
        a: "Everything runs remotely over email. We report progress at every stage, consult you on the decisions that matter and send each new version for approval, which keeps the process transparent and convenient.",
      },
      {
        q: "Is ongoing care mandatory?",
        a: "No. Once the build is finished you can manage the site yourself, or take our technical care as a monthly subscription. You decide which suits you better.",
      },
      {
        q: "Do you help with a domain and hosting?",
        a: "Yes. We help choose the right domain and hosting and handle their configuration. We also install the SSL certificate and prepare the site to run safely after launch.",
      },
      {
        q: "Can I edit the site myself?",
        a: "Yes, if the project includes a CMS. With it you can change text, photos and other elements yourself, without knowing how to code.",
      },
      {
        q: "Will the site be responsive?",
        a: "Yes. Every site we build is fully responsive and displays correctly on desktops, tablets and phones, so it stays comfortable to use on any device.",
      },
      {
        q: "Is the site optimised for SEO?",
        a: "Yes. Every site is prepared according to the fundamentals of technical SEO. We take care of code structure, load speed, metadata and the other elements that affect visibility in search.",
      },
      {
        q: "Can I extend the site later?",
        a: "Of course. The site can grow with new pages, features and integrations as your company develops. Additional work is quoted individually.",
      },
    ],
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
