import { useState } from 'react'
import { useI18n } from '../i18n'
import { useStarBuddyContext } from '../contexts/StarBuddyContext'
import './CheckInPage.css'

function CheckInPage({ onNavigate }) {
  const { t } = useI18n()
  const { addCheckIn, getCurrentStreak } = useStarBuddyContext()
  const [step, setStep] = useState(1)
  const [selectedMood, setSelectedMood] = useState(null)
  const [note, setNote] = useState('')
  const [streak, setStreak] = useState(0)

  const moods = [
    { key: 'good', emoji: '😊', label: t('checkIn.moods.good') },
    { key: 'okay', emoji: '😐', label: t('checkIn.moods.okay') },
    { key: 'rough', emoji: '😔', label: t('checkIn.moods.rough') },
    { key: 'stressed', emoji: '😤', label: t('checkIn.moods.stressed') },
    { key: 'tired', emoji: '😴', label: t('checkIn.moods.tired') },
    { key: 'overwhelmed', emoji: '🤯', label: t('checkIn.moods.overwhelmed') }
  ]

  const handleMoodSelect = (mood) => {
    setSelectedMood(mood)
    setStep(2)
  }

  const handleComplete = () => {
    addCheckIn({
      mood: selectedMood,
      note: note.trim() || null,
      moodEmoji: moods.find(m => m.key === selectedMood)?.emoji
    })
    
    setStreak(getCurrentStreak())
    setStep(3)
  }

  const renderStep1 = () => (
    <div className="checkin-step">
      <button className="back-btn" onClick={() => onNavigate('home')}>
        ← {t('common.back')}
      </button>
      
      <h2 className="checkin-title">{t('checkIn.title')}</h2>
      
      <div className="mood-grid">
        {moods.map((mood) => (
          <button
            key={mood.key}
            className={`mood-card ${selectedMood === mood.key ? 'selected' : ''}`}
            onClick={() => handleMoodSelect(mood.key)}
          >
            <span className="mood-emoji">{mood.emoji}</span>
            <span className="mood-label">{mood.label}</span>
          </button>
        ))}
      </div>
    </div>
  )

  const renderStep2 = () => (
    <div className="checkin-step">
      <button className="back-btn" onClick={() => setStep(1)}>
        ← {t('common.back')}
      </button>
      
      <div className="selected-mood-display">
        <span className="mood-emoji-large">
          {moods.find(m => m.key === selectedMood)?.emoji}
        </span>
        <p className="checkin-prompt">{t('checkIn.prompt')}</p>
      </div>
      
      <div className="note-section">
        <label className="note-label">{t('checkIn.optionalNote')}</label>
        <textarea
          className="note-input"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="..."
          rows="4"
        />
      </div>
      
      <button className="complete-btn" onClick={handleComplete}>
        {t('checkIn.complete')}
      </button>
    </div>
  )

  const renderStep3 = () => (
    <div className="checkin-step completion">
      <div className="completion-icon">✓</div>
      <h2 className="checkin-title">{t('checkIn.confirmed')}</h2>
      {streak > 0 && (
        <p className="streak-info">{t('checkIn.streak', { days: streak })}</p>
      )}
      <p className="no-rewards">{t('checkIn.noRewards')}</p>
      
      <div className="completion-buttons">
        <button className="secondary-btn" onClick={() => onNavigate('home')}>
          {t('common.back')}
        </button>
        <button className="primary-btn" onClick={() => onNavigate('profile')}>
          {t('checkIn.seeTimeline')}
        </button>
      </div>
    </div>
  )

  return (
    <div className="checkin-page page">
      {step === 1 && renderStep1()}
      {step === 2 && renderStep2()}
      {step === 3 && renderStep3()}
    </div>
  )
}

export default CheckInPage
