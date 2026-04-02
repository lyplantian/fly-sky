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
  const [tasks, setTasks] = useState([]);
  const [timeLogs, setTimeLogs] = useState([]);
  const [preferences, setPreferences] = useState({
    vibeStyle: 'balanced', // sarcastic, balanced, gentle
    reminders: false,
    aiIntensity: 'balanced' // minimal, balanced, active
  });
  const [profile, setProfile] = useState({
    name: '',
    avatar: null
  });
  const [googleUser, setGoogleUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = () => {
      setCheckIns(loadFromStorage(STORAGE_KEYS.CHECK_INS, []));
      setChatHistories(loadFromStorage(STORAGE_KEYS.CHAT_HISTORY, {}));
      setTasks(loadFromStorage(STORAGE_KEYS.TASKS, []));
      setTimeLogs(loadFromStorage(STORAGE_KEYS.TIME_LOGS, []));
      setPreferences(loadFromStorage(STORAGE_KEYS.USER_PREFERENCES, {
        vibeStyle: 'balanced',
        reminders: false,
        aiIntensity: 'balanced'
      }));
      setProfile(loadFromStorage(STORAGE_KEYS.USER_PROFILE, {
        name: '',
        avatar: null
      }));
      setGoogleUser(loadFromStorage('google_user', null));
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
    setTasks([]);
    setTimeLogs([]);
    setPreferences({
      vibeStyle: 'balanced',
      reminders: false,
      aiIntensity: 'balanced'
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

  // Task management functions
  const addTask = useCallback((task) => {
    const newTask = {
      id: Date.now(),
      createdAt: new Date().toISOString(),
      completed: false,
      priority: 'medium', // low, medium, high
      category: 'other', // work, personal, health, other
      estimatedTime: 30, // in minutes
      dueDate: null,
      ...task
    };
    
    const updatedTasks = [newTask, ...tasks];
    setTasks(updatedTasks);
    saveToStorage(STORAGE_KEYS.TASKS, updatedTasks);
    
    return newTask;
  }, [tasks]);

  const updateTask = useCallback((taskId, updates) => {
    const updatedTasks = tasks.map(task => 
      task.id === taskId ? { ...task, ...updates } : task
    );
    setTasks(updatedTasks);
    saveToStorage(STORAGE_KEYS.TASKS, updatedTasks);
  }, [tasks]);

  const deleteTask = useCallback((taskId) => {
    const updatedTasks = tasks.filter(task => task.id !== taskId);
    setTasks(updatedTasks);
    saveToStorage(STORAGE_KEYS.TASKS, updatedTasks);
  }, [tasks]);

  const toggleTaskComplete = useCallback((taskId) => {
    const task = tasks.find(t => t.id === taskId);
    if (task) {
      const updatedTask = { 
        ...task, 
        completed: !task.completed,
        completedAt: !task.completed ? new Date().toISOString() : null
      };
      const updatedTasks = tasks.map(t => t.id === taskId ? updatedTask : t);
      setTasks(updatedTasks);
      saveToStorage(STORAGE_KEYS.TASKS, updatedTasks);
    }
  }, [tasks]);

  // AI Sidekick functions
  const getPrioritizedTasks = useCallback((currentMood = 'okay') => {
    // Simple AI prioritization based on due date, priority, and mood
    let prioritized = [...tasks].filter(t => !t.completed);
    
    // If stressed, prioritize easier tasks first
    if (currentMood === 'rough' || currentMood === 'stressed') {
      prioritized.sort((a, b) => {
        const aEasy = a.priority === 'low' || a.estimatedTime <= 15;
        const bEasy = b.priority === 'low' || b.estimatedTime <= 15;
        if (aEasy && !bEasy) return -1;
        if (!aEasy && bEasy) return 1;
        return 0;
      });
    } else {
      // Normal prioritization: due date first, then priority
      prioritized.sort((a, b) => {
        if (a.dueDate && b.dueDate) {
          return new Date(a.dueDate) - new Date(b.dueDate);
        }
        if (a.dueDate) return -1;
        if (b.dueDate) return 1;
        const priorityOrder = { high: 0, medium: 1, low: 2 };
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      });
    }
    
    return prioritized;
  }, [tasks]);

  const getTopTaskSuggestion = useCallback((currentMood = 'okay') => {
    const prioritized = getPrioritizedTasks(currentMood);
    return prioritized[0] || null;
  }, [getPrioritizedTasks]);

  const parseNaturalLanguageTask = useCallback((text) => {
    // Simple NLP parsing for task creation
    const task = { title: text };
    
    // Extract time estimates
    const timeMatch = text.match(/(\d+)\s*(minute|min|m|hour|hr|h)/i);
    if (timeMatch) {
      const amount = parseInt(timeMatch[1]);
      const unit = timeMatch[2].toLowerCase();
      task.estimatedTime = unit.startsWith('h') ? amount * 60 : amount;
    }
    
    // Extract due dates
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    if (text.toLowerCase().includes('today')) {
      task.dueDate = today.toISOString();
    } else if (text.toLowerCase().includes('tomorrow')) {
      task.dueDate = tomorrow.toISOString();
    }
    
    // Extract priority
    if (text.toLowerCase().includes('urgent') || text.toLowerCase().includes('asap')) {
      task.priority = 'high';
    } else if (text.toLowerCase().includes('later') || text.toLowerCase().includes('sometime')) {
      task.priority = 'low';
    }
    
    // Extract category
    if (text.toLowerCase().includes('work') || text.toLowerCase().includes('meeting') || text.toLowerCase().includes('report')) {
      task.category = 'work';
    } else if (text.toLowerCase().includes('home') || text.toLowerCase().includes('personal') || text.toLowerCase().includes('family')) {
      task.category = 'personal';
    } else if (text.toLowerCase().includes('health') || text.toLowerCase().includes('exercise') || text.toLowerCase().includes('doctor')) {
      task.category = 'health';
    }
    
    return task;
  }, []);

  const getTimeSavedEstimate = useCallback(() => {
    // Estimate time saved by AI Sidekick
    const completedTasks = tasks.filter(t => t.completed);
    const totalEstimatedTime = completedTasks.reduce((sum, t) => sum + (t.estimatedTime || 0), 0);
    // Assume AI saves about 20% of time through better prioritization
    return Math.round(totalEstimatedTime * 0.2);
  }, [tasks]);

  const loginGoogleUser = useCallback((user) => {
    setGoogleUser(user);
    saveToStorage('google_user', user);
    // 如果 Google 用户有名字和头像，同步到 profile
    setProfile(prevProfile => {
      if (user?.name && !prevProfile.name) {
        const newProfile = { ...prevProfile, name: user.name };
        if (user?.picture) {
          newProfile.avatar = user.picture;
        }
        saveToStorage(STORAGE_KEYS.USER_PROFILE, newProfile);
        return newProfile;
      }
      return prevProfile;
    });
  }, []);

  const logoutGoogleUser = useCallback(() => {
    setGoogleUser(null);
    saveToStorage('google_user', null);
  }, []);

  return {
    checkIns,
    chatHistories,
    tasks,
    timeLogs,
    preferences,
    profile,
    googleUser,
    isLoading,
    addCheckIn,
    saveChatHistory,
    updatePreferences,
    updateProfile,
    exportData,
    deleteAllData,
    getRecentCheckIns,
    getCurrentStreak,
    // Task management
    addTask,
    updateTask,
    deleteTask,
    toggleTaskComplete,
    // AI Sidekick
    getPrioritizedTasks,
    getTopTaskSuggestion,
    parseNaturalLanguageTask,
    getTimeSavedEstimate,
    // Google OAuth
    loginGoogleUser,
    logoutGoogleUser
  };
}
