export const getItem = (key) => {
  const res = window.localStorage.getItem(key)
  try {
    return JSON.parse(res)
  } catch (err) {
    return res
  }
}

export const setItem = (key, value) => {
  if (typeof value === 'object') {
    window.localStorage.setItem(key, JSON.stringify(value))
  } else {
    window.localStorage.setItem(key, value)
  }
}

export const removeItem = (key) => {
  window.localStorage.remove(key)
}

export const clearItem = () => {
  window.localStorage.clear()
}
