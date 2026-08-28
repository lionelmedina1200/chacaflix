import { useState, useEffect, useRef } from "react";
import {
  Play, Info, ChevronLeft, ChevronRight, Search, Bell, ChevronDown,
  X, Plus, ThumbsUp, Volume2, VolumeX, Calculator, FlaskConical,
  Landmark, BookOpen, Leaf, Palette, Dumbbell, Atom, Check
} from "lucide-react";

/* ============================================================
   DATA — esto es lo que vas a ir reemplazando con tus clases
   reales. Cada "materia" es una fila, cada "clase" es un video.
   videoUrl: null  -> todavía no cargaste el video (muestra aviso)
   videoUrl: "https://..." -> se reproduce en el modal
   ============================================================ */

const SUBJECTS = [
  {
    id: "mate",
    name: "Matemática",
    color: "#2E86FF",
    icon: Calculator,
    classes: [
      { id: "m1", title: "Ecuaciones lineales", prof: "Prof. García", duration: "38 min", desc: "Resolución de ecuaciones de primer grado con una incógnita, con ejercicios guiados paso a paso.", videoUrl: null },
      { id: "m2", title: "Sistemas de ecuaciones", prof: "Prof. García", duration: "45 min", desc: "Métodos de sustitución, igualación y suma-resta para resolver sistemas 2x2.", videoUrl: null },
      { id: "m3", title: "Función cuadrática", prof: "Prof. García", duration: "41 min", desc: "Gráfico de la parábola, vértice, raíces y su interpretación en problemas reales.", videoUrl: null },
      { id: "m4", title: "Teorema de Pitágoras", prof: "Prof. Ibáñez", duration: "35 min", desc: "Demostración clásica y aplicación en triángulos rectángulos.", videoUrl: null },
      { id: "m5", title: "Probabilidad básica", prof: "Prof. Ibáñez", duration: "29 min", desc: "Espacio muestral, sucesos y cálculo de probabilidades simples.", videoUrl: null },
      { id: "m6", title: "Introducción a derivadas", prof: "Prof. García", duration: "50 min", desc: "Concepto de límite y tasa de cambio como puerta de entrada al cálculo.", videoUrl: null },
    ],
  },
  {
    id: "fisica",
    name: "Física",
    color: "#FF6B35",
    icon: Atom,
    classes: [
      { id: "f1", title: "Leyes de Newton", prof: "Prof. Álvarez", duration: "47 min", desc: "Las tres leyes fundamentales de la dinámica, con ejemplos cotidianos y experimentos simples.", videoUrl: null },
      { id: "f2", title: "Cinemática: MRU y MRUV", prof: "Prof. Álvarez", duration: "44 min", desc: "Movimiento rectilíneo uniforme y uniformemente variado, gráficos posición-tiempo.", videoUrl: null },
      { id: "f3", title: "Energía cinética y potencial", prof: "Prof. Rossi", duration: "39 min", desc: "Conservación de la energía mecánica en sistemas simples.", videoUrl: null },
      { id: "f4", title: "Ondas y sonido", prof: "Prof. Rossi", duration: "33 min", desc: "Propiedades de las ondas, frecuencia, amplitud y propagación del sonido.", videoUrl: null },
      { id: "f5", title: "Electricidad básica", prof: "Prof. Álvarez", duration: "42 min", desc: "Circuitos simples, corriente, voltaje y resistencia.", videoUrl: null },
    ],
  },
  {
    id: "quimica",
    name: "Química",
    color: "#22C55E",
    icon: FlaskConical,
    classes: [
      { id: "q1", title: "Tabla periódica", prof: "Prof. Funes", duration: "36 min", desc: "Organización de los elementos, grupos, períodos y propiedades periódicas.", videoUrl: null },
      { id: "q2", title: "Enlace químico", prof: "Prof. Funes", duration: "40 min", desc: "Enlace iónico, covalente y metálico explicados con modelos moleculares.", videoUrl: null },
      { id: "q3", title: "Reacciones químicas", prof: "Prof. Domínguez", duration: "37 min", desc: "Tipos de reacciones y balanceo de ecuaciones químicas.", videoUrl: null },
      { id: "q4", title: "Ácidos y bases", prof: "Prof. Domínguez", duration: "31 min", desc: "Escala de pH y reacciones de neutralización con ejemplos de laboratorio.", videoUrl: null },
    ],
  },
  {
    id: "historia",
    name: "Historia",
    color: "#C9A227",
    icon: Landmark,
    classes: [
      { id: "h1", title: "Revolución de Mayo", prof: "Prof. Castro", duration: "48 min", desc: "Contexto, causas y consecuencias de la Semana de Mayo de 1810.", videoUrl: null },
      { id: "h2", title: "Independencia argentina", prof: "Prof. Castro", duration: "46 min", desc: "El proceso hacia la Declaración de la Independencia en 1816.", videoUrl: null },
      { id: "h3", title: "Primera Guerra Mundial", prof: "Prof. Núñez", duration: "52 min", desc: "Causas, alianzas y consecuencias del conflicto de 1914-1918.", videoUrl: null },
      { id: "h4", title: "Revolución Industrial", prof: "Prof. Núñez", duration: "44 min", desc: "Transformaciones económicas y sociales entre los siglos XVIII y XIX.", videoUrl: null },
    ],
  },
  {
    id: "lengua",
    name: "Lengua y Literatura",
    color: "#E11D48",
    icon: BookOpen,
    classes: [
      { id: "l1", title: "El género narrativo", prof: "Prof. Medina", duration: "34 min", desc: "Narrador, personajes, tiempo y espacio en el relato literario.", videoUrl: null },
      { id: "l2", title: "Análisis de 'Martín Fierro'", prof: "Prof. Medina", duration: "50 min", desc: "Contexto histórico y análisis de la obra cumbre del gauchesco.", videoUrl: null },
      { id: "l3", title: "Recursos literarios", prof: "Prof. Salas", duration: "30 min", desc: "Metáfora, símil, hipérbole y otras figuras retóricas con ejemplos.", videoUrl: null },
    ],
  },
  {
    id: "biologia",
    name: "Biología",
    color: "#16A34A",
    icon: Leaf,
    classes: [
      { id: "b1", title: "La célula", prof: "Prof. Ortiz", duration: "39 min", desc: "Estructura y función de la célula eucariota y procariota.", videoUrl: null },
      { id: "b2", title: "Fotosíntesis", prof: "Prof. Ortiz", duration: "35 min", desc: "Proceso de conversión de luz solar en energía química en las plantas.", videoUrl: null },
      { id: "b3", title: "Sistema circulatorio", prof: "Prof. Bravo", duration: "41 min", desc: "Recorrido de la sangre, corazón y vasos sanguíneos.", videoUrl: null },
      { id: "b4", title: "Genética mendeliana", prof: "Prof. Bravo", duration: "43 min", desc: "Leyes de Mendel y cruzamientos básicos con ejemplos de dominancia.", videoUrl: null },
    ],
  },
  {
    id: "arte",
    name: "Arte",
    color: "#A855F7",
    icon: Palette,
    classes: [
      { id: "a1", title: "Historia del arte: Renacimiento", prof: "Prof. Lima", duration: "37 min", desc: "Principales artistas y obras del Renacimiento italiano.", videoUrl: null },
      { id: "a2", title: "Teoría del color", prof: "Prof. Lima", duration: "28 min", desc: "Colores primarios, secundarios, complementarios y armonías.", videoUrl: null },
    ],
  },
  {
    id: "edfisica",
    name: "Educación Física",
    color: "#F97316",
    icon: Dumbbell,
    classes: [
      { id: "e1", title: "Reglas del vóley", prof: "Prof. Sosa", duration: "22 min", desc: "Reglamento básico, posiciones y sistema de puntos.", videoUrl: null },
      { id: "e2", title: "Calentamiento y elongación", prof: "Prof. Sosa", duration: "18 min", desc: "Rutina de entrada en calor previa a la actividad física.", videoUrl: null },
    ],
  },
];

