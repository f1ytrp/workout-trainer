export const motion = {
  durations: { instant: 0, fast: 140, standard: 220, slow: 360, reduced: 0 },
  springs: {
    press: { damping: 18, stiffness: 320, mass: 0.7 },
    sheet: { damping: 24, stiffness: 240, mass: 0.9 },
    entrance: { damping: 20, stiffness: 180, mass: 0.8 },
  },
} as const;
export const springs = motion.springs;
