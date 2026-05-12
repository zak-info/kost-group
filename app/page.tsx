import Image from "next/image";

const employees: Record<string, { name: string; role: string }> = {
  anis: { name: "Anis", role: "Conseiller Kost Groupe" },
};

function resolveEmployee(raw?: string | string[]) {
  if (!raw) return null;
  const value = Array.isArray(raw) ? raw[0] : raw;
  const slug = value.toLowerCase().replace(/[^a-z0-9_-]/g, "");
  if (!slug) return null;
  const known = employees[slug];
  return {
    slug,
    name: known?.name ?? slug.charAt(0).toUpperCase() + slug.slice(1),
    role: known?.role ?? "Conseiller Kost Groupe",
    src: `/employees/${slug}.png`,
  };
}

const pillars = [
  {
    n: "01",
    title: "Promoteurs vérifiés",
    body: "Identité, registre et antécédents contrôlés avant toute mise en vente.",
  },
  {
    n: "02",
    title: "Permis contrôlés",
    body: "Permis de construire, conformité et autorisations vérifiés un par un.",
  },
  {
    n: "03",
    title: "Garanties affichées",
    body: "Délais, livraison et garanties post-livraison rendus visibles et signés.",
  },
  {
    n: "04",
    title: "Prix comparés au quartier",
    body: "Chaque prix est confronté aux références réelles de son quartier.",
  },
];

const channels = [
  {
    label: "Téléphone",
    value: "0770 70 93 00",
    href: "tel:+213770709300",
    note: "Lun – Sam · 9h – 18h",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
        <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A15 15 0 0 1 3 6a2 2 0 0 1 2-2z" />
      </svg>
    ),
  },
  {
    label: "WhatsApp",
    value: "0770 70 93 00",
    href: "https://wa.me/213770709300",
    note: "Réponse sous 1 heure",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
        <path d="M3 21l1.6-5A8.5 8.5 0 1 1 8 19.4L3 21z" />
        <path d="M8.5 9c.4 2 1.7 3.5 3.6 4.4l1.2-1.3 2.3 1.1c-.1 1.2-1 2.1-2.2 2.3-2.5.3-5.4-2.2-5.7-4.7-.1-.9.4-1.7 1.3-2l.5 0L8.5 9z" />
      </svg>
    ),
  },
  {
    label: "Adresse",
    value: "Alger, Algérie",
    href: "https://maps.app.goo.gl/4JC1gCcis1x1QAGBA?g_st=ac",
    note: "Voir sur Google Maps",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
        <path d="M12 22s7-7.5 7-13a7 7 0 1 0-14 0c0 5.5 7 13 7 13z" />
        <circle cx="12" cy="9" r="2.4" />
      </svg>
    ),
  },
  {
    label: "Site web",
    value: "kosty.net",
    href: "https://kosty.net/",
    note: "Catalogue & dossiers",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" />
      </svg>
    ),
  },
];

type HomeProps = {
  searchParams: Promise<{ user?: string | string[] }>;
};

