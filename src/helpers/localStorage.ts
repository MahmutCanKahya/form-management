export enum LocalStorageKey {
  formList = "formList",
}

export const getLocalStorage = <T>(key: LocalStorageKey) => {
  const item = localStorage.getItem(key);
  return (item && JSON.parse(item)) as T;
};

export const setLocalStorage = <T>(key: LocalStorageKey, value: T) => {
  localStorage.setItem(key, JSON.stringify(value));
};
