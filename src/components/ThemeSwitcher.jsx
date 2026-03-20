import { useTheme } from '../contexts/ThemeContext';
import './ThemeSwitcher.css';

export default function ThemeSwitcher() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button 
      className="theme-switcher" 
      onClick={toggleTheme}
      aria-label={`切换到${theme === 'light' ? '深色' : '浅色'}模式`}
    >
      <span className="theme-icon">
        {theme === 'light' ? '🌙' : '☀️'}
      </span>
      <span className="theme-label">
        {theme === 'light' ? '黑夜' : '白天'}
      </span>
    </button>
  );
}
