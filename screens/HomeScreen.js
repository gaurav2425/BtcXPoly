import React, {useEffect, useState} from 'react';
import {observer, useLocalObservable} from 'mobx-react-lite';
import dataStore from '../DataStore';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  ScrollView,
  Button,
  TextInput,
  Touchable,
  Modal,
  Image,
  TouchableOpacity,
  TouchableHighlight,
  Pressable,
  TouchableNativeFeedback,
} from 'react-native';
import axios from 'axios';

import PriceCard from '../components/Homescreen/PriceCard';

const HomeScreen = ({navigation}) => {
  const [coinList, setCoinList] = useState();

  const fetchCoinList = async () => {
    await fetch(
      'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin,matic-network,ethereum,arbitrum,milady-meme-coin,pepe,ignore-fud,aptos,sui',
    )
      .then(res => res.json())
      .then(async data => {
        await setCoinList(data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchCoinList();
    // dataStore.createData();
  }, []);

  return (
    <View>
      <View style={styles.home}>
        <View style={styles.navbar}>
          <Text style={styles.navbar_left_logo}>CryptoXpress</Text>
        </View>

        <View style={styles.wallet_buttons}>
          <Pressable
            style={styles.wallet_button}
            onPress={() => {
              navigation.navigate('Privatekey');
            }}>
            <Text style={styles.wallet_button_txt}> Import Bitcoin Wallet</Text>
          </Pressable>
          <Pressable
            style={styles.wallet_button}
            onPress={() => {
              navigation.navigate('PrivatekeyPolygon');
            }}>
            <Text style={styles.wallet_button_txt}> Import Polygon Wallet</Text>
          </Pressable>
        </View>

        <View style={styles.container}>
          <View style={styles.trendingcoins_container}>
            <Text style={styles.trendingcoins_txt}>Trending Coins</Text>
          </View>
          <ScrollView style={styles.scroll_container}>
            {coinList?.map((coin, index) => {
              return (
                <Pressable style={styles.touchable} key={index}>
                  <PriceCard data={coin}></PriceCard>
                </Pressable>
              );
            })}
          </ScrollView>
        </View>

        <StatusBar backgroundColor="#1A1919" barStyle="light-content" />
      </View>
    </View>
  );
};

export default observer(HomeScreen);

const P100 = '100%';
const P90 = '90%';
const P75 = '75%';
const P60 = '60%';
const P10 = '5%';

const P80 = '80%';

const styles = StyleSheet.create({
  navbar: {
    height: 50,
    width: P100,
    backgroundColor: '#1A1919',
    // position: 'absolute',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // top: 0,
  },
  navbar_left_logo: {
    color: '#FFFFFF',
    fontFamily: 'Gilroy-Bold',
    fontSize: 20,
    marginLeft: 10,
  },
  touchable: {
    width: P100,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
  },
  container: {
    width: P100,
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    marginTop: 10,
  },
  trendingcoins_container: {
    width: P90,
  },
  trendingcoins_txt: {
    color: '#000000',
    fontFamily: 'Gilroy-Bold',
    fontSize: 16,
  },
  scroll_container: {
    width: P100,
    marginBottom: 40,
    height: P100,
  },
  home: {
    // backgroundColor: '#0C0C0C',
    height: P100,
  },
  wallet_buttons: {
    // backgroundColor: '#FFFFFF',
    marginTop: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  wallet_button: {
    backgroundColor: '#FFFFFF',
    fontFamily: 'Gilroy-Bold',
    fontSize: 20,
    padding: 10,

    // width: 20,
    color: '#FFFFFF',
    display: 'flex',
    flexDirection: 'row',
    margin: 3,
    borderColor: '#000000',
    borderWidth: 1,
  },
  wallet_button_txt: {
    color: '#000000',
    fontFamily: 'Gilroy-Bold',
  },
});
