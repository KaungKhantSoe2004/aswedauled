const KEY = "aswedaul_fav";

export type FavStore = {
  [category: string]: number[];
};

export const getItems = (): FavStore => {
  const json = localStorage.getItem(KEY);
  if (!json) return {};
  try {
    return JSON.parse(json) as FavStore;
  } catch {
    return {};
  }
};

export const addItem = (category: string, id: number): void => {
  const data = getItems();
  if (!data[category]) data[category] = [];
  if (!data[category].includes(id)) data[category].push(id);
  localStorage.setItem(KEY, JSON.stringify(data));
};
export const getTotalFavCount = (): number => {
  const data = getItems();
  return Object.values(data).reduce((total, arr) => total + arr.length, 0);
};

export const removeItem = (category: string, id: number): void => {
  const data = getItems();
  if (!data[category]) return;
  data[category] = data[category].filter((itemId) => itemId !== id);
  localStorage.setItem(KEY, JSON.stringify(data));
};

export const isItemFavorite = (category: string, id: number): boolean => {
  const data = getItems();
  return data[category]?.some((itemId) => itemId == id) ?? false;
};

export const clearItems = (): void => {
  localStorage.removeItem(KEY);
};
