// Local storage utilities for StarBuddy

const STORAGE_KEYS = {
  CHECK_INS: 'starbuddy_checkins',
  CHAT_HISTORY: 'starbuddy_chats',
  USER_PREFERENCES: 'starbuddy_preferences',
  USER_PROFILE: 'starbuddy_profile',
  TASKS: 'starbuddy_tasks',
  TIME_LOGS: 'starbuddy_time_logs'
};

export function saveToStorage(key, data) {
  try {
    const serialized = JSON.stringify(data);
    localStorage.setItem(key, serialized);
    return true;
  } catch (error) {
    console.error('Error saving to storage:', error);
    return false;
  }
}

export function loadFromStorage(key, defaultValue = null) {
  try {
    const serialized = localStorage.getItem(key);
    if (serialized === null) {
      return defaultValue;
    }
    return JSON.parse(serialized);
  } catch (error) {
    console.error('Error loading from storage:', error);
    return defaultValue;
  }
}

export function removeFromStorage(key) {
  try {
    localStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error('Error removing from storage:', error);
    return false;
  }
}

export function clearAllStorage() {
  try {
    Object.values(STORAGE_KEYS).forEach(key => {
      localStorage.removeItem(key);
    });
    return true;
  } catch (error) {
    console.error('Error clearing storage:', error);
    return false;
  }
}

export function exportAllData() {
  try {
    const data = {
      checkIns: loadFromStorage(STORAGE_KEYS.CHECK_INS, []),
      chatHistory: loadFromStorage(STORAGE_KEYS.CHAT_HISTORY, []),
      preferences: loadFromStorage(STORAGE_KEYS.USER_PREFERENCES, {}),
      profile: loadFromStorage(STORAGE_KEYS.USER_PROFILE, {}),
      tasks: loadFromStorage(STORAGE_KEYS.TASKS, []),
      timeLogs: loadFromStorage(STORAGE_KEYS.TIME_LOGS, []),
      exportedAt: new Date().toISOString()
    };
    return data;
  } catch (error) {
    console.error('Error exporting data:', error);
    return null;
  }
}

export function downloadDataAsJson(data, filename = 'starbuddy-data.json') {
  try {
    const jsonString = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    return true;
  } catch (error) {
    console.error('Error downloading data:', error);
    return false;
  }
}

export { STORAGE_KEYS };
