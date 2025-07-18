const path = require('path');

module.exports = {
  webpack: {
    alias: {
      // Create shorter import paths
      '@': path.resolve(__dirname, 'src'),
      '@components': path.resolve(__dirname, 'src/Components'),
      '@pages': path.resolve(__dirname, 'src/Pages'),
      '@services': path.resolve(__dirname, 'src/services'),
      '@hooks': path.resolve(__dirname, 'src/hooks'),
    }
  }
};
