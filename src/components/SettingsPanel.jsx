import { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { useI18n } from '../i18n';
import './SettingsPanel.css';

export default function SettingsPanel() {
  const { theme, toggleTheme } = useTheme();
  const { currentLocale, changeLanguage } = useI18n();
  const [showThemeMenu, setShowThemeMenu] = useState(false);
  const [showLangMenu, setShowLangMenu] = useState(false);

  const themeOptions = [
    { value: 'light', label: '白天', icon: '☀️' },
    { value: 'dark', label: '黑夜', icon: '🌙' }
  ];

  const languageOptions = [
    { value: 'en', label: 'English', flag: '🇺🇸' },
    { value: 'zh', label: '中文', flag: '🇨🇳' }
  ];

  const currentThemeOption = themeOptions.find(t => t.value === theme);
  const currentLangOption = languageOptions.find(l => l.value === currentLocale);

  const handleThemeSelect = (value) => {
    if (value !== theme) {
      toggleTheme();
    }
    setShowThemeMenu(false);
  };

  const handleLangSelect = (value) => {
    changeLanguage(value);
    setShowLangMenu(false);
  };

  return (
    <div className="settings-panel">
      {/* 主题选择器 */}
      <div className="dropdown">
        <button 
          className="dropdown-toggle"
          onClick={() => {
            setShowThemeMenu(!showThemeMenu);
            setShowLangMenu(false);
          }}
        >
          <span className="dropdown-icon">{currentThemeOption?.icon}</span>
          <span className="dropdown-label">{currentThemeOption?.label}</span>
          <span className="dropdown-arrow">▼</span>
        </button>
        {showThemeMenu && (
          <div className="dropdown-menu">
            {themeOptions.map((option) => (
              <button
                key={option.value}
                className={`dropdown-item ${theme === option.value ? 'active' : ''}`}
                onClick={() => handleThemeSelect(option.value)}
              >
                <span className="item-icon">{option.icon}</span>
                <span className="item-label">{option.label}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* 语言选择器 */}
      <div className="dropdown">
        <button 
          className="dropdown-toggle"
          onClick={() => {
            setShowLangMenu(!showLangMenu);
            setShowThemeMenu(false);
          }}
        >
          <span className="dropdown-icon">{currentLangOption?.flag}</span>
          <span className="dropdown-label">{currentLangOption?.label}</span>
          <span className="dropdown-arrow">▼</span>
        </button>
        {showLangMenu && (
          <div className="dropdown-menu">
            {languageOptions.map((option) => (
              <button
                key={option.value}
                className={`dropdown-item ${currentLocale === option.value ? 'active' : ''}`}
                onClick={() => handleLangSelect(option.value)}
              >
                <span className="item-icon">{option.flag}</span>
                <span className="item-label">{option.label}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
