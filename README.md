[![Gitpod Ready-to-Code](https://img.shields.io/badge/Gitpod-Ready--to--Code-blue?logo=gitpod)](https://gitpod.io/#https://github.com/trustwise/immunity-certificate-app) 

[![Gitpod Ready-to-Code](https://img.shields.io/badge/Gitpod-Ready--to--Code-blue?logo=gitpod)](https://gitpod.io/#https://github.com/trustwise/immunity-certificate-app) 

# Immunity Certificate App

## Preparation of Authority and Tester accounts using MetaMask

1. Download MetaMask browser extension: https://metamask.io/.
2. Open MetaMask in browser and create your wallet.
3. Select `Kovan Test Network` as your blockchain network at the top of the MetaMask window.
4. It is necessary to have multiple accounts for different roles in order to test the application. One account is already created. By default it has name `Account 1`. This one will be used for the approving authority role. It is better to assign proper name to it, for example `Authority`, which can be done in Account Details view. One more account for tester role is needed which can be created from account menu at the top left corner of the extension view by selecting `Create Account`. The name assigned to it can be `Tester`.
5. Now we need to have some ether to execute transactions on the network. For Kovan test network it can be obtained from the faucets:
   - https://faucet.kovan.network/
   - https://gitter.im/kovan-testnet/faucet

   where you would need to supply the ethereum address of your account. The `Authority` account address can be taken for this purpose.
6. After ether has been transferred to your account, you should be able to see the balance in MetaMask (1 Eth is transferred from the first faucet and 3 Eth can be obtained from the second one).
7. In order to submit transactions from `Tester` account, it has to have some Ether as well. We can transfer Eth from `Authority` account directly in MetaMask. Be sure that `Authourity` account is active and then click `Send`, after you have to select `Transfer between my accounts` and select `Tester` account. Then you will need to put amount of ether to be transferred, 0.3 Eth should be enough for performing the test. Transaction Fee option can be left as average. Click `Next` and then confirm the transaction. When the new block is mined (after couple of seconds) you should be able to see 0.3 Eth on your `Tester` account.


## Deploying Tester Registry and Immunity Certificate contract to the chain

This can be done easily with MetaMask and Remix. Be sure that `Authority` account is enabled in MetaMask, since it has more ether to successfully deploy a contract.

1. Open https://remix.ethereum.org/ and select Solidity as your environment.
2. On the left toolbar open the file Explorer and load TesterRegistry.sol and ImmunityCertificate.sol from contracts folder of this repository.
3. Be sure that ImmunityCertificate.sol is opened now and open the Solidity Compiler view on the left toolbar.
4. Select ImmunityCertificate as contract to be compile and press compile (TesterRegistry will be compiled as well as it is a dependency). The compiler should return no errors.
5. Open Deploy and Run Transactions view from the left toolbar and select Injected Web3 as Environment.
6. Select Test Registry contract to be deployed and provide authority address from MetaMask to the contract constructor to the input located on the right side from Deploy button in the following format: `["0x38690D95E783Bc216A8428764a4D4B8f3E5595bf"]` where `0x38690D95E783Bc216A8428764a4D4B8f3E5595bf` is the authority address from MetaMask.
7. Deploy the contract by clicking deploy button and sign the transaction via MetaMask. After the block with transaction is mined the contract should appear in the Deploy and Run Transactions window.
8. Select Immunity Certificate contract to be deployed and provide it with the following constructor parameters: `"0x1D9655a958b00FF1C2b0CA3b5a79523B1a926754", "Covid19 Immunity Certificate"` where `0x1D9655a958b00FF1C2b0CA3b5a79523B1a926754` is the address of just deployed Registry contract and `Covid19 Immunity Certificate` is the description of the certificate contract.
9. Open `contractAddresses.js` file from this repository and update contract addresses with just deployed ones.


## Building and running on localhost

First install dependencies:

```sh
yarn install
```

To run in hot module reloading mode:

```sh
yarn start
```

To create a production build:

```sh
yarn build-prod
```

## Running

Open the file `dist/index.html` in your browser

## Credits
- Project boilerplate by [createapp.dev](https://createapp.dev/)
- Check-mark animated SVG adapted from [Alexander Haniotis](https://codepen.io/haniotis)
