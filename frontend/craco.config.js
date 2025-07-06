const path = require('path');

module.exports = {
  style: {
    postcss: {
      plugins: [
        require('postcss-import'),
        require('tailwindcss'),
        require('autoprefixer'),
      ],
    },
  },
  webpack: {
    configure: (webpackConfig) => {
      webpackConfig.output.path = path.resolve(__dirname, 'dist');
      return webpackConfig;
    },
  },
};
