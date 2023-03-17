#!/bin/sh
cd /var/www/monitoring/nextjspg-dashboard/
echo "STARTING  => NextJSPG-DASHBOARD"

if [ -z "$(lsof -t -i:4000)" ]
then
  echo "No running app at port 4000"
else
  netstat -anp | grep --color ":4000 "
  echo "KILLING running app at port 4000 with PID $(lsof -t -i:4000)"
  kill -9 $(lsof -t -i:4000)
  echo "Process has been killed"
fi

# src/node_modules/.bin/env-cmd -f src/.env.dev pm2 start extras/pm2-dashboard.config.js
pm2 start extras/pm2-nextdashboard.config.js --env production

echo "DONE EXEC => NextJSPG-DASHBOARD"
pm2 logs ExpressPG-DASHBOARD --lines 100