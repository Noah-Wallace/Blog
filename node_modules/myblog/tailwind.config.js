/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        space: {
          50: '#f0f4ff',
          100: '#e6eeff',
          200: '#bfd2ff',
          300: '#99b5ff',
          400: '#4d7bff',
          500: '#0041ff',
          600: '#003be6',
          700: '#0031bf',
          800: '#002799',
          900: '#001f7d',
        },
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: 'none',
            color: '#1a1a2e',
            a: {
              color: '#0041ff',
              '&:hover': {
                color: '#003be6',
              },
            },
            h1: {
              color: '#1a1a2e',
              fontWeight: '700',
              marginBottom: '1.5rem',
            },
            h2: {
              color: '#1a1a2e',
              fontWeight: '600',
              marginTop: '2rem',
              marginBottom: '1rem',
            },
            h3: {
              color: '#1a1a2e',
              fontWeight: '600',
              marginTop: '1.5rem',
              marginBottom: '0.75rem',
            },
            strong: {
              color: '#1a1a2e',
              fontWeight: '600',
            },
            code: {
              color: '#1a1a2e',
              backgroundColor: '#f0f4ff',
              borderRadius: '0.375rem',
              padding: '0.25rem 0.375rem',
              fontWeight: '400',
            },
            pre: {
              backgroundColor: '#1a1a2e',
              color: '#f0f4ff',
              borderRadius: '0.5rem',
              padding: '1rem',
              marginTop: '1.5rem',
              marginBottom: '1.5rem',
            },
            blockquote: {
              fontStyle: 'italic',
              borderLeftWidth: '4px',
              borderLeftColor: '#0041ff',
              backgroundColor: '#f0f4ff',
              padding: '1rem 1.5rem',
              marginTop: '2rem',
              marginBottom: '2rem',
              borderRadius: '0 0.5rem 0.5rem 0',
            },
            'ul > li': {
              paddingLeft: '1.5rem',
              marginBottom: '0.5rem',
            },
            'ol > li': {
              paddingLeft: '1.5rem',
              marginBottom: '0.5rem',
            },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
  ],
  darkMode: 'class'
}