import { useState } from 'react'
import { useI18n } from '../i18n'
import {
  ExcuseGenerator,
  TinyWin,
  HotTake,
  MinimalLifeTip,
  BrainDump,
  WhatNow
} from '../components/CopeTools'
import './CopeToolkitPage.css'

function CopeToolkitPage({ onNavigate }) {
  const { t } = useI18n()
  const [activeTool, setActiveTool] = useState(null)

  const tools = {
    vibe: [
      { key: 'excuseGenerator', icon: '🎭', label: 'Excuse Generator', component: ExcuseGenerator },
      { key: 'socialEscape', icon: '🚪', label: 'Social Escape', component: null }
    ],
    mental: [
      { key: 'brainDump', icon: '🧠', label: 'Brain Dump', component: BrainDump },
      { key: 'dumbMemes', icon: '😂', label: 'Dumb Memes', component: null },
      { key: 'hotTake', icon: '🔥', label: 'Hot Take', component: HotTake }
    ],
    lowEffort: [
      { key: 'tinyWin', icon: '✨', label: 'Tiny Win', component: TinyWin },
      { key: 'minimalLife', icon: '🌱', label: 'Minimal Life', component: MinimalLifeTip }
    ],
    random: [
      { key: 'whatNow', icon: '🎲', label: 'What Now?', component: WhatNow }
    ],
    crisis: [
      { key: 'crisis', icon: '🆘', label: 'Crisis Resources', component: null }
    ]
  }

  const handleToolClick = (tool) => {
    if (tool.component) {
      setActiveTool(tool)
    } else {
      console.log('Tool clicked:', tool.key)
      alert(`${tool.label} coming soon!`)
    }
  }

  const closeTool = () => {
    setActiveTool(null)
  }

  if (activeTool && activeTool.component) {
    const ToolComponent = activeTool.component
    return (
      <div className="cope-page page">
        <button className="back-btn" onClick={closeTool}>
          ← Back to Tools
        </button>
        <div className="tool-page">
          <ToolComponent />
        </div>
      </div>
    )
  }

  return (
    <div className="cope-page page">
      <button className="back-btn" onClick={() => onNavigate('home')}>
        ← {t('common.back')}
      </button>

      <h1 className="cope-title">Cope Toolkit</h1>

      <div className="tool-section">
        <h2 className="section-title">Vibe Management</h2>
        <div className="tool-grid">
          {tools.vibe.map((tool) => (
            <button
              key={tool.key}
              className="tool-card"
              onClick={() => handleToolClick(tool)}
            >
              <span className="tool-icon">{tool.icon}</span>
              <span className="tool-label">{tool.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="tool-section">
        <h2 className="section-title">Mental Reset</h2>
        <div className="tool-grid">
          {tools.mental.map((tool) => (
            <button
              key={tool.key}
              className="tool-card"
              onClick={() => handleToolClick(tool)}
            >
              <span className="tool-icon">{tool.icon}</span>
              <span className="tool-label">{tool.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="tool-section">
        <h2 className="section-title">Low-Effort Wins</h2>
        <div className="tool-grid">
          {tools.lowEffort.map((tool) => (
            <button
              key={tool.key}
              className="tool-card"
              onClick={() => handleToolClick(tool)}
            >
              <span className="tool-icon">{tool.icon}</span>
              <span className="tool-label">{tool.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="tool-section">
        <h2 className="section-title">Random Vibe</h2>
        <div className="tool-grid">
          {tools.random.map((tool) => (
            <button
              key={tool.key}
              className="tool-card primary"
              onClick={() => handleToolClick(tool)}
            >
              <span className="tool-icon">{tool.icon}</span>
              <span className="tool-label">{tool.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="tool-section crisis-section">
        <h2 className="section-title">Always Here</h2>
        <div className="crisis-box">
          <div className="crisis-icon">🆘</div>
          <h3 className="crisis-title">Crisis Resources</h3>
          <p className="crisis-text">If you're in crisis, please reach out:</p>
          <div className="crisis-contacts">
            <p>US: 988 Suicide & Crisis Lifeline</p>
            <p>UK & Ireland: 116 123 Samaritans</p>
            <p>Australia: 13 11 14 Lifeline</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CopeToolkitPage
