const THEMES = () => {
  return {
    currentTheme: "default",
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
        "card-hover": "#4f4f4f",
        "column-hover": "var(--card-hover)",
        "navbar-text-color": "#b7b7b7",
        "bg-shadow": "0px 0px 13px 0px rgba(0, 0, 0, 0.31)",
        "card-border": "#272727",
        "text-color": "#b7b7b7",
        "text-bg-color": "#333",
        "icon-color": "#b7b7b7",
        "icon-hover": "var(--card-hover)",
        "modal-bg-color": "var(--card-primary)",
        "modal-icon-color": "#888"
      },
      "high-contrast": {
        "bg-primary": "#333",
        "card-primary": "#444",
        "card-hover": "#4f4f4f",
        "column-hover": "var(--card-hover)",
        "navbar-text-color": "#e5f963",
        "bg-shadow": "0px 0px 13px 0px rgba(0, 0, 0, 0.31)",
        "card-border": "#272727",
        "text-color": "#e5f963",
        "text-bg-color": "#333",
        "icon-color": "#e5f963",
        "icon-hover": "var(--card-hover)",
        "modal-bg-color": "var(--card-primary)",
        "modal-icon-color": "#888"
      }
    }
  };
};

export default THEMES;
