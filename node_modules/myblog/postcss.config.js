module.exports = {
  plugins: [
    require('@tailwindcss/postcss'), // 👈 shim that Tailwind 4+ expects
    require('autoprefixer')
  ]
};
