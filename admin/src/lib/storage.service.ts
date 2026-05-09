export type GenericResponse<T> = {
  data: T
  message: string
  status: number
}

export enum STORAGE {
  SESSION,
  LOCAL,
  MEMORY,
  COOKIE,
  WINDOW,
}
export class StorageService {
  static getItem(storage: STORAGE, key: string): unknown {
    const item =
      storage === STORAGE.SESSION
        ? sessionStorage.getItem(key)
        : localStorage.getItem(key)

    if (item && item !== "undefined" && item !== "") {
      return item
    }

    return null
  }
  static setItem(storage: STORAGE, key: string, value: string): void {
    if (storage === STORAGE.SESSION) sessionStorage.setItem(key, value)
    if (storage === STORAGE.LOCAL) localStorage.setItem(key, value)
  }
  static removeItem(storage: STORAGE, key: string): void {
    if (storage === STORAGE.SESSION) sessionStorage.removeItem(key)
    if (storage === STORAGE.LOCAL) localStorage.removeItem(key)
  }
}
