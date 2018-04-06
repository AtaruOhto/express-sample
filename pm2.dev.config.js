module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps : [{
      name      : 'SampleApp',
      script    : 'dist/index.js',
      env: {
          NODE_ENV: 'development'
      },
      "watch" : ["dist", "views"],
      "ignore_watch" : ["node_modules", "tmp", "server"],
      "watch_options": {
        "followSymlinks": false,
          "useFsEvents": false
      }
  }]
};
