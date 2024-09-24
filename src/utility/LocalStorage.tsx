export class LocalStorage {
  static clear() {
    localStorage.clear();
  }

  static getItem(key: string) {
    return localStorage.getItem(key);
  }

  static removeItem(key: string) {
    localStorage.removeItem(key);
  }

  static setItem(key: string, value?: null | string) {
    if (value) {
      localStorage.setItem(key, value);
    }
  }
}

export enum LocalStorageItems {
  AccessToken = 'eu.nites.accessToken',
  Filters = 'eu.nites.filters',
  Theme = 'eu.nites.theme'
}
