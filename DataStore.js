import {observable, action} from 'mobx';
import axios from 'axios';

class DataStore {
  @observable dataResponse = null;

  @action async createData() {
    try {
      const response = await axios.get(
        'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin,matic-network',
      );
      this.dataResponse = response.data.json();
      console.log('Worked');
    } catch (error) {
      console.error('Error creating post:', error);
    }
  }
}

const dataStore = new DataStore();
export default dataStore;
