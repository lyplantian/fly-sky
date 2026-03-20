import { useI18n } from '../i18n'
import './HomePage.css'

function HomePage({ onNavigate }) {
  const { t, currentLocale, changeLanguage } = useI18n()

  const handleMoodSelect = (mood) => {
    console.log('Mood selected:', mood)
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

      <div className="divider"></div>

      <div className="nav-buttons">
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
