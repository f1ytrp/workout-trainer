export const colors = {
  canvas: '#0A0F14', surface: '#121A1F', surfaceRaised: '#192329', surfaceSoft: '#202D31',
  border: '#304044', borderStrong: '#486065', ink: '#F1F5F2', muted: '#A8B5B5', quiet: '#718184',
  lime: '#C7F36B', limeStrong: '#A8D94A', cyan: '#6FE0E0', amber: '#F3C66D', coral: '#F48076',
  glass: 'rgba(25, 35, 41, 0.86)', overlay: 'rgba(4, 8, 10, 0.72)', transparent: 'transparent',
} as const;
export type ColorName = keyof typeof colors;
