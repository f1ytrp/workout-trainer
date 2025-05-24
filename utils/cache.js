import AsyncStorage from '@react-native-async-storage/async-storage';

const EXPIRY_DURATION = 6 * 60 * 60 * 1000;       //The gifURL changes every 24 hours according to ExerciseDB so removing cache every 6 hours to be safe

export async function saveToCache(key, data) {
  const cacheItem = {
    timestamp: Date.now(),
    data,
  };
  await AsyncStorage.setItem(key, JSON.stringify(cacheItem));
}

export async function loadFromCache(key) {
  const json = await AsyncStorage.getItem(key);
  console.log(`[CACHE LOAD] key=${key}, value=${json}`);

  if (!json) return null;

  try {
    const cacheItem = JSON.parse(json);
    const isExpired = Date.now() - cacheItem.timestamp > EXPIRY_DURATION;

    if (isExpired) {
      await AsyncStorage.removeItem(key);
      console.log(`[CACHE EXPIRED] key=${key}`);
      return null;
    }

    return cacheItem.data;
  } catch (err) {
    console.error(`[CACHE PARSE ERROR] key=${key}:`, err.message);
    await AsyncStorage.removeItem(key);
    return null;
  }
}


export async function clearCache(key) {
  await AsyncStorage.removeItem(key);
}
