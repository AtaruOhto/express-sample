pm2 describe SampleApp > /dev/null
RUNNING=$?

if [ "${RUNNING}" -ne 0 ]; then
  pm2 start pm2.prod.config.js
else
  pm2 reload SampleApp
fi;