// src/data/keyboardLayouts.ts
export type Lang = 'es' | 'en';

/** Una tecla física del teclado. */
export interface KeyDef {
  /** Carácter principal que se muestra. */
  label: string;
  /** Carácter "base" (en mayúscula) para mapear con skill.keyCharByLang[keyChar]. */
  base: string;
  /** Ancho relativo (1 = tecla estándar). */
  w?: number;
  /** Tecla decorativa (no asignable a skill). */
  decorative?: boolean;
}

export interface RowDef {
  keys: KeyDef[];
  /** Desplazamiento horizontal de la fila, en unidades de tecla. */
  offset?: number;
}

export interface KeyboardLayout {
  rows: RowDef[];
  /** Ancho total en unidades de tecla (para escalar). */
  totalUnits: number;
}

const k = (label: string, w = 1, decorative = false): KeyDef => ({
  label,
  base: label.toUpperCase(),
  w,
  decorative,
});

// ---------------------------------------------------------------------------
// Fila de números: ` 1 2 3 4 5 6 7 8 9 0 - = ⌫  (EN)
//                   º 1 2 3 4 5 6 7 8 9 0 ' ¡ ⌫ (ES)
// ---------------------------------------------------------------------------
const numbersRowEN = (): KeyDef[] => [
  k('`', 1, true),
  k('1'), k('2'), k('3'), k('4'), k('5'), k('6'), k('7'), k('8'), k('9'), k('0'),
  k('-'), k('='),
  k('⌫', 2, true),
];

const numbersRowES = (): KeyDef[] => [
  k('º', 1, true),
  k('1'), k('2'), k('3'), k('4'), k('5'), k('6'), k('7'), k('8'), k('9'), k('0'),
  k("'"), k('¡'),
  k('⌫', 2, true),
];

// ---------------------------------------------------------------------------
// Filas de letras (comunes). Solo cambia el final de cada fila.
// ---------------------------------------------------------------------------
const qwerty = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'];
const asdf   = ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'];
const zxcv   = ['Z', 'X', 'C', 'V', 'B', 'N', 'M'];

// ---------------------------------------------------------------------------
// LAYOUT EN (US ANSI)
// ---------------------------------------------------------------------------
export const layoutEN: KeyboardLayout = {
  totalUnits: 15,
  rows: [
    // Fila 1: números
    { keys: numbersRowEN() },

    // Fila 2: QWERTY + [ ] \
    {
      keys: [
        k('⇥', 1.5, true),
        ...qwerty.map((c) => k(c)),
        k('['), k(']'),
        k('\\', 1.5),
      ],
    },

    // Fila 3: ASDF + ; ' ↵
    {
      keys: [
        k('⇪', 1.75, true),
        ...asdf.map((c) => k(c)),
        k(';'), k("'"),
        k('↵', 2.25, true),
      ],
    },

    // Fila 4: ZXCV + , . / ⇧
    {
      keys: [
        k('⇧', 2.25, true),
        ...zxcv.map((c) => k(c)),
        k(','), k('.'), k('/'),
        k('⇧', 2.75, true),
      ],
    },

    // Fila 5: modificadores
    {
      keys: [
        k('Ctrl', 1.25, true),
        k('Alt', 1.25, true),
        k('Space', 6.25, true),
        k('Alt', 1.25, true),
        k('Ctrl', 1.25, true),
      ],
    },
  ],
};

// ---------------------------------------------------------------------------
// LAYOUT ES (ISO-ES)
// ---------------------------------------------------------------------------
export const layoutES: KeyboardLayout = {
  totalUnits: 15,
  rows: [
    // Fila 1: º 1..0 ' ¡ ⌫
    { keys: numbersRowES() },

    // Fila 2: QWERTY + ´ ¨ Ç
    {
      keys: [
        k('⇥', 1.5, true),
        ...qwerty.map((c) => k(c)),
        k('´'), k('¨'),
        k('Ç', 1.5),
      ],
    },

    // Fila 3: ASDF + Ñ ´ ↵   (en ISO-ES la tecla a la derecha de la L es Ñ)
    {
      keys: [
        k('⇪', 1.75, true),
        ...asdf.map((c) => k(c)),
        k('Ñ'), k('´'),
        k('↵', 2.25, true),
      ],
    },

    // Fila 4: < ZXCV + , . - ⇧   (tecla extra < a la izquierda de la Z)
    {
      keys: [
        k('⇧', 1.25, true),
        k('<'),
        ...zxcv.map((c) => k(c)),
        k(','), k('.'), k('-'),
        k('⇧', 2.75, true),
      ],
    },

    // Fila 5: modificadores
    {
      keys: [
        k('Ctrl', 1.25, true),
        k('Alt', 1.25, true),
        k('Space', 6.25, true),
        k('AltGr', 1.25, true),
        k('Ctrl', 1.25, true),
      ],
    },
  ],
};

export const getLayout = (lang: Lang): KeyboardLayout =>
  lang === 'es' ? layoutES : layoutEN;