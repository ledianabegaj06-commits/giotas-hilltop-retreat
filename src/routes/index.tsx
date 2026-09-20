import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState, type FormEvent, type TouchEvent } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import {
  AirVent, ArrowLeft, ArrowRight, BedDouble, CalendarDays, Car, Check, ChevronDown,
  CircleParking, Coffee, Expand, Eye, Gamepad2, Heart, House, Languages, MapPin,
  Maximize2, Menu, Minus, PawPrint, Plus, Quote, ShieldAlert, Sparkles, Star,
  Sun, Trees, Tv, Users, Waves, Wifi, Wind, X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { supabase } from "@/integrations/supabase/client";
import { copy, images, siteConfig, type Locale } from "@/lib/site-data";

const ids = ["story", "space", "pool", "gallery", "location", "reviews", "faq"];
const factIcons = [Users, BedDouble, Waves, Eye, PawPrint, CircleParking, Wifi, AirVent];
const amenityIcons = [Trees, Coffee, Wind, ShieldAlert];
const roomImages = [images.bedroom, images.living, images.outdoorRoom];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Giotas Country House | Private Pool Guesthouse in Varnavas" },
      { name: "description", content: "A private hilltop guesthouse in Varnavas, Attica, with a private pool, garden and Evian Gulf views—only 30 km from Athens." },
      { property: "og:title", content: "Giotas Country House — Your private hilltop escape" },
      { property: "og:description", content: "Private pool, sprawling garden and sea views over the Evian Gulf, 30 km from Athens." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [{ type: "application/ld+json", children: JSON.stringify({
      "@context": "https://schema.org", "@type": ["VacationRental", "LodgingBusiness"],
      name: "Giotas Country House", alternateName: "Εξοχικό σπίτι Giotas",
      description: "Private holiday guesthouse with pool, garden and Evian Gulf views in Varnavas, Attica.",
      address: { "@type": "PostalAddress", addressLocality: "Varnavas", addressRegion: "Attica", addressCountry: "GR" },
      aggregateRating: { "@type": "AggregateRating", ratingValue: "4.99", reviewCount: "100", bestRating: "5" },
      amenityFeature: ["Private pool", "Sea view", "Garden", "Wi-Fi", "Air conditioning", "Free parking", "Pet friendly"].map((name) => ({ "@type": "LocationFeatureSpecification", name, value: true })),
      numberOfRooms: 2, occupancy: { "@type": "QuantitativeValue", maxValue: 6 }, identifier: "00002419157",
    }) }],
  }),
  component: HomePage,
});

