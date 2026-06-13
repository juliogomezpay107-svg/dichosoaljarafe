# Prompt para crear una web de restaurante con reservas

---

Crea una web one-page en React 18 + TypeScript + Vite para un restaurante. Sin Tailwind, sin Framer Motion, sin routing, sin dependencias externas excepto React, Supabase SDK y Vite. Todo el CSS en un solo archivo App.css. Todos los componentes en un solo archivo src/App.tsx. Estética oscura-lujo (#1C1C1C, #D4AF37, #F5F0EB, #9CA3AF). Fuentes: Playfair Display (títulos) e Inter (cuerpo) desde Google Fonts. Textos en español. Configurar `base: "/NOMBRE_DEL_REPO/"` en vite.config.ts para GitHub Pages.

## Datos del restaurante (CAMBIAR)
- Nombre: [Nombre del restaurante]
- Dirección: [Dirección]
- Teléfono: [Teléfono]
- Horario: Almuerzo [horario], Cena [horario]

## Secciones (en orden)
1. **Navbar**: logo con el nombre, enlaces Carta/Nosotros/Reservas/Contacto (scroll suave), botón "Reservar" llama al teléfono
2. **Hero**: imagen Unsplash restaurant, overlay oscuro, título "[Frase principal]", botones Ver carta/Reservar mesa/Llamar/Cómo llegar, fade-up escalonado al montar
3. **Nosotros**: párrafos de filosofía, quote, grid de features
4. **Carta**: pestañas de categorías (CAMBIAR: Entrantes/Principales/Arroces/Postres o las que sean). Cada plato: nombre, descripción, precio con puntos suspensivos. Animación fadeIn al cambiar categoría. Pestaña activa con subrayado dorado
5. **Galería**: grid 3 columnas con imágenes Unsplash restaurant. Lightbox con flechas teclado y Escape. Animación slide-left/slide-right con IntersectionObserver activándose en cada scroll (no solo la primera vez). Degradado oscuro en parte inferior de cada imagen
6. **Opiniones**: reseñas con 5 estrellas
7. **Reservas**: formulario con sincronización Supabase en tiempo real (ver detalle)
8. **Ubicación**: Google Maps embed + botones Abrir en Maps y Llamar + horario
9. **Footer**: nombre, dirección, teléfono, copyright

## SISTEMA DE RESERVAS — IMPLEMENTACIÓN EXACTA (copiar tal cual)

### Formulario
- Inputs con 48px altura y `appearance: none` (incluyendo date y selects)
- Fecha: `<input type="date">` con onChange que resetea time a ""
- Hora: `<select>` con `<optgroup>` por turnos. Slots ocupados: `"13:00 — reservado"` y `disabled={true}`
- Personas: select 1-10
- Nombre: input text required
- Teléfono: input tel con `inputMode="numeric"`, onChange: `.replace(/[^0-9]/g, "").slice(0, 15)`
- Comentarios: textarea opcional
- Botón: "Confirmar reserva" / "No disponible" si ocupado / "Reservando..." mientras envía. Deshabilitado si falta o slot ocupado

### Sincronización Supabase (tiempo real)
Al cambiar fecha:
1. Crear canal: `supabase.channel("slots-" + date)`
2. Suscribirse a `postgres_changes` con `{ event: "*", schema: "public", table: "slots", filter: "date=eq.${date}" }`
3. En el callback hacer fetch de `slots.select("time").eq("date", date)` y actualizar estado `booked`
4. Fetch inicial inmediato
5. Cleanup desconecta canal

### Reserva (onSubmit)
1. `setSending(true)`, limpiar error
2. Insert: `{ date, time, name, phone, persons, note, created_at: new Date().toISOString() }`
3. Error 23505: mostrar "Este horario acaba de ser reservado por otra persona."
4. Éxito: `setDone({ date, time, name, phone, persons, note })`

### Pantalla de confirmación
- Icono check ✓ (círculo dorado 56px)
- "Reserva confirmada"
- Recuadro semitransparente con detalle: Fecha/Hora/Personas/Nombre/Teléfono/Comentarios. Etiquetas en dorado (#D4AF37), valores en crema (#F5F0EB)
- Botón "Llamar · [teléfono]"

### Estados del componente
```typescript
const [date, setDate] = useState("");
const [time, setTime] = useState("");
const [name, setName] = useState("");
const [phone, setPhone] = useState("");
const [persons, setPersons] = useState("");
const [note, setNote] = useState("");
const [done, setDone] = useState<{ ... } | null>(null);
const [booked, setBooked] = useState<string[]>([]);
const [sending, setSending] = useState(false);
const [error, setError] = useState("");
```

### Tabla SQL (ejecutar en Supabase SQL Editor)
```sql
CREATE TABLE slots (
  id BIGSERIAL PRIMARY KEY,
  date TEXT NOT NULL,
  time TEXT NOT NULL,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  persons TEXT NOT NULL,
  note TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (date, time)
);
ALTER TABLE slots ENABLE ROW LEVEL SECURITY;
CREATE POLICY "allow_all" ON slots FOR ALL USING (true) WITH CHECK (true);
```

## Archivos del proyecto
```json
// package.json
{
  "name": "restaurante-web",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "@supabase/supabase-js": "^2.49.4"
  },
  "devDependencies": {
    "@types/react": "^18.3.18",
    "@types/react-dom": "^18.3.5",
    "@vitejs/plugin-react": "^4.3.4",
    "typescript": "^5.7.3",
    "vite": "^5.4.14"
  }
}
```

- `vite.config.ts` con `base: "/NOMBRE_DEL_REPO/"`
- `src/supabase.ts`: `createClient(SUPABASE_URL, SUPABASE_ANON_KEY)`
- `.github/workflows/deploy.yml`: push a main → npm ci + npm run build → peaceiris/actions-gh-pages@v4 a gh-pages → habilitar Pages por API
- `index.html` con SEO meta, Open Graph, Google Fonts
- `src/App.tsx`: todos los componentes
- `src/App.css`: todos los estilos
- `tsconfig.json` con strict mode

## Pasos manuales después
1. Crear repo en GitHub (público, sin README)
2. En la carpeta:
   ```
   git init && git add -A && git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/TU_USUARIO/NOMBRE_DEL_REPO.git
   git push -u origin main
   ```
3. Ir a https://supabase.com → crear proyecto → SQL Editor → pegar CREATE TABLE → Settings → API → copiar URL y anon key a `src/supabase.ts`
4. Push de nuevo → esperar Action → Settings → Pages → seleccionar gh-pages
5. Web en: https://TU_USUARIO.github.io/NOMBRE_DEL_REPO/

## Notas importantes
- TypeScript strict, build sin errores
- Sin WhatsApp, sin Tailwind, sin Framer Motion
- Todos los textos en español
- Galería animada en CADA scroll (IntersectionObserver sin opción once)
- Inputs date y select con appearance: none y 48px
- El sistema de reservas es la parte crítica — debe funcionar exactamente así
