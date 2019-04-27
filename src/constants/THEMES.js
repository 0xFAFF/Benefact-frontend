const THEMES = () => {
  return {
    // NOTE: use "" for default theme
    currentTheme: "dark",
    themes: {
      // NOTE: out of date with default
      light: {
        "bg-primary": "#eef1f5",
        "column-shadow": "0px 0px 6px 0px rgba(98, 98, 102, 0.16)",
        "bg-shadow": "0px 0px 13px 0px rgba(98, 98, 102, 0.16)",
        "card-border": "lightgrey",
        "card-primary": "#f9f9f9",
        "card-hover": "#e5eae9",
        "column-hover": "#f3f3f3",
        "text-color": "black",
        "text-bg-color": "#f0f0f0",
        "icon-color": "black",
        "modal-icon-color": "rgb(26, 25, 25)",
      },
      dark: {
        "bg-primary": "#333",
        "card-primary": "#444",
        "card-hover": "#4f4f4f",
        "navbar-text-color": "#b7b7b7",
        "column-shadow": "0px 0px 6px 0px rgba(0, 0, 0, 0.31)",
        "bg-shadow": "0px 0px 13px 0px rgba(0, 0, 0, 0.31)",
        "card-border": "#272727",
        "text-color": "#b7b7b7",
        "text-bg-color": "#333",
        "icon-color": "#b7b7b7",
        "modal-icon-color": "#888",
        "login-icon-bg-color": "#09bc09",
        "login-icon-color": "#027a02",
        "login-button-bg-color": "var(--login-icon-bg-color)",
        "login-button-color": "#ffffff",
      },
      "high-contrast": {
        "bg-primary": "#333",
        "card-primary": "#444",
        "card-hover": "#4f4f4f",
        "column-primary": "#2d2d2d",
        "navbar-text-color": "#e5f963",
        "column-shadow": "0px 0px 6px 0px rgba(0, 0, 0, 0.31)",
        "bg-shadow": "0px 0px 13px 0px rgba(0, 0, 0, 0.31)",
        "card-border": "#272727",
        "text-color": "#e5f963",
        "text-bg-color": "#333",
        "icon-color": "#e5f963",
        "modal-icon-color": "#888",
      },
    },
  };
};

export default THEMES;
