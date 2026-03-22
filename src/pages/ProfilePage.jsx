import { useState, useEffect } from 'react'
import { useI18n } from '../i18n'
import { useStarBuddyContext } from '../contexts/StarBuddyContext'
import LanguageSwitcher from '../components/LanguageSwitcher'
import './ProfilePage.css'

function ProfilePage({ onNavigate }) {
  const { t } = useI18n()
  const {
    profile,
    updateProfile,
    preferences,
    updatePreferences,
    getRecentCheckIns,
    exportData,
    deleteAllData,
    isLoading,
    getTimeSavedEstimate,
    tasks
  } = useStarBuddyContext()
  
  const [userName, setUserName] = useState(profile?.name || '')
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [vibeStyle, setVibeStyle] = useState(preferences?.vibeStyle || 'balanced')
  const [aiIntensity, setAiIntensity] = useState(preferences?.aiIntensity || 'balanced')
  const [recentCheckIns, setRecentCheckIns] = useState([])
  
  const timeSaved = getTimeSavedEstimate()
  const completedTasks = tasks.filter(t => t.completed).length
  const totalTasks = tasks.length

  useEffect(() => {
    if (!isLoading) {
      setUserName(profile?.name || '')
      setVibeStyle(preferences?.vibeStyle || 'balanced')
      setAiIntensity(preferences?.aiIntensity || 'balanced')
      setRecentCheckIns(getRecentCheckIns(7))
    }
  }, [isLoading, profile, preferences, getRecentCheckIns])

  const handleNameChange = (e) => {
    const newName = e.target.value
    setUserName(newName)
    updateProfile({ name: newName })
  }

  const handleExport = () => {
    const success = exportData()
    if (success) {
      alert('Data exported successfully!')
    } else {
      alert('Failed to export data.')
    }
  }

  const handleDelete = () => {
    if (showDeleteConfirm) {
      if (confirm('Are you absolutely sure? This cannot be undone.')) {
        deleteAllData()
        alert('All data deleted.')
        setShowDeleteConfirm(false)
        onNavigate('home')
      }
    } else {
      setShowDeleteConfirm(true)
    }
  }

  const handleVibeStyleChange = (style) => {
    setVibeStyle(style)
    updatePreferences({ vibeStyle: style })
  }

  const handleRemindersToggle = () => {
    updatePreferences({ reminders: !preferences?.reminders })
  }

  const handleAiIntensityChange = (intensity) => {
    setAiIntensity(intensity)
    updatePreferences({ aiIntensity: intensity })
  }

  const getWeekDay = (dateString) => {
    const date = new Date(dateString)
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    return days[date.getDay()]
  }

  const getShortDate = (dateString) => {
    const date = new Date(dateString)
    return `${date.getMonth() + 1}/${date.getDate()}`
  }

  const last7Days = []
  for (let i = 6; i >= 0; i--) {
    const date = new Date()
    date.setDate(date.getDate() - i)
    const checkIn = recentCheckIns.find(ci => {
      const ciDate = new Date(ci.timestamp)
      return ciDate.toDateString() === date.toDateString()
    })
    
    last7Days.push({
      date,
      dayName: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][date.getDay()],
      checkIn
    })
  }

  return (
    <div className="profile-page page">
      <button className="back-btn" onClick={() => onNavigate('home')}>
        ← {t('common.back')}
      </button>

      <div className="profile-header">
        <div className="avatar">★</div>
        <input
          type="text"
          className="name-input"
          value={userName}
          onChange={handleNameChange}
          placeholder={t('profile.name')}
        />
      </div>

      {/* Stats Section */}
      <div className="stats-section">
        <div className="stat-card">
          <div className="stat-value">≈{Math.round(timeSaved / 60)}h</div>
          <div className="stat-label">{t('profile.stats.timeSaved')}</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{completedTasks}/{totalTasks}</div>
          <div className="stat-label">{t('profile.stats.tasksDone')}</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{recentCheckIns.length}</div>
          <div className="stat-label">{t('profile.stats.checkIns')}</div>
        </div>
      </div>

      <div className="profile-section">
        <h2 className="section-title">{t('profile.sections.vibeCalendar')}</h2>
        <div className="vibe-calendar">
          {last7Days.map((day, idx) => (
            <div key={idx} className={`vibe-day ${day.checkIn ? 'has-checkin' : ''}`}>
              <div className="vibe-date">{day.dayName}</div>
              <div className="vibe-emoji">
                {day.checkIn?.moodEmoji || '⚪'}
              </div>
              <div className="vibe-full-date">{getShortDate(day.date)}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="profile-section">
        <h2 className="section-title">{t('common.language')}</h2>
        <LanguageSwitcher />
      </div>

      <div className="profile-section">
        <h2 className="section-title">{t('profile.sections.preferences')}</h2>
        <div className="preference-list">
          <div className="preference-group">
            <label className="preference-label">{t('profile.preferences.vibeStyle')}</label>
            <div className="vibe-style-options">
              <button
                className={`vibe-option ${vibeStyle === 'sarcastic' ? 'active' : ''}`}
                onClick={() => handleVibeStyleChange('sarcastic')}
              >
                Sarcastic
              </button>
              <button
                className={`vibe-option ${vibeStyle === 'balanced' ? 'active' : ''}`}
                onClick={() => handleVibeStyleChange('balanced')}
              >
                Balanced
              </button>
              <button
                className={`vibe-option ${vibeStyle === 'gentle' ? 'active' : ''}`}
                onClick={() => handleVibeStyleChange('gentle')}
              >
                Gentle
              </button>
            </div>
          </div>

          <div className="preference-group">
            <label className="preference-label">{t('profile.preferences.aiIntensity')}</label>
            <div className="vibe-style-options">
              <button
                className={`vibe-option ${aiIntensity === 'minimal' ? 'active' : ''}`}
                onClick={() => handleAiIntensityChange('minimal')}
              >
                {t('profile.aiIntensity.minimal')}
              </button>
              <button
                className={`vibe-option ${aiIntensity === 'balanced' ? 'active' : ''}`}
                onClick={() => handleAiIntensityChange('balanced')}
              >
                {t('profile.aiIntensity.balanced')}
              </button>
              <button
                className={`vibe-option ${aiIntensity === 'active' ? 'active' : ''}`}
                onClick={() => handleAiIntensityChange('active')}
              >
                {t('profile.aiIntensity.veryActive')}
              </button>
            </div>
          </div>
          
          <button className="preference-item" onClick={handleRemindersToggle}>
            <span>{t('profile.preferences.reminders')}</span>
            <span className={`toggle ${preferences?.reminders ? 'on' : 'off'}`}>
              {preferences?.reminders ? (t('common.confirm')) : (t('common.cancel'))}
            </span>
          </button>
        </div>
      </div>

      <div className="profile-section">
        <h2 className="section-title">{t('profile.sections.data')}</h2>
        <div className="data-actions">
          <button className="data-btn export" onClick={handleExport}>
            {t('profile.data.export')}
          </button>
          <button 
            className={`data-btn delete ${showDeleteConfirm ? 'confirm' : ''}`} 
            onClick={handleDelete}
          >
            {showDeleteConfirm ? t('common.confirm') : t('profile.data.delete')}
          </button>
        </div>
      </div>

      <div className="profile-section">
        <h2 className="section-title">{t('profile.sections.about')}</h2>
        <div className="about-box">
          <p className="about-title">StarBuddy</p>
          <p className="about-version">Version 0.1.0</p>
          <p className="about-tagline">Take it one vibe at a time</p>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage
