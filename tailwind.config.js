const colors = require("tailwindcss/colors");

module.exports = {
  mode: "jit",
  purge: {
    layers: ["components", "utilities"],
    content: ["./src/**/*.{js,jsx,ts,tsx}", "./src/**/*.{css,module.css}"],
  },
  theme: {
    colors: {
      transparent: "transparent",
      white: colors.white,
      black: colors.black,
      gray: colors.coolGray,
      info: colors.blue,
      success: colors.green,
      warning: colors.yellow,
      error: colors.red,
      primary: colors.indigo,
      accent: colors.sky,
      link: colors.blue,
      navbar: colors.coolGray,
    },
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "1.5rem",
        md: "2rem",
        lg: "3rem",
        xl: "5rem",
      },
    },
    // Media Query Breakpoints
    // Make sure to update the useMedia hook if this config is changed
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    extend: {
      zIndex: {
        backdrop: "800",
        notifications: "850",
        modal: "900",
      },
      spacing: {
        "4/5": "80%",
        "9/10": "90%",
        "screen-1/2": "50vw",
        "screen-1/3": "33.333vw",
        "screen-1/4": "25vw",
        "screen-2/5": "40vw",
        "screen-3/5": "60vw",
      },
      height: {
        "screen-30": "30vh",
        "screen-40": "40vh",
        "screen-60": "60vh",
        "screen-80": "80vh",
      },
      minHeight: {
        "screen-30": "30vh",
        "screen-40": "40vh",
        "screen-60": "60vh",
        "screen-80": "80vh",
      },
      maxHeight: {
        "screen-30": "30vh",
        "screen-40": "40vh",
        "screen-60": "60vh",
        "screen-80": "80vh",
      },
      width: {
        "60ch": "60ch",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
