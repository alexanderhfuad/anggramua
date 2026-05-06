import { useEffect, useMemo, useState } from "react";

const content = {
  id: {
    nav: ["Beranda", "Layanan", "Portofolio", "Testimoni", "Kontak"],
    heroTitle: "Tampil Memukau di Setiap Momen Bersama Anggra MUA",
    heroDesc:
      "Layanan make up artist profesional untuk wedding, engagement, wisuda, photoshoot, dan event spesial dengan sentuhan modern, flawless, serta tahan lama.",
    heroPrimary: "Booking Sekarang",
    heroSecondary: "Lihat Portofolio",
    trust: ["200+ Klien Puas", "MUA Bersertifikat", "Produk Premium Higienis"],
    servicesTitle: "Layanan Unggulan",
    services: [
      {
        name: "Wedding & Engagement",
        desc: "Makeup elegan dan timeless untuk hari paling spesial."
      },
      {
        name: "Graduation Makeup",
        desc: "Look fresh, clean, dan fotogenik sepanjang acara."
      },
      {
        name: "Party & Event Makeup",
        desc: "Glamour look yang menonjol namun tetap nyaman dipakai."
      }
    ],
    portfolioTitle: "Portofolio Terbaru",
    faqTitle: "Pertanyaan Umum",
    faq: [
      {
        q: "Berapa lama ketahanan makeup Anggra MUA?",
        a: "Rata-rata 10-14 jam dengan setting yang tepat dan produk premium."
      },
      {
        q: "Apakah bisa request style makeup tertentu?",
        a: "Bisa. Anda dapat kirim referensi look saat konsultasi sebelum hari H."
      },
      {
        q: "Apakah tersedia home service?",
        a: "Ya, tersedia home service untuk area tertentu sesuai jadwal."
      }
    ],
    testimonialsTitle: "Apa Kata Klien",
    testimonials: [
      "\"Hasil makeup-nya halus banget, tahan seharian, dan tetap natural!\"",
      "\"Anggra ramah, profesional, dan paham bentuk wajah klien.\"",
      "\"Puas banget untuk acara engagement, foto jadi lebih standout.\""
    ],
    ctaTitle: "Siap Tampil Cantik Versi Terbaikmu?",
    ctaDesc: "Hubungi Anggra MUA sekarang dan amankan jadwalmu.",
    formTitle: "Form Booking",
    formName: "Nama Lengkap",
    formPhone: "Nomor WhatsApp",
    formService: "Pilih Layanan",
    formDate: "Tanggal Acara",
    formNotes: "Catatan Tambahan (opsional)",
    formButton: "Kirim Booking",
    formSuccess: "Booking berhasil dikirim. Kami akan menghubungi Anda segera.",
    formError: "Gagal mengirim booking. Silakan cek input Anda.",
    footer: "Hak Cipta"
  },
  en: {
    nav: ["Home", "Services", "Portfolio", "Testimonials", "Contact"],
    heroTitle: "Look Stunning in Every Moment with Anggra MUA",
    heroDesc:
      "Professional makeup artist services for weddings, engagements, graduation, photoshoots, and special events with a modern, flawless, and long-lasting finish.",
    heroPrimary: "Book Now",
    heroSecondary: "View Portfolio",
    trust: ["200+ Happy Clients", "Certified MUA", "Premium Hygienic Products"],
    servicesTitle: "Featured Services",
    services: [
      {
        name: "Wedding & Engagement",
        desc: "Elegant and timeless makeup for your most special day."
      },
      {
        name: "Graduation Makeup",
        desc: "Fresh, clean, and photogenic look through your whole event."
      },
      {
        name: "Party & Event Makeup",
        desc: "A glamorous look that stands out and still feels comfortable."
      }
    ],
    portfolioTitle: "Latest Portfolio",
    faqTitle: "Frequently Asked Questions",
    faq: [
      {
        q: "How long does Anggra MUA makeup last?",
        a: "It usually lasts 10-14 hours with proper setting and premium products."
      },
      {
        q: "Can I request a specific makeup style?",
        a: "Yes. You can send your preferred makeup references before the event."
      },
      {
        q: "Do you provide home service?",
        a: "Yes, home service is available in selected areas based on schedule."
      }
    ],
    testimonialsTitle: "What Clients Say",
    testimonials: [
      "\"The makeup result was super smooth, long-lasting, and still natural!\"",
      "\"Anggra is friendly, professional, and understands face shapes well.\"",
      "\"Loved it for my engagement event, my photos looked way better.\""
    ],
    ctaTitle: "Ready to Show Your Best Look?",
    ctaDesc: "Contact Anggra MUA now and secure your preferred schedule.",
    formTitle: "Booking Form",
    formName: "Full Name",
    formPhone: "WhatsApp Number",
    formService: "Select Service",
    formDate: "Event Date",
    formNotes: "Additional Notes (optional)",
    formButton: "Submit Booking",
    formSuccess: "Booking submitted successfully. We will contact you shortly.",
    formError: "Failed to submit booking. Please check your input.",
    footer: "Copyright"
  }
};

