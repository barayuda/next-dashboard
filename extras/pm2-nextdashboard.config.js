module.exports = {
  apps: [
    {
      name: 'NextJSPG-DASHBOARD',
      // instance: 2,
      // cwd: '/Applications/Data/ReactNextJS/nextjs-testapp-argon',
      // interpreter: '/Applications/Data/ReactNextJS/nextjs-testapp-argon/node_modules/.bin/node',
      cwd: '/var/www/monitoring/nextjspg-dashboard/',
      interpreter:
        '/var/www/monitoring/nextjspg-dashboard/node_modules/.bin/node',
      script: 'node_modules/.bin/next',
      args: 'start',
      autorestart: true,
      // max_memory_restart: '1G',
      watch: true,
      merge_log: true,
      env: {
        NODE_ENV: 'development',
        API_URL: 'http://10.14.20.49',
        PORT: 4000,
      },
      env_sandbox: {
        NODE_ENV: 'sandbox',
        API_URL: 'http://10.14.21.37',
        PORT: 4000,
      },
      env_production: {
        NODE_ENV: 'production',
        API_URL: 'http://monitorcommerce.bankmega.com',
        PORT: 4000,
      },
    },
  ],
};
