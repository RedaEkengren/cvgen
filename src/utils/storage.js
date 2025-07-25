export const STORAGE_KEYS = {
  CV_DATA: 'cv-generator-data',
  PREMIUM_CODE: 'cv-generator-premium'
}

export const saveToStorage = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data))
    return true
  } catch (error) {
    console.error('Error saving to localStorage:', error)
    return false
  }
}

export const loadFromStorage = (key) => {
  try {
    const data = localStorage.getItem(key)
    return data ? JSON.parse(data) : null
  } catch (error) {
    console.error('Error loading from localStorage:', error)
    return null
  }
}

export const removeFromStorage = (key) => {
  try {
    localStorage.removeItem(key)
    return true
  } catch (error) {
    console.error('Error removing from localStorage:', error)
    return false
  }
}

export const checkPremiumStatus = () => {
  const premiumCode = loadFromStorage(STORAGE_KEYS.PREMIUM_CODE)
  return premiumCode === 'PREMIUM_ACTIVATED'
}

export const activatePremium = (code) => {
  // Simple validation - in production you might want more sophisticated validation
  const validCodes = ['PREMIUM2024', 'GUMROAD_PREMIUM', 'STUDENT_PRO']
  
  if (validCodes.includes(code.toUpperCase())) {
    saveToStorage(STORAGE_KEYS.PREMIUM_CODE, 'PREMIUM_ACTIVATED')
    return true
  }
  return false
}