const portfolioCards = [1, 2, 3, 4, 5, 6];

export default function App() {
  const [lang, setLang] = useState("id");
  const [dark, setDark] = useState(false);
  const [apiServices, setApiServices] = useState([]);
  const [activeFaq, setActiveFaq] = useState(0);
  const [slide, setSlide] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    serviceKey: "",
    eventDate: "",
    notes: ""
  });
  const [formErrors, setFormErrors] = useState({});
  const [formStatus, setFormStatus] = useState({ type: "", message: "" });

  const t = useMemo(() => content[lang], [lang]);

  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const initialDark = media.matches;
    setDark(initialDark);
    document.documentElement.classList.toggle("dark", initialDark);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  useEffect(() => {
    fetch("http://localhost:4000/api/services")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setApiServices(data);
      })
      .catch(() => {
        setApiServices([]);
      });
  }, []);

  useEffect(() => {
    const items = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.12 }
    );

    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!portfolioCards.length) return undefined;
    const timer = setInterval(() => {
      setSlide((prev) => (prev + 1) % portfolioCards.length);
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  const displayedServices = apiServices.length
    ? apiServices.map((service) => ({
        name: service.label,
        desc: lang === "id" ? `Harga ${service.priceStart}` : `Price ${service.priceStart}`
      }))
    : t.services;

  const schemaOrg = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      name: "Anggra MUA",
      image:
        "https://images.unsplash.com/photo-1522336284037-91f7da073525?auto=format&fit=crop&w=1200&q=80",
      url: "https://anggramakeup.alexfuad.link",
      telephone: "+62-812-3456-7890",
      serviceType: "Make Up Artist",
      areaServed: "Indonesia",
      sameAs: ["https://wa.me/6281234567890"]
    }),
    []
  );

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.name || formData.name.trim().length < 3) errors.name = true;
    if (!formData.phone || formData.phone.replace(/\D/g, "").length < 10) errors.phone = true;
    if (!formData.serviceKey) errors.serviceKey = true;
    if (!formData.eventDate) errors.eventDate = true;
    return errors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const errors = validateForm();
    setFormErrors(errors);
    setFormStatus({ type: "", message: "" });
    if (Object.keys(errors).length) return;

    try {
      const response = await fetch("http://localhost:4000/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      if (!response.ok || !data.ok) {
        setFormStatus({ type: "error", message: t.formError });
        return;
      }
      setFormStatus({ type: "success", message: t.formSuccess });
      setFormData({ name: "", phone: "", serviceKey: "", eventDate: "", notes: "" });
      setFormErrors({});
    } catch (error) {
      setFormStatus({ type: "error", message: t.formError });
    }
  };

  return (
    <div className="relative overflow-x-hidden">
      <script type="application/ld+json">{JSON.stringify(schemaOrg)}</script>
      <header className="sticky top-0 z-40 border-b border-slate-200/70 bg-white/85 backdrop-blur dark:border-slate-800 dark:bg-slate-950/80">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <a href="#home" className="text-lg font-bold text-brand-700 dark:text-brand-500">
            Anggra MUA
          </a>
          <ul className="hidden gap-6 md:flex">
            {t.nav.map((item, index) => (
              <li key={item}>
                <a
                  href={["#home", "#services", "#portfolio", "#testimonials", "#contact"][index]}
                  className="text-sm font-medium text-slate-700 hover:text-brand-700 dark:text-slate-200 dark:hover:text-brand-400"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setLang(lang === "id" ? "en" : "id")}
              className="rounded-full border border-slate-300 px-3 py-1 text-xs font-semibold dark:border-slate-700"
            >
              {lang === "id" ? "EN" : "ID"}
            </button>
            <button
              onClick={() => setDark((prev) => !prev)}
              className="rounded-full border border-slate-300 px-3 py-1 text-xs font-semibold dark:border-slate-700"
            >
              {dark ? "Light" : "Dark"}
            </button>
          </div>
        </nav>
      </header>

      <main>
        <section id="home" className="mx-auto grid max-w-6xl gap-10 px-4 pb-16 pt-16 md:grid-cols-2 md:pt-24">
          <div className="reveal space-y-6">
            <p className="inline-flex rounded-full bg-brand-100 px-4 py-1 text-sm font-semibold text-brand-700 dark:bg-brand-900/50 dark:text-brand-300">
              Professional Makeup Service
            </p>
            <h1 className="text-4xl font-extrabold leading-tight md:text-5xl">{t.heroTitle}</h1>
            <p className="text-base text-slate-600 dark:text-slate-300">{t.heroDesc}</p>
            <div className="flex flex-wrap gap-3">
              <a
                href="#contact"
                className="rounded-full bg-brand-500 px-6 py-3 text-sm font-semibold text-white shadow-glow transition hover:bg-brand-700"
              >
                {t.heroPrimary}
              </a>
              <a
                href="#portfolio"
                className="rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold dark:border-slate-700"
              >
                {t.heroSecondary}
              </a>
            </div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              {t.trust.map((item) => (
                <div key={item} className="glass-card text-center text-sm font-medium">
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="reveal relative">
            <div className="absolute -left-6 -top-6 h-24 w-24 rounded-full bg-brand-300/50 blur-2xl" />
            <div className="absolute -bottom-6 -right-6 h-32 w-32 rounded-full bg-indigo-300/40 blur-2xl" />
            <div className="glass-card relative p-2">
              <img
                src="https://images.unsplash.com/photo-1522336284037-91f7da073525?auto=format&fit=crop&w=1200&q=80"
                alt="Makeup artist in action"
                className="h-full w-full rounded-2xl object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </section>

        <section id="services" className="mx-auto max-w-6xl px-4 py-16">
          <h2 className="mb-8 text-3xl font-bold">{t.servicesTitle}</h2>
          <div className="grid gap-4 md:grid-cols-3">
            {displayedServices.map((service) => (
              <article key={service.name} className="reveal glass-card">
                <h3 className="mb-2 text-xl font-semibold">{service.name}</h3>
                <p className="text-slate-600 dark:text-slate-300">{service.desc}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="portfolio" className="mx-auto max-w-6xl px-4 py-16">
          <h2 className="mb-8 text-3xl font-bold">{t.portfolioTitle}</h2>
          <div className="reveal mb-6 overflow-hidden rounded-2xl border border-slate-200/70 dark:border-slate-700/70">
            <div
              className="flex transition-transform duration-700"
              style={{ transform: `translateX(-${slide * 100}%)` }}
            >
              {portfolioCards.map((item) => (
                <img
                  key={`slider-${item}`}
                  src={`https://picsum.photos/seed/anggra-slider-${item}/1600/700`}
                  alt={`Highlight portfolio ${item}`}
                  className="h-64 w-full flex-shrink-0 object-cover md:h-80"
                  loading="lazy"
                />
              ))}
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
            {portfolioCards.map((item) => (
              <div key={item} className="reveal glass-card p-2">
                <img
                  src={`https://picsum.photos/seed/anggra-mua-${item}/600/800`}
                  alt={`Portfolio look ${item}`}
                  className="h-72 w-full rounded-xl object-cover"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </section>

        <section id="testimonials" className="mx-auto max-w-6xl px-4 py-16">
          <h2 className="mb-8 text-3xl font-bold">{t.testimonialsTitle}</h2>
          <div className="grid gap-4 md:grid-cols-3">
            {t.testimonials.map((quote, index) => (
              <blockquote key={index} className="reveal glass-card text-slate-700 dark:text-slate-200">
                {quote}
              </blockquote>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-16">
          <h2 className="mb-8 text-3xl font-bold">{t.faqTitle}</h2>
          <div className="space-y-3">
            {t.faq.map((item, index) => {
              const isOpen = activeFaq === index;
              return (
                <div key={item.q} className="reveal glass-card p-0">
                  <button
                    type="button"
                    onClick={() => setActiveFaq(isOpen ? -1 : index)}
                    className="flex w-full items-center justify-between px-5 py-4 text-left"
                  >
                    <span className="font-semibold">{item.q}</span>
                    <span className="text-brand-600">{isOpen ? "-" : "+"}</span>
                  </button>
                  {isOpen ? (
                    <p className="border-t border-slate-200 px-5 py-4 text-slate-600 dark:border-slate-700 dark:text-slate-300">
                      {item.a}
                    </p>
                  ) : null}
                </div>
              );
            })}
          </div>
        </section>

        <section id="contact" className="mx-auto max-w-6xl px-4 py-16">
          <div className="grid gap-5 md:grid-cols-2">
            <div className="reveal glass-card bg-gradient-to-r from-brand-500 to-fuchsia-600 text-white">
              <h2 className="mb-2 text-3xl font-bold">{t.ctaTitle}</h2>
              <p className="mb-5 text-white/90">{t.ctaDesc}</p>
              <a
                href="https://wa.me/6281234567890?text=Halo%20Anggra%20MUA%2C%20saya%20ingin%20booking%20layanan%20makeup."
                target="_blank"
                rel="noreferrer"
                className="inline-flex rounded-full bg-white px-6 py-3 font-semibold text-brand-700"
              >
                WhatsApp Booking
              </a>
            </div>
            <form onSubmit={handleSubmit} className="reveal glass-card space-y-3">
              <h3 className="text-2xl font-bold">{t.formTitle}</h3>
              <div>
                <label className="mb-1 block text-sm font-medium">{t.formName}</label>
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-300 bg-transparent px-3 py-2 outline-none focus:border-brand-500 dark:border-slate-700"
                />
                {formErrors.name ? <p className="mt-1 text-xs text-red-500">Min. 3 karakter.</p> : null}
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">{t.formPhone}</label>
                <input
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-300 bg-transparent px-3 py-2 outline-none focus:border-brand-500 dark:border-slate-700"
                />
                {formErrors.phone ? <p className="mt-1 text-xs text-red-500">Nomor tidak valid.</p> : null}
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">{t.formService}</label>
                <select
                  name="serviceKey"
                  value={formData.serviceKey}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-300 bg-transparent px-3 py-2 outline-none focus:border-brand-500 dark:border-slate-700"
                >
                  <option value="">--</option>
                  <option value="wedding">Wedding & Engagement</option>
                  <option value="graduation">Graduation Makeup</option>
                  <option value="party">Party & Event Makeup</option>
                </select>
                {formErrors.serviceKey ? <p className="mt-1 text-xs text-red-500">Pilih layanan.</p> : null}
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">{t.formDate}</label>
                <input
                  type="date"
                  name="eventDate"
                  value={formData.eventDate}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-300 bg-transparent px-3 py-2 outline-none focus:border-brand-500 dark:border-slate-700"
                />
                {formErrors.eventDate ? <p className="mt-1 text-xs text-red-500">Pilih tanggal acara.</p> : null}
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">{t.formNotes}</label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  rows={3}
                  className="w-full rounded-xl border border-slate-300 bg-transparent px-3 py-2 outline-none focus:border-brand-500 dark:border-slate-700"
                />
              </div>
              <button
                type="submit"
                className="rounded-full bg-brand-500 px-6 py-2 font-semibold text-white transition hover:bg-brand-700"
              >
                {t.formButton}
              </button>
              {formStatus.message ? (
                <p className={formStatus.type === "success" ? "text-sm text-emerald-500" : "text-sm text-red-500"}>
                  {formStatus.message}
                </p>
              ) : null}
            </form>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-200 px-4 py-8 text-center text-sm dark:border-slate-800">
        {t.footer} © {new Date().getFullYear()} Anggra MUA
      </footer>

      <a
        href="https://wa.me/6281234567890?text=Halo%20Anggra%20MUA%2C%20saya%20ingin%20booking%20layanan%20makeup."
        target="_blank"
        rel="noreferrer"
        aria-label="WhatsApp chat"
        className="fixed bottom-6 right-6 z-50 inline-flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-2xl text-white shadow-lg transition hover:scale-105 hover:bg-green-600"
      >
        &#9990;
      </a>
    </div>
  );
}
