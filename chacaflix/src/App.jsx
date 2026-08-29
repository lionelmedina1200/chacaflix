import { useState, useEffect, useRef } from "react";
import {
  Play, Pause, Info, ChevronLeft, ChevronRight, Search, Bell, ChevronDown,
  X, Plus, ThumbsUp, Calculator, FlaskConical,
  Landmark, BookOpen, Leaf, Palette, Dumbbell, Atom, Check,
  Rewind, FastForward, Volume2, VolumeX, Sun, Maximize, Minimize
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
      { id: "m1", title: "Ecuaciones lineales", prof: "Prof. García", duration: "38 min", desc: "Resolución de ecuaciones de primer grado con una incógnita, con ejercicios guiados paso a paso.", videoUrl: "https://youtu.be/h3_GcxDq5h4" },
      { id: "m2", title: "Sistemas de ecuaciones", prof: "Prof. García", duration: "45 min", desc: "Métodos de sustitución, igualación y suma-resta para resolver sistemas 2x2.", videoUrl: "https://youtu.be/_IWs9s3XdOA" },
      { id: "m3", title: "Razones trigonométricas", prof: "Prof. García", duration: "41 min", desc: "Qué son el seno, coseno y tangente, y cómo se calculan en un triángulo rectángulo.", videoUrl: "https://youtu.be/7pUi5lvLf7c" },
      { id: "m4", title: "Teorema de Pitágoras", prof: "Prof. Ibáñez", duration: "35 min", desc: "Demostración clásica y aplicación en triángulos rectángulos.", videoUrl: "https://youtu.be/_IWs9s3XdOA" },
      { id: "m5", title: "Probabilidad básica", prof: "Prof. Ibáñez", duration: "29 min", desc: "Espacio muestral, sucesos y cálculo de probabilidades simples.", videoUrl: "https://youtu.be/LWRcpMfUCUE" },
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
      { id: "q1", title: "Tabla periódica", prof: "Prof. Funes", duration: "36 min", desc: "Organización de los elementos, grupos, períodos y propiedades periódicas.", videoUrl: "https://youtu.be/9B3UHUVziIE" },
      { id: "q2", title: "Enlace químico", prof: "Prof. Funes", duration: "40 min", desc: "Enlace iónico, covalente y metálico explicados con modelos moleculares.", videoUrl: "https://youtu.be/t_kbksviWx8" },
      { id: "q3", title: "Reacciones químicas", prof: "Prof. Domínguez", duration: "37 min", desc: "Tipos de reacciones y balanceo de ecuaciones químicas.", videoUrl: "https://youtu.be/4B_719zRWL8" },
      { id: "q4", title: "Ácidos y bases", prof: "Prof. Domínguez", duration: "31 min", desc: "Escala de pH y reacciones de neutralización con ejemplos de laboratorio.", videoUrl: "https://youtu.be/jIbnc0j_ihk" },
    ],
  },
  {
    id: "historia",
    name: "Historia",
    color: "#C9A227",
    icon: Landmark,
    classes: [
      { id: "h1", title: "Historia de las civilizaciones", prof: "Prof. Castro", duration: "48 min", desc: "Documental recorriendo la historia humana: Edad Antigua, Edad Media y Edad Moderna.", videoUrl: "https://youtu.be/99I8tt5ZwKE" },
      { id: "h2", title: "El planeta Tierra en 20 minutos", prof: "Prof. Castro", duration: "46 min", desc: "Documental que repasa la formación y las características principales del planeta Tierra.", videoUrl: "https://youtu.be/kQWWCI_Wd_8" },
      { id: "h3", title: "Primera Guerra Mundial", prof: "Prof. Núñez", duration: "52 min", desc: "Causas, alianzas y consecuencias del conflicto de 1914-1918.", videoUrl: "https://youtu.be/S8QavHAduhA" },
      { id: "h4", title: "Revolución Industrial", prof: "Prof. Núñez", duration: "44 min", desc: "Transformaciones económicas y sociales entre los siglos XVIII y XIX.", videoUrl: "https://youtu.be/1Li2W2XjV6I" },
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

// Clases para la fila "Seguir viendo". El progreso (barra roja) solo se muestra
// cuando hay datos reales de visualización; por ahora no hay ninguno cargado.
const CONTINUE_WATCHING = [
  { ...SUBJECTS[1].classes[0], subjectColor: SUBJECTS[1].color, subjectName: SUBJECTS[1].name, icon: SUBJECTS[1].icon },
  { ...SUBJECTS[0].classes[2], subjectColor: SUBJECTS[0].color, subjectName: SUBJECTS[0].name, icon: SUBJECTS[0].icon },
  { ...SUBJECTS[3].classes[1], subjectColor: SUBJECTS[3].color, subjectName: SUBJECTS[3].name, icon: SUBJECTS[3].icon },
  { ...SUBJECTS[5].classes[0], subjectColor: SUBJECTS[5].color, subjectName: SUBJECTS[5].name, icon: SUBJECTS[5].icon },
];

// Pool de clases destacadas que rotan en el hero cada 5 segundos.
// Agregá o sacá items acá para cambiar qué se muestra arriba de todo.
const FEATURED_POOL = [
  { ...SUBJECTS[1].classes[0], subjectColor: SUBJECTS[1].color, subjectName: SUBJECTS[1].name, subject: SUBJECTS[1] },
  { ...SUBJECTS[0].classes[0], subjectColor: SUBJECTS[0].color, subjectName: SUBJECTS[0].name, subject: SUBJECTS[0] },
  { ...SUBJECTS[3].classes[0], subjectColor: SUBJECTS[3].color, subjectName: SUBJECTS[3].name, subject: SUBJECTS[3] },
  { ...SUBJECTS[5].classes[0], subjectColor: SUBJECTS[5].color, subjectName: SUBJECTS[5].name, subject: SUBJECTS[5] },
  { ...SUBJECTS[2].classes[0], subjectColor: SUBJECTS[2].color, subjectName: SUBJECTS[2].name, subject: SUBJECTS[2] },
];

// Devuelve todas las clases de todas las materias en una sola lista plana,
// usada para "Mi lista", "Seguir viendo" y el buscador.
function getAllClasses() {
  const all = [];
  SUBJECTS.forEach((s) => {
    s.classes.forEach((c) => all.push({ ...c, color: s.color, icon: s.icon, subjectName: s.name, subject: s }));
  });
  return all;
}

// --- Perfiles (persisten en el navegador del alumno) ---
const PROFILE_COLORS = ["#E50914", "#2E86FF", "#22C55E", "#F97316", "#A855F7", "#EAB308"];
function readProfiles() {
  try { return JSON.parse(localStorage.getItem("chacaflix_profiles") || "[]"); } catch { return []; }
}
function writeProfiles(list) {
  try { localStorage.setItem("chacaflix_profiles", JSON.stringify(list)); } catch {}
}

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

// Extrae el ID de video de cualquier link de YouTube (youtube.com/watch?v=, youtu.be/, shorts, embed)
// Cuando pegues tus links reales en "videoUrl", esto se encarga solo de detectarlos.
function getYouTubeId(url) {
  if (!url) return null;
  const match = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([A-Za-z0-9_-]{6,})/);
  return match ? match[1] : null;
}

function Thumb({ classItem, color, Icon, tall }) {
  const ytId = getYouTubeId(classItem.videoUrl);
  const ytThumb = ytId ? `https://img.youtube.com/vi/${ytId}/hqdefault.jpg` : null;

  return (
    <div
      style={{
        width: "100%",
        height: tall ? 220 : "100%",
        position: "relative",
        overflow: "hidden",
        background: ytThumb ? "#000" : `linear-gradient(150deg, ${color}CC 0%, ${color}55 45%, ${BG} 100%)`,
      }}
    >
      {ytThumb ? (
        <img src={ytThumb} alt={classItem.title} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
      ) : (
        <>
          <div style={{ position: "absolute", inset: 0, backgroundImage: "repeating-linear-gradient(45deg, rgba(255,255,255,0.035) 0px, rgba(255,255,255,0.035) 2px, transparent 2px, transparent 14px)" }} />
          <Icon size={84} color="rgba(255,255,255,0.22)" style={{ position: "absolute", top: 16, right: 16 }} />
        </>
      )}

      {/* ícono de play que aparece al pasar el mouse por la tarjeta, igual que Netflix */}
      <div className="thumb-play" style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", opacity: 0, transition: "opacity 200ms ease", background: "rgba(0,0,0,0.25)" }}>
        <div style={{ width: 50, height: 50, borderRadius: "50%", background: "rgba(255,255,255,0.92)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Play size={20} fill="#000" color="#000" style={{ marginLeft: 3 }} />
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
              className="card-item"
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
                {c.videoUrl && (
                  <div style={{ color: "#fff", fontSize: 13, fontWeight: 700, marginBottom: 3, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{c.title}</div>
                )}
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

// Carga la API de YouTube una sola vez (la reutiliza si ya está cargada)
function useYouTubeAPI() {
  const [ready, setReady] = useState(!!(window.YT && window.YT.Player));
  useEffect(() => {
    if (window.YT && window.YT.Player) { setReady(true); return; }
    if (!document.getElementById("youtube-iframe-api")) {
      const tag = document.createElement("script");
      tag.id = "youtube-iframe-api";
      tag.src = "https://www.youtube.com/iframe_api";
      document.body.appendChild(tag);
    }
    const prev = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => { if (prev) prev(); setReady(true); };
  }, []);
  return ready;
}

function fmtTime(s) {
  if (!isFinite(s) || s < 0) return "0:00";
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2, "0")}`;
}

const iconBtnStyle = { background: "transparent", border: "none", cursor: "pointer", color: "#fff", display: "flex", alignItems: "center", padding: 4 };

/* ============================================================
   REPRODUCTOR PROPIO — controles estilo Netflix
   Funciona tanto con videos de YouTube (usa la API oficial y
   oculta los controles nativos de YouTube) como con un link de
   video directo (usa la etiqueta <video> normal de HTML).
   ============================================================ */
function ClassPlayer({ ytId, rawUrl, title }) {
  const apiReady = useYouTubeAPI();
  const ytContainerRef = useRef(null);
  const ytPlayerRef = useRef(null);
  const videoRef = useRef(null);
  const wrapperRef = useRef(null);
  const hideTimer = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(100);
  const [muted, setMuted] = useState(false);
  const [brightness, setBrightness] = useState(1);
  const [showControls, setShowControls] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [playerError, setPlayerError] = useState(null);
  const playerLoadedRef = useRef(false);

  // --- inicialización del player de YouTube ---
  useEffect(() => {
    if (!ytId || !apiReady || !ytContainerRef.current) return;
    ytPlayerRef.current = new window.YT.Player(ytContainerRef.current, {
      width: "100%",
      height: "100%",
      videoId: ytId,
      playerVars: { controls: 0, disablekb: 1, rel: 0, modestbranding: 1, iv_load_policy: 3, playsinline: 1, mute: 1, autoplay: 1 },
      events: {
        onReady: (e) => {
          playerLoadedRef.current = true;
          setDuration(e.target.getDuration());
          // arranca silenciado para esquivar el bloqueo de autoplay de los navegadores;
          // el botón de volumen deja reactivar el sonido en cualquier momento
          e.target.mute();
          setMuted(true);
          e.target.playVideo();
        },
        onStateChange: (e) => setIsPlaying(e.data === window.YT.PlayerState.PLAYING),
        onError: (e) => {
          // 101/150 = el dueño del video desactivó la reproducción embebida
          // 100 = el video fue eliminado o es privado
          setPlayerError(e.data === 101 || e.data === 150 ? "embed" : "unavailable");
        },
      },
    });
    return () => { ytPlayerRef.current?.destroy?.(); };
  }, [ytId, apiReady]);

  // si a los 7s no cargó nada y tampoco avisó un error puntual, mostramos igual el aviso
  useEffect(() => {
    if (!ytId) return;
    const t = setTimeout(() => { if (!playerLoadedRef.current) setPlayerError((prev) => prev || "timeout"); }, 7000);
    return () => clearTimeout(t);
  }, [ytId]);

  // --- progreso: YouTube no avisa el tiempo solo, hay que consultarlo ---
  useEffect(() => {
    const interval = setInterval(() => {
      if (ytId && ytPlayerRef.current?.getCurrentTime) {
        setCurrent(ytPlayerRef.current.getCurrentTime());
        const d = ytPlayerRef.current.getDuration();
        if (d) setDuration(d);
      } else if (!ytId && videoRef.current) {
        setCurrent(videoRef.current.currentTime);
        setDuration(videoRef.current.duration || 0);
      }
    }, 350);
    return () => clearInterval(interval);
  }, [ytId]);

  const togglePlay = () => {
    if (ytId) {
      if (!ytPlayerRef.current) return;
      isPlaying ? ytPlayerRef.current.pauseVideo() : ytPlayerRef.current.playVideo();
    } else if (videoRef.current) {
      isPlaying ? videoRef.current.pause() : videoRef.current.play();
      setIsPlaying(!isPlaying);
    }
  };

  const skip = (secs) => {
    const target = Math.max(0, Math.min(current + secs, duration || current + secs));
    if (ytId) ytPlayerRef.current?.seekTo(target, true);
    else if (videoRef.current) videoRef.current.currentTime = target;
    setCurrent(target);
  };

  const handleSeekClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const pct = Math.min(1, Math.max(0, (e.clientX - rect.left) / rect.width));
    const target = pct * duration;
    if (ytId) ytPlayerRef.current?.seekTo(target, true);
    else if (videoRef.current) videoRef.current.currentTime = target;
    setCurrent(target);
  };

  const toggleMute = () => {
    const next = !muted;
    setMuted(next);
    if (ytId) next ? ytPlayerRef.current?.mute() : ytPlayerRef.current?.unMute();
    else if (videoRef.current) videoRef.current.muted = next;
  };

  const handleVolume = (v) => {
    setVolume(v);
    const shouldMute = v === 0;
    setMuted(shouldMute);
    if (ytId) { ytPlayerRef.current?.setVolume(v); shouldMute ? ytPlayerRef.current?.mute() : ytPlayerRef.current?.unMute(); }
    else if (videoRef.current) { videoRef.current.volume = v / 100; videoRef.current.muted = shouldMute; }
  };

  const toggleFullscreen = () => {
    if (!wrapperRef.current) return;
    if (!document.fullscreenElement) { wrapperRef.current.requestFullscreen?.(); setIsFullscreen(true); }
    else { document.exitFullscreen?.(); setIsFullscreen(false); }
  };

  const resetHideTimer = () => {
    setShowControls(true);
    clearTimeout(hideTimer.current);
    hideTimer.current = setTimeout(() => setShowControls(false), 3000);
  };
  useEffect(() => { resetHideTimer(); return () => clearTimeout(hideTimer.current); }, []);

  // mantiene el estado sincronizado si el usuario sale de pantalla completa con ESC
  useEffect(() => {
    const onFsChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", onFsChange);
    return () => document.removeEventListener("fullscreenchange", onFsChange);
  }, []);

  const progressPct = duration ? (current / duration) * 100 : 0;

  // en pantalla completa los controles se agrandan para que no se vean diminutos
  const iconSize = isFullscreen ? 28 : 18;
  const bigIconSize = isFullscreen ? 20 : 20;
  const centralPlaySize = isFullscreen ? 100 : 60;
  const centralPlayIcon = isFullscreen ? 40 : 26;
  const barPadding = isFullscreen ? "18px 34px 28px" : "8px 16px 12px";
  const sliderWidth = isFullscreen ? 120 : 70;
  const timeFontSize = isFullscreen ? 16 : 12;
  const progressBarHeight = isFullscreen ? 7 : 5;
  const controlsGap = isFullscreen ? 22 : 12;

  // si el video no se puede reproducir acá adentro, avisamos claro en vez de dejar la pantalla negra
  if (playerError) {
    const messages = {
      embed: "El dueño de este video desactivó la reproducción embebida (fuera de YouTube). No hay forma de esquivar eso desde acá.",
      unavailable: "Este video ya no está disponible o es privado.",
      timeout: "El video está tardando demasiado en cargar. Puede que la reproducción embebida esté bloqueada.",
    };
    return (
      <div style={{ position: "relative", width: "100%", paddingTop: "56.25%", background: "#000" }}>
        <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 14, padding: 24, textAlign: "center" }}>
          <div style={{ color: "#ddd", fontSize: 13, maxWidth: 380 }}>⚠️ {messages[playerError] || messages.unavailable}</div>
          <a
            href={rawUrl}
            target="_blank"
            rel="noreferrer"
            style={{ background: RED, color: "#fff", padding: "10px 22px", borderRadius: 4, fontWeight: 700, fontSize: 14, textDecoration: "none" }}
          >
            Ver en YouTube
          </a>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={wrapperRef}
      onMouseMove={resetHideTimer}
      style={
        isFullscreen
          ? { position: "fixed", inset: 0, width: "100vw", height: "100vh", background: "#000", overflow: "hidden", zIndex: 9999 }
          : { position: "relative", width: "100%", paddingTop: "56.25%", background: "#000", overflow: "hidden" }
      }
    >
      {ytId ? (
        <div ref={ytContainerRef} className="yt-fill" style={{ position: "absolute", inset: 0, filter: `brightness(${brightness})` }} />
      ) : (
        <video
          ref={videoRef}
          src={rawUrl}
          autoPlay
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onLoadedMetadata={(e) => setDuration(e.target.duration)}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", filter: `brightness(${brightness})` }}
        />
      )}

      {/* capa clickeable sobre el video para togglear play/pausa */}
      <div onClick={togglePlay} style={{ position: "absolute", inset: 0, cursor: "pointer" }} />

      {/* botón grande de play cuando está pausado */}
      {!isPlaying && (
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", pointerEvents: "none" }}>
          <div style={{ width: centralPlaySize, height: centralPlaySize, borderRadius: "50%", background: "rgba(0,0,0,0.55)", border: "2px solid rgba(255,255,255,0.8)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Play size={centralPlayIcon} color="#fff" fill="#fff" style={{ marginLeft: 3 }} />
          </div>
        </div>
      )}

      {/* barra de controles inferior */}
      <div
        style={{
          position: "absolute", left: 0, right: 0, bottom: 0, padding: barPadding,
          background: "linear-gradient(to top, rgba(0,0,0,0.9), transparent)",
          opacity: showControls ? 1 : 0, transition: "opacity 250ms ease",
          pointerEvents: showControls ? "auto" : "none",
        }}
      >
        <div onClick={handleSeekClick} style={{ height: progressBarHeight, background: "rgba(255,255,255,0.3)", borderRadius: 3, cursor: "pointer", marginBottom: 10 }}>
          <div style={{ height: "100%", width: `${progressPct}%`, background: RED, borderRadius: 3, position: "relative" }}>
            <div style={{ position: "absolute", right: -5, top: (progressBarHeight - 12) / 2, width: 12, height: 12, borderRadius: "50%", background: RED }} />
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: controlsGap, flexWrap: "wrap" }}>
          <button onClick={togglePlay} style={iconBtnStyle} aria-label={isPlaying ? "Pausar" : "Reproducir"}>
            {isPlaying ? <Pause size={iconSize} fill="#fff" /> : <Play size={iconSize} fill="#fff" />}
          </button>
          <button onClick={() => skip(-10)} style={iconBtnStyle} aria-label="Retroceder 10 segundos">
            <Rewind size={iconSize} />
          </button>
          <button onClick={() => skip(10)} style={iconBtnStyle} aria-label="Adelantar 10 segundos">
            <FastForward size={iconSize} />
          </button>
          <button onClick={toggleMute} style={iconBtnStyle} aria-label={muted ? "Activar sonido" : "Silenciar"}>
            {muted || volume === 0 ? <VolumeX size={iconSize} /> : <Volume2 size={iconSize} />}
          </button>
          <input type="range" min="0" max="100" value={muted ? 0 : volume} onChange={(e) => handleVolume(Number(e.target.value))} className="player-range" style={{ width: sliderWidth }} />

          <span style={{ color: "#ddd", fontSize: timeFontSize, minWidth: sliderWidth + 22 }}>{fmtTime(current)} / {fmtTime(duration)}</span>

          <div style={{ flex: 1, minWidth: 8 }} />

          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <Sun size={iconSize} />
            <input type="range" min="0.3" max="1" step="0.05" value={brightness} onChange={(e) => setBrightness(Number(e.target.value))} className="player-range" style={{ width: sliderWidth }} title="Brillo" />
          </div>

          <button onClick={toggleFullscreen} style={iconBtnStyle} aria-label="Pantalla completa">
            {isFullscreen ? <Minimize size={iconSize} /> : <Maximize size={iconSize} />}
          </button>
        </div>
      </div>
    </div>
  );
}

// Guarda "Mi lista" y "Me gusta" en el navegador del alumno, para que persista entre visitas
function readIdList(key) {
  try { return JSON.parse(localStorage.getItem(key) || "[]"); } catch { return []; }
}
function writeIdList(key, list) {
  try { localStorage.setItem(key, JSON.stringify(list)); } catch {}
}

// Muestra la portada real de un video de YouTube. Si la versión de alta
// resolución no existe para ese video, cae automáticamente a una más chica.
function YtCover({ ytId, style, alt }) {
  const [src, setSrc] = useState(`https://img.youtube.com/vi/${ytId}/maxresdefault.jpg`);
  const [fallenBack, setFallenBack] = useState(false);
  return (
    <img
      src={src}
      alt={alt || ""}
      style={style}
      onError={() => { if (!fallenBack) { setFallenBack(true); setSrc(`https://img.youtube.com/vi/${ytId}/hqdefault.jpg`); } }}
    />
  );
}

function Modal({ item, color, Icon, onClose, autoPlay }) {
  const [myList, setMyList] = useState(() => readIdList("chacaflix_my_list"));
  const [liked, setLiked] = useState(() => readIdList("chacaflix_liked"));
  const [wantsPlay, setWantsPlay] = useState(autoPlay);
  useEffect(() => { setWantsPlay(autoPlay); }, [item?.id, autoPlay]);
  if (!item) return null;
  const ytId = getYouTubeId(item.videoUrl);

  const inMyList = myList.includes(item.id);
  const isLiked = liked.includes(item.id);
  const toggleMyList = () => {
    const next = inMyList ? myList.filter((id) => id !== item.id) : [...myList, item.id];
    setMyList(next);
    writeIdList("chacaflix_my_list", next);
  };
  const toggleLiked = () => {
    const next = isLiked ? liked.filter((id) => id !== item.id) : [...liked, item.id];
    setLiked(next);
    writeIdList("chacaflix_liked", next);
  };

  const pillBtn = { background: "rgba(120,120,120,0.4)", border: "2px solid rgba(255,255,255,0.5)", borderRadius: "50%", width: 40, height: 40, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" };

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
        {/* CABECERA: reproductor real (si el usuario tocó "Reproducir"), vista previa (si tocó "Más información"), o aviso si no hay video */}
        <div style={{ position: "relative" }}>
          {item.videoUrl && wantsPlay && (
            <ClassPlayer key={item.id} ytId={ytId} rawUrl={item.videoUrl} title={item.title} />
          )}
          {item.videoUrl && !wantsPlay && (
            <div style={{ position: "relative", height: 320, background: "#000" }}>
              {ytId && (
                <YtCover ytId={ytId} alt={item.title} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
              )}
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.15) 55%, transparent 75%)" }} />
              <button
                onClick={() => setWantsPlay(true)}
                style={{ position: "absolute", inset: 0, margin: "auto", width: 64, height: 64, borderRadius: "50%", background: "rgba(255,255,255,0.92)", border: "none", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}
                aria-label="Reproducir"
              >
                <Play size={26} fill="#000" color="#000" style={{ marginLeft: 3 }} />
              </button>
              <div style={{ position: "absolute", bottom: 24, left: 32, right: 32 }}>
                <div style={{ fontFamily: "Helvetica Neue, Arial, sans-serif", fontWeight: 800, fontSize: 30, color: "#fff", letterSpacing: "-0.5px" }}>{item.title}</div>
              </div>
            </div>
          )}
          {!item.videoUrl && (
            <div style={{ position: "relative", height: 320, background: `linear-gradient(160deg, ${color}CC, ${BG})` }}>
              <Icon size={140} color="rgba(255,255,255,0.15)" style={{ position: "absolute", right: 20, top: 20 }} />
              <div style={{ position: "absolute", bottom: 24, left: 32, right: 32 }}>
                <div style={{ fontFamily: "Helvetica Neue, Arial, sans-serif", fontWeight: 800, fontSize: 34, color: "#fff", letterSpacing: "-0.5px" }}>{item.title}</div>
                <div style={{ marginTop: 8, color: "#ffd166", fontSize: 13, fontWeight: 600 }}>📹 Video próximamente</div>
              </div>
            </div>
          )}
          <button onClick={onClose} style={{ position: "absolute", top: 16, right: 16, zIndex: 5, background: "#181818", border: "none", borderRadius: "50%", width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
            <X size={18} color="#fff" />
          </button>
        </div>

        <div style={{ padding: "20px 32px 0" }}>
          {item.videoUrl && wantsPlay && (
            <div style={{ fontFamily: "Helvetica Neue, Arial, sans-serif", fontWeight: 800, fontSize: 26, color: "#fff", letterSpacing: "-0.5px" }}>{item.title}</div>
          )}
          <div style={{ display: "flex", gap: 12, marginTop: item.videoUrl && wantsPlay ? 14 : 0, marginBottom: 6 }}>
            <button onClick={toggleMyList} style={pillBtn} aria-label={inMyList ? "Quitar de mi lista" : "Agregar a mi lista"} title={inMyList ? "En tu lista" : "Agregar a mi lista"}>
              {inMyList ? <Check size={18} color="#4ADE80" /> : <Plus size={18} color="#fff" />}
            </button>
            <button onClick={toggleLiked} style={pillBtn} aria-label={isLiked ? "Quitar me gusta" : "Me gusta"} title="Me gusta">
              <ThumbsUp size={16} color={isLiked ? RED : "#fff"} fill={isLiked ? RED : "none"} />
            </button>
          </div>
        </div>

        <div style={{ padding: "16px 32px 32px", display: "flex", gap: 24 }}>
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
      </div>
    </div>
  );
}

/* ============================================================
   INTRO ANIMADA — homenaje a la animación de arranque de Netflix,
   con el logo de Chacaflix. Se muestra una vez al abrir la página.
   ============================================================ */
function IntroAnimation({ onDone }) {
  // C aparece primero → el resto de las letras se expande desde ahí en cascada →
  // se sostiene el logo 1 segundo completo → fundido a negro → entra solo.
  const CASCADE_START = 380;
  const CASCADE_STAGGER = 70;
  const CASCADE_DURATION = 420;
  const otherLettersCount = 8; // "HACAFLIX"
  const cascadeEnd = CASCADE_START + (otherLettersCount - 1) * CASCADE_STAGGER + CASCADE_DURATION;
  const holdEnd = cascadeEnd + 1000; // 1 segundo de pausa una vez armado el logo completo
  const fadeDuration = 500;
  const totalDuration = holdEnd + fadeDuration;

  useEffect(() => {
    const t = setTimeout(onDone, totalDuration);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onDone]);

  const letters = "CHACAFLIX".split("");

  return (
    <div
      style={{
        position: "fixed", inset: 0, background: "#000", zIndex: 999,
        display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden",
        fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
      }}
    >
      <style>{`
        @keyframes introC {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }
        @keyframes introFromC {
          0% { opacity: 0; max-width: 0; }
          100% { opacity: 1; max-width: 1.3em; }
        }
        @keyframes introOut {
          0% { opacity: 1; }
          100% { opacity: 0; }
        }
        .intro-wrap { animation: introOut ${fadeDuration}ms ease ${holdEnd}ms forwards; }
        .intro-letter-c { display: inline-block; animation: introC 400ms ease forwards; }
        .intro-letter {
          display: inline-block; overflow: hidden; white-space: nowrap; vertical-align: bottom;
          opacity: 0; max-width: 0;
          animation: introFromC ${CASCADE_DURATION}ms ease forwards;
        }
      `}</style>

      <div className="intro-wrap" style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center", width: "100%", padding: "0 8vw", boxSizing: "border-box" }}>
        <div style={{ fontFamily: LOGO_FONT, fontWeight: 900, fontSize: "clamp(32px, 7vw, 96px)", color: RED, letterSpacing: "-0.03em", textTransform: "uppercase", whiteSpace: "nowrap", transform: "scaleY(1.14)", textShadow: "3px 4px 0px #7A0D12, 0 10px 24px rgba(0,0,0,0.6)" }}>
          {letters.map((l, i) =>
            i === 0 ? (
              <span key={i} className="intro-letter-c">{l}</span>
            ) : (
              <span key={i} className="intro-letter" style={{ animationDelay: `${CASCADE_START + (i - 1) * CASCADE_STAGGER}ms` }}>{l}</span>
            )
          )}
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   SELECCIÓN / CREACIÓN DE PERFIL — pantalla "¿Quién está mirando?"
   ============================================================ */
function ProfileGate({ onSelect }) {
  const [profiles, setProfiles] = useState(() => readProfiles());
  const [creating, setCreating] = useState(profiles.length === 0);
  const [name, setName] = useState("");

  const nextColor = PROFILE_COLORS[profiles.length % PROFILE_COLORS.length];

  const createProfile = () => {
    const trimmed = name.trim();
    if (!trimmed) return;
    const profile = { id: `p_${Date.now()}`, name: trimmed, color: nextColor };
    const next = [...profiles, profile];
    setProfiles(next);
    writeProfiles(next);
    setName("");
    setCreating(false);
    onSelect(profile);
  };

  return (
    <div style={{ position: "fixed", inset: 0, background: BG, zIndex: 900, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 24, fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}>
      <div style={{ color: RED, fontFamily: LOGO_FONT, fontWeight: 900, fontSize: 30, letterSpacing: "-1px", textTransform: "uppercase", position: "absolute", top: 32, left: "50%", transform: "translateX(-50%)", textShadow: "2px 3px 0px #7A0D12, 0 6px 14px rgba(0,0,0,0.6)" }}>
        Chacaflix
      </div>

      <h1 style={{ color: "#fff", fontSize: "clamp(24px, 4vw, 40px)", fontWeight: 500, marginBottom: 36, textAlign: "center" }}>
        {creating ? "Creá tu perfil" : "¿Quién está mirando?"}
      </h1>

      {!creating && (
        <div style={{ display: "flex", gap: 24, flexWrap: "wrap", justifyContent: "center", maxWidth: 700 }}>
          {profiles.map((p) => (
            <button
              key={p.id}
              onClick={() => onSelect(p)}
              style={{ background: "transparent", border: "none", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 10, width: 120 }}
            >
              <div
                style={{
                  width: 100, height: 100, borderRadius: 8, background: p.color, display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 40, fontWeight: 800, color: "#fff", fontFamily: "Helvetica Neue, Arial, sans-serif", transition: "outline 150ms ease",
                }}
                className="profile-avatar"
              >
                {p.name.charAt(0).toUpperCase()}
              </div>
              <span style={{ color: TEXT_MUTED, fontSize: 15 }}>{p.name}</span>
            </button>
          ))}

          <button
            onClick={() => setCreating(true)}
            style={{ background: "transparent", border: "none", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 10, width: 120 }}
          >
            <div style={{ width: 100, height: 100, borderRadius: 8, background: "#2a2a2a", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Plus size={40} color="#808080" />
            </div>
            <span style={{ color: TEXT_MUTED, fontSize: 15 }}>Agregar perfil</span>
          </button>
        </div>
      )}

      {creating && (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 18, width: "min(360px, 90vw)" }}>
          <div style={{ width: 100, height: 100, borderRadius: 8, background: nextColor, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 40, fontWeight: 800, color: "#fff" }}>
            {name.trim() ? name.trim().charAt(0).toUpperCase() : "?"}
          </div>
          <input
            autoFocus
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") createProfile(); }}
            placeholder="Nombre del perfil"
            style={{ width: "100%", background: "#333", border: "1px solid #666", borderRadius: 4, padding: "12px 14px", color: "#fff", fontSize: 15, outline: "none" }}
          />
          <div style={{ display: "flex", gap: 12, width: "100%" }}>
            {profiles.length > 0 && (
              <button
                onClick={() => setCreating(false)}
                style={{ flex: 1, background: "transparent", border: "1px solid #666", color: "#fff", borderRadius: 4, padding: "12px 0", fontSize: 15, cursor: "pointer" }}
              >
                Cancelar
              </button>
            )}
            <button
              onClick={createProfile}
              disabled={!name.trim()}
              style={{ flex: 1, background: name.trim() ? "#fff" : "#555", color: name.trim() ? "#000" : "#999", border: "none", borderRadius: 4, padding: "12px 0", fontSize: 15, fontWeight: 700, cursor: name.trim() ? "pointer" : "default" }}
            >
              Continuar
            </button>
          </div>
        </div>
      )}

      <style>{`.profile-avatar:hover { outline: 3px solid #fff; }`}</style>
    </div>
  );
}

/* ============================================================
   GRILLA GENÉRICA — para las páginas de Materias, Seguir viendo y Mi lista
   ============================================================ */
function CardGrid({ items, onOpen, emptyMessage }) {
  if (items.length === 0) {
    return <div style={{ color: TEXT_MUTED, fontSize: 15, padding: "40px 0" }}>{emptyMessage}</div>;
  }
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 18 }}>
      {items.map((c) => (
        <div
          key={c.id}
          onClick={() => onOpen(c)}
          className="card-item"
          style={{ cursor: "pointer", borderRadius: 4, overflow: "hidden", background: CARD_BG, transition: "transform 220ms ease, box-shadow 220ms ease" }}
          onMouseEnter={(e) => { e.currentTarget.style.transform = "scale(1.04)"; e.currentTarget.style.boxShadow = "0 12px 30px rgba(0,0,0,0.75)"; e.currentTarget.style.zIndex = 5; e.currentTarget.style.backgroundColor = CARD_HOVER_BG; }}
          onMouseLeave={(e) => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.zIndex = 0; e.currentTarget.style.backgroundColor = CARD_BG; }}
        >
          <Thumb classItem={c} color={c.color || c.subjectColor} Icon={c.icon || Calculator} tall />
          <div style={{ padding: "10px 12px 14px" }}>
            {c.videoUrl && <div style={{ color: "#fff", fontSize: 13, fontWeight: 700, marginBottom: 3, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{c.title}</div>}
            <div style={{ color: "#fff", fontSize: 13, fontWeight: 600 }}>{c.prof}</div>
            <div style={{ color: TEXT_MUTED, fontSize: 12, marginTop: 2 }}>{c.duration}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

function BrowseApp({ profile, onSwitchProfile }) {
  const [scrolled, setScrolled] = useState(false);
  const [modalItem, setModalItem] = useState(null);
  const [modalColor, setModalColor] = useState(RED);
  const [modalIcon, setModalIcon] = useState(() => Calculator);
  const [modalAutoPlay, setModalAutoPlay] = useState(true);
  const [featuredIndex, setFeaturedIndex] = useState(0);
  const [heroPaused, setHeroPaused] = useState(false);
  const [view, setView] = useState("home"); // "home" | "materias" | "materia:<id>" | "seguir" | "milista" | "buscar"
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [notifOpen, setNotifOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const featured = FEATURED_POOL[featuredIndex];
  const featuredYtId = getYouTubeId(featured.videoUrl);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (heroPaused) return;
    const timer = setInterval(() => {
      setFeaturedIndex((i) => (i + 1) % FEATURED_POOL.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [heroPaused]);

  const openModal = (item, subject, mode = "play") => {
    setModalItem(item);
    setModalColor(subject ? subject.color : (item.subjectColor || RED));
    setModalIcon(() => (subject ? subject.icon : Atom));
    setModalAutoPlay(mode === "play");
  };

  const goTo = (v) => {
    setView(v);
    setSearchOpen(false);
    setNotifOpen(false);
    setAccountOpen(false);
  };

  // datos derivados según la vista activa (se recalculan solos cuando cambia algo)
  const allClasses = getAllClasses();
  const searchResults = searchQuery.trim()
    ? allClasses.filter((c) => c.title.toLowerCase().includes(searchQuery.trim().toLowerCase()) || c.subjectName.toLowerCase().includes(searchQuery.trim().toLowerCase()))
    : [];
  const myListClasses = allClasses.filter((c) => readIdList("chacaflix_my_list").includes(c.id));
  const activeSubjectId = view.startsWith("materia:") ? view.split(":")[1] : null;
  const activeSubject = activeSubjectId ? SUBJECTS.find((s) => s.id === activeSubjectId) : null;

  return (
    <div style={{ background: BG, minHeight: "100vh", fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}>
      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .card-item:hover .thumb-play { opacity: 1 !important; }
        @keyframes heroFade { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }
        .hero-fade { animation: heroFade 800ms ease; }
        @media (prefers-reduced-motion: reduce) { .hero-fade { animation: none; } }
        .player-range { -webkit-appearance: none; appearance: none; height: 4px; border-radius: 2px; background: rgba(255,255,255,0.3); outline: none; cursor: pointer; }
        .player-range::-webkit-slider-thumb { -webkit-appearance: none; width: 12px; height: 12px; border-radius: 50%; background: #fff; cursor: pointer; }
        .player-range::-moz-range-thumb { width: 12px; height: 12px; border-radius: 50%; background: #fff; border: none; cursor: pointer; }
        .yt-fill, .yt-fill iframe { position: absolute !important; inset: 0 !important; width: 100% !important; height: 100% !important; border: 0 !important; }
      `}</style>

      {/* NAVBAR */}
      <div
        style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
          background: (scrolled || view !== "home") ? BG_NAV_SOLID : "linear-gradient(to bottom, rgba(0,0,0,0.75), transparent)",
          transition: "background 300ms ease",
        }}
      >
        <div style={{
          maxWidth: MAX_WIDTH, margin: "0 auto", padding: `16px ${GUTTER}`,
          display: "flex", alignItems: "center", justifyContent: "space-between",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 36 }}>
            <button onClick={() => goTo("home")} style={{ background: "transparent", border: "none", cursor: "pointer", color: RED, fontFamily: LOGO_FONT, fontWeight: 900, fontSize: 28, letterSpacing: "-1px", textTransform: "uppercase", padding: 0, textShadow: "2px 3px 0px #7A0D12, 0 6px 14px rgba(0,0,0,0.6)" }}>
              Chacaflix
            </button>
            <nav style={{ display: "flex", gap: 20, fontSize: 14 }}>
              {[
                { key: "home", label: "Inicio" },
                { key: "materias", label: "Materias" },
                { key: "seguir", label: "Seguir viendo" },
                { key: "milista", label: "Mi lista" },
              ].map((n) => (
                <button
                  key={n.key}
                  onClick={() => goTo(n.key)}
                  style={{
                    background: "transparent", border: "none", cursor: "pointer", padding: 0,
                    color: view === n.key ? "#fff" : "#e5e5e5", fontWeight: view === n.key ? 700 : 400, fontSize: 14,
                  }}
                >
                  {n.label}
                </button>
              ))}
            </nav>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 20, color: "#fff", position: "relative" }}>
            {/* BUSCADOR */}
            <div style={{ display: "flex", alignItems: "center" }}>
              {searchOpen && (
                <input
                  autoFocus
                  value={searchQuery}
                  onChange={(e) => { setSearchQuery(e.target.value); setView("buscar"); }}
                  onBlur={() => { if (!searchQuery.trim()) setSearchOpen(false); }}
                  placeholder="Títulos, materias..."
                  style={{ background: "rgba(0,0,0,0.7)", border: "1px solid #666", borderRadius: 4, padding: "6px 10px", color: "#fff", fontSize: 13, width: 180, marginRight: 8, outline: "none" }}
                />
              )}
              <Search
                size={19}
                style={{ cursor: "pointer" }}
                onClick={() => {
                  if (searchOpen && searchQuery.trim()) { setSearchQuery(""); setSearchOpen(false); if (view === "buscar") goTo("home"); }
                  else setSearchOpen(true);
                }}
              />
            </div>

            {/* NOTIFICACIONES */}
            <div style={{ position: "relative" }}>
              <Bell size={19} style={{ cursor: "pointer" }} onClick={() => { setNotifOpen((v) => !v); setAccountOpen(false); }} />
              {notifOpen && (
                <div style={{ position: "absolute", top: 32, right: -10, width: 300, background: "#181818", border: "1px solid #333", borderRadius: 4, boxShadow: "0 12px 30px rgba(0,0,0,0.6)", padding: 8, zIndex: 60 }}>
                  <div style={{ color: "#fff", fontWeight: 700, fontSize: 13, padding: "6px 8px" }}>Notificaciones</div>
                  {[
                    "📚 Nueva clase de Física disponible: Leyes de Newton",
                    "🎬 Se agregaron 4 clases nuevas de Historia",
                    "⏰ Te falta poco para terminar Razones trigonométricas",
                  ].map((n, i) => (
                    <div key={i} style={{ padding: "10px 8px", fontSize: 13, color: "#ddd", borderTop: i > 0 ? "1px solid #2a2a2a" : "none" }}>{n}</div>
                  ))}
                </div>
              )}
            </div>

            {/* CUENTA */}
            <div style={{ position: "relative" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6, cursor: "pointer" }} onClick={() => { setAccountOpen((v) => !v); setNotifOpen(false); }}>
                <div style={{ width: 30, height: 30, borderRadius: 6, background: profile?.color || RED, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700 }}>
                  {profile?.name?.charAt(0)?.toUpperCase() || "A"}
                </div>
                <ChevronDown size={14} style={{ transform: accountOpen ? "rotate(180deg)" : "none", transition: "transform 150ms ease" }} />
              </div>
              {accountOpen && (
                <div style={{ position: "absolute", top: 40, right: 0, width: 220, background: "#181818", border: "1px solid #333", borderRadius: 4, boxShadow: "0 12px 30px rgba(0,0,0,0.6)", padding: 8, zIndex: 60 }}>
                  <div style={{ padding: "8px 10px", color: TEXT_MUTED, fontSize: 12 }}>Conectado como <strong style={{ color: "#fff" }}>{profile?.name}</strong></div>
                  <button onClick={() => { setAccountOpen(false); onSwitchProfile(); }} style={{ width: "100%", textAlign: "left", background: "transparent", border: "none", color: "#fff", padding: "10px", fontSize: 13, cursor: "pointer", borderTop: "1px solid #2a2a2a" }}>
                    Cambiar de perfil
                  </button>
                  <button onClick={() => { setAccountOpen(false); onSwitchProfile(); }} style={{ width: "100%", textAlign: "left", background: "transparent", border: "none", color: "#fff", padding: "10px", fontSize: 13, cursor: "pointer", borderTop: "1px solid #2a2a2a" }}>
                    Cerrar sesión
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {view === "home" && (
      <>
      {/* HERO */}
      <div
        style={{ position: "relative", height: "78vh", minHeight: 480 }}
        onMouseEnter={() => setHeroPaused(true)}
        onMouseLeave={() => setHeroPaused(false)}
      >
        <div key={`bg-${featuredIndex}`} className="hero-fade" style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
          {featuredYtId ? (
            <YtCover ytId={featuredYtId} alt={featured.title} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
          ) : (
            <div style={{ position: "absolute", inset: 0, background: `linear-gradient(120deg, ${featured.subjectColor}77 0%, ${BG} 75%)` }} />
          )}
          {/* tinte de color de la materia, para mantener identidad visual sobre la foto */}
          <div style={{ position: "absolute", inset: 0, background: `linear-gradient(100deg, ${BG}F5 0%, ${BG}B0 28%, transparent 62%)` }} />
        </div>
        <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to top, ${BG} 2%, transparent 55%)` }} />
        {!featuredYtId && <Atom size={340} color="rgba(255,255,255,0.06)" style={{ position: "absolute", right: 60, top: 40 }} />}

        {/* contenedor centrado, mismo ancho máx. y margen que el navbar y las filas */}
        <div style={{
          position: "relative", height: "100%", maxWidth: MAX_WIDTH, margin: "0 auto",
          padding: `0 ${GUTTER}`, display: "flex", alignItems: "flex-end",
        }}>
          <div key={`content-${featuredIndex}`} className="hero-fade" style={{ maxWidth: 620, paddingBottom: 70 }}>
            <div style={{ color: "#4ADE80", fontWeight: 700, fontSize: 14, marginBottom: 10 }}>Clase destacada · {featured.subjectName}</div>
            <div style={{ fontFamily: "Helvetica Neue, Arial, sans-serif", fontWeight: 800, fontSize: 56, color: "#fff", lineHeight: 1.02, letterSpacing: "-0.5px" }}>
              {featured.title}
            </div>
            <div style={{ color: "#d2d2d2", fontSize: 15, margin: "18px 0", lineHeight: 1.5 }}>
              {featured.desc}
            </div>
            <div style={{ display: "flex", gap: 12, marginBottom: 22 }}>
              <button
                onClick={() => openModal(featured, featured.subject, "play")}
                style={{ background: "#fff", border: "none", borderRadius: 4, padding: "12px 26px", fontWeight: 700, fontSize: 15, display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}
              >
                <Play size={20} fill="#000" /> Reproducir
              </button>
              <button
                onClick={() => openModal(featured, featured.subject, "info")}
                style={{ background: "rgba(109,109,110,0.5)", color: "#fff", border: "none", borderRadius: 4, padding: "12px 26px", fontWeight: 700, fontSize: 15, display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}
              >
                <Info size={20} /> Más información
              </button>
            </div>
            <div style={{ display: "flex", gap: 7 }}>
              {FEATURED_POOL.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setFeaturedIndex(i)}
                  aria-label={`Mostrar clase destacada ${i + 1}`}
                  style={{
                    width: i === featuredIndex ? 20 : 7, height: 7, borderRadius: 4, border: "none", cursor: "pointer",
                    background: i === featuredIndex ? RED : "rgba(255,255,255,0.35)", transition: "all 300ms ease", padding: 0,
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ROWS — mismo contenedor centrado y mismo margen que navbar y hero */}
      <div style={{
        position: "relative", zIndex: 2, maxWidth: MAX_WIDTH, margin: "0 auto",
        padding: `0 ${GUTTER} 60px`, marginTop: -40,
      }}>
        <Row title="Seguir viendo" items={CONTINUE_WATCHING} onOpen={(item) => openModal(item, { color: item.subjectColor, icon: item.icon })} />
        {SUBJECTS.map((s) => (
          <Row
            key={s.id}
            title={s.name}
            items={s.classes.map((c) => ({ ...c, color: s.color, icon: s.icon, subjectName: s.name }))}
            onOpen={(item) => openModal(item, s)}
          />
        ))}
      </div>
      </>
      )}

      {/* PÁGINA: MATERIAS — grilla de materias, o las clases de una materia si se eligió una */}
      {view === "materias" && !activeSubject && (
        <div style={{ maxWidth: MAX_WIDTH, margin: "0 auto", padding: `120px ${GUTTER} 60px` }}>
          <h1 style={{ color: "#fff", fontSize: 28, fontWeight: 700, marginBottom: 24 }}>Materias</h1>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 18 }}>
            {SUBJECTS.map((s) => (
              <button
                key={s.id}
                onClick={() => goTo(`materia:${s.id}`)}
                style={{
                  background: `linear-gradient(150deg, ${s.color}CC 0%, ${s.color}55 45%, ${BG} 100%)`,
                  border: "none", borderRadius: 6, height: 120, cursor: "pointer",
                  display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 8,
                }}
              >
                <s.icon size={30} color="#fff" />
                <span style={{ color: "#fff", fontWeight: 700, fontSize: 14, textAlign: "center", padding: "0 8px" }}>{s.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {view === "materias" && activeSubject && (
        <div style={{ maxWidth: MAX_WIDTH, margin: "0 auto", padding: `120px ${GUTTER} 60px` }}>
          <button onClick={() => goTo("materias")} style={{ background: "transparent", border: "none", color: TEXT_MUTED, fontSize: 13, cursor: "pointer", marginBottom: 16, padding: 0 }}>
            ← Todas las materias
          </button>
          <h1 style={{ color: "#fff", fontSize: 28, fontWeight: 700, marginBottom: 24, display: "flex", alignItems: "center", gap: 12 }}>
            <activeSubject.icon size={28} color={activeSubject.color} /> {activeSubject.name}
          </h1>
          <CardGrid
            items={activeSubject.classes.map((c) => ({ ...c, color: activeSubject.color, icon: activeSubject.icon, subjectName: activeSubject.name }))}
            onOpen={(item) => openModal(item, activeSubject)}
            emptyMessage="Todavía no hay clases en esta materia."
          />
        </div>
      )}

      {/* PÁGINA: SEGUIR VIENDO */}
      {view === "seguir" && (
        <div style={{ maxWidth: MAX_WIDTH, margin: "0 auto", padding: `120px ${GUTTER} 60px` }}>
          <h1 style={{ color: "#fff", fontSize: 28, fontWeight: 700, marginBottom: 24 }}>Seguir viendo</h1>
          <CardGrid
            items={CONTINUE_WATCHING}
            onOpen={(item) => openModal(item, { color: item.subjectColor, icon: item.icon })}
            emptyMessage="No tenés clases empezadas todavía."
          />
        </div>
      )}

      {/* PÁGINA: MI LISTA */}
      {view === "milista" && (
        <div style={{ maxWidth: MAX_WIDTH, margin: "0 auto", padding: `120px ${GUTTER} 60px` }}>
          <h1 style={{ color: "#fff", fontSize: 28, fontWeight: 700, marginBottom: 24 }}>Mi lista</h1>
          <CardGrid
            items={myListClasses}
            onOpen={(item) => openModal(item, item.subject)}
            emptyMessage="Todavía no agregaste ninguna clase a tu lista. Tocá el + en cualquier clase para guardarla acá."
          />
        </div>
      )}

      {/* PÁGINA: BUSCAR */}
      {view === "buscar" && (
        <div style={{ maxWidth: MAX_WIDTH, margin: "0 auto", padding: `120px ${GUTTER} 60px` }}>
          <h1 style={{ color: "#fff", fontSize: 22, fontWeight: 700, marginBottom: 24 }}>
            Resultados para "{searchQuery}"
          </h1>
          <CardGrid
            items={searchResults}
            onOpen={(item) => openModal(item, item.subject)}
            emptyMessage="No encontramos ninguna clase con ese nombre."
          />
        </div>
      )}

      <Modal item={modalItem} color={modalColor} Icon={modalIcon} onClose={() => setModalItem(null)} autoPlay={modalAutoPlay} />
    </div>
  );
}

/* ============================================================
   RAÍZ DE LA APP — intro animada → selección de perfil → app
   ============================================================ */
export default function ChacaFlix() {
  const [stage, setStage] = useState("intro"); // "intro" | "profiles" | "app"
  const [activeProfile, setActiveProfile] = useState(null);

  const handleIntroDone = () => setStage("profiles");
  const handleProfileSelected = (profile) => {
    setActiveProfile(profile);
    setStage("app");
  };
  const handleSwitchProfile = () => {
    setActiveProfile(null);
    setStage("profiles");
  };

  if (stage === "intro") return <IntroAnimation onDone={handleIntroDone} />;
  if (stage === "profiles") return <ProfileGate onSelect={handleProfileSelected} />;
  return <BrowseApp profile={activeProfile} onSwitchProfile={handleSwitchProfile} />;
}
