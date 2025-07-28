module.exports = {
  apps: [{
    name: 'cv-backend',
    script: './server.js',
    max_memory_restart: '500M',
    env: {
      NODE_ENV: 'production',
      PORT: 3000,
      PUPPETEER_EXECUTABLE_PATH: '/usr/bin/google-chrome-stable',
      ANALYTICS_API_KEY: '763746102b88b655d6d812ccb9453db0f429de3c78bd1fced99508fa0f5cfe6f',
      CORS_ORIGIN: 'http://178.128.143.51,https://178.128.143.51,http://learningwithreda.com,https://learningwithreda.com,http://www.learningwithreda.com,https://www.learningwithreda.com'
    },
    error_file: 'logs/err.log',
    out_file: 'logs/out.log',
    log_file: 'logs/combined.log',
    time: true
  }]
}
