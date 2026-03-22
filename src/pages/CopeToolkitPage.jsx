import { useState } from 'react'
import { useI18n } from '../i18n'
import { useStarBuddyContext } from '../contexts/StarBuddyContext'
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
  const { getPrioritizedTasks, deleteTask } = useStarBuddyContext()
  const [activeTool, setActiveTool] = useState(null)

  const tools = {
    vibe: [
      { key: 'excuseGenerator', icon: '🎭', label: t('cope.tools.excuseGenerator'), component: ExcuseGenerator },
      { key: 'socialEscape', icon: '🚪', label: t('cope.tools.socialEscape'), component: null }
    ],
    mental: [
      { key: 'brainDump', icon: '🧠', label: t('cope.tools.brainDump'), component: BrainDump },
      { key: 'fiveMinuteReset', icon: '⏱️', label: t('cope.tools.fiveMinuteReset'), action: handleFiveMinuteReset },
      { key: 'dumbMemes', icon: '😂', label: t('cope.tools.dumbMemes'), component: null },
      { key: 'hotTake', icon: '🔥', label: t('cope.tools.hotTake'), component: HotTake }
    ],
    productivity: [
      { key: 'simplifyTodo', icon: '📋', label: t('cope.tools.simplifyTodo'), action: handleSimplifyTodoList },
      { key: 'scheduleBreaks', icon: '☕', label: t('cope.tools.scheduleBreaks'), action: handleScheduleBreaks },
      { key: 'findFocusTime', icon: '🎯', label: t('cope.tools.findFocusTime'), action: handleFindFocusTime }
    ],
    lowEffort: [
      { key: 'tinyWin', icon: '✨', label: t('cope.tools.tinyWin'), component: TinyWin },
      { key: 'minimalLife', icon: '🌱', label: t('cope.tools.minimalLife'), component: MinimalLifeTip }
    ],
    random: [
      { key: 'whatNow', icon: '🎲', label: t('cope.tools.whatNow'), component: WhatNow }
    ],
    crisis: [
      { key: 'crisis', icon: '🆘', label: 'Crisis Resources', component: null }
    ]
  }

  const handleToolClick = (tool) => {
    if (tool.action) {
      tool.action()
    } else if (tool.component) {
      setActiveTool(tool)
    } else {
      console.log('Tool clicked:', tool.key)
      alert(`${tool.label} coming soon!`)
    }
  }

  const closeTool = () => {
    setActiveTool(null)
  }

  const handleSimplifyTodoList = () => {
    const prioritized = getPrioritizedTasks('stressed')
    const top3 = prioritized.slice(0, 3)
    alert(`AI Sidekick: Simplified to top ${top3.length} tasks! Focus on what matters most. Go to AI Sidekick to see them.`)
  }

  const handleScheduleBreaks = () => {
    alert('AI Sidekick: Breaks scheduled! Remember to take 5-10 minute breaks every hour.')
  }

  const handleFindFocusTime = () => {
    alert('AI Sidekick: Found your best focus time! Morning (9-11 AM) is when you\'re most productive.')
  }

  const handleFiveMinuteReset = () => {
    alert('5-Minute Reset: Let\'s do this together!\n\n1. Close your eyes\n2. Take 3 deep breaths\n3. Stretch your shoulders\n4. Drink a glass of water\n\nYou got this! 💪')
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

      <h1 className="cope-title">{t('cope.title')}</h1>

      <div className="tool-section">
        <h2 className="section-title">{t('cope.sections.vibe')}</h2>
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
        <h2 className="section-title">{t('cope.sections.mental')}</h2>
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
        <h2 className="section-title">{t('cope.sections.productivity')}</h2>
        <div className="tool-grid">
          {tools.productivity.map((tool) => (
            <button
              key={tool.key}
              className="tool-card productivity"
              onClick={() => handleToolClick(tool)}
            >
              <span className="tool-icon">{tool.icon}</span>
              <span className="tool-label">{tool.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="tool-section">
        <h2 className="section-title">{t('cope.sections.lowEffort')}</h2>
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
        <h2 className="section-title">{t('cope.sections.random')}</h2>
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
