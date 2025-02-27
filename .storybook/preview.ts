import "tailwindcss/tailwind.css";

export const parameters = {
  backgrounds: {
    default: "ligth",
  },
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};
