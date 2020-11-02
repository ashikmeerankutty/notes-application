export const setItemToStorage = (key: string, value: any) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const getItemFromStorage = (key: string) => {
  return JSON.parse(localStorage.getItem(key));
};

export const removeItemFromStorage = (key: string) => {
  localStorage.removeItem(key);
};

export const clearStorage = () => {
  localStorage.clear();
};
