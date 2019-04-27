const setTheme = theme => {
  if (!theme || typeof theme !== "object") return;
  Object.keys(theme).forEach(key => {
    const cssKey = `--${key}`;
    const cssValue = theme[key];
    document.body.style.setProperty(cssKey, cssValue);
  });
};

export default setTheme;
