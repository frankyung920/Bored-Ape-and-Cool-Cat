# Quiz: Bored Ape and Cool Cat 
### Frank Yung

This is a NodeJS application which contains 1 endpoint for returning intersection of the two owners sets of 2 NFT - Bored Ape Yacht Club (BAYC) and Cool Cats (COOL).

This application is using expressJS framework is run as a service. For communicating with Smart Contract, it is using web3 library.

As the Smart Contract only support for getting owner address one by one by using "ownerOf", it is using a Smart Contract - MultiCall to try to reduce number of request to the blockchain, so that the efficiency can be improved. 

#### To start the application
```
npm install
node src/index.js
```

#### Environment Variable
5 environment variables are created for the application
```
# Infura Endpoint
INFURA=https://mainnet.infura.io/v3/f28e787e358a448e9a3d5c082ef0a213
# Bored Ape Yacht Club Smart Contract address
BAYC_CONTRACT_ADDRESS=0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d
# Cool Cats Smart Contract address
COOL_CONTRACT_ADDRESS=0x1a92f7381b9f03921564a437210bb9396471050c
# Multi Call Smart Contract address
MULTI_CALL_CONTRACT_ADDRESS=0xeefba1e63905ef1d7acba5a8513c70307c1ce441
# Number of owner address (i.e by token id) in 1 request
MULTI_CALL_NO_OF_ADDRESS_PER_CALL=2500
```

#### Endpoint
There is only 1 endpoint and it is a GET request for returning returning intersection of the two owners sets of the 2 NFT.
```
GET {ip address}/nft
```
