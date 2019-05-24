const THEMES = () => {
  return {
    // NOTE: use "" for default theme
    currentTheme: "dark",
    themes: {
      // NOTE: out of date with default
      light: {},
      dark: {
        "bg-primary": "rgb(37, 38, 36)",
        "card-primary": "rgb(32, 33, 31)",
        "card-hover": "#333333",
        "button-color": "#2d2d2d",
        "navbar-text-color": "rgb(246, 236, 219)",
        "column-shadow": "0px 0px 6px 0px rgba(0, 0, 0, 0.31)",
        "bg-shadow": "0px 0px 13px 0px rgba(71, 71, 69, 0.24)",
        "card-border": "rgb(69, 67, 62)",
        "text-color": "rgb(246, 236, 219)",
        "text-bg-color": "rgb(43, 43, 41)",
        "icon-primary-color": "#b7b7b7",
        "icon-secondary-color": "#666666",
        "login-icon-bg-color": "var(--text-bg-color)",
        "login-icon-color": "#ffffff",
        "login-input-focus": "rgb(112, 109, 102)",
        "tooltip-text-color": "#ffffff",
        "tooltip-bg-color": "black",
        "input-border": "#615e58",
        "input-placeholder-text-color": "#c6bba8",
        "scrollbar-track-bg": "rgb(36, 37, 35)",
        "scrollbar-thumb-bg": "rgb(68, 68, 65)",
        "scrollbar-thumb-hover-bg": "rgb(73, 73, 65)",
        "toast-success-text-color": "rgb(255, 255, 245)",
        "toast-error-text-color": "rgb(255, 255, 245)",
        "toast-warn-text-color": "rgb(255, 255, 245)",
        "toast-info-text-color": "rgb(255, 255, 245)",
        "toast-success-bg-color": "rgb(47, 172, 39)",
        "toast-error-bg-color": "rgb(134, 47, 33)",
        "toast-warn-bg-color": "rgb(183, 154, 45)",
        "toast-info-bg-color": "rgb(52, 101, 130)",
        "toast-success-progress-color": "rgba(32, 33, 31, 0.7)",
        "toast-error-progress-color": "rgba(32, 33, 31, 0.7)",
        "toast-warn-progress-color": "rgba(32, 33, 31, 0.7)",
        "toast-info-progress-color": "rgba(32, 33, 31, 0.7)"
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
        "modal-icon-color": "#888"
      }
    }
  };
};

export default THEMES;
