# Solidity and React sample application

#Based in Udemy Ethereum and Solidity - The complete developers guide

Before use this application:

- In local Ethereum blockchain use ganache-cli provider and view the blockchain details using
ganache-cli or ganache (UI version) application ( https://www.trufflesuite.com/docs/ganache/overview )

- In Test Ethereum Network 

1- Create or use your Metamask Wallet ( https://metamask.io/ ) and use some test network (in this sample is used rinkeby ethereum test network.

2- Create a Infura user and create a test Infura api url (https://infura.io)

3- In the root path create .env file and write this keys.

MNEMONIC= <your metamask 12 words menmonic>
INFURA_URL=https://<your selecterd ethereum test network>.infura.io/v3/<your infura key>

# IMPORTANT!!! 
Change the .gitignore file by add **.env** file because the metamask mnemonic is use for all of Ethereum networks include the **main network.**
# Never shared this!!!

For two options the next is the same.

4- Compile lottery contract. 

- To compile: 

  - truffle compile


5- Deploy the lottery contract in selected provider.

Change ethereum/provider file

- Configure deploy in local Ethereum Network (Ganache)

  - Configure development network in netkworks node into truffle-config.js file

- Configure deploy in Test Network

  - Configure some test network in netkworks node into truffle-config.js file


- Deploy the contract en selected network

  - $ truffle deploy

- Start de application

  - $npm start

  - When the application start try to connect to Metamask Chrome extension. 
    For testing use Metamask connected with local RPC network. 
    See the Metamask documentation for more details.



**_Enjoy it!!_**







