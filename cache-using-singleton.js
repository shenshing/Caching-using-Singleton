import axios from 'axios';
import { sleep } from '../helper-func.js';
import * as nodeCron from 'node-cron';

const isAlmostExpire = (currentDate, expiredDate) => {
  return !!((expiredDate - currentDate) / 1000 <= 30);
};

class Cache {
  constructor() {
    if (Cache.instance) {
      return Cache.instance;
    }

    this.data = null;
    this.isInPullingProgress = false;
    Cache.instance = this;

    this.expiredAt = new Date().getTime() + 60 * 1000;

    // * Cron job (running every second)
    nodeCron.schedule('* * * * * *', () => {
      // console.log('====> cron job running: ', new Date());

      let currentDate = new Date().getTime();
      let expiredDate = new Date(this.expiredAt).getTime();

      let isAlmostExpiredA = isAlmostExpire(currentDate, expiredDate);

      if (isAlmostExpiredA && !this.isInPullingProgress) {
        this.isInPullingProgress = true;
        this.get(true);
      }
    });
  }

  async get(isExpired) {
    // TODO: check if isPullingInProgress = true. ==> What to do here?
    if (this.isInPullingProgress) {
    }
    
    if (this.cache && !isExpired) {
      return this.cache;
    }

    const options = {
      method: 'GET',
      url: 'https://api.agify.io/?name=meelad',
    };
    const response = await axios(options);

    // pretend that the request is taking 5s to finish. So we can see the value of isPullingInProgress = true during requesting time.
    await sleep(5000);

    this.cache = response.data;
    this.expiredAt = new Date(new Date().getTime() + 60 * 1000);
    this.isInPullingProgress = false;

    return this.cache;
  }
}

const cache = new Cache();

export default cache;
