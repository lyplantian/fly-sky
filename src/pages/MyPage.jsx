import './MyPage.css'

function MyPage({ onNavigate }) {
  return (
    <div className="my-page">
      <button className="back-button" onClick={() => onNavigate('home')}>
        ←
      </button>

      <div className="my-content">
        <div className="avatar">☾</div>
        <div className="name-input">
          <input type="text" placeholder="随便起个名字" />
        </div>

        <div className="menu-list">
          <div className="menu-item">
            <span>签到记录</span>
            <span className="arrow">→</span>
          </div>
          <div className="menu-item">
            <span>聊过的天</span>
            <span className="arrow">→</span>
          </div>
          <div className="menu-item">
            <span>清空数据</span>
            <span className="arrow">→</span>
          </div>
          <div className="menu-item">
            <span>关于星伴</span>
            <span className="arrow">→</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MyPage
