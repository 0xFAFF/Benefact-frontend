const THEMES = () => {
  return {
    currentTheme: "dark",
    themes: {
      light: {
        "bg-primary": "#eef1f5",
        "bg-navbar": "var(--bg-primary)",
        "navbar-text-color": "var(--text-color)",
        "modal-bg-color": "#ffffff",
        "bg-shadow": "0px 0px 13px 0px rgba(98, 98, 102, 0.16)",
        "card-border": "lightgrey",
        "card-primary": "#ffffff",
        "card-hover": "#e5eae9",
        "column-hover": "#f3f3f3",
        "text-color": "black",
        "text-bg-color": "#f0f0f0",
        "icon-color": "black",
        "modal-icon-color": "rgb(26, 25, 25)"
      },
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
