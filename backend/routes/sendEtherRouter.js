const express = require('express');
const router = express.Router();
const db = require('../models');
const lightwallet = require('eth-lightwallet');
const Web3 = require('web3');
const web3 = new Web3('HTTP://127.0.0.1:7545');
const { User, Users } = require('../models');

// router.post('/',async(req,res)=>{
//     //가나슈 게졍
//     const sendAccount = '0x10E5fFd382244F3de89DE81A1CF340e60e53288D';
//     const privateKey = '46997d44f08d649590bbb145c196aff665cf18daac8bd61cc46297bfb9929d4b'
//     //가나슈게졍

//     const receiveAccount = req.body.account

//     const userInfo = await User.findAll({
//         raw : true,
//         where : {address:receiveAccount}
//     })

//     //none를 구하는 함수  getTransactionCount

//      const nonce = await web3.eth.getTransactionCount(sendAccount,'latest');
//      const tx = {
//         'from': sendAccount,
//         'to': receiveAccount,
//         'nonce': nonce,
//         'gas': 500000,
//         'value': web3.utils.toWei('0.01','ether')
//       };

//     const signPromise = web3.eth.accounts.signTransaction(tx, privateKey);

//     signPromise.then((signedTx) => {

//         web3.eth.sendSignedTransaction(signedTx.rawTransaction, async function(err, hash) {
//           if (!err) {
//             const balance  = await web3.eth.getBalance(receiveAccount)
//             res.json(
//                 {
//                     'message' : 'Facuet Successed',
//                      'data' : {
//                          'userName':userInfo[0].userName,
//                          'address':userInfo[0].address,
//                          'balance':web3.utils.fromWei(balance,'ether')+"eth",
//                          'txHash':hash
//                      }
//                 }
//             );
//           } else {
//             console.log('실패!!')
//           }
//         });
//       }).catch((err) => {
//         console.log("Promise failed:", err);
//         res.json(
//             {
//                 message: "Error: Faucet Transaction Faield"
//             }
//         )

//       });
// })

router.post('/', async (req, res) => {
  //가나슈 게졍
  const sendAccount = '0xa24BA4Cf6457337152c0a442f7C407ABb097a795';
  const privateKey =
    '14450c52d96b8a3ada85de77040d6d4608070fc7b86baf1152aed039c3256467';
  //가나슈게졍

  const receiveAccount = '0x258787a5642195Ba164adcd1b8fE814Cc50fF1Ac';

  // const userInfo = await User.findAll({
  //   raw: true,
  //   where: { address: receiveAccount },
  // });

  //none를 구하는 함수  getTransactionCount

  const nonce = await web3.eth.getTransactionCount(sendAccount, 'latest');
  const tx = {
    from: sendAccount,
    to: receiveAccount,
    nonce: nonce,
    gas: 500000,
    value: web3.utils.toWei('0.01', 'ether'),
  };

  const signPromise = web3.eth.accounts.signTransaction(tx, privateKey);
  signPromise
    .then((signedTx) => {
      web3.eth.sendSignedTransaction(
        signedTx.rawTransaction,
        async function (err, hash) {
          if (!err) {
            const balance = await web3.eth.getBalance(receiveAccount);
            res.json({
              message: 'Facuet Successed',
              data: {
                userName: 'test12345',
                address: receiveAccount,
                balance: web3.utils.fromWei(balance, 'ether') + 'eth',
                txHash: hash,
              },
            });
          } else {
            console.log('실패!!');
          }
        }
      );
    })
    .catch((err) => {
      console.log('Promise failed:', err);
      res.json({
        message: 'Error: Faucet Transaction Faield',
      });
    });
});

// router.get('/get', async (req, res, next) => {
//   const accounts = await web3.eth.getAccounts();
//   console.log(accounts);
// });

module.exports = router;
