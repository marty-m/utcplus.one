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
          "accent": "#FDE047"
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
      fontSize: {
        xxs: '0.69rem'
      }}
      },
  plugins: [
    require('@tailwindcss/typography'),
    require("daisyui"),
    require('@tailwindcss/forms'),
  ]
}
