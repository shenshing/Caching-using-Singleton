import cache from './cache-using-singleton.js';
import {sleep} from '../helper-func.js'

const secondCache = async () => {
    let e = await cache.get();
    console.log('e is: ', e);
}

export default secondCache;