// Clases con progreso (para la fila "Seguir viendo")
const CONTINUE_WATCHING = [
  { ...SUBJECTS[1].classes[0], subjectColor: SUBJECTS[1].color, subjectName: SUBJECTS[1].name, progress: 62 },
  { ...SUBJECTS[0].classes[2], subjectColor: SUBJECTS[0].color, subjectName: SUBJECTS[0].name, progress: 30 },
  { ...SUBJECTS[3].classes[1], subjectColor: SUBJECTS[3].color, subjectName: SUBJECTS[3].name, progress: 85 },
  { ...SUBJECTS[5].classes[0], subjectColor: SUBJECTS[5].color, subjectName: SUBJECTS[5].name, progress: 15 },
];

const FEATURED = { ...SUBJECTS[1].classes[0], subjectColor: SUBJECTS[1].color, subjectName: SUBJECTS[1].name };

/* ============================================================
   UI TOKENS
   ============================================================ */
const BG = "#141414";              // negro Netflix oficial
const BG_NAV_SOLID = "#141414";
const CARD_BG = "#181818";         // gris tarjeta Netflix
const CARD_HOVER_BG = "#2F2F2F";   // gris hover Netflix
const TEXT_MUTED = "#808080";      // gris texto secundario Netflix
const RED = "#E50914";             // rojo Netflix oficial
const GUTTER = "clamp(20px, 4vw, 60px)"; // margen lateral consistente
const MAX_WIDTH = 1800;            // ancho máx. de contenido, centrado
const LOGO_FONT = "'Arial Black', 'Helvetica Neue', Arial, sans-serif"; // tipografía tipo logo Netflix (bold, condensada, en bloque)

