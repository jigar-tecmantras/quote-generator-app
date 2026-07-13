const STORAGE_KEY = 'quote-generator-favorites';

export function loadFavorites() {
  try {
    const payload = window.localStorage.getItem(STORAGE_KEY);
    if (!payload) {
      return [];
    }
    const parsed = JSON.parse(payload);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.warn('Unable to access localStorage:', error);
    return [];
  }
}

export function saveFavorites(favorites) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
  } catch (error) {
    console.warn('Unable to persist favorites:', error);
  }
}
