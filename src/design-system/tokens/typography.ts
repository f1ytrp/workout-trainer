export const fontFamilies = {
  display: 'Montserrat-Bold', displayMedium: 'Montserrat-Medium', body: 'DMSans-Regular',
  bodyMedium: 'DMSans-Medium', bodyStrong: 'DMSans-Bold',
} as const;
export const fontSizes = { micro: 11, caption: 13, body: 15, bodyLarge: 17, title: 24, display: 34, hero: 48 } as const;
export const fontWeights = { regular: '400', medium: '500', strong: '700' } as const;
export const typography = {
  eyebrow: { fontFamily: fontFamilies.bodyMedium, fontSize: fontSizes.micro, letterSpacing: 1.4 },
  body: { fontFamily: fontFamilies.body, fontSize: fontSizes.body, lineHeight: 22 },
  bodyStrong: { fontFamily: fontFamilies.bodyStrong, fontSize: fontSizes.body, lineHeight: 22 },
  title: { fontFamily: fontFamilies.display, fontSize: fontSizes.title, lineHeight: 30 },
  display: { fontFamily: fontFamilies.display, fontSize: fontSizes.display, lineHeight: 40 },
} as const;
