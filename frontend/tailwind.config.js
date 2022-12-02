/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    container: {
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        lg: '3rem',
        xl: '4rem',
        '2xl': '5rem',
      },
    },

    
    extend: {
      colors: {
        cream: 'hsl(30, 38%, 92%)',
        darkCyan: 'hsl(158, 36%, 37%)',
        button: 'hsl(158, 36%, 17%)',
        VDarkBlue: 'hsl(212, 21%, 14%)',
        darkBlue: 'hsl(228, 12%, 48%)',
      },
      
      fontFamily: {
        montserrat: ['"Montserrat"', 'sans-serif'],
        fraunces: ['"Fraunces"', 'sans-serif'],
        poppins: ['"Poppins"', 'sans-serif'],
      },
      backgroundImage: {
        'perfume': "url('./img/desktop.jpg')",
      },
      letterSpacing: {
        perfume: '5px'
      },
      spacing: {
        100: '36rem',
        minus: 'calc(100vh - 100px)'
      }
    },
  },
  plugins: [],
}
