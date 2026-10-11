import React, { useEffect, useRef, useState } from 'react';
import { useLang } from '../i18n/LanguageContext';
import { Skill, skills } from '../data/skillsData';

const COLS = 7;
const KEY = 74; // px, key size
const GAP = 14;
const KEY_H = 20; // px, key height (extrusion)

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

/** Key color + readable logo color for each brand. */
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

export const SkillsSection: React.FC = () => {
  const { t, lang } = useLang();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [pressedId, setPressedId] = useState<string | null>(null);
  const [inView, setInView] = useState(false);
  const [scale, setScale] = useState(1);
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  const boardW = COLS * KEY + (COLS - 1) * GAP;
  const rows = Math.ceil(skills.length / COLS);
  const boardH = rows * KEY + (rows - 1) * GAP;
  const diag = (boardW + boardH) * 0.7071;

  // Only react to the physical keyboard while the section is on screen
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.25 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Fit the keyboard to the available width
  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const update = () => setScale(Math.min(1, el.clientWidth / (diag + 40)));
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [diag]);

  // Physical keyboard support
  useEffect(() => {
    if (!inView) return;
    const isTyping = (el: EventTarget | null) => {
      const node = el as HTMLElement | null;
      return !!node && (['INPUT', 'TEXTAREA', 'SELECT'].includes(node.tagName) || node.isContentEditable);
    };
    const down = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey || e.altKey || isTyping(e.target)) return;
      const found = skills.find((s) => s.keyChar === e.key.toUpperCase());
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
  }, [inView]);

  const selected = skills.find((s) => s.id === selectedId) ?? null;
  const sameCategory = selected ? skills.filter((s) => s.category === selected.category) : [];

  return (
    <section
      id="skills-section"
      ref={sectionRef}
      className="py-16 md:py-24 border-b border-[#232d42] bg-[#090d14] overflow-hidden"
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-6 items-center">

          {/* Left: title + description of the pressed key */}
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
              <p className="text-xs font-mono text-slate-400 tracking-wider mt-1">{t.skills.hint}</p>
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
                        <span className="text-slate-500">
                          {t.skills.key}: <kbd className="px-1.5 py-0.5 rounded bg-[#0a0e15] border border-[#2b3752] text-slate-300">{selected.keyChar}</kbd>
                        </span>
                      </div>
                    </div>
                  </div>

                  <p className="text-slate-300 font-sans text-sm sm:text-base leading-relaxed">
                    {selected.text[lang]}
                  </p>

                  <div className="pt-3 border-t border-[#232d42] space-y-2">
                    <p className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">{t.skills.more}</p>
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
                  <p className="text-slate-400 font-sans text-sm leading-relaxed max-w-md">{t.skills.pressText}</p>
                </div>
              )}
            </div>
          </div>

          {/* Right: isometric keyboard */}
          <div className="lg:col-span-7">
            <div ref={stageRef} className="w-full flex justify-center">
              <div
                className="kb-scene relative"
                style={{ width: diag * scale + 20, height: diag * 0.62 * scale + 70 }}
              >
                <div
                  style={{
                    position: 'absolute',
                    left: '50%',
                    top: '50%',
                    width: boardW,
                    height: boardH,
                    marginLeft: -boardW / 2,
                    marginTop: -boardH / 2,
                    transform: `scale(${scale})`,
                    transformOrigin: 'center',
                  }}
                >
                  <div className="kb-board" style={{ width: boardW, height: boardH }}>
                    {skills.map((skill, i) => {
                      const col = i % COLS;
                      const row = Math.floor(i / COLS);
                      const { color, logo } = keyStyle(skill.color);
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
                              left: col * (KEY + GAP),
                              top: row * (KEY + GAP),
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
                            <Logo skill={skill} size={40} fill={logo} />
                            <span className="kb-char" style={{ color: logo }}>{skill.keyChar}</span>
                          </span>
                        </button>
                      );
                    })}
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
