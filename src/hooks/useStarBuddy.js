import { useState, useEffect, useCallback } from 'react';
import { 
  STORAGE_KEYS, 
  saveToStorage, 
  loadFromStorage, 
  clearAllStorage,
  exportAllData,
  downloadDataAsJson
} from '../utils/storage';

export function useStarBuddy() {
  const [checkIns, setCheckIns] = useState([]);
  const [chatHistories, setChatHistories] = useState({});
  const [preferences, setPreferences] = useState({
    vibeStyle: 'balanced', // sarcastic, balanced, gentle
    reminders: false
  });
  const [profile, setProfile] = useState({
    name: '',
    avatar: null
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = () => {
      setCheckIns(loadFromStorage(STORAGE_KEYS.CHECK_INS, []));
      setChatHistories(loadFromStorage(STORAGE_KEYS.CHAT_HISTORY, {}));
      setPreferences(loadFromStorage(STORAGE_KEYS.USER_PREFERENCES, {
        vibeStyle: 'balanced',
        reminders: false
      }));
      setProfile(loadFromStorage(STORAGE_KEYS.USER_PROFILE, {
        name: '',
        avatar: null
      }));
      setIsLoading(false);
    };
    
    loadData();
  }, []);

  const addCheckIn = useCallback((checkIn) => {
    const newCheckIn = {
      id: Date.now(),
      timestamp: new Date().toISOString(),
      ...checkIn
    };
    
    const updatedCheckIns = [newCheckIn, ...checkIns];
    setCheckIns(updatedCheckIns);
    saveToStorage(STORAGE_KEYS.CHECK_INS, updatedCheckIns);
    
    return newCheckIn;
  }, [checkIns]);

  const saveChatHistory = useCallback((chatId, messages) => {
    const updatedChatHistories = {
      ...chatHistories,
      [chatId]: {
        messages,
        lastUpdated: new Date().toISOString()
      }
    };
    
    setChatHistories(updatedChatHistories);
    saveToStorage(STORAGE_KEYS.CHAT_HISTORY, updatedChatHistories);
  }, [chatHistories]);

  const updatePreferences = useCallback((newPreferences) => {
    const updated = { ...preferences, ...newPreferences };
    setPreferences(updated);
    saveToStorage(STORAGE_KEYS.USER_PREFERENCES, updated);
  }, [preferences]);

  const updateProfile = useCallback((newProfile) => {
    const updated = { ...profile, ...newProfile };
    setProfile(updated);
    saveToStorage(STORAGE_KEYS.USER_PROFILE, updated);
  }, [profile]);

  const exportData = useCallback(() => {
    const data = exportAllData();
    if (data) {
      downloadDataAsJson(data, `starbuddy-data-${new Date().toISOString().split('T')[0]}.json`);
      return true;
    }
    return false;
  }, []);

  const deleteAllData = useCallback(() => {
    clearAllStorage();
    setCheckIns([]);
    setChatHistories({});
    setPreferences({
      vibeStyle: 'balanced',
      reminders: false
    });
    setProfile({
      name: '',
      avatar: null
    });
    return true;
  }, []);

  const getRecentCheckIns = useCallback((days = 7) => {
    const cutoff = new Date();
    cutoff.setDate(cutoff.getDate() - days);
    
    return checkIns.filter(checkIn => 
      new Date(checkIn.timestamp) >= cutoff
    );
  }, [checkIns]);

  const getCurrentStreak = useCallback(() => {
    if (checkIns.length === 0) return 0;
    
    let streak = 0;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    for (let i = 0; i < checkIns.length; i++) {
      const checkInDate = new Date(checkIns[i].timestamp);
      checkInDate.setHours(0, 0, 0, 0);
      
      const expectedDate = new Date(today);
      expectedDate.setDate(expectedDate.getDate() - streak);
      expectedDate.setHours(0, 0, 0, 0);
      
      if (checkInDate.getTime() === expectedDate.getTime()) {
        streak++;
      } else if (checkInDate < expectedDate) {
        break;
      }
    }
    
    return streak;
  }, [checkIns]);

  return {
    checkIns,
    chatHistories,
    preferences,
    profile,
    isLoading,
    addCheckIn,
    saveChatHistory,
    updatePreferences,
    updateProfile,
    exportData,
    deleteAllData,
    getRecentCheckIns,
    getCurrentStreak
  };
}
