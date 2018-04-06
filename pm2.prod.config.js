module.exports = {
    /**
     * Application configuration section
     * http://pm2.keymetrics.io/docs/usage/application-declaration/
     */
    apps : [{
        name      : 'SampleApp',
        script    : 'dist/index.js',
        env: {
            NODE_ENV: 'production'
        },
        error_file: "./tmp/err.log",
        out_file: "./tmp/std.log",
        "watch" : false
    }]
};
