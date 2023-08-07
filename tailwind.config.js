/** @type {import('tailwindcss').Config} */
module.exports = {
  daisyui: {
    themes: [
      {
        cmyk: {
          ...require("daisyui/src/theming/themes")["[data-theme=cmyk]"],
          "--rounded-btn": "0.1rem",
          "--rounded-box": "0.1rem",
          "neutral": "#000000",
          "accent": "#FDE047",
        },
      },
    ],
  },
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend:{
      spacing:{
        '128': '46.8rem',
      },
      fontSize: {
        xxs: '0.69rem'
      },
      colors: {
        palletteBlue: "#113D55",
    }
    }
      },
  plugins: [
    require('@tailwindcss/typography'),
    require("daisyui"),
    require('@tailwindcss/forms'),
  ]
}
