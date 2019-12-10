echo "Using ENVIRONMENT $1"
echo "Sending $2 RANDOM Events to Homebase ID 1"
for i in $(seq 1 $2);
do

randomTemp=$(( 20 + $RANDOM % 10 ))
randomHumidity=$(( 30 + $RANDOM % 10 ))
randomDust=$(( 800 + $RANDOM % 100 ))
randomGas=$(( 400 + $RANDOM % 200 ))
randomVolume=$(( 30 + $RANDOM % 60 ))
randomLight=$(( 500 + $RANDOM % 25 ))

echo $randomHumidity $randomTemp $randomDust $randomGas $randomVolume $randomLight

curl -s -X POST \
  $1'/measurements?access_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlYW0taGVpc2VuYmVyZyIsImlhdCI6MTU3NDc2MTQ4NX0.Ten1x1eFcrNol8gkp0adLvnHTD1mrm3i39IH9WZ2Rpw' \
  -H 'Accept: */*' \
  -H 'Accept-Encoding: gzip, deflate' \
  -H 'Cache-Control: no-cache' \
  -H 'Connection: keep-alive' \
  -H 'Content-Type: application/json' \
  -H 'Host: '$1 \
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
}' > /dev/null

sleep 1
done
