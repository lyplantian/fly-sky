import { useState } from 'react'
import { useI18n } from '../i18n'
import './ChatPage.css'

function ChatPage({ onNavigate }) {
  const { t } = useI18n()
  const [selectedMode, setSelectedMode] = useState(null)
  const [messages, setMessages] = useState([])
  const [inputText, setInputText] = useState('')

  const chatModes = [
    { 
      id: 'vent', 
      icon: '💬', 
      label: t('chat.options.vent'),
      greeting: "Hey, I'm here. Vent away.",
      response: "I hear you. That sounds heavy."
    },
    { 
      id: 'advice', 
      icon: '🤔', 
      label: t('chat.options.advice'),
      greeting: "What's on your mind? Let's think it through.",
      response: "Hmm, let's break this down. Have you considered..."
    },
    { 
      id: 'distract', 
      icon: '😂', 
      label: t('chat.options.distract'),
      greeting: "Wanna get your mind off things? Let's do something dumb.",
      response: "Okay, here's a dumb one: Why did the scarecrow win an award? Because he was outstanding in his field!"
    },
    { 
      id: 'listen', 
      icon: '😢', 
      label: t('chat.options.listen'),
      greeting: "I'm here. You don't have to say anything if you don't want to.",
      response: "I'm still here. Take your time."
    }
  ]

  const selectMode = (mode) => {
    setSelectedMode(mode)
    setMessages([{ type: 'ai', text: mode.greeting }])
  }

  const sendMessage = () => {
    if (!inputText.trim() || !selectedMode) return

    setMessages(prev => [...prev, { type: 'user', text: inputText }])
    setInputText('')

    setTimeout(() => {
      setMessages(prev => [...prev, { type: 'ai', text: selectedMode.response }])
    }, 800 + Math.random() * 1000)
  }

  return (
    <div className="chat-page page">
      <button className="back-button" onClick={() => onNavigate('home')}>
        ← {t('common.back')}
      </button>

      {!selectedMode ? (
        <div className="mode-select">
          <h2 className="chat-title">{t('chat.title')}</h2>
          <div className="mode-grid">
            {chatModes.map(mode => (
              <button
                key={mode.id}
                className="mode-card"
                onClick={() => selectMode(mode)}
              >
                <span className="mode-icon">{mode.icon}</span>
                <span className="mode-label">{mode.label}</span>
              </button>
            ))}
          </div>
          <div className="direct-input">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={t('chat.placeholder')}
              onKeyPress={(e) => {
                if (e.key === 'Enter' && inputText.trim()) {
                  selectMode(chatModes[0])
                  setTimeout(() => {
                    setMessages(prev => [...prev, { type: 'user', text: inputText }])
                    setInputText('')
                    setTimeout(() => {
                      setMessages(prev => [...prev, { type: 'ai', text: chatModes[0].response }])
                    }, 800)
                  }, 100)
                }
              }}
            />
          </div>
        </div>
      ) : (
        <div className="chat-container">
          <div className="chat-header">
            <span className="header-icon">{selectedMode.icon}</span>
            <span className="header-label">{selectedMode.label}</span>
          </div>
          <div className="messages">
            {messages.map((msg, idx) => (
              <div key={idx} className={`message ${msg.type}`}>
                {msg.text}
              </div>
            ))}
          </div>
          <div className="input-area">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              placeholder={t('chat.inputPlaceholder')}
            />
            <button onClick={sendMessage}>{t('common.send') || 'Send'}</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default ChatPage
