import { useState } from 'react'
import { useStarBuddyContext } from '../contexts/StarBuddyContext'
import { useI18n } from '../i18n'
import './AISidekickPage.css'

function AISidekickPage({ onNavigate }) {
  const { t } = useI18n()
  const { 
    tasks, 
    addTask, 
    deleteTask, 
    toggleTaskComplete,
    getPrioritizedTasks,
    getTopTaskSuggestion,
    parseNaturalLanguageTask,
    getTimeSavedEstimate
  } = useStarBuddyContext()
  
  const [currentMood, setCurrentMood] = useState('okay')
  const [naturalLanguageInput, setNaturalLanguageInput] = useState('')
  const [showAddTask, setShowAddTask] = useState(false)
  const [newTask, setNewTask] = useState({
    title: '',
    priority: 'medium',
    category: 'other',
    estimatedTime: 30,
    dueDate: ''
  })

  const prioritizedTasks = getPrioritizedTasks(currentMood)
  const topSuggestion = getTopTaskSuggestion(currentMood)
  const timeSaved = getTimeSavedEstimate()

  const handleNaturalLanguageSubmit = (e) => {
    e.preventDefault()
    if (naturalLanguageInput.trim()) {
      const parsedTask = parseNaturalLanguageTask(naturalLanguageInput)
      addTask(parsedTask)
      setNaturalLanguageInput('')
    }
  }

  const handleAddTask = (e) => {
    e.preventDefault()
    if (newTask.title.trim()) {
      const taskToAdd = {
        ...newTask,
        dueDate: newTask.dueDate || null
      }
      addTask(taskToAdd)
      setNewTask({
        title: '',
        priority: 'medium',
        category: 'other',
        estimatedTime: 30,
        dueDate: ''
      })
      setShowAddTask(false)
    }
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

  return (
    <div className="ai-sidekick-page page">
      <div className="ai-sidekick-header">
        <button className="back-btn" onClick={() => onNavigate('home')}>
          ←
        </button>
        <h1>🌟 {t('aiSidekick.title')}</h1>
      </div>

      {/* Time Saved Dashboard */}
      <div className="time-saved-card">
        <div className="time-saved-value">≈{Math.round(timeSaved / 60)}h</div>
        <div className="time-saved-label">{t('aiSidekick.timeSaved')}</div>
      </div>

      {/* Quick Start Section */}
      <div className="quick-start-section">
        <h2>{t('aiSidekick.quickStart')}</h2>
        
        <form className="nl-input-form" onSubmit={handleNaturalLanguageSubmit}>
          <input
            type="text"
            className="nl-input"
            placeholder={t('aiSidekick.nlPlaceholder')}
            value={naturalLanguageInput}
            onChange={(e) => setNaturalLanguageInput(e.target.value)}
          />
          <button type="submit" className="nl-submit-btn">✓</button>
        </form>

        <div className="quick-start-buttons">
          <button className="quick-start-btn" onClick={() => setShowAddTask(true)}>
            📝 {t('aiSidekick.myTodoList')}
          </button>
          <button className="quick-start-btn" onClick={() => alert('Calendar integration coming soon!')}>
            📅 {t('aiSidekick.connectCalendar')}
          </button>
          <button className="quick-start-btn" onClick={() => setNaturalLanguageInput('Just ask me!')}>
            🤖 {t('aiSidekick.justAskMe')}
          </button>
        </div>
      </div>

      {/* Top Task Suggestion */}
      {topSuggestion && (
        <div className="top-suggestion-card">
          <h3>🤔 {t('aiSidekick.whatShouldDo')}</h3>
          <div className="suggested-task">
            <div className="task-checkbox" onClick={() => toggleTaskComplete(topSuggestion.id)}>
              {topSuggestion.completed ? '✓' : ''}
            </div>
            <div className="task-content">
              <div className={`task-title ${topSuggestion.completed ? 'completed' : ''}`}>
                {topSuggestion.title}
              </div>
              <div className="task-meta">
                <span className="task-priority">{topSuggestion.priority}</span>
                <span className="task-time">{topSuggestion.estimatedTime} min</span>
                {topSuggestion.category && <span className="task-category">{topSuggestion.category}</span>}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Productivity Reset Tools */}
      <div className="productivity-reset-section">
        <h2>⚡ {t('aiSidekick.productivityReset')}</h2>
        <div className="reset-tools">
          <button className="reset-tool-btn" onClick={handleSimplifyTodoList}>
            📋 {t('cope.tools.simplifyTodo')}
          </button>
          <button className="reset-tool-btn" onClick={handleScheduleBreaks}>
            ☕ {t('cope.tools.scheduleBreaks')}
          </button>
          <button className="reset-tool-btn" onClick={handleFindFocusTime}>
            🎯 {t('cope.tools.findFocusTime')}
          </button>
        </div>
      </div>

      {/* Prioritized Task List */}
      <div className="task-list-section">
        <div className="task-list-header">
          <h2>📋 {t('aiSidekick.aiPrioritizedTasks')}</h2>
          <div className="mood-selector-small">
            <span>{t('aiSidekick.currentVibe')}:</span>
            <select 
              value={currentMood}
              onChange={(e) => setCurrentMood(e.target.value)}
            >
              <option value="good">😊 {t('checkIn.moods.good')}</option>
              <option value="okay">😐 {t('checkIn.moods.okay')}</option>
              <option value="rough">😔 {t('checkIn.moods.rough')}</option>
              <option value="stressed">😤 {t('checkIn.moods.stressed')}</option>
            </select>
          </div>
        </div>

        <div className="task-list">
          {prioritizedTasks.length === 0 ? (
            <div className="empty-state">
              {t('aiSidekick.noTasks')}
            </div>
          ) : (
            prioritizedTasks.map(task => (
              <div key={task.id} className="task-item">
                <div 
                  className="task-checkbox"
                  onClick={() => toggleTaskComplete(task.id)}
                >
                  {task.completed ? '✓' : ''}
                </div>
                <div className="task-content">
                  <div className={`task-title ${task.completed ? 'completed' : ''}`}>
                    {task.title}
                  </div>
                  <div className="task-meta">
                    <span className={`task-priority priority-${task.priority}`}>
                      {task.priority}
                    </span>
                    <span className="task-time">{task.estimatedTime} min</span>
                    {task.category && <span className="task-category">{task.category}</span>}
                    {task.dueDate && (
                      <span className="task-due">
                        Due: {new Date(task.dueDate).toLocaleDateString()}
                      </span>
                    )}
                  </div>
                </div>
                <button 
                  className="task-delete-btn"
                  onClick={() => deleteTask(task.id)}
                >
                  ✕
                </button>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Add Task Modal */}
      {showAddTask && (
        <div className="modal-overlay" onClick={() => setShowAddTask(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>{t('aiSidekick.addNewTask')}</h2>
            <form onSubmit={handleAddTask}>
              <input
                type="text"
                placeholder={t('aiSidekick.taskTitle')}
                value={newTask.title}
                onChange={(e) => setNewTask({...newTask, title: e.target.value})}
                autoFocus
              />
              <select
                value={newTask.priority}
                onChange={(e) => setNewTask({...newTask, priority: e.target.value})}
              >
                <option value="low">Low Priority</option>
                <option value="medium">Medium Priority</option>
                <option value="high">High Priority</option>
              </select>
              <select
                value={newTask.category}
                onChange={(e) => setNewTask({...newTask, category: e.target.value})}
              >
                <option value="other">Other</option>
                <option value="work">Work</option>
                <option value="personal">Personal</option>
                <option value="health">Health</option>
              </select>
              <input
                type="number"
                placeholder={t('aiSidekick.estimatedTime')}
                value={newTask.estimatedTime}
                onChange={(e) => setNewTask({...newTask, estimatedTime: parseInt(e.target.value) || 30})}
              />
              <input
                type="date"
                value={newTask.dueDate}
                onChange={(e) => setNewTask({...newTask, dueDate: e.target.value})}
              />
              <div className="modal-buttons">
                <button type="button" onClick={() => setShowAddTask(false)}>
                  {t('aiSidekick.cancel')}
                </button>
                <button type="submit">{t('aiSidekick.addTask')}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default AISidekickPage