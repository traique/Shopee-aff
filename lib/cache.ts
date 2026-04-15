const cache = new Map<string, any>();

export function getCache(key: string) {
  return cache.get(key);
}

export function setCache(key: string, value: any) {
  cache.set(key, value);

  setTimeout(() => {
    cache.delete(key);
  }, 1000 * 60 * 5); // 5 phút
}
