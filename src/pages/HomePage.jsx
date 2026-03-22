import { useState } from 'react'
import { useI18n } from '../i18n'
import { useStarBuddyContext } from '../contexts/StarBuddyContext'
import './HomePage.css'

function HomePage({ onNavigate }) {
  const { t } = useI18n()
  const { addCheckIn, getTimeSavedEstimate } = useStarBuddyContext()
  const [selectedMood, setSelectedMood] = useState(null)

  const timeSaved = getTimeSavedEstimate()

  const handleMoodSelect = (mood) => {
    setSelectedMood(mood)
    addCheckIn({ mood })
    
    // Ask if they want to go to AI Sidekick based on mood
    if (mood === 'stressed' || mood === 'overwhelmed') {
      setTimeout(() => {
        if (confirm('You seem stressed - want me to simplify your todo list?')) {
          onNavigate('ai-sidekick')
        }
      }, 300)
    }
  }



  return (
    <div className="home-page page">
      <div className="star-icon">★</div>
      
      <h1 className="home-title">{t('home.title')}</h1>
      
      <div className="mood-selector">
        <button 
          className="mood-btn good"
          onClick={() => handleMoodSelect('good')}
        >
          😊 {t('home.moods.good')}
        </button>
        <button 
          className="mood-btn okay"
          onClick={() => handleMoodSelect('okay')}
        >
          😐 {t('home.moods.okay')}
        </button>
        <button 
          className="mood-btn rough"
          onClick={() => handleMoodSelect('rough')}
        >
          😔 {t('home.moods.rough')}
        </button>
      </div>
      
      <div className="mood-selector secondary">
        <button 
          className="mood-btn stressed"
          onClick={() => handleMoodSelect('stressed')}
        >
          😤 {t('checkIn.moods.stressed')}
        </button>
        <button 
          className="mood-btn tired"
          onClick={() => handleMoodSelect('tired')}
        >
          😴 {t('checkIn.moods.tired')}
        </button>
        <button 
          className="mood-btn overwhelmed"
          onClick={() => handleMoodSelect('overwhelmed')}
        >
          🤔 {t('checkIn.moods.overwhelmed')}
        </button>
      </div>

      <div className="divider"></div>

      {/* AI Sidekick Time Saved Preview */}
      {timeSaved > 0 && (
        <div className="ai-preview-card">
          <div className="ai-preview-icon">🌟</div>
          <div className="ai-preview-text">
            <div className="ai-preview-title">{t('home.aiPreview.title')}</div>
            <div className="ai-preview-subtitle">{t('home.aiPreview.timeSaved').replace('{hours}', Math.round(timeSaved / 60))}</div>
          </div>
        </div>
      )}

      <div className="nav-buttons">
        <button 
          className="nav-btn ai-sidekick"
          onClick={() => onNavigate('ai-sidekick')}
        >
          🌟 {t('home.buttons.aiSidekick')}
        </button>
        <button 
          className="nav-btn primary"
          onClick={() => onNavigate('checkin')}
        >
          {t('home.buttons.checkIn')}
        </button>
        <button 
          className="nav-btn"
          onClick={() => onNavigate('chat')}
        >
          {t('home.buttons.chat')}
        </button>
        <button 
          className="nav-btn"
          onClick={() => onNavigate('cope')}
        >
          {t('home.buttons.copeToolkit')}
        </button>
        <button 
          className="nav-btn"
          onClick={() => onNavigate('profile')}
        >
          {t('home.buttons.profile')}
        </button>
      </div>
    </div>
  )
}

export default HomePage
