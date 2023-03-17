#!/bin/sh
cd /var/www/monitoring/nextjspg-dashboard/
echo "STOPING  => NextJSPG-DASHBOARD"
pm2 stop NextJSPG-DASHBOARD --watch
echo "DONE STOP => NextJSPG-DASHBOARD"
if [ -z "$(lsof -t -i:4000)" ]
then
  echo "No running app at port 4000"
else
  netstat -anp | grep --color ":4000 "
  echo "KILLING running app at port 4000 with PID $(lsof -t -i:4000)"
  kill -9 $(lsof -t -i:4000)
  echo "Process has been killed"
fi