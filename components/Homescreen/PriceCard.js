import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';

const PriceCard = ({data}) => {
  return (
    <View style={styles.card_container}>
      <View style={styles.card_container_left}>
        <Image
          style={styles.coin_image}
          source={{
            uri: `${data.image}`,
          }}
        />
        <View style={styles.name_txt}>
          <Text style={styles.coinname_txt}>{data.name}</Text>
          <Text style={styles.coinsymbol_txt}>{data.symbol}</Text>
        </View>
      </View>
      <View style={styles.card_container_right}>
        <Text style={styles.price_txt}>{data.current_price} USDT</Text>

        {data.price_change_percentage_24h >= 0 ? (
          <Text style={styles.percentage_txt_green}>
            {' '}
            +{data.price_change_percentage_24h}
          </Text>
        ) : (
          <Text style={styles.percentage_txt_red}>
            {data.price_change_percentage_24h}
          </Text>
        )}
      </View>
    </View>
  );
};

export default PriceCard;

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
    fontSize: 20,
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
  percentage_txt_red: {
    color: '#FC3A11',
    fontFamily: 'Gilroy-Medium',
  },
  percentage_txt_green: {
    color: '#29BB02',
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
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    display: 'flex',
    flexDirection: 'column',
  },
});
