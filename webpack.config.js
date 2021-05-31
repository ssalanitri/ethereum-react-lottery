const path = require('path');

module.exports = {
  entry: './src/components/Main.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000
  }
};

//Webpack agrupa todas las dependencias y generar un version desplegable de la aplicacion.
