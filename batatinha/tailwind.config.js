/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors:{
        "roxo-batatinha": "#6026D1",
        "ciano-batatinha": "#07B5F5",
        "magenta-batatinha": "#FF1A51",
        "azul-opaco": "#22709C",
        "dourado-batatinha": "#FFBB0D",
      },

      fontFamily:{
        "titular": "HomeworkNormal"
      }

    },
  },
  plugins: [],
}
