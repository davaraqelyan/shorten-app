const { join } = require('path');

module.exports = {
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  target: 'node',
  entry: './src/main.ts',
  output: {
    path: join(__dirname, 'dist'),
    filename: 'main.js',
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: {
          loader: 'swc-loader',
          options: {
            jsc: {
              parser: {
                syntax: 'typescript',
                decorators: true,
                dynamicImport: true,
              },
              transform: {
                decoratorMetadata: true,
              },
              target: 'es2021',
            },
          },
        },
        exclude: /node_modules/,
      },
    ],
  },
  externals: {
    'class-transformer/storage': 'commonjs2 class-transformer/storage',
    '@nestjs/websockets/socket-module': 'commonjs2 @nestjs/websockets/socket-module',
    '@nestjs/microservices/microservices-module': 'commonjs2 @nestjs/microservices/microservices-module',
    '@nestjs/microservices': 'commonjs2 @nestjs/microservices',
    '@nestjs/websockets': 'commonjs2 @nestjs/websockets',
  },
  externalsPresets: {
    node: true,
  },
};
