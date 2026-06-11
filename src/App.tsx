import { useState, useEffect, useRef } from "react";
import "./App.css";

/* ── Data ──────────────────────────────────────── */
const PHONE = "664243280";
const ADDRESS = "Av. de los Descubrimientos, 11, 41927 Mairena del Aljarafe";
const MAPS_URL =
  "https://maps.google.com/?q=Av.+de+los+Descubrimientos+11,+Mairena+del+Aljarafe";
const MAPS_EMBED =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3173.5!2d-6.06!3d37.34!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzfCsDIwJzI0LjAiTiA2wrAwMyczNi4wIlc!5e0!3m2!1ses!2ses!4v1700000000000!5m2!1ses!2ses";

const FEATURES = [
  { label: "Cocina contemporánea", desc: "Tradición reinventada con técnicas modernas." },
  { label: "Producto de temporada", desc: "Ingredientes seleccionados con mimo." },
  { label: "Arroces", desc: "Nuestra especialidad, elaborados al momento." },
  { label: "Tapas creativas", desc: "Bocados llenos de sabor y originalidad." },
  { label: "Atención excelente", desc: "Servicio cercano y profesional." },
];

const MENU_CATEGORIES = [
  {
    key: "entrantes",
    label: "Entrantes",
    dishes: [
      { name: "Croquetas caseras", desc: "De setas y de jamón ibérico. Rebozado perfecto, cremosas por dentro.", price: "9€" },
      { name: "Tartar de atún", desc: "Con aguacate, sésamo y emulsión de soja.", price: "14€" },
    ],
  },
  {
    key: "principales",
    label: "Principales",
    dishes: [
      { name: "Steak tartar en tuétano", desc: "Nuestro plato más aclamado. Carne de primera con tuétano a la brasa.", price: "18€" },
      { name: "Sándwich de cecina", desc: "Cecina de primera, queso fundido y alioli de trufa.", price: "12€" },
    ],
  },
  {
    key: "arroces",
    label: "Arroces",
    dishes: [
      { name: "Arroz del día", desc: "Elaborado al momento con caldo casero. Siempre en su punto.", price: "16€" },
    ],
  },
  {
    key: "postres",
    label: "Postres",
    dishes: [
      { name: "Tarta de queso", desc: "Con base de galleta y coulis de frutos rojos.", price: "7€" },
    ],
  },
];

