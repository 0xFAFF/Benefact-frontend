const setTheme = theme => {
  Object.keys(theme).forEach(key => {
    const cssKey = `--${key}`;
    const cssValue = theme[key];
    document.body.style.setProperty(cssKey, cssValue);
  });
};

export default setTheme;
