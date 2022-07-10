export const LOCAL_STORAGE_KEY = "timeLogger";

export interface EntityConfigLS {
  email: "",
  uid: ""
}

export function getFromLocal(): EntityConfigLS | null{
  let entityConfig: EntityConfigLS = {
    email: "",
    uid: ""
  };
  const temp = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (temp) {
    entityConfig = JSON.parse(temp);
    return entityConfig
  }
  return null;
}

export function writeToLocal(key: string, value: any) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function removeFromLocal(key: string) {
  localStorage.removeItem(key);
}
