const THEMES = () => {
  return {
    currentTheme: "dark",
    themes: {
      light: {},
      dark: {
        "bg-primary": "#333",
        "card-primary": "#444",
        "card-hover": "#666",
        "column-hover": "#3c3c3c",
        "navbar-text-color": "#111",
        "bg-shadow": "0px 0px 13px 0px rgba(0, 0, 0, 0.31)",
        "card-border": "#272727",
        "text-color": "#ddd",
        "text-bg-color": "#333",
        "icon-color": "#ddd",
        "modal-bg-color": "var(--card-primary)",
        "modal-icon-color": "#888"
      }
    }
  };
};

export default THEMES;