function HomePage() {
  const [locale, setLocale] = useState<Locale>("en");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 0.2], [0, 90]);
  const t = copy[locale];

  useEffect(() => {
    const stored = window.localStorage.getItem("giotas-locale") as Locale | null;
    setLocale(stored === "el" || (!stored && navigator.language.toLowerCase().startsWith("el")) ? "el" : "en");
    const onScroll = () => setScrolled(window.scrollY > window.innerHeight * 0.6);
    onScroll(); window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const changeLocale = (next: Locale) => { setLocale(next); window.localStorage.setItem("giotas-locale", next); };
  const scrollTo = (id: string) => { document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); setMenuOpen(false); };

  return <div lang={locale} className="min-h-screen bg-background text-foreground">
    <motion.div className="fixed inset-x-0 top-0 z-[70] h-1 origin-left bg-accent" style={{ scaleX: scrollYProgress }} />
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${scrolled ? "border-b border-border/60 bg-background/85 shadow-sm backdrop-blur-xl" : "bg-transparent"}`}>
      <div className="section-shell flex h-20 items-center justify-between">
        <button onClick={() => scrollTo("top")} className={`font-display text-xl font-semibold ${scrolled ? "text-primary" : "text-primary-foreground"}`}>Giotas <span className="font-sans text-[10px] font-medium uppercase tracking-[0.18em]">Country House</span></button>
        <nav className="hidden items-center gap-6 lg:flex" aria-label="Main navigation">
          {t.nav.map((label, i) => <button key={ids[i]} onClick={() => scrollTo(ids[i])} className={`text-xs font-medium transition-colors hover:text-accent ${scrolled ? "text-foreground" : "text-primary-foreground"}`}>{label}</button>)}
        </nav>
        <div className="flex items-center gap-3">
          <div className={`flex items-center text-xs font-semibold ${scrolled ? "text-primary" : "text-primary-foreground"}`} aria-label="Language">
            <Languages className="mr-2 size-4" /><button onClick={() => changeLocale("en")} className={locale === "en" ? "underline underline-offset-4" : "opacity-60"}>EN</button><span className="mx-1.5 opacity-50">|</span><button onClick={() => changeLocale("el")} className={locale === "el" ? "underline underline-offset-4" : "opacity-60"}>ΕΛ</button>
          </div>
          <Button size="sm" className="hidden rounded-full sm:flex" onClick={() => scrollTo("booking")}>{t.availability}</Button>
          <Button variant="ghost" size="icon" className={`lg:hidden ${scrolled ? "text-foreground" : "text-primary-foreground"}`} onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">{menuOpen ? <X /> : <Menu />}</Button>
        </div>
      </div>
      {menuOpen && <nav className="border-t border-border bg-background p-6 lg:hidden">{t.nav.map((label, i) => <button key={ids[i]} onClick={() => scrollTo(ids[i])} className="block w-full border-b border-border py-3 text-left">{label}</button>)}</nav>}
    </header>

    <main>
      <section id="top" className="relative flex min-h-[92svh] items-end overflow-hidden bg-primary">
        <motion.img src={images.hero} alt="Giotas Country House private pool overlooking the Evian Gulf" width={1600} height={1050} fetchPriority="high" className="absolute inset-0 h-[112%] w-full object-cover" style={{ y: heroY }} />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/85 via-foreground/20 to-foreground/15" />
        <div className="section-shell relative z-10 pb-16 pt-32 text-primary-foreground md:pb-20">
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.18em]">{t.heroEyebrow}</p>
          <h1 className="max-w-4xl text-5xl leading-[1.02] font-medium sm:text-6xl lg:text-7xl">{t.heroTitle}</h1>
          <p className="mt-6 max-w-2xl text-base leading-7 text-primary-foreground/85 sm:text-lg">{t.heroText}</p>
          <div className="mt-8 flex flex-wrap gap-3"><Button variant="hero" size="lg" onClick={() => scrollTo("booking")}>{t.availability}<ArrowRight /></Button><Button variant="glass" size="lg" onClick={() => scrollTo("space")}>{t.seeSpace}</Button></div>
          <div className="mt-8 inline-flex max-w-full items-center gap-3 rounded-full border border-primary-foreground/25 bg-background/15 px-4 py-3 text-xs backdrop-blur-md sm:text-sm"><Star className="size-4 fill-current text-accent"/><strong>4.99 · 100</strong><span className="hidden opacity-80 sm:inline">· {t.badge}</span></div>
        </div>
      </section>

      <section className="horizon py-16 sm:py-20"><div className="section-shell"><h2 className="text-center text-3xl text-primary sm:text-4xl">{t.whyTitle}</h2><div className="mt-10 grid gap-8 md:grid-cols-3">{t.why.map(([title, text], i) => { const Icon = [Waves, Eye, Heart][i]; return <Reveal key={title}><div className="border-t border-border pt-6"><Icon className="mb-5 size-6 text-accent"/><h3 className="text-2xl">{title}</h3><p className="mt-3 leading-7 text-muted-foreground">{text}</p></div></Reveal>; })}</div></div></section>

      <section className="border-y border-border bg-primary py-7 text-primary-foreground"><div className="section-shell grid grid-cols-2 gap-y-8 sm:grid-cols-4 lg:grid-cols-8">{t.facts.map((fact, i) => { const Icon = factIcons[i]; return <div key={fact} className="flex flex-col items-center gap-2 text-center text-xs"><Icon className="size-5 text-accent"/><span>{fact}</span></div>; })}</div></section>

      <Section id="story" kicker={t.aboutKicker} title={t.aboutTitle}><div className="grid items-center gap-10 lg:grid-cols-[1.05fr_.95fr]"><Reveal><div><p className="text-lg leading-8">{t.aboutBody}</p><p className="mt-5 leading-7 text-muted-foreground">{t.aboutBody2}</p><div className="mt-8 flex items-center gap-4 border-t border-border pt-6"><img src={images.hosts} alt="Tony and Giota" width={1200} height={900} loading="lazy" className="size-20 rounded-full object-cover"/><div><h3 className="text-xl">{t.hosts}</h3><p className="mt-1 text-sm text-muted-foreground">{t.hostsNote}</p></div></div></div></Reveal><Reveal><img src={images.garden} alt={images.gallery[1].alt[locale]} width={1200} height={900} loading="lazy" className="image-soft aspect-[4/3] w-full object-cover"/></Reveal></div></Section>

      <Section id="space" kicker={t.spaceKicker} title={t.spaceTitle} tone="muted"><div className="grid gap-5 lg:grid-cols-3">{t.rooms.map(([title, specs, text], i) => <Reveal key={title}><article className="group overflow-hidden rounded-[1.5rem] border border-border bg-card"><div className="overflow-hidden"><img src={roomImages[i]} alt={title} width={1200} height={900} loading="lazy" className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-105"/></div><div className="p-6"><BedDouble className="mb-4 size-5 text-accent"/><h3 className="text-2xl">{title}</h3><p className="mt-2 text-xs font-semibold uppercase tracking-[0.12em] text-primary">{specs}</p><p className="mt-4 leading-7 text-muted-foreground">{text}</p></div></article></Reveal>)}</div><p className="mt-8 text-center text-sm text-muted-foreground">{t.essentials}</p></Section>

      <section id="pool" className="relative min-h-[760px] overflow-hidden"><img src={images.hero} alt="Private lap pool and sea view" width={1600} height={1050} loading="lazy" className="absolute inset-0 h-full w-full object-cover"/><div className="absolute inset-0 bg-gradient-to-r from-foreground/90 via-foreground/55 to-transparent"/><div className="section-shell relative z-10 flex min-h-[760px] items-center"><Reveal><div className="max-w-xl py-20 text-primary-foreground"><p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">{t.poolKicker}</p><h2 className="mt-4 text-4xl sm:text-6xl">{t.poolTitle}</h2><p className="mt-6 text-lg leading-8 text-primary-foreground/85">{t.poolBody}</p><div className="mt-8 flex gap-3 border-t border-primary-foreground/25 pt-6 text-sm leading-6 text-primary-foreground/80"><ShieldAlert className="mt-1 size-5 shrink-0 text-accent"/><p>{t.safety}</p></div></div></Reveal></div></section>

      <Amenities locale={locale} />
      <Gallery locale={locale} />

      <Section id="location" kicker={t.locationKicker} title={t.locationTitle} tone="muted"><div className="grid gap-10 lg:grid-cols-[1.15fr_.85fr]"><div className="overflow-hidden rounded-[1.75rem] border border-border bg-card shadow-lg"><iframe title="Map of Varnavas, Attica" src={siteConfig.mapUrl} className="h-[440px] w-full" loading="lazy" /></div><Reveal><div><p className="text-lg leading-8">{t.locationBody}</p><div className="mt-8 divide-y divide-border border-y border-border">{t.distances.map(([place, distance]) => <div key={place} className="flex items-center justify-between gap-5 py-5"><span className="flex items-center gap-3 font-medium"><MapPin className="size-4 text-accent"/>{place}</span><span className="text-right text-sm text-muted-foreground">{distance}</span></div>)}</div><p className="mt-7 flex gap-3 text-sm italic leading-6 text-muted-foreground"><Sparkles className="size-5 shrink-0 text-secondary"/>{t.localTip}</p></div></Reveal></div></Section>

      <Reviews locale={locale} />

      <section className="bg-primary py-16 text-primary-foreground"><div className="section-shell flex flex-col items-start justify-between gap-8 md:flex-row md:items-center"><div><p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">{t.eventsKicker}</p><h2 className="mt-3 text-4xl">{t.eventsTitle}</h2><p className="mt-3 max-w-2xl text-primary-foreground/75">{t.eventsBody}</p></div><Button variant="glass" size="lg" onClick={() => scrollTo("booking")}>{t.askEvent}<ArrowRight/></Button></div></section>

      <Booking locale={locale} />

      <Section id="faq" kicker="FAQ" title={t.faqTitle} tone="muted"><Accordion type="single" collapsible className="mx-auto max-w-3xl">{t.faqs.map(([q, a], i) => <AccordionItem value={`faq-${i}`} key={q}><AccordionTrigger className="py-6 text-left font-display text-xl hover:no-underline">{q}</AccordionTrigger><AccordionContent className="pb-6 text-base leading-7 text-muted-foreground">{a}</AccordionContent></AccordionItem>)}</Accordion></Section>
    </main>

    <footer className="bg-foreground pb-28 pt-16 text-background md:pb-10"><div className="section-shell grid gap-10 md:grid-cols-3"><div><p className="font-display text-3xl">Giotas</p><p className="mt-3 max-w-xs text-sm leading-6 text-background/65">{t.footerTag}</p></div><div className="grid grid-cols-2 gap-3 text-sm">{t.nav.map((label, i) => <button className="text-left text-background/70 hover:text-background" onClick={() => scrollTo(ids[i])} key={label}>{label}</button>)}</div><div className="text-sm text-background/70"><a className="block py-1 hover:text-background" href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a><a className="block py-1 hover:text-background" href={`tel:${siteConfig.phone}`}>{siteConfig.phone}</a><a className="block py-1 hover:text-background" href={siteConfig.instagramUrl}>Instagram</a><a className="block py-1 hover:text-background" href={siteConfig.airbnbUrl}>{t.listed}</a></div></div><div className="section-shell mt-12 border-t border-background/15 pt-6 text-xs text-background/55">© 2026 Giotas Country House · {t.registration}: {siteConfig.registryNumber}</div></footer>

    <div className="fixed inset-x-4 bottom-4 z-40 md:hidden"><Button className="h-14 w-full rounded-full shadow-xl" onClick={() => scrollTo("booking")}><CalendarDays/>{t.availability}</Button></div>
  </div>;
}

function Section({ id, kicker, title, tone, children }: { id?: string; kicker: string; title: string; tone?: "muted"; children: React.ReactNode }) {
  return <section id={id} className={`horizon py-20 sm:py-28 ${tone === "muted" ? "bg-muted/45" : ""}`}><div className="section-shell"><div className="mb-12 max-w-3xl"><p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">{kicker}</p><h2 className="mt-4 text-4xl leading-tight text-primary sm:text-5xl">{title}</h2></div>{children}</div></section>;
}

function Reveal({ children }: { children: React.ReactNode }) { return <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.18 }} transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}>{children}</motion.div>; }

function Amenities({ locale }: { locale: Locale }) {
  const [expanded, setExpanded] = useState(false); const t = copy[locale];
  return <Section kicker={t.amenitiesKicker} title={t.amenitiesTitle}><div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">{t.amenityGroups.map(([group, items], i) => { const Icon = amenityIcons[i]; return <div key={group} className={`${!expanded && i > 1 ? "hidden lg:block" : ""}`}><Icon className="mb-5 size-6 text-accent"/><h3 className="text-2xl">{group}</h3><ul className="mt-5 space-y-3">{items.map((item) => <li key={item} className="flex gap-3 text-sm text-muted-foreground"><Check className="mt-0.5 size-4 shrink-0 text-secondary"/>{item}</li>)}</ul></div>; })}</div><Button variant="outline" className="mt-9 rounded-full lg:hidden" onClick={() => setExpanded(!expanded)}>{expanded ? t.showLess : t.showAll}<ChevronDown className={expanded ? "rotate-180" : ""}/></Button></Section>;
}

function Gallery({ locale }: { locale: Locale }) {
  const t = copy[locale]; const [filter, setFilter] = useState(0); const [lightbox, setLightbox] = useState<number | null>(null); const touch = useRef(0);
  const category = ["All", "Pool", "Garden", "Interior", "Views"][filter];
  const filtered = images.gallery.map((item, index) => ({ ...item, index })).filter((x) => category === "All" || x.category === category);
  const move = (d: number) => setLightbox((old) => old === null ? null : (old + d + images.gallery.length) % images.gallery.length);
  useEffect(() => { const key = (e: KeyboardEvent) => { if (lightbox === null) return; if (e.key === "Escape") setLightbox(null); if (e.key === "ArrowRight") move(1); if (e.key === "ArrowLeft") move(-1); }; window.addEventListener("keydown", key); return () => window.removeEventListener("keydown", key); }, [lightbox]);
  const onTouchStart = (e: TouchEvent) => { touch.current = e.touches[0]?.clientX ?? 0; }; const onTouchEnd = (e: TouchEvent) => { const end = e.changedTouches[0]?.clientX ?? 0; if (Math.abs(end - touch.current) > 45) move(end < touch.current ? 1 : -1); };
  return <Section id="gallery" kicker={t.galleryKicker} title={t.galleryTitle} tone="muted"><div className="mb-8 flex flex-wrap gap-2">{t.filters.map((label, i) => <Button key={label} size="sm" variant={filter === i ? "default" : "outline"} className="rounded-full" onClick={() => setFilter(i)}>{label}</Button>)}</div><div className="columns-1 gap-4 sm:columns-2 lg:columns-3">{filtered.map((item, i) => <button key={`${item.src}-${i}`} onClick={() => setLightbox(item.index)} className="group relative mb-4 block w-full overflow-hidden rounded-[1.25rem]"><img src={item.src} alt={item.alt[locale]} width={1200} height={900} loading="lazy" className={`w-full object-cover transition-transform duration-700 group-hover:scale-105 ${i % 3 === 1 ? "aspect-[4/5]" : "aspect-[4/3]"}`}/><span className="absolute right-3 top-3 rounded-full bg-background/80 p-2 text-primary opacity-0 backdrop-blur group-hover:opacity-100"><Maximize2 className="size-4"/></span></button>)}</div>{lightbox !== null && <div className="fixed inset-0 z-[100] flex items-center justify-center bg-foreground/95 p-4" role="dialog" aria-modal="true" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}><Button variant="ghost" size="icon" className="absolute right-5 top-5 text-background hover:bg-background/10" onClick={() => setLightbox(null)} aria-label="Close"><X/></Button><Button variant="ghost" size="icon" className="absolute left-3 text-background hover:bg-background/10 sm:left-8" onClick={() => move(-1)} aria-label="Previous"><ArrowLeft/></Button><img src={images.gallery[lightbox]?.src} alt={images.gallery[lightbox]?.alt[locale]} className="max-h-[85vh] max-w-[88vw] rounded-xl object-contain"/><Button variant="ghost" size="icon" className="absolute right-3 text-background hover:bg-background/10 sm:right-8" onClick={() => move(1)} aria-label="Next"><ArrowRight/></Button></div>}</Section>;
}

function Reviews({ locale }: { locale: Locale }) {
  const t = copy[locale]; const [active, setActive] = useState(0);
  useEffect(() => { const timer = window.setInterval(() => setActive((v) => (v + 1) % t.testimonials.length), 6500); return () => window.clearInterval(timer); }, [t.testimonials.length]);
  return <Section id="reviews" kicker={t.reviewsKicker} title={t.reviewsTitle}><div className="grid gap-10 lg:grid-cols-[.85fr_1.15fr]"><div><div className="flex items-end gap-3"><span className="font-display text-7xl text-primary">4.99</span><div className="pb-2"><div className="flex text-accent">{[1,2,3,4,5].map(n => <Star key={n} className="size-4 fill-current"/>)}</div><p className="mt-1 text-xs text-muted-foreground">{t.basedOn}</p></div></div><div className="mt-7 space-y-2"><div className="flex items-center gap-3 text-xs"><span>5★</span><div className="h-1.5 flex-1 rounded-full bg-muted"><div className="h-full w-[99%] rounded-full bg-primary"/></div><span>99%</span></div><div className="flex items-center gap-3 text-xs"><span>4★</span><div className="h-1.5 flex-1 rounded-full bg-muted"><div className="h-full w-[1%] rounded-full bg-primary"/></div><span>1%</span></div></div><div className="mt-8 grid grid-cols-2 gap-x-8 gap-y-3">{t.categories.map(([label, score]) => <div key={label} className="flex justify-between border-b border-border py-2 text-sm"><span className="text-muted-foreground">{label}</span><strong>{score}</strong></div>)}</div><p className="mt-8 text-xs font-semibold uppercase tracking-[0.14em] text-primary">{t.mentions}</p><div className="mt-3 flex flex-wrap gap-2">{t.mentionTags.map(tag => <span key={tag} className="rounded-full bg-muted px-3 py-1.5 text-xs">{tag}</span>)}</div></div><div className="flex min-h-[390px] flex-col justify-between rounded-[1.75rem] bg-primary p-8 text-primary-foreground sm:p-10"><Quote className="size-10 text-accent"/><div><motion.blockquote key={active} initial={{ opacity: 0, x: 15 }} animate={{ opacity: 1, x: 0 }} className="font-display text-2xl leading-relaxed sm:text-3xl">“{t.testimonials[active]?.[2]}”</motion.blockquote><p className="mt-7 text-sm"><strong>{t.testimonials[active]?.[0]}</strong> · {t.testimonials[active]?.[1]} · via Airbnb</p></div><div className="mt-8 flex items-center justify-between"><div className="flex gap-2">{t.testimonials.map((_, i) => <button key={i} onClick={() => setActive(i)} aria-label={`Review ${i + 1}`} className={`h-1.5 rounded-full transition-all ${i === active ? "w-8 bg-accent" : "w-3 bg-primary-foreground/30"}`}/>)}</div><div className="flex"><Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-primary-foreground/10" onClick={() => setActive((active - 1 + t.testimonials.length) % t.testimonials.length)}><ArrowLeft/></Button><Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-primary-foreground/10" onClick={() => setActive((active + 1) % t.testimonials.length)}><ArrowRight/></Button></div></div></div></div><Button asChild variant="outline" className="mt-9 rounded-full"><a href={siteConfig.airbnbUrl}>{t.readReviews}<ArrowRight/></a></Button></Section>;
}

function Booking({ locale }: { locale: Locale }) {
  const t = copy[locale]; const [guests, setGuests] = useState(2); const [status, setStatus] = useState<"idle"|"sending"|"success"|"error">("idle");
  const [dates, setDates] = useState({ checkIn: "", checkOut: "" });
  const submit = async (e: FormEvent<HTMLFormElement>) => { e.preventDefault(); const fd = new FormData(e.currentTarget); if (!dates.checkIn || !dates.checkOut || dates.checkOut <= dates.checkIn || !fd.get("name") || !fd.get("email")) { setStatus("error"); return; } setStatus("sending"); const { error } = await supabase.from("enquiries").insert({ name: String(fd.get("name")), email: String(fd.get("email")), phone: String(fd.get("phone") || "") || null, check_in: dates.checkIn, check_out: dates.checkOut, guests, message: String(fd.get("message") || "") || null, locale }); setStatus(error ? "error" : "success"); if (!error) e.currentTarget.reset(); };
  return <Section id="booking" kicker={t.bookingKicker} title={t.bookingTitle}><div className="grid overflow-hidden rounded-[1.75rem] border border-border bg-card shadow-xl lg:grid-cols-[1.25fr_.75fr]"><div className="p-6 sm:p-10"><div className="grid gap-4 sm:grid-cols-2"><label className="text-sm font-medium">{t.checkIn}<Input type="date" min={new Date().toISOString().slice(0,10)} value={dates.checkIn} onChange={(e) => setDates({...dates, checkIn:e.target.value})} className="mt-2 h-12"/></label><label className="text-sm font-medium">{t.checkOut}<Input type="date" min={dates.checkIn || new Date().toISOString().slice(0,10)} value={dates.checkOut} onChange={(e) => setDates({...dates, checkOut:e.target.value})} className="mt-2 h-12"/></label></div><div className="mt-4 flex h-14 items-center justify-between rounded-md border border-input px-4"><span className="text-sm font-medium">{t.guests}</span><div className="flex items-center gap-4"><Button variant="ghost" size="icon" onClick={() => setGuests(Math.max(1,guests-1))} aria-label="Remove guest"><Minus/></Button><span className="w-4 text-center font-semibold">{guests}</span><Button variant="ghost" size="icon" onClick={() => setGuests(Math.min(6,guests+1))} aria-label="Add guest"><Plus/></Button></div></div>{siteConfig.nightlyFrom !== null && <p className="mt-5 font-display text-2xl">From €{siteConfig.nightlyFrom} / night</p>}<Button asChild size="lg" className="mt-6 w-full"><a href={siteConfig.airbnbUrl}><CalendarDays/>{t.bookAirbnb}</a></Button><div className="my-8 flex items-center gap-4 text-xs uppercase tracking-[0.15em] text-muted-foreground"><span className="h-px flex-1 bg-border"/>or<span className="h-px flex-1 bg-border"/></div>{status === "success" ? <div className="rounded-xl bg-secondary/10 p-7 text-center"><div className="mx-auto flex size-12 items-center justify-center rounded-full bg-secondary text-secondary-foreground"><Check/></div><h3 className="mt-4 text-2xl">{t.successTitle}</h3><p className="mt-2 text-sm text-muted-foreground">{t.successText}</p></div> : <form onSubmit={submit}><h3 className="mb-5 text-2xl">{t.enquiry}</h3><div className="grid gap-4 sm:grid-cols-2"><Input name="name" placeholder={t.name} required minLength={2}/><Input name="email" type="email" placeholder={t.email} required/><Input name="phone" placeholder={t.phone} className="sm:col-span-2"/><Textarea name="message" placeholder={t.message} maxLength={2000} className="min-h-28 sm:col-span-2"/></div>{status === "error" && <p role="alert" className="mt-3 text-sm text-destructive">{t.required}</p>}<Button type="submit" variant="outline" className="mt-5 rounded-full" disabled={status === "sending"}>{status === "sending" ? t.sending : t.send}<ArrowRight/></Button></form>}</div><aside className="bg-primary p-7 text-primary-foreground sm:p-10"><House className="size-7 text-accent"/><h3 className="mt-5 text-3xl">{t.essentialsTitle}</h3><ul className="mt-7 space-y-5">{t.houseRules.map(rule => <li key={rule} className="flex gap-3 text-sm leading-6 text-primary-foreground/80"><Check className="mt-1 size-4 shrink-0 text-accent"/>{rule}</li>)}</ul></aside></div></Section>;
}