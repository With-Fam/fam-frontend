# bash
rm ./node_modules/ipfs-utils/src/http/fetch.js
rm ./node_modules/ipfs-utils/src/fetch.js

cp ./scripts/files/http.fetch.js ./node_modules/ipfs-utils/src/http/fetch.js
cp ./scripts/files/electron.fetch.js ./node_modules/ipfs-utils/src/fetch.js