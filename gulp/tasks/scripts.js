// import '@babel/polyfill';
// Только для сборки javascript
import webpack from 'webpack'

const config = require('../../webpack.config.scripts.js')

export default function scripts(cb) {
  webpack(config, () => {
    cb();
  });
}