export default async function Home({ searchParams }: HomeProps) {
  const { user } = await searchParams;
  const employee = resolveEmployee(user);
  const profileSrc = employee?.src ?? "/logo.jpg";
  const profileAlt = employee ? `${employee.name} · ${employee.role}` : "Kost Groupe";

  return (
    <div className="paper-grain relative flex flex-1 flex-col">
      {/* Top tape — editorial header */}
      <header className="relative z-30 border-b border-[--kost-line]">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 text-[11px] uppercase tracking-[0.22em] text-[--kost-ink-soft]">
          <span className="anim-fade" style={{ animationDelay: "0.05s" }}>
            Édition Alger · 2026
          </span>
          <span
            className="hidden sm:inline anim-fade"
            style={{ animationDelay: "0.15s" }}
          >
            Volume 01 — Profil officiel
          </span>
          <span className="anim-fade" style={{ animationDelay: "0.25s" }}>
            FR · AR
          </span>
        </div>
      </header>

      {/* Marquee tagline */}
      <div className="relative z-20 overflow-hidden border-b border-[--kost-line] bg-[--kost-ink] text-[--kost-paper]">
        <div className="marquee-track flex gap-12 py-2.5 text-[12px] uppercase tracking-[0.32em] whitespace-nowrap">
          {Array.from({ length: 2 }).map((_, group) => (
            <div key={group} className="flex shrink-0 items-center gap-12">
              {[
                "L'immobilier neuf en Algérie",
                "✦",
                "Sans risque",
                "✦",
                "La transparence comme standard",
                "✦",
                "Promoteurs vérifiés",
                "✦",
                "Permis contrôlés",
                "✦",
                "Garanties affichées",
                "✦",
              ].map((t, i) => (
                <span key={`${group}-${i}`} className="shrink-0">
                  {t}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <main className="relative z-10 flex-1">
        {/* COVER — logo as cover picture */}
        <section className="relative">
          <div className="relative h-[280px] w-full overflow-hidden bg-[#0a1733] sm:h-[360px] md:h-[440px]">
            {/* Blurred logo as ambient backdrop — keeps edges seamless on wide screens */}
            <Image
              src="/logo.jpg"
              alt=""
              fill
              sizes="100vw"
              priority
              aria-hidden
              className="anim-fade scale-125 object-cover opacity-90 blur-2xl"
              style={{ animationDelay: "0.1s" }}
            />

            {/* Sharp logo, centered */}
            <div className="absolute inset-0 flex items-center justify-center px-6">
              <div
                className="relative anim-scale aspect-square h-[78%] max-h-[340px]"
                style={{ animationDelay: "0.3s" }}
              >
                <Image
                  src="/logo.jpg"
                  alt="Kost Groupe"
                  fill
                  sizes="(min-width: 768px) 340px, 220px"
                  priority
                  className="object-contain drop-shadow-[0_30px_60px_rgba(0,0,0,0.5)]"
                />
              </div>
            </div>

            {/* Vignette to soften top/bottom edges */}
            <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#0a1733]/60 to-transparent" />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#0a1733]/70 to-transparent" />

            {/* Editorial corner labels */}
            <div
              className="absolute left-6 top-6 text-[10px] uppercase tracking-[0.28em] text-white/55 anim-fade md:left-8 md:top-8"
              style={{ animationDelay: "0.45s" }}
            >
              <div className="mb-2 h-px w-8 bg-white/40" />
              Profil officiel
              <br />
              Édition 2026
            </div>
            <div
              className="absolute bottom-6 right-6 text-right text-[10px] uppercase tracking-[0.28em] text-white/55 anim-fade md:bottom-8 md:right-8"
              style={{ animationDelay: "0.55s" }}
            >
              <div className="mb-2 ml-auto h-px w-8 bg-white/40" />
              La transparence
              <br />
              comme standard
            </div>
          </div>
        </section>

        {/* PROFILE PICTURE — overlapping cover, centered */}
        <section className="relative">
          <div className="mx-auto -mt-[88px] flex max-w-7xl flex-col items-center px-6 sm:-mt-[108px] md:-mt-[128px]">
            <div
              className="relative anim-scale"
              style={{ animationDelay: "0.5s" }}
            >
              {/* Rotating ring — architectural annotation */}
              <svg
                className="spin-slow pointer-events-none absolute inset-0 -m-6 h-[calc(100%+48px)] w-[calc(100%+48px)] text-[--kost-ink-soft]"
                viewBox="0 0 300 300"
                aria-hidden
              >
                <defs>
                  <path
                    id="ringText"
                    d="M150,150 m-130,0 a130,130 0 1,1 260,0 a130,130 0 1,1 -260,0"
                  />
                </defs>
                <text
                  fill="currentColor"
                  fontFamily="var(--font-body), sans-serif"
                  fontSize="9"
                  letterSpacing="6"
                  style={{ textTransform: "uppercase" }}
                >
                  <textPath href="#ringText">
                    Kost Groupe · Profil officiel · Transparence comme standard · Alger ·&nbsp;
                  </textPath>
                </text>
              </svg>

              {/* The profile itself */}
              <div className="relative h-[176px] w-[176px] rounded-full bg-[--kost-paper] p-2 shadow-[0_30px_60px_-25px_rgba(10,23,51,0.45)] sm:h-[208px] sm:w-[208px] md:h-[240px] md:w-[240px]">
                <div className="relative h-full w-full overflow-hidden rounded-full ring-1 ring-[--kost-line]">
                  <Image
                    src={profileSrc}
                    alt={profileAlt}
                    fill
                    sizes="(min-width: 768px) 240px, 208px"
                    className="object-cover"
                    priority
                  />
                </div>
              </div>

              {/* Verified badge */}
              <div
                className="verified-pulse absolute -bottom-1 right-1 flex h-11 w-11 items-center justify-center rounded-full bg-[--kost-blue] text-white ring-4 ring-[--kost-paper] sm:right-2 sm:h-12 sm:w-12 md:right-3 md:h-14 md:w-14"
                aria-label="Profil vérifié"
                title="Profil vérifié"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5 md:h-6 md:w-6" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12l4 4L19 7" />
                </svg>
              </div>
            </div>

            {/* Name + tagline */}
            <div className="mt-10 flex flex-col items-center text-center">
              {employee ? (
                <div
                  className="mb-4 flex flex-col items-center gap-2 anim-fade"
                  style={{ animationDelay: "0.7s" }}
                >
                  <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.32em] text-[--kost-ink-soft]">
                    <span className="inline-block h-1.5 w-1.5 rounded-full bg-[--kost-blue]" />
                    Votre interlocuteur
                    <span className="inline-block h-1.5 w-1.5 rounded-full bg-[--kost-blue]" />
                  </div>
                  <div
                    className="font-display text-[26px] leading-none text-[--kost-ink] sm:text-[30px]"
                    style={{
                      fontStyle: "italic",
                      fontVariationSettings: "'opsz' 144, 'SOFT' 90, 'WONK' 1",
                    }}
                  >
                    Avec {employee.name}
                  </div>
                  <div className="text-[10px] uppercase tracking-[0.28em] text-[--kost-ink-soft]">
                    {employee.role}
                  </div>
                </div>
              ) : (
                <div
                  className="mb-4 flex items-center gap-2 text-[10px] uppercase tracking-[0.32em] text-[--kost-ink-soft] anim-fade"
                  style={{ animationDelay: "0.7s" }}
                >
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-[--kost-blue]" />
                  Profil officiel · Vérifié
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-[--kost-blue]" />
                </div>
              )}

              <h1
                className="font-display text-[clamp(44px,8.5vw,108px)] leading-[0.92] tracking-tight text-[--kost-ink] anim-rise"
                style={{
                  fontVariationSettings: "'opsz' 144, 'SOFT' 30",
                  animationDelay: "0.8s",
                }}
              >
                Kost{" "}
                <span
                  className="text-[--kost-blue]"
                  style={{
                    fontStyle: "italic",
                    fontVariationSettings: "'opsz' 144, 'SOFT' 90, 'WONK' 1",
                  }}
                >
                  Groupe
                </span>
              </h1>

              <p
                className="mt-6 max-w-[640px] text-balance text-[17px] leading-[1.55] text-[--kost-ink-soft] anim-rise sm:text-[19px]"
                style={{ animationDelay: "0.95s" }}
              >
                L'immobilier neuf en Algérie, sans risque. Promoteurs vérifiés,
                permis contrôlés, garanties affichées et prix confrontés à leur
                quartier.{" "}
                <span className="text-[--kost-ink]">
                  La transparence est notre standard.
                </span>
              </p>

              {/* Trust line */}
              <div
                className="mt-7 flex items-center gap-3 text-[11px] uppercase tracking-[0.28em] text-[--kost-ink-soft] anim-fade"
                style={{ animationDelay: "1.05s" }}
              >
                <span className="inline-block h-px w-8 bg-[--kost-ink]/30" />
                <span>
                  Plus de{" "}
                  <span className="text-[--kost-ink]">500 promoteurs</span> nous
                  font confiance
                </span>
                <span className="inline-block h-px w-8 bg-[--kost-ink]/30" />
              </div>

              {/* CTAs */}
              <div
                className="mt-8 flex flex-wrap items-center justify-center gap-3 anim-rise"
                style={{ animationDelay: "1.1s" }}
              >
                <a
                  href="https://wa.me/213770709300"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 rounded-full bg-[--kost-ink] px-6 py-3 text-[13px] uppercase tracking-[0.2em] text-[--kost-paper] transition hover:bg-[--kost-blue]"
                >
                  Nous contacter
                  <svg viewBox="0 0 24 24" className="h-4 w-4 transition group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="1.6">
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </a>
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 rounded-full border border-[--kost-ink]/30 px-6 py-3 text-[13px] uppercase tracking-[0.2em] text-[--kost-ink] transition hover:border-[--kost-ink] hover:bg-white/40"
                >
                  Voir le dossier
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* META BAR — Facebook-style stats but editorial */}
        <section className="relative mt-20">
          <div className="mx-auto max-w-5xl px-6">
            <div className="grid grid-cols-2 gap-6 border-y border-[--kost-line] py-7 text-center md:grid-cols-4">
              {[
                { k: "+ 500", v: "Promoteurs partenaires" },
                { k: "100 %", v: "Permis contrôlés" },
                { k: "48", v: "Wilayas couvertes" },
                { k: "0", v: "Compromis sur la transparence" },
              ].map((stat, i) => (
                <div
                  key={stat.v}
                  className="anim-rise"
                  style={{ animationDelay: `${1.2 + i * 0.08}s` }}
                >
                  <div
                    className="font-display text-3xl text-[--kost-ink] md:text-4xl"
                    style={{ fontVariationSettings: "'opsz' 144, 'SOFT' 30" }}
                  >
                    {stat.k}
                  </div>
                  <div className="mt-1 text-[11px] uppercase tracking-[0.2em] text-[--kost-ink-soft]">
                    {stat.v}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PILLARS */}
        <section className="relative mt-24">
          <div className="mx-auto max-w-7xl px-6">
            <div className="mb-10 flex items-end justify-between">
              <div>
                <div className="text-[11px] uppercase tracking-[0.28em] text-[--kost-ink-soft]">
                  § 01 — Notre standard
                </div>
                <h2
                  className="mt-3 font-display text-[clamp(28px,4vw,44px)] leading-[1.05] tracking-tight"
                  style={{ fontVariationSettings: "'opsz' 144, 'SOFT' 40" }}
                >
                  Quatre contrôles.{" "}
                  <span
                    className="text-[--kost-ink-soft]"
                    style={{
                      fontStyle: "italic",
                      fontVariationSettings: "'opsz' 144, 'SOFT' 80, 'WONK' 1",
                    }}
                  >
                    Aucun raccourci.
                  </span>
                </h2>
              </div>
              <div className="hidden text-right text-[11px] uppercase tracking-[0.22em] text-[--kost-ink-soft] md:block">
                4 / 4
                <br />
                obligatoires
              </div>
            </div>

            <div className="grid grid-cols-1 gap-0 border-t border-[--kost-line] sm:grid-cols-2 lg:grid-cols-4">
              {pillars.map((p) => (
                <article
                  key={p.n}
                  className="pillar group relative border-b border-[--kost-line] px-6 py-8 transition-colors sm:[&:nth-child(2n)]:border-l lg:[&:nth-child(n)]:border-l lg:[&:nth-child(4n+1)]:border-l-0"
                >
                  <div
                    className="pillar-num font-display text-[64px] leading-[0.9] text-[--kost-stone]"
                    style={{ fontVariationSettings: "'opsz' 144, 'SOFT' 30" }}
                  >
                    {p.n}
                  </div>
                  <h3 className="mt-6 text-[18px] font-medium text-[--kost-ink]">
                    {p.title}
                  </h3>
                  <p className="mt-3 text-[14px] leading-[1.6] text-[--kost-ink-soft]">
                    {p.body}
                  </p>
                  <div className="mt-6 inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.28em] text-[--kost-blue]">
                    <span className="inline-block h-px w-6 bg-[--kost-blue]" />
                    Vérifié
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="relative mt-28">
          <div className="mx-auto max-w-7xl px-6">
            <div className="mb-10 flex items-end justify-between">
              <div>
                <div className="text-[11px] uppercase tracking-[0.28em] text-[--kost-ink-soft]">
                  § 02 — Nous joindre
                </div>
                <h2
                  className="mt-3 font-display text-[clamp(28px,4vw,44px)] leading-[1.05] tracking-tight"
                  style={{ fontVariationSettings: "'opsz' 144, 'SOFT' 40" }}
                >
                  Parlons{" "}
                  <span
                    className="text-[--kost-blue]"
                    style={{
                      fontStyle: "italic",
                      fontVariationSettings: "'opsz' 144, 'SOFT' 90, 'WONK' 1",
                    }}
                  >
                    de votre projet
                  </span>
                  .
                </h2>
              </div>
              <div className="hidden text-right text-[11px] uppercase tracking-[0.22em] text-[--kost-ink-soft] md:block">
                Réponse
                <br />
                sous 1 heure
              </div>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {channels.map((c) => (
                <a
                  key={c.label}
                  href={c.href}
                  target={c.href.startsWith("http") ? "_blank" : undefined}
                  rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="contact-card group relative flex flex-col rounded-2xl border border-[--kost-line] bg-white/30 p-6"
                >
                  <div className="flex items-center justify-between">
                    <div className="contact-icon flex h-11 w-11 items-center justify-center rounded-full border border-[--kost-line] bg-[--kost-paper] text-[--kost-ink]">
                      <span className="h-5 w-5">{c.icon}</span>
                    </div>
                    <span className="text-[10px] uppercase tracking-[0.24em] text-[--kost-ink-soft]">
                      {c.note}
                    </span>
                  </div>
                  <div className="mt-8 text-[10px] uppercase tracking-[0.28em] text-[--kost-ink-soft]">
                    {c.label}
                  </div>
                  <div
                    className="mt-2 font-display text-[22px] leading-tight text-[--kost-ink]"
                    style={{ fontVariationSettings: "'opsz' 144, 'SOFT' 30" }}
                  >
                    {c.value}
                  </div>
                  <div className="mt-6 flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-[--kost-ink]">
                    Ouvrir
                    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 transition group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="1.6">
                      <path d="M5 12h14M13 6l6 6-6 6" />
                    </svg>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* MAP */}
        <section className="relative mt-24">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid grid-cols-1 gap-0 overflow-hidden rounded-3xl border border-[--kost-line] bg-white/30 md:grid-cols-5">
              <div className="order-2 col-span-1 flex flex-col justify-between p-8 md:order-1 md:col-span-2 md:p-12">
                <div>
                  <div className="text-[11px] uppercase tracking-[0.28em] text-[--kost-ink-soft]">
                    § 03 — Siège
                  </div>
                  <h3
                    className="mt-3 font-display text-[clamp(26px,3.2vw,38px)] leading-[1.05] tracking-tight"
                    style={{ fontVariationSettings: "'opsz' 144, 'SOFT' 40" }}
                  >
                    Notre bureau,{" "}
                    <span
                      style={{
                        fontStyle: "italic",
                        fontVariationSettings: "'opsz' 144, 'SOFT' 80, 'WONK' 1",
                      }}
                    >
                      à Alger.
                    </span>
                  </h3>
                  <p className="mt-4 text-[14px] leading-[1.6] text-[--kost-ink-soft]">
                    Rendez-vous au bureau pour la consultation des dossiers,
                    visites guidées et signatures sécurisées.
                  </p>
                </div>
                <div className="mt-10 space-y-4 text-[12px]">
                  <dl className="grid grid-cols-2 gap-y-4">
                    <dt className="uppercase tracking-[0.2em] text-[--kost-ink-soft]">Ville</dt>
                    <dd className="text-right text-[--kost-ink]">Alger, Algérie</dd>
                    <dt className="uppercase tracking-[0.2em] text-[--kost-ink-soft]">Horaires</dt>
                    <dd className="text-right text-[--kost-ink]">Lun – Sam · 9h – 18h</dd>
                    <dt className="uppercase tracking-[0.2em] text-[--kost-ink-soft]">RDV</dt>
                    <dd className="text-right text-[--kost-ink]">Sur réservation</dd>
                  </dl>
                  <a
                    href="https://maps.app.goo.gl/4JC1gCcis1x1QAGBA?g_st=ac"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group mt-2 inline-flex items-center gap-2 border-b border-[--kost-ink]/30 pb-1 text-[11px] uppercase tracking-[0.24em] text-[--kost-ink] transition hover:border-[--kost-ink]"
                  >
                    Itinéraire Google Maps
                    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 transition group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="1.6">
                      <path d="M5 12h14M13 6l6 6-6 6" />
                    </svg>
                  </a>
                </div>
              </div>

              {/* Stylized map */}
              <div className="order-1 col-span-1 md:order-2 md:col-span-3">
                <div className="relative h-[280px] w-full overflow-hidden bg-[#0a1733] md:h-full">
                  <svg
                    viewBox="0 0 600 400"
                    className="absolute inset-0 h-full w-full"
                    preserveAspectRatio="xMidYMid slice"
                    aria-hidden
                  >
                    <defs>
                      <radialGradient id="mapGlow" cx="62%" cy="48%" r="50%">
                        <stop offset="0%" stopColor="#2f86ff" stopOpacity="0.35" />
                        <stop offset="100%" stopColor="#2f86ff" stopOpacity="0" />
                      </radialGradient>
                    </defs>

                    {/* Grid */}
                    <g stroke="#ffffff" strokeWidth="0.4" opacity="0.08">
                      {Array.from({ length: 14 }).map((_, i) => (
                        <line key={`v${i}`} x1={i * 45} y1="0" x2={i * 45} y2="400" />
                      ))}
                      {Array.from({ length: 10 }).map((_, i) => (
                        <line key={`h${i}`} x1="0" y1={i * 45} x2="600" y2={i * 45} />
                      ))}
                    </g>

                    {/* Stylized roads */}
                    <g fill="none" stroke="#ffffff" strokeWidth="1.2" opacity="0.35">
                      <path d="M0,260 C140,240 220,200 320,210 C420,220 520,180 600,170" />
                      <path d="M0,140 C100,150 180,180 300,170 C420,160 500,130 600,150" />
                      <path d="M180,0 C200,90 240,180 250,260 C260,340 240,380 230,400" />
                      <path d="M420,0 C400,80 380,160 390,240 C400,320 420,360 430,400" />
                    </g>

                    {/* District labels */}
                    <g fill="#ffffff" opacity="0.45" fontSize="9" letterSpacing="3" style={{ textTransform: "uppercase" }} fontFamily="var(--font-body), sans-serif">
                      <text x="60" y="80">El Biar</text>
                      <text x="470" y="100">Ben Aknoun</text>
                      <text x="100" y="340">Bir Mourad Raïs</text>
                      <text x="450" y="340">Kouba</text>
                    </g>

                    <circle cx="370" cy="200" r="160" fill="url(#mapGlow)" />

                    {/* Pin glow */}
                    <circle cx="370" cy="200" r="38" fill="#2f86ff" opacity="0.15">
                      <animate attributeName="r" values="32;48;32" dur="3s" repeatCount="indefinite" />
                      <animate attributeName="opacity" values="0.25;0.05;0.25" dur="3s" repeatCount="indefinite" />
                    </circle>

                    {/* Pin */}
                    <g transform="translate(370 200)">
                      <circle r="10" fill="#ffffff" />
                      <circle r="5" fill="#1e63d8" />
                    </g>

                    {/* Pin label */}
                    <g transform="translate(370 200)">
                      <line x1="14" y1="-2" x2="60" y2="-26" stroke="#ffffff" strokeWidth="0.8" opacity="0.7" />
                      <text x="64" y="-26" fill="#ffffff" fontSize="10" letterSpacing="3" style={{ textTransform: "uppercase" }} fontFamily="var(--font-body), sans-serif">
                        Kost Groupe
                      </text>
                      <text x="64" y="-14" fill="#ffffff" fontSize="9" opacity="0.6" fontFamily="var(--font-body), sans-serif">
                        Hydra · 36.7538°N
                      </text>
                    </g>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CLOSING */}
        <section className="relative mt-28 mb-24">
          <div className="mx-auto max-w-4xl px-6 text-center">
            <p
              className="font-display text-[clamp(28px,4.5vw,52px)] leading-[1.1] tracking-tight text-[--kost-ink]"
              style={{ fontVariationSettings: "'opsz' 144, 'SOFT' 30" }}
            >
              «{" "}
              <span
                style={{
                  fontStyle: "italic",
                  fontVariationSettings: "'opsz' 144, 'SOFT' 90, 'WONK' 1",
                }}
              >
                Acheter neuf en Algérie devrait être simple, lisible et sûr.
              </span>{" "}
              »
            </p>
            <div className="mt-6 text-[11px] uppercase tracking-[0.32em] text-[--kost-ink-soft]">
              — Kost Groupe, manifeste
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-[--kost-line]">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-8 text-[11px] uppercase tracking-[0.24em] text-[--kost-ink-soft] sm:flex-row">
          <span>© {new Date().getFullYear()} Kost Groupe</span>
          <span className="flex items-center gap-2">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-[--kost-blue]" />
            La transparence comme standard
          </span>
          <span>Alger · Algérie</span>
        </div>
      </footer>
    </div>
  );
}
