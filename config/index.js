// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')

module.exports = {
    build: {
        env: require('./prod.env'),
        index: path.resolve(__dirname, '../dist/index.html'),
        assetsRoot: path.resolve(__dirname, '../dist'),
        assetsSubDirectory: 'static',
        assetsPublicPath: '/',
        productionSourceMap: true,
        // Gzip off by default as many popular static hosts such as
        // Surge or Netlify already gzip all static assets for you.
        // Before setting to `true`, make sure to:
        // npm install --save-dev compression-webpack-plugin
        productionGzip: true,
        productionGzipExtensions: ['js', 'css'],
        // Run the build command with an extra argument to
        // View the bundle analyzer report after build finishes:
        // `npm run build --report`
        // Set to `true` or `false` to always turn it on or off
        bundleAnalyzerReport: process.env.npm_config_report
    },
    dev: {
        env: require('./dev.env'),
        port: 3000,
        autoOpenBrowser: true,
        assetsSubDirectory: 'static',
        assetsPublicPath: '/',
        proxyTable: {
        '/v2': {
          target: 'http://demowap.imxkj.com/', // 外网测试服
          // target: 'http://wap.demo.com', // 内网
          // target: 'https://api.yuanyintang.com/', // 线上
          changeOrigin: true,
          onProxyRes (proxyRes) {
            var oldCookie = proxyRes.headers['set-cookie'];

            if(oldCookie == null || oldCookie.length == 0){
                delete proxyRes.headers['set-cookie'];
                return;
            }

            var newCookie = '';
            var oldCookieItems = oldCookie[0].split(';');

            for (var i=0; i < oldCookieItems.length; ++i) {
                if (newCookie.length >0) {
                    newCookie += ';'
                }

                if (oldCookieItems[i].toLowerCase().indexOf('path=') >= 0) {
                    newCookie += 'path=/';
                } else if (oldCookieItems[i].indexOf('domain=') >= 0) {
                    newCookie += 'domain=';
                } else{
                    newCookie += oldCookieItems[i];
                }
            }

            proxyRes.headers['set-cookie'] = [newCookie];
          }
        },
        '/files': {
          target: 'http://api.demo.com',
          // target: 'http://demo.imxkj.com',
          changeOrigin: true
        }

      },
        // CSS Sourcemaps off by default because relative paths are "buggy"
        // with this option, according to the CSS-Loader README
        // (https://github.com/webpack/css-loader#sourcemaps)
        // In our experience, they generally work as expected,
        // just be aware of this issue when enabling this option.
        cssSourceMap: false
    }
}