function Thumb({ classItem, color, Icon, tall }) {
  return (
    <div
      style={{
        background: `linear-gradient(150deg, ${color}CC 0%, ${color}55 45%, ${BG} 100%)`,
        width: "100%",
        height: tall ? 220 : "100%",
        position: "relative",
        display: "flex",
        alignItems: "flex-end",
        overflow: "hidden",
      }}
    >
      <Icon size={64} color="rgba(255,255,255,0.25)" style={{ position: "absolute", top: 14, right: 14 }} />
      <div style={{ padding: "10px 12px", position: "relative", zIndex: 1 }}>
        <div style={{ fontFamily: "Helvetica Neue, Arial, sans-serif", fontWeight: 700, fontSize: 18, letterSpacing: 0, color: "#fff", lineHeight: 1.15, textShadow: "0 2px 8px rgba(0,0,0,0.6)" }}>
          {classItem.title}
        </div>
      </div>
    </div>
  );
}

function Row({ title, items, onOpen }) {
  const scrollerRef = useRef(null);
  const scrollBy = (dir) => {
    if (scrollerRef.current) {
      scrollerRef.current.scrollBy({ left: dir * 620, behavior: "smooth" });
    }
  };

  return (
    <div style={{ marginBottom: 40, position: "relative" }}>
      <h2 style={{ color: "#fff", fontSize: 20, fontWeight: 700, margin: "0 0 12px 4px", fontFamily: "Helvetica Neue, Arial, sans-serif" }}>
        {title}
      </h2>
      <div style={{ position: "relative" }}>
        <button
          onClick={() => scrollBy(-1)}
          style={{
            position: "absolute", left: 0, top: 0, bottom: 0, zIndex: 10, width: 44,
            background: "linear-gradient(to right, rgba(20,20,20,0.9), transparent)",
            border: "none", cursor: "pointer", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center",
          }}
        >
          <ChevronLeft size={30} />
        </button>
        <div
          ref={scrollerRef}
          style={{ display: "flex", gap: 6, overflowX: "auto", scrollbarWidth: "none", padding: "4px 4px" }}
          className="no-scrollbar"
        >
          {items.map((c) => (
            <div
              key={c.id}
              onClick={() => onOpen(c)}
              style={{
                flex: "0 0 auto", width: 280, cursor: "pointer", borderRadius: 4, overflow: "hidden",
                background: CARD_BG, transition: "transform 220ms ease, box-shadow 220ms ease",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = "scale(1.06)"; e.currentTarget.style.boxShadow = "0 12px 30px rgba(0,0,0,0.75)"; e.currentTarget.style.zIndex = 5; e.currentTarget.style.backgroundColor = CARD_HOVER_BG; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.zIndex = 0; e.currentTarget.style.backgroundColor = CARD_BG; }}
            >
              <Thumb classItem={c} color={c.color || c.subjectColor} Icon={c.icon || Calculator} tall />
              {c.progress != null && (
                <div style={{ height: 3, background: "#4d4d4d", width: "100%" }}>
                  <div style={{ height: "100%", width: `${c.progress}%`, background: RED }} />
                </div>
              )}
              <div style={{ padding: "10px 12px 14px" }}>
                <div style={{ color: "#fff", fontSize: 13, fontWeight: 600 }}>{c.prof}</div>
                <div style={{ color: TEXT_MUTED, fontSize: 12, marginTop: 2 }}>{c.duration}</div>
              </div>
            </div>
          ))}
        </div>
        <button
          onClick={() => scrollBy(1)}
          style={{
            position: "absolute", right: 0, top: 0, bottom: 0, zIndex: 10, width: 44,
            background: "linear-gradient(to left, rgba(20,20,20,0.9), transparent)",
            border: "none", cursor: "pointer", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center",
          }}
        >
          <ChevronRight size={30} />
        </button>
      </div>
    </div>
  );
}

