# Xathon
A web3 app to make running walkathons simple and decentralized. 

xathon-react is a react based application written in Typescript using tailwindcss to create a functional frontend. 

xathon-ethereum is a ethereum application created with truffle with contracts in Solidity and tests and in Typescript. 

## Project Goals

1. Create clean and well documented components
2. Create clear tests for all code in the project to get used to using a variety of different testing frameworks
3. Use tailwindcss to get more used to vanilla css properties
4. Use typescript
5. Write readable code using clear formatting and variable names
6. End to end deployment on mainnet and on the web


## Running the applications

### xathon-ethereum
**Installation**
```
cd xathon-ethereum
npm install 
```

**Compilation**
```
npm run compile
```

**Testing**
```
npm test
```

**Deployment**
```
truffle migrate --network rinkeby # deploy to rinkeby 
```

### xathon-react
**Installation**
```
cd xathon-react
npm install
```

**Testing**
```
npm test
```

**Run private server**
```
npm start
```


## TODO:
- [x]  Finish Ethereum Contract 
- [x] Finish Search 
- [ ] Finish "Create Xathon Page" 
- [ ] Finish Page to Interact with Existing Xathons 
- [ ] Deploy to Mainnet / Polygon 
