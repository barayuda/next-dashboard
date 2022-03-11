module.exports = {
	apps: [
		{
			name: 'NextJSPG-DASHBOARD',
			// instance: 2,
			// cwd: '/Applications/Data/ReactNextJS/nextjs-testapp-argon',
			// interpreter: '/Applications/Data/ReactNextJS/nextjs-testapp-argon/node_modules/.bin/node',
			cwd: '/var/www/nextjspg-dashboard/',
			interpreter: '/var/www/nextjspg-dashboard/node_modules/.bin/node',
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
			env_production: {
				NODE_ENV: 'production',
				API_URL: 'http://10.14.20.49',
				PORT: 4000,
			},
		},
	],
};