function Modal({ item, color, Icon, onClose }) {
  if (!item) return null;
  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, background: "rgba(0,0,0,0.75)", zIndex: 100,
        display: "flex", alignItems: "center", justifyContent: "center", padding: 20,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{ background: "#181818", width: "min(760px, 100%)", borderRadius: 8, overflow: "hidden", maxHeight: "88vh", overflowY: "auto" }}
      >
        <div style={{ position: "relative", height: 320, background: `linear-gradient(160deg, ${color}CC, ${BG})` }}>
          <Icon size={140} color="rgba(255,255,255,0.15)" style={{ position: "absolute", right: 20, top: 20 }} />
          <button onClick={onClose} style={{ position: "absolute", top: 16, right: 16, background: "#181818", border: "none", borderRadius: "50%", width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
            <X size={18} color="#fff" />
          </button>
          <div style={{ position: "absolute", bottom: 24, left: 32, right: 32 }}>
            <div style={{ fontFamily: "Helvetica Neue, Arial, sans-serif", fontWeight: 800, fontSize: 34, color: "#fff", letterSpacing: "-0.5px" }}>{item.title}</div>
            <div style={{ display: "flex", gap: 12, marginTop: 14 }}>
              <button style={{ background: "#fff", border: "none", borderRadius: 4, padding: "10px 22px", display: "flex", alignItems: "center", gap: 8, fontWeight: 700, cursor: "pointer" }}>
                <Play size={18} fill="#000" /> Reproducir
              </button>
              <button style={{ background: "rgba(120,120,120,0.4)", border: "2px solid rgba(255,255,255,0.5)", borderRadius: "50%", width: 40, height: 40, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                <Plus size={18} color="#fff" />
              </button>
              <button style={{ background: "rgba(120,120,120,0.4)", border: "2px solid rgba(255,255,255,0.5)", borderRadius: "50%", width: 40, height: 40, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                <ThumbsUp size={16} color="#fff" />
              </button>
            </div>
          </div>
        </div>
        <div style={{ padding: "24px 32px 32px", display: "flex", gap: 24 }}>
          <div style={{ flex: 1 }}>
            <div style={{ display: "flex", gap: 10, color: TEXT_MUTED, fontSize: 13, marginBottom: 10 }}>
              <span style={{ color: "#4ADE80", fontWeight: 700 }}>{item.subjectName || "Materia"}</span>
              <span>·</span>
              <span>{item.duration}</span>
            </div>
            <p style={{ color: "#d2d2d2", fontSize: 15, lineHeight: 1.5, margin: 0 }}>{item.desc}</p>
          </div>
          <div style={{ width: 180, fontSize: 13, color: TEXT_MUTED }}>
            <div style={{ marginBottom: 6 }}><span style={{ color: "#777" }}>Profesor/a: </span><span style={{ color: "#fff" }}>{item.prof}</span></div>
          </div>
        </div>
        {!item.videoUrl && (
          <div style={{ margin: "0 32px 28px", padding: 16, border: "1px dashed #444", borderRadius: 6, color: TEXT_MUTED, fontSize: 13 }}>
            📹 Todavía no cargaste el video de esta clase. Cuando lo subas, agregá la URL en el campo <code style={{ color: "#eee" }}>videoUrl</code> de este item y acá se va a reproducir automáticamente.
          </div>
        )}
        {item.videoUrl && (
          <video controls src={item.videoUrl} style={{ width: "calc(100% - 64px)", margin: "0 32px 28px", borderRadius: 6 }} />
        )}
      </div>
    </div>
  );
}

export default function ChacaFlix() {
  const [scrolled, setScrolled] = useState(false);
  const [modalItem, setModalItem] = useState(null);
  const [modalColor, setModalColor] = useState(RED);
  const [modalIcon, setModalIcon] = useState(() => Calculator);
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const openModal = (item, subject) => {
    setModalItem(item);
    setModalColor(subject ? subject.color : (item.subjectColor || RED));
    setModalIcon(() => (subject ? subject.icon : Atom));
  };

  return (
    <div style={{ background: BG, minHeight: "100vh", fontFamily: "Helvetica Neue, Arial, sans-serif" }}>
      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
      `}</style>

      {/* NAVBAR */}
      <div
        style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
          background: scrolled ? BG_NAV_SOLID : "linear-gradient(to bottom, rgba(0,0,0,0.75), transparent)",
          transition: "background 300ms ease",
        }}
      >
        <div style={{
          maxWidth: MAX_WIDTH, margin: "0 auto", padding: `16px ${GUTTER}`,
          display: "flex", alignItems: "center", justifyContent: "space-between",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 36 }}>
            <div style={{ color: RED, fontFamily: LOGO_FONT, fontWeight: 900, fontSize: 28, letterSpacing: "-1px", textTransform: "uppercase" }}>
              Chacaflix
            </div>
            <nav style={{ display: "flex", gap: 20, fontSize: 14, color: "#e5e5e5" }}>
              <span style={{ color: "#fff", fontWeight: 700, cursor: "pointer" }}>Inicio</span>
              <span style={{ cursor: "pointer" }}>Materias</span>
              <span style={{ cursor: "pointer" }}>Seguir viendo</span>
              <span style={{ cursor: "pointer" }}>Mi lista</span>
            </nav>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 20, color: "#fff" }}>
            <Search size={19} style={{ cursor: "pointer" }} />
            <Bell size={19} style={{ cursor: "pointer" }} />
            <div style={{ display: "flex", alignItems: "center", gap: 6, cursor: "pointer" }}>
              <div style={{ width: 30, height: 30, borderRadius: 6, background: RED, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700 }}>A</div>
              <ChevronDown size={14} />
            </div>
          </div>
        </div>
      </div>

      {/* HERO */}
      <div style={{ position: "relative", height: "78vh", minHeight: 480 }}>
        <div style={{
          position: "absolute", inset: 0,
          background: `linear-gradient(120deg, ${FEATURED.subjectColor}77 0%, ${BG} 75%)`,
        }} />
        <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to top, ${BG} 2%, transparent 55%)` }} />
        <Atom size={340} color="rgba(255,255,255,0.06)" style={{ position: "absolute", right: 60, top: 40 }} />

        {/* contenedor centrado, mismo ancho máx. y margen que el navbar y las filas */}
        <div style={{
          position: "relative", height: "100%", maxWidth: MAX_WIDTH, margin: "0 auto",
          padding: `0 ${GUTTER}`, display: "flex", alignItems: "flex-end",
        }}>
          <div style={{ maxWidth: 620, paddingBottom: 70 }}>
            <div style={{ color: "#4ADE80", fontWeight: 700, fontSize: 14, marginBottom: 10 }}>Clase destacada · {FEATURED.subjectName}</div>
            <div style={{ fontFamily: "Helvetica Neue, Arial, sans-serif", fontWeight: 800, fontSize: 56, color: "#fff", lineHeight: 1.02, letterSpacing: "-0.5px" }}>
              {FEATURED.title}
            </div>
            <div style={{ color: "#d2d2d2", fontSize: 15, margin: "18px 0", lineHeight: 1.5 }}>
              {FEATURED.desc}
            </div>
            <div style={{ display: "flex", gap: 12 }}>
              <button
                onClick={() => openModal(FEATURED, SUBJECTS[1])}
                style={{ background: "#fff", border: "none", borderRadius: 4, padding: "12px 26px", fontWeight: 700, fontSize: 15, display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}
              >
                <Play size={20} fill="#000" /> Reproducir
              </button>
              <button
                onClick={() => openModal(FEATURED, SUBJECTS[1])}
                style={{ background: "rgba(109,109,110,0.5)", color: "#fff", border: "none", borderRadius: 4, padding: "12px 26px", fontWeight: 700, fontSize: 15, display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}
              >
                <Info size={20} /> Más información
              </button>
            </div>
          </div>

          <button
            onClick={() => setMuted((m) => !m)}
            style={{ position: "absolute", bottom: 70, right: 0, border: "1px solid rgba(255,255,255,0.5)", background: "rgba(0,0,0,0.4)", borderRadius: "50%", width: 42, height: 42, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}
          >
            {muted ? <VolumeX size={18} color="#fff" /> : <Volume2 size={18} color="#fff" />}
          </button>
        </div>
      </div>

      {/* ROWS — mismo contenedor centrado y mismo margen que navbar y hero */}
      <div style={{
        position: "relative", zIndex: 2, maxWidth: MAX_WIDTH, margin: "0 auto",
        padding: `0 ${GUTTER} 60px`, marginTop: -40,
      }}>
        <Row title="Seguir viendo" items={CONTINUE_WATCHING} onOpen={(item) => openModal(item, { color: item.subjectColor, icon: Atom })} />
        {SUBJECTS.map((s) => (
          <Row
            key={s.id}
            title={s.name}
            items={s.classes.map((c) => ({ ...c, color: s.color, icon: s.icon, subjectName: s.name }))}
            onOpen={(item) => openModal(item, s)}
          />
        ))}
      </div>

      <Modal item={modalItem} color={modalColor} Icon={modalIcon} onClose={() => setModalItem(null)} />
    </div>
  );
}
