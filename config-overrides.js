const webpack = require('webpack');

module.exports = function override(config,evn) {
    const fallback = config.resolve.fallback || { 
      fs: false, 
      child_process: false,
      worker_threads: false,
      esbuild: false,
      module: false,
      
    };
    Object.assign(fallback, {
        "assert": require.resolve("assert"),
        "crypto": require.resolve("crypto-browserify"),
        "stream": require.resolve("stream-browserify"),
        "console": require.resolve("console-browserify"),
        "constants": require.resolve("constants-browserify"),
        "crypto": require.resolve("crypto-browserify"),
        "domain": require.resolve("domain-browser"),
        "events": require.resolve("events"),
        "http": require.resolve("stream-http"),
        "https": require.resolve("https-browserify"),
        "os": require.resolve("os-browserify"),
        "path": require.resolve("path-browserify"),
        "punycode": require.resolve("punycode"),
        "process": require.resolve("process/browser"),
        "querystring": require.resolve("querystring-es3"),
        "stream": require.resolve("stream-browserify"),
        "string_decoder": require.resolve("string_decoder"),
        "sys": require.resolve("util"),
        "timers": require.resolve("timers-browserify"),
        "tty": require.resolve("tty-browserify"),
        "url": require.resolve("url"),
        "util": require.resolve("util"),
        "vm": require.resolve("vm-browserify"),
        "zlib": require.resolve("browserify-zlib")
        
    })
    config.resolve.fallback = fallback;
    config.plugins = (config.plugins || []).concat([
        new webpack.ProvidePlugin({
            fs: 'false',
            child_process: 'empty',
            net: 'empty',
            dns: 'empty',
            tls: 'empty',
        })
    ])
    return config;
}