import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StatusBar,
  ScrollView,
} from 'react-native';
import config from '../config.json';
const bitcoin = require('rn-bitcoinjs-lib');
import axios from 'axios';
import FlashMessage from 'react-native-flash-message';
import {showMessage, hideMessage} from 'react-native-flash-message';
import Transaction from '../components/Privatekey.js/Transcation';

const Portfolio = () => {
  const [address, setAddress] = useState('');
  const [mywalletAddress, setMyWalletAddress] = useState('');
  const [publicKey, setPublicKey] = useState();
  const [transcations, setTranscations] = useState();
  const [balance, setBalance] = useState();

  const fetchTranscationHistory = async myaddress => {
    try {
      const response = await axios.get(
        `https://blockstream.info/testnet/api/address/${myaddress}/txs`,
      );
      const transcations = response.data;

      console.log('Transcation History:');
      console.log(transcations);
      await setTranscations(transcations);

      transcations.forEach(tx => {
        console.log('Fees:', tx.fee);
        console.log('Status:', tx.confirmation);
        console.log('TxID:', tx.txid);
        console.log('Confirmations:', tx.status.confirmed);
        console.log('Amount:', tx.vout[0].value);
        console.log('----------------------------------');
      });
    } catch (error) {
      console.error('Error fetching transcation history:', error.message);
    }
  };

  const checkBalance = async () => {
    const privateKey = config.BTC_PRIVATE_KEY1;
    try {
      const keyPair = bitcoin.ECPair.fromPrivateKey(
        Buffer.from(privateKey, 'hex'),
      );
      const {address} = bitcoin.payments.p2pkh({
        pubkey: keyPair.publicKey,
        network: bitcoin.networks.testnet,
      });

      const response = await axios.get(
        `https://blockstream.info/testnet/api/address/${address}/utxo`,
      );
      const utxos = response.data;

      let totalBalance = 0;
      for (const utxo of utxos) {
        totalBalance += utxo.value;
      }

      var usdtBalance = 0.000267 * totalBalance;

      await setMyWalletAddress(address);
      await setPublicKey(keyPair.publicKey);
      await setBalance(usdtBalance);

      console.log(`Address: ${address}`);
      console.log(`Balance: ${totalBalance * 0.000267} USDT`);
    } catch (error) {
      console.log('Error checking balance:', error.message);
    }
  };

  useEffect(() => {
    var myaddress = config.BTC_ADDRESS1;
    fetchTranscationHistory(myaddress);
    checkBalance();
  }, []);

  const sendBTC = async () => {
    const network = bitcoin.networks.testnet;
    const privateKeyHex = config.BTC_PRIVATE_KEY1;
    // Convert private key to WIF
    const privateKey1 = Buffer.from(privateKeyHex, 'hex');
    const keyPair = bitcoin.ECPair.fromPrivateKey(privateKey1, {network});
    const privateKeyWIF = keyPair.toWIF();

    const publicKey = keyPair.publicKey;

    // Generate the Bitcoin testnet address
    const senderAddress = bitcoin.payments.p2pkh({
      pubkey: publicKey,
      network,
    }).address;

    const recipientAddress = config.BTC_ADDRESS2;
    const amount = 0.0001;
    const txb = new bitcoin.TransactionBuilder(network);
    const myadd = 'n4cTTb5o2wN6gXejQxW9EZfJqntRLA6Mb9';

    // Fetch sender's UTXOs (Unspent Transaction Outputs)
    const response = await axios.get(
      `https://blockstream.info/testnet/api/address/${senderAddress}/utxo`,
    );
    const utxos = response.data;

    // Calculate the total input amount
    const totalInputAmount = utxos.reduce(
      (total, utxo) => total + utxo.value,
      0,
    );

    // Calculate the fee
    const fee = 5000; // Fee in Satoshis

    // Calculate the change amount
    const changeAmount = totalInputAmount - amount * 1e8 - fee;
    console.log('change Amount');
    console.log(changeAmount);

    utxos.forEach(utxo => {
      txb.addInput(utxo.txid, utxo.vout);
    });

    // Add the recipient's address and amount as an output
    txb.addOutput(recipientAddress, amount * 1e8);

    // Add the change output
    // const senderAddress = address;
    if (changeAmount > 0) {
      txb.addOutput(senderAddress, changeAmount);
    }
    const privateKey = bitcoin.ECPair.fromWIF(privateKeyWIF, network);
    utxos.forEach((utxo, index) => {
      txb.sign(index, privateKey);
    });

    // Build the transaction
    const tx = txb.build();

    // Serialize the transaction
    const txHex = tx.toHex();
    showMessage({
      message: 'Transcation Done successfully',
      type: 'success',
      duration: 3000,
      color: '#FFFFFF',
    });

    // Broadcast the transaction to the Testnet network
    await axios.post(`https://blockstream.info/testnet/api/tx`, txHex);

    console.log('Transaction successfully sent.');
  };

  return (
    <>
      <View>
        <View style={styles.fieldscontainer}>
          <View style={styles.portfolio_txt_container}>
            <Text style={styles.portfolio_txt}>PortFolio</Text>
          </View>

          <View style={styles.portfolio_txt_container}>
            <Text style={styles.mywalletaddress_txt}>
              my wallet Address: {mywalletAddress}
            </Text>
            <Text style={styles.mywalletaddress_txt}>
              my wallet Balance: {balance} USDT
            </Text>
            <Text style={styles.mywalletaddress_txt}>
              Public Key: {publicKey}
            </Text>
          </View>

          <TextInput
            placeholder="Enter Receivers Test Net Address"
            style={styles.address}
            value={address}
            placeholderTextColor={'#696969'}
            onChangeText={text => setAddress(text)}></TextInput>

          <TouchableOpacity
            style={styles.btn}
            onPress={() => {
              sendBTC();
            }}>
            <Text style={styles.btntxt}>Send BTC</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.transcation_block}>
          <View style={styles.transcation_txt_block}>
            <Text style={styles.transcation_txt}>Transcation History</Text>
          </View>
          <ScrollView style={styles.history_scrollview}>
            {transcations?.map((tran, index) => {
              return <Transaction data={tran} key={index}></Transaction>;
            })}
          </ScrollView>
        </View>
      </View>

      <StatusBar backgroundColor="#1A1919" barStyle="light-content" />
      <FlashMessage position="top" />
    </>
  );
};