const GALLERY = [
  { src: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=600&fit=crop", alt: "Interior del restaurante" },
  { src: "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&h=600&fit=crop", alt: "Ambiente del restaurante" },
  { src: "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=800&h=600&fit=crop", alt: "Cocina abierta" },
  { src: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&h=600&fit=crop", alt: "Plato estrella" },
  { src: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=600&fit=crop", alt: "Decoración de plato" },
  { src: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=800&h=600&fit=crop", alt: "Comida y copas" },
];

const REVIEWS = [
  { text: "Tapas muy ricas, cerveza helada y camareros muy amables.", author: "Cliente Google" },
  { text: "Lo que más me ha gustado han sido los arroces y las croquetas de setas.", author: "Cliente Google" },
  { text: "La comida está increíble, el steak tartar en tuétano está delicioso.", author: "Cliente Google" },
  { text: "Comida de calidad y camareros amabilísimos. Lo mejor el sándwich de cecina.", author: "Cliente Google" },
];

/* ── Components ────────────────────────────────── */
function Navbar() {
  const links = ["Carta", "Nosotros", "Reservas", "Contacto"];
  const ids   = ["carta", "nosotros", "reservas", "contacto"];

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <nav className="navbar">
      <span className="navbar-logo">Dichoso</span>
      <div className="navbar-links">
        {links.map((l, i) => (
          <button key={l} onClick={() => scrollTo(ids[i])} className="nav-link">
            {l}
          </button>
        ))}
        <a href={`tel:+34${PHONE}`} className="btn btn-gold">
          Reservar
        </a>
      </div>
    </nav>
  );
}

function Hero() {
  const [visible, setVisible] = useState(false);
  useEffect(() => { setVisible(true); }, []);

  return (
    <section className="hero" id="hero">
      <div className="hero-overlay" />
      <div className="hero-content">
        <p className={`hero-eyebrow fade-up ${visible ? "visible" : ""}`} style={{ transitionDelay: "0.2s" }}>Mairena del Aljarafe · Sevilla</p>
        <h1 className={`hero-title fade-up ${visible ? "visible" : ""}`} style={{ transitionDelay: "0.4s" }}>
          Sabores que<br />
          <em>sorprenden</em>
        </h1>
        <p className={`hero-subtitle fade-up ${visible ? "visible" : ""}`} style={{ transitionDelay: "0.6s" }}>
          Cocina contemporánea, producto cuidado y una experiencia gastronómica diferente.
        </p>
        <div className={`hero-actions fade-up ${visible ? "visible" : ""}`} style={{ transitionDelay: "0.8s" }}>
          <button
            className="btn btn-outline"
            onClick={() => document.getElementById("carta")?.scrollIntoView({ behavior: "smooth" })}
          >
            Ver carta
          </button>
          <button
            className="btn btn-gold"
            onClick={() => document.getElementById("reservas")?.scrollIntoView({ behavior: "smooth" })}
          >
            Reservar mesa
          </button>
          <a href={`tel:+34${PHONE}`} className="btn btn-ghost">Llamar</a>
          <a href={MAPS_URL} target="_blank" rel="noreferrer" className="btn btn-ghost">
            Cómo llegar
          </a>
        </div>
      </div>
      <button
        className="scroll-indicator"
        onClick={() => document.getElementById("nosotros")?.scrollIntoView({ behavior: "smooth" })}
        aria-label="Desplazar hacia abajo"
      >
        <span className="scroll-label">Descubrir</span>
        <span className="scroll-arrow">↓</span>
      </button>
    </section>
  );
}

function About() {
  return (
    <section className="section bg-card" id="nosotros">
      <div className="container">
        <p className="section-eyebrow">Nuestra filosofía</p>
        <h2 className="section-title">Elevando lo cotidiano</h2>
        <div className="about-grid">
          <div className="about-text">
            <p>
              En Dichoso, creemos que la buena mesa es un arte que debe compartirse. Nacimos
              con la visión de traer a Mairena del Aljarafe una propuesta gastronómica que
              desafiara lo convencional sin perder el respeto por nuestras raíces.
            </p>
            <p>
              Cada plato es el resultado de horas de experimentación, buscando el equilibrio
              perfecto entre sabor, textura y presentación.
            </p>
            <blockquote className="quote">
              "No solo damos de comer; creamos momentos para recordar en torno a una mesa."
            </blockquote>
          </div>
          <div className="features-grid">
            {FEATURES.map((f) => (
              <div key={f.label} className="feature-card">
                <h4 className="feature-title">{f.label}</h4>
                <p className="feature-desc">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Menu() {
  const [visible, setVisible] = useState(false);
  const [category, setCategory] = useState(MENU_CATEGORIES[0].key);
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const current = MENU_CATEGORIES.find((c) => c.key === category)!;

  return (
    <section className="section" id="carta" ref={ref}>
      <div className="container">
        <p className="section-eyebrow">Nuestra carta</p>
        <h2 className="section-title">Descubre nuestros platos</h2>
        <div className="menu-tabs">
          {MENU_CATEGORIES.map((c) => (
            <button
              key={c.key}
              className={`menu-tab ${category === c.key ? "active" : ""}`}
              onClick={() => setCategory(c.key)}
            >
              {c.label}
            </button>
          ))}
        </div>
        <div className="menu-list fade-up" key={category}>
          {current.dishes.map((d) => (
            <div key={d.name} className="menu-item">
              <div className="menu-item-header">
                <span className="menu-item-name">{d.name}</span>
                <span className="menu-item-dots"></span>
                <span className="menu-item-price">{d.price}</span>
              </div>
              <p className="menu-item-desc">{d.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Gallery() {
  const [visible, setVisible] = useState(false);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { setVisible(e.isIntersecting); }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (lightbox === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
      if (e.key === "ArrowLeft") setLightbox((prev) => (prev !== null ? (prev - 1 + GALLERY.length) % GALLERY.length : null));
      if (e.key === "ArrowRight") setLightbox((prev) => (prev !== null ? (prev + 1) % GALLERY.length : null));
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [lightbox]);

  const next = () => setLightbox((prev) => (prev !== null ? (prev + 1) % GALLERY.length : null));
  const prev = () => setLightbox((prev) => (prev !== null ? (prev - 1 + GALLERY.length) % GALLERY.length : null));

  return (
    <section className="section" id="galeria" ref={ref}>
      <div className="container">
        <p className="section-eyebrow">Galería</p>
        <h2 className="section-title">Ambiente y cocina</h2>
        <div className="gallery-grid">
          {GALLERY.map((img, i) => (
            <div key={i} className={`gallery-item ${i % 2 === 0 ? "slide-left" : "slide-right"} ${visible ? "visible" : ""}`} style={{ transitionDelay: `${i * 0.12}s` }} onClick={() => setLightbox(i)} role="button" tabIndex={0} onKeyDown={(e) => { if (e.key === "Enter") setLightbox(i); }}>
              <img src={img.src} alt={img.alt} loading="lazy" className="gallery-img" />
              <div className="gallery-overlay"><span>Ampliar</span></div>
            </div>
          ))}
        </div>
      </div>

      {lightbox !== null && (
        <div className="lightbox" onClick={() => setLightbox(null)}>
          <button className="lightbox-close" onClick={() => setLightbox(null)} aria-label="Cerrar">&times;</button>
          <button className="lightbox-nav lightbox-prev" onClick={(e) => { e.stopPropagation(); prev(); }} aria-label="Anterior">&#8249;</button>
          <button className="lightbox-nav lightbox-next" onClick={(e) => { e.stopPropagation(); next(); }} aria-label="Siguiente">&#8250;</button>
          <img src={GALLERY[lightbox].src} alt={GALLERY[lightbox].alt} className="lightbox-img" onClick={(e) => e.stopPropagation()} />
        </div>
      )}
    </section>
  );
}

function Reviews() {
  return (
    <section className="section bg-card">
      <div className="container">
        <p className="section-eyebrow">Opiniones</p>
        <div className="reviews-header">
          <h2 className="section-title">Lo que dicen nuestros clientes</h2>
          <div className="rating-badge">
            <span className="stars">★★★★★</span>
            <span className="rating-text">5,0 · 321 reseñas</span>
          </div>
        </div>
        <div className="reviews-grid">
          {REVIEWS.map((r) => (
            <div key={r.text} className="review-card">
              <div className="review-stars">★★★★★</div>
              <p className="review-text">"{r.text}"</p>
              <span className="review-author">{r.author}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Reservation() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Reserva recibida. Le contactaremos para confirmar. También puede llamarnos al 664 24 32 80.");
  };

  return (
    <section className="section" id="reservas">
      <div className="container container-narrow">
        <p className="section-eyebrow">Reservas</p>
        <h2 className="section-title">Reserve su mesa</h2>
        <form className="form" onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Fecha</label>
              <input type="date" className="form-input" required />
            </div>
            <div className="form-group">
              <label className="form-label">Hora</label>
              <select className="form-input" required defaultValue="">
                <option value="" disabled>Seleccionar</option>
                <optgroup label="Almuerzo">
                  <option>13:00</option><option>13:30</option>
                  <option>14:00</option><option>14:30</option>
                  <option>15:00</option><option>15:30</option>
                </optgroup>
                <optgroup label="Cena">
                  <option>20:00</option><option>20:30</option>
                  <option>21:00</option><option>21:30</option>
                  <option>22:00</option>
                </optgroup>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Personas</label>
              <select className="form-input" required defaultValue="">
                <option value="" disabled>N.º</option>
                {[1,2,3,4,5,6,7,8,9,10].map(n => (
                  <option key={n}>{n}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Nombre</label>
              <input type="text" className="form-input" placeholder="Su nombre" required />
            </div>
            <div className="form-group">
              <label className="form-label">Teléfono</label>
              <input type="tel" className="form-input" placeholder="600 000 000" required />
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">Comentarios</label>
            <textarea className="form-input form-textarea" placeholder="Alergias, celebraciones, preferencias..." />
          </div>
          <div className="form-actions">
            <button type="submit" className="btn btn-gold btn-lg">
              Confirmar reserva
            </button>
            <a href={`tel:+34${PHONE}`} className="btn btn-outline btn-lg">
              Llamar · 664 24 32 80
            </a>
          </div>
        </form>
      </div>
    </section>
  );
}

function Location() {
  return (
    <section className="section bg-card" id="contacto">
      <div className="container">
        <p className="section-eyebrow">Cómo llegar</p>
        <h2 className="section-title">Ubicación</h2>
        <div className="location-grid">
          <div className="location-info">
            <p className="location-address">{ADDRESS}</p>
            <div className="location-actions">
              <a href={MAPS_URL} target="_blank" rel="noreferrer" className="btn btn-outline">
                Abrir en Maps
              </a>
              <a href={`tel:+34${PHONE}`} className="btn btn-gold">
                Llamar
              </a>
            </div>
            <div className="schedule">
              <h4 className="schedule-title">Horario</h4>
              <p>Almuerzo: 13:00 – 16:30</p>
              <p>Cena: 20:00 – 00:00</p>
            </div>
          </div>
          <div className="map-wrapper">
            <iframe
              title="Dichoso — Ubicación"
              src={MAPS_EMBED}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <span className="footer-logo">Dichoso</span>
            <p className="footer-tagline">Cocina contemporánea en Mairena del Aljarafe.</p>
          </div>
          <div>
            <p className="footer-heading">Dirección</p>
            <p className="footer-text">{ADDRESS}</p>
          </div>
          <div>
            <p className="footer-heading">Contacto</p>
            <a href={`tel:+34${PHONE}`} className="footer-link">664 24 32 80</a>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Dichoso. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}

/* ── App ───────────────────────────────────────── */
export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Menu />
        <Gallery />
        <Reviews />
        <Reservation />
        <Location />
      </main>
      <Footer />
    </>
  );
}
