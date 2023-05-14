import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';

const Transaction = ({data}) => {
  const sliced_blockhash = data.status.block_hash;
  const confirmation = data.status.confirmed;
  return (
    <View style={styles.card_container}>
      <View style={styles.card_container_left}>
        <View style={styles.name_txt}>
          <Text style={styles.coinname_txt}>
            {sliced_blockhash?.slice(0, 18)}..
          </Text>

          <Text style={styles.coinsymbol_txt}>
            {data.txid?.slice(0, 28)}...
          </Text>
        </View>
      </View>
      <View style={styles.card_container_right}>
        {confirmation ? (
          <Text style={styles.confirmed_txt}>Confirmed </Text>
        ) : (
          <Text style={styles.pending_txt}>Pending</Text>
        )}

        <Text style={styles.percentage_txt}>Gas :{data.fee}</Text>
      </View>
    </View>
  );
};

export default Transaction;

const P100 = '100%';
const P90 = '95%';

const styles = StyleSheet.create({
  card_container_left: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  coin_image: {
    width: 60,
    height: 60,
    marginLeft: 10,
    borderRadius: 50,
  },
  coinname_txt: {
    color: '#000000',
    fontFamily: 'Gilroy-Bold',
    fontSize: 18,
  },
  coinsymbol_txt: {
    color: '#000000',
    fontFamily: 'Gilroy-Medium',
  },
  price_txt: {
    color: '#000000',
    fontFamily: 'Gilroy-Bold',
    fontSize: 15,
  },
  confirmed_txt: {
    color: '#05B905',
    fontFamily: 'Gilroy-Bold',
    fontSize: 15,
  },
  pending_txt: {
    color: '#BA086D',
    fontFamily: 'Gilroy-Bold',
    fontSize: 15,
  },
  failed_txt: {
    color: '#EB0808',
    fontFamily: 'Gilroy-Bold',
    fontSize: 15,
  },
  percentage_txt: {
    color: '#000000',
    fontFamily: 'Gilroy-Medium',
  },
  card_container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: P90,
    height: 80,
    backgroundColor: '#FFFFFF',
    borderColor: '#FFFFFF',
    borderWidth: 0.3,
    borderRadius: 10,
    margin: 5,
  },
  name_txt: {
    marginLeft: 10,
  },
  card_container_right: {
    marginRight: 10,
  },
});
