interface StorageData<T = any> {
  value: T
  expire: number | null
}

interface StorageInterface {
  setItem: <T>(key: string, value: T, expire?: number) => void
  getItem: <T>(key: string) => T | null
  removeItem: (key: string) => void
}

export const _localStorage: StorageInterface = {
  setItem<T>(key: string, value: T, expire?: number): void {
    const data: StorageData<T> = {
      value,
      expire: expire ? Date.now() + expire : null
    }
    localStorage.setItem(key, JSON.stringify(data))
  },

  getItem<T>(key: string): T | null {
    const item = localStorage.getItem(key)
    if (!item) return null

    const data = JSON.parse(item) as StorageData<T>
    if (data.expire && Date.now() > data.expire) {
      localStorage.removeItem(key)
      return null
    }
    return data.value
  },

  removeItem(key: string): void {
    localStorage.removeItem(key)
  }
}

export const _sessionStorage: StorageInterface = {
  setItem<T>(key: string, value: T, expire?: number): void {
    const data: StorageData<T> = {
      value,
      expire: expire ? Date.now() + expire : null
    }
    sessionStorage.setItem(key, JSON.stringify(data))
  },

  getItem<T>(key: string): T | null {
    const item = sessionStorage.getItem(key)
    if (!item) return null

    const data = JSON.parse(item) as StorageData<T>
    if (data.expire && Date.now() > data.expire) {
      sessionStorage.removeItem(key)
      return null
    }
    return data.value
  },

  removeItem(key: string): void {
    sessionStorage.removeItem(key)
  }
}
