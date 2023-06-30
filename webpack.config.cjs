const path = require('path');

module.exports = {
  entry: './src/index.js', // Entry point of your application
  output: {
    path: path.resolve(__dirname, 'dist'), // Output directory
    filename: 'bundle.js', // Output bundle filename
  },
  module: {
    rules: [
      // Add loaders for different file types or preprocessors
      {
        test: /\.js$/, // Apply the loader to JavaScript files
        exclude: /node_modules/, // Exclude the node_modules directory
        use: 'babel-loader', // Use the babel-loader for transpiling
      },
      // Add more rules for other file types as needed
    ],
  },
  // Configure additional plugins, optimizations, etc.
};
