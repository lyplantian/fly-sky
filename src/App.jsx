import { useState } from 'react'
import './App.css'
import { I18nProvider } from './i18n'
import { StarBuddyProvider } from './contexts/StarBuddyContext'
import { ThemeProvider } from './contexts/ThemeContext'
import SettingsPanel from './components/SettingsPanel'
import HomePage from './pages/HomePage'
import CheckInPage from './pages/CheckInPage'
import ChatPage from './pages/ChatPage'
import CopeToolkitPage from './pages/CopeToolkitPage'
import ProfilePage from './pages/ProfilePage'
import AISidekickPage from './pages/AISidekickPage'

function App() {
  const [currentPage, setCurrentPage] = useState('home')

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={setCurrentPage} />
      case 'ai-sidekick':
        return <AISidekickPage onNavigate={setCurrentPage} />
      case 'checkin':
        return <CheckInPage onNavigate={setCurrentPage} />
      case 'chat':
        return <ChatPage onNavigate={setCurrentPage} />
      case 'cope':
        return <CopeToolkitPage onNavigate={setCurrentPage} />
      case 'profile':
        return <ProfilePage onNavigate={setCurrentPage} />
      default:
        return <HomePage onNavigate={setCurrentPage} />
    }
  }

  return (
    <ThemeProvider>
      <StarBuddyProvider>
        <I18nProvider>
          <div className="app page">
            <SettingsPanel />
            {renderPage()}
          </div>
        </I18nProvider>
      </StarBuddyProvider>
    </ThemeProvider>
  )
}

export default App
