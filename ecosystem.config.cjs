module.exports = {
  apps: [{
    name: 'cv-backend',
    script: './server.js',
    max_memory_restart: '400M',
    instances: 2,
    exec_mode: 'cluster', // Reduced from 500M
    node_args: '--expose-gc --max-old-space-size=384', // Enable GC and limit heap
    env: {
      NODE_ENV: 'production',
      PORT: 3000,
      PUPPETEER_EXECUTABLE_PATH: '/usr/bin/google-chrome-stable',
      ANALYTICS_API_KEY: '763746102b88b655d6d812ccb9453db0f429de3c78bd1fced99508fa0f5cfe6f',
      CORS_ORIGIN: 'http://178.128.143.51,https://178.128.143.51,http://learningwithreda.com,https://learningwithreda.com,http://www.learningwithreda.com,https://www.learningwithreda.com,http://fixacv.se,https://fixacv.se,http://www.fixacv.se,https://www.fixacv.se'
    },
    error_file: 'logs/err.log',
    out_file: 'logs/out.log',
    log_file: 'logs/combined.log',
    time: true
  }]
}
