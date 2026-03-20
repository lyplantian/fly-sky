import { useState } from 'react'
import './FishToolsPage.css'

const excuses = [
  '今天身体不舒服，想在家休息',
  '家里有点事需要处理',
  '天气太差了，不想出门',
  '昨晚没睡好，今天状态不佳',
  '需要去看医生',
  '心情不太好，想一个人待着'
]

const books = [
  '《局外人》- 阿尔贝·加缪',
  '《人间失格》- 太宰治',
  '《麦田里的守望者》- J.D.塞林格',
  '《挪威的森林》- 村上春树',
  '《百年孤独》- 马尔克斯'
]

const tips = [
  '自己做饭比外卖省钱多了',
  '不需要的东西别买',
  '多用公共交通',
  '晚上早点睡，省电费',
  '学会断舍离'
]

function FishToolsPage({ onNavigate }) {
  const [currentTool, setCurrentTool] = useState(null)
  const [currentContent, setCurrentContent] = useState('')

  const getRandomItem = (array) => {
    const randomIndex = Math.floor(Math.random() * array.length)
    setCurrentContent(array[randomIndex])
  }

  const renderTool = () => {
    switch (currentTool) {
      case 'excuse':
        return (
          <div className="tool-content">
            <div className="tool-title">不想上班理由</div>
            {currentContent && (
              <div className="content-box">{currentContent}</div>
            )}
            <button 
              className="main-button" 
              onClick={() => getRandomItem(excuses)}
            >
              换一个
            </button>
          </div>
        )
      case 'book':
        return (
          <div className="tool-content">
            <div className="tool-title">摸鱼书单</div>
            {currentContent && (
              <div className="content-box">{currentContent}</div>
            )}
            <button 
              className="main-button" 
              onClick={() => getRandomItem(books)}
            >
              换一本
            </button>
          </div>
        )
      case 'tip':
        return (
          <div className="tool-content">
            <div className="tool-title">省钱小技巧</div>
            {currentContent && (
              <div className="content-box">{currentContent}</div>
            )}
            <button 
              className="main-button" 
              onClick={() => getRandomItem(tips)}
            >
              换一个
            </button>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="fish-tools-page">
      <button className="back-button" onClick={() => {
        setCurrentTool(null)
        setCurrentContent('')
        onNavigate('home')
      }}>
        ←
      </button>

      {!currentTool ? (
        <div className="tools-menu">
          <div className="menu-title">摸鱼工具箱</div>
          <div className="button-container">
            <button 
              className="main-button" 
              onClick={() => setCurrentTool('excuse')}
            >
              不想上班理由
            </button>
            <button 
              className="main-button" 
              onClick={() => setCurrentTool('book')}
            >
              摸鱼书单
            </button>
            <button 
              className="main-button" 
              onClick={() => setCurrentTool('tip')}
            >
              省钱小技巧
            </button>
          </div>
        </div>
      ) : (
        renderTool()
      )}
    </div>
  )
}

export default FishToolsPage
