import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useLang } from '../i18n/LanguageContext';
import { Skill, skills } from '../data/skillsData';
import { getLayout, KeyDef } from '../data/keyboardLayouts';

// --- medidas base (px) ---------------------------------------------------
const KEY = 76;   // tamaño base de tecla (unidad 1)
const GAP = 10;   // separación entre teclas
const KEY_H = 22; // altura de la extrusión 3D

// --- utilidades de color -------------------------------------------------
const hexToRgb = (hex: string): [number, number, number] => {
  const n = parseInt(hex.slice(1), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
};
const luminance = (hex: string) => {
  const [r, g, b] = hexToRgb(hex).map((v) => {
    const c = v / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
const mixWithWhite = (hex: string, amt: number) => {
  const [r, g, b] = hexToRgb(hex).map((v) => Math.round(v + (255 - v) * amt));
  return `rgb(${r}, ${g}, ${b})`;
};
const keyStyle = (hex: string) => {
  const lum = luminance(hex);
  const color = lum < 0.12 ? mixWithWhite(hex, 0.3) : hex;
  const logo = lum > 0.45 ? '#111827' : '#ffffff';
  return { color, logo };
};

const Logo: React.FC<{ skill: Skill; size: number; fill: string }> = ({ skill, size, fill }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} role="img" aria-label={skill.name}>
    <path d={skill.path} />
  </svg>
);

// --- helpers de mapeo skill <-> tecla ------------------------------------
type Lang = 'es' | 'en';

const keyFor = (skill: Skill, lang: Lang): string =>
  (skill.keyCharByLang?.[lang] ?? skill.keyChar).toUpperCase();

const buildSkillMap = (lang: Lang): Map<string, Skill> => {
  const map = new Map<string, Skill>();
  for (const s of skills) {
    const k = keyFor(s, lang);
    if (!map.has(k)) map.set(k, s);
  }
  return map;
};

// --- layout helper: extrae las teclas activas con su posición ------------
interface PlacedKey {
  keyDef: KeyDef;
  skill: Skill;
  /** columna en unidades de tecla */
  xUnits: number;
  /** fila (índice) */
  rowIndex: number;
}

const placeActiveKeys = (
  layout: ReturnType<typeof getLayout>,
  skillMap: Map<string, Skill>
): PlacedKey[] => {
  const placed: PlacedKey[] = [];
  layout.rows.forEach((row, rowIndex) => {
    let x = row.offset ?? 0;
    row.keys.forEach((keyDef) => {
      const skill = skillMap.get(keyDef.base.toUpperCase());
      if (skill) {
        placed.push({ keyDef, skill, xUnits: x, rowIndex });
      }
      x += (keyDef.w ?? 1);
    });
  });
  return placed;
};

// --- componente ----------------------------------------------------------
export const SkillsSection: React.FC = () => {
  const { t, lang } = useLang();
  const activeLang = (lang === 'es' ? 'es' : 'en') as Lang;

  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [pressedId, setPressedId] = useState<string | null>(null);
  const [inView, setInView] = useState(false);
  const [scale, setScale] = useState(1);

  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  // Layout + mapa de skills según idioma
  const layout = useMemo(() => getLayout(activeLang), [activeLang]);
  const skillMap = useMemo(() => buildSkillMap(activeLang), [activeLang]);

  // Teclas activas con su posición real
  const placedKeys = useMemo(
    () => placeActiveKeys(layout, skillMap),
    [layout, skillMap]
  );

  // --- Bounding box de las teclas activas (en unidades de tecla) ----------
  const bbox = useMemo(() => {
    if (placedKeys.length === 0) {
      return { minX: 0, minY: 0, maxX: 1, maxY: 1 };
    }
    let minX = Infinity;
    let minY = Infinity;
    let maxX = -Infinity;
    let maxY = -Infinity;
    for (const k of placedKeys) {
      const w = k.keyDef.w ?? 1;
      minX = Math.min(minX, k.xUnits);
      minY = Math.min(minY, k.rowIndex);
      maxX = Math.max(maxX, k.xUnits + w);
      maxY = Math.max(maxY, k.rowIndex + 1);
    }
    return { minX, minY, maxX, maxY };
  }, [placedKeys]);

  const unit = KEY + GAP;
  // Tamaño del bounding box en px (lo que realmente ocupan las teclas)
  const bboxW = (bbox.maxX - bbox.minX) * unit;
  const bboxH = (bbox.maxY - bbox.minY) * unit;

  // --- IntersectionObserver ------------------------------------------------
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.25 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // --- Escalado responsive -------------------------------------------------
  // Escala en función del ancho de la columna. Ahora SÍ crece todo lo que
  // puede, sin tope artificial, para llenar la columna del layout.
  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const update = () => {
      const padding = 24;
      const maxByWidth = (el.clientWidth - padding) / bboxW;
      // Tope generoso para monitores muy anchos
      const next = Math.min(2.4, Math.max(0.6, maxByWidth));
      setScale(next);
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [bboxW, bboxH]);

  // --- Teclado físico ------------------------------------------------------
  useEffect(() => {
    if (!inView) return;
    const isTyping = (el: EventTarget | null) => {
      const node = el as HTMLElement | null;
      return (
        !!node &&
        (['INPUT', 'TEXTAREA', 'SELECT'].includes(node.tagName) ||
          node.isContentEditable)
      );
    };
    const down = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey || e.altKey || isTyping(e.target)) return;
      const ch = e.key.toUpperCase();
      const found = skills.find((s) => keyFor(s, activeLang) === ch);
      if (found) {
        setSelectedId(found.id);
        setPressedId(found.id);
      }
    };
    const up = () => setPressedId(null);
    window.addEventListener('keydown', down);
    window.addEventListener('keyup', up);
    return () => {
      window.removeEventListener('keydown', down);
      window.removeEventListener('keyup', up);
    };
  }, [inView, activeLang]);

  const selected = skills.find((s) => s.id === selectedId) ?? null;
  const sameCategory = selected
    ? skills.filter((s) => s.category === selected.category)
    : [];

  // --- render de una tecla ------------------------------------------------
  const renderKey = (p: PlacedKey) => {
    const { keyDef, skill, xUnits, rowIndex } = p;
    const w = keyDef.w ?? 1;
    const width = w * KEY + (w - 1) * GAP;
    const { color, logo } = keyStyle(skill.color);
    const logoSize = Math.min(46, KEY * 0.6);

    return (
      <button
        key={skill.id}
        type="button"
        className="kb-key"
        aria-label={skill.name}
        title={skill.name}
        data-selected={selectedId === skill.id}
        data-pressed={pressedId === skill.id}
        onClick={() => setSelectedId(skill.id)}
        onPointerDown={() => setPressedId(skill.id)}
        onPointerUp={() => setPressedId(null)}
        onPointerLeave={() => setPressedId(null)}
        onPointerCancel={() => setPressedId(null)}
        style={
          {
            position: 'absolute',
            left: (xUnits - bbox.minX) * unit,
            top: (rowIndex - bbox.minY) * unit,
            width,
            height: KEY,
            '--ks': `${KEY}px`,
            '--kh': `${KEY_H}px`,
            '--c': color,
          } as React.CSSProperties
        }
      >
        <span className="kb-shadow" />
        <span className="kb-front" />
        <span className="kb-right" />
        <span className="kb-top">
          <Logo skill={skill} size={logoSize} fill={logo} />
          <span className="kb-char" style={{ color: logo }}>
            {keyDef.label}
          </span>
        </span>
      </button>
    );
  };

  // --- render --------------------------------------------------------------
  return (
    <section
      id="skills-section"
      ref={sectionRef}
      className="py-16 md:py-24 border-b border-[#232d42] bg-[#090d14] overflow-hidden"
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-6 items-center">

          {/* Panel izquierdo */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                <span className="text-cyan-400 font-semibold">{t.skills.eyebrowA}</span>
                <span className="text-slate-600">—</span>
                <span className="tracking-wider">{t.skills.eyebrowB}</span>
              </div>
              <h2 className="text-5xl sm:text-6xl md:text-7xl font-display font-black text-white tracking-tight uppercase mt-2">
                {t.skills.title}
              </h2>
              <p className="text-xs font-mono text-slate-400 tracking-wider mt-1">
                {t.skills.hint}
                <span className="ml-2 text-cyan-500">
                  [{activeLang === 'es' ? 'ES' : 'EN'}]
                </span>
              </p>
            </div>

            <div
              className="min-h-[250px] rounded-xl bg-[#131924]/80 border border-[#232d42] p-6 shadow-xl"
              aria-live="polite"
            >
              {selected ? (
                <div key={selected.id} className="space-y-4 animate-fadeIn">
                  <div className="flex items-center gap-4">
                    <div
                      className="w-14 h-14 rounded-xl flex items-center justify-center shrink-0 shadow-lg"
                      style={{ backgroundColor: keyStyle(selected.color).color }}
                    >
                      <Logo skill={selected} size={30} fill={keyStyle(selected.color).logo} />
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-2xl sm:text-3xl font-display font-bold text-white leading-tight">
                        {selected.name}
                      </h3>
                      <div className="flex flex-wrap items-center gap-2 mt-1 font-mono text-[11px]">
                        <span className="px-2 py-0.5 rounded bg-cyan-950/60 border border-cyan-500/30 text-cyan-300">
                          {t.skills.categories[selected.category]}
                        </span>
                      </div>
                    </div>
                  </div>

                  <p className="text-slate-300 font-sans text-sm sm:text-base leading-relaxed">
                    {selected.text[activeLang]}
                  </p>

                  <div className="pt-3 border-t border-[#232d42] space-y-2">
                    <p className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">
                      {t.skills.more}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {sameCategory.map((s) => (
                        <button
                          key={s.id}
                          onClick={() => setSelectedId(s.id)}
                          title={s.name}
                          aria-label={s.name}
                          className={`w-9 h-9 rounded-lg flex items-center justify-center border transition-all cursor-pointer ${
                            s.id === selected.id
                              ? 'border-cyan-400 shadow shadow-cyan-500/30'
                              : 'border-transparent opacity-70 hover:opacity-100'
                          }`}
                          style={{ backgroundColor: keyStyle(s.color).color }}
                        >
                          <Logo skill={s} size={18} fill={keyStyle(s.color).logo} />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="h-full flex flex-col justify-center gap-3 py-6">
                  <p className="font-mono text-cyan-400 text-sm">
                    &gt; {t.skills.pressTitle}
                    <span className="inline-block w-2 h-4 bg-cyan-400 ml-1 align-middle animate-pulse"></span>
                  </p>
                  <p className="text-slate-400 font-sans text-sm leading-relaxed max-w-md">
                    {t.skills.pressText}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Panel derecho: teclado isométrico escalado al bounding box real */}
          <div className="lg:col-span-7">
            <div ref={stageRef} className="w-full flex justify-center">
              {/*
                El contenedor "kb-scene" reserva el espacio del bounding box
                escalado. No depende del layout completo del teclado, sino
                solo de las teclas que realmente se dibujan.
              */}
              <div
                className="kb-scene relative"
                style={{
                  width: bboxW * scale,
                  height: bboxH * scale + KEY_H * scale + 40,
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    width: bboxW,
                    height: bboxH,
                    transform: `scale(${scale})`,
                    transformOrigin: 'top left',
                  }}
                >
                  <div
                    className="kb-board relative"
                    style={{ width: bboxW, height: bboxH }}
                  >
                    {placedKeys.map((p) => renderKey(p))}
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};