randomTemp=$(( $RANDOM % 40 ))
randomHumidity=$(( $RANDOM % 150 ))
randomDust=$(( $RANDOM % 60 ))
randomGas=$(( $RANDOM % 40 ))
randomVolume=$(( $RANDOM % 100 ))
randomLight=$(( $RANDOM % 70 ))
echo $randomTemp
echo $randomHumidity


curl -X POST \
  'https://my-office-happiness.com:9443/measurements?access_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlYW0taGVpc2VuYmVyZyIsImlhdCI6MTU3NDQ0ODMyN30._nQFNyk8BNv65-CFj7pSmqro8TC_uHAiijiyMxuTanA' \
  -H 'Accept: */*' \
  -H 'Accept-Encoding: gzip, deflate' \
  -H 'Cache-Control: no-cache' \
  -H 'Connection: keep-alive' \
  -H 'Content-Length: 132' \
  -H 'Content-Type: application/json' \
  -H 'Host: my-office-happiness.com:9443' \
  -H 'Postman-Token: 6edc3049-87ce-47a3-9793-93fc6ed8f4fb,5c015050-7e43-4d9b-bb3c-53f7d150b715' \
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
