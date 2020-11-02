export const THEMES = {
  light: true,
  dark: false,
};

export const getBrowserTheme = () => {
  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? THEMES.dark
    : THEMES.light;
};