export default Portfolio;
const P90 = '90%';
const P50 = '55%';

const P100 = '100%';

const styles = StyleSheet.create({
  mywalletaddress_txt: {
    fontSize: 15,
    fontFamily: 'Gilroy-Bold',
    color: '#000000',
  },
  portfoliocontainer: {
    flex: 1,
    backgroundColor: '#0C0C0C',
    justifyContent: 'space-between',
  },
  portfolio_txt: {
    fontSize: 33,
    fontFamily: 'Gilroy-Bold',
    color: '#000000',
  },

  txt: {
    color: '#000000',
    fontSize: 20,
    fontFamily: 'Poppins-BlackItalic',
    marginLeft: 10,
  },
  txtcontainer: {
    width: P90,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  txtlogo: {
    color: '#000000',
    fontSize: 30,
    fontFamily: 'Poppins-BlackItalic',
    textAlign: 'center',
  },
  portfolio_txt_container: {
    width: P90,
  },

  address: {
    backgroundColor: '#FFFFFF',
    width: P90,
    alignSelf: 'center',
    marginTop: 10,
    paddingLeft: 10,
    fontSize: 17,
    fontFamily: 'Gilroy-Medium',
    color: '#000000',
  },

  amount: {
    backgroundColor: '#1A1919',
    width: P90,
    alignSelf: 'center',
    marginTop: 10,
    fontSize: 17,
    fontFamily: 'Gilroy-Medium',
    paddingLeft: 10,
    color: '#FFFFFF',
  },
  fieldscontainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  btncontainer: {
    width: P90,
    alignSelf: 'center',
    paddingTop: 10,
  },
  btn: {
    height: 50,
    width: P90,
    backgroundColor: '#000000',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  btntxt: {
    alignSelf: 'center',
    color: '#FFFFFF',
    fontSize: 21,
    fontFamily: 'Gilroy-Bold',
  },
  txt2: {
    color: '#FFFFFF',
    paddingTop: 10,
    marginLeft: 10,
    fontFamily: 'Gilroy-Bold',
    fontSize: 15,
  },
  txt2Register: {
    fontFamily: 'Gilroy-Bold',
    fontSize: 15,
    paddingTop: 10,
    marginLeft: 5,
    color: '#FFFF',
  },
  txt2container: {
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
    flexDirection: 'row',
    paddingBottom: 20,
  },

  transcation_block: {
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    marginTop: 15,
  },
  transcation_txt: {
    fontFamily: 'Gilroy-Bold',
    fontSize: 20,
  },
  transcation_txt_block: {
    width: P90,
  },
  history_scrollview: {
    width: P100,
    height: P50,
  },
});
