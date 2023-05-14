import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableOpacity,
  Image,
  StatusBar,
  Alert,
  ScrollView,
} from 'react-native';
const bitcoin = require('rn-bitcoinjs-lib');
import config from '../config.json';
import FlashMessage from 'react-native-flash-message';
import {showMessage} from 'react-native-flash-message';
import Portfolio from './Portfolio';

const PrivateKey = () => {
  const [address, setAddress] = useState('');
  const [valid, setValid] = useState(false);

  const privateKey = config.BTC_PRIVATE_KEY1;

  async function validatePrivateKey(privateKey) {
    try {
      const keyPair = bitcoin.ECPair.fromPrivateKey(
        Buffer.from(privateKey, 'hex'),
        {
          network: bitcoin.networks.testnet,
        },
      );
      const {address} = bitcoin.payments.p2pkh({
        pubkey: keyPair.publicKey,
        network: bitcoin.networks.testnet,
      });
      console.log('valid');
      setValid(true);

      showMessage({
        message: 'Valid Key',
        description: 'Valid Key',
        type: 'success',
        duration: 3000,
        color: '#fe0000',
      });
      return {
        isValid: true,
        address: address,
      };
    } catch (error) {
      console.log('Invalid');
      showMessage({
        message: 'Invalid Key',
        description: 'Entered Private Key is Invalid!',
        type: 'danger', // can be "info", "success", "warning", or "danger"
        duration: 3000,
      });

      console.log(error);
      return {
        isValid: false,
        error: error.message,
      };
    }
  }

  return (
    <>
      {valid ? (
        <Portfolio></Portfolio>
      ) : (
        <View style={styles.privatekeycontainer}>
          <View style={styles.fieldscontainer}>
            <View style={styles.privatekey_txt_container}>
              <Text style={styles.privatekey_txt}>Import Bitcoin Wallet</Text>
            </View>

            <TextInput
              placeholder="6b5e79b5072d56fc17e44396a5a4ef7"
              style={styles.address}
              value={address}
              placeholderTextColor={'#9B9898'}
              onChangeText={text => setAddress(text)}></TextInput>

            <TouchableOpacity
              style={styles.btn}
              onPress={() => {
                validatePrivateKey(privateKey);
                // fetchData();
              }}>
              <Text style={styles.btntxt}>Import Wallet</Text>
            </TouchableOpacity>
          </View>
          <StatusBar backgroundColor="#1A1919" barStyle="light-content" />
          <FlashMessage position="top" />
        </View>
      )}
    </>
  );
};

export default PrivateKey;
const P90 = '90%';
const P20 = '20%';
const P50 = '55%';

const P100 = '100%';

const styles = StyleSheet.create({
  mywalletaddress_txt: {
    fontSize: 15,
    fontFamily: 'Gilroy-Bold',
    color: '#000000',
  },
  privatekeycontainer: {
    flex: 1,
    backgroundColor: '#FFFf',
    justifyContent: 'space-between',
  },
  privatekey_txt: {
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
  privatekey_txt_container: {
    width: P90,
  },

  address: {
    backgroundColor: '#F8FAF8',
    width: P90,
    alignSelf: 'center',
    marginTop: 10,
    paddingLeft: 10,
    fontSize: 17,
    fontFamily: 'Gilroy-Medium',
    color: '#000000',
    borderColor: '#696969',
    borderWidth: 1,
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
    paddingTop: P20,
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
