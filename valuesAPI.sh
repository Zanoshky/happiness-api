for i in {1..1000}
do

randomTemp=$(( 20 + $RANDOM % 2 ))
randomHumidity=$(( 30 + $RANDOM % 2 ))
randomDust=$(( 800 + $RANDOM % 20 ))
randomGas=$(( 800 + $RANDOM % 20 ))
randomVolume=$(( 30 + $RANDOM % 40 ))
randomLight=$(( 500 + $RANDOM % 4 ))
echo $randomTemp
echo $randomHumidity



curl -X POST \
  'https://my-office-happiness.com:9443/measurements?access_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlYW0taGVpc2VuYmVyZyIsImlhdCI6MTU3NDc2MTQ4NX0.Ten1x1eFcrNol8gkp0adLvnHTD1mrm3i39IH9WZ2Rpw' \
  -H 'Accept: */*' \
  -H 'Accept-Encoding: gzip, deflate' \
  -H 'Cache-Control: no-cache' \
  -H 'Connection: keep-alive' \
  -H 'Content-Type: application/json' \
  -H 'Host: my-office-happiness.com:9443' \
  -H 'User-Agent: PostmanRuntime/7.20.1' \
  -H 'cache-control: no-cache' \
  -d '{
    "humidity": '$randomHumidity',
    "temperature": '$randomTemp',
    "dust": '$randomDust',
    "gas": '$randomGas',
    "volume": '$randomVolume',
    "light": '$randomLight',
    "homebaseId": 1
}'

sleep 1
done
