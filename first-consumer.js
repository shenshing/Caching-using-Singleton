import cache from './cache-using-singleton.js';
import {sleep} from '../helper-func.js'

const firstCache = async () => {
    let d = await cache.get();
    console.log('d is: ', d);

    await sleep(3);
}

export default firstCache;