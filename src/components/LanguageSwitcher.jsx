import { useI18n } from '../i18n';

function LanguageSwitcher() {
  const { currentLocale, changeLanguage } = useI18n();

  const languages = [
    { code: 'en', label: 'English', flag: '🇺🇸' },
    { code: 'zh', label: '中文', flag: '🇨🇳' }
  ];

  return (
    <div className="language-switcher">
      {languages.map((lang) => (
        <button
          key={lang.code}
          className={`lang-btn ${currentLocale === lang.code ? 'active' : ''}`}
          onClick={() => changeLanguage(lang.code)}
        >
          <span className="lang-flag">{lang.flag}</span>
          <span className="lang-label">{lang.label}</span>
        </button>
      ))}
    </div>
  );
}

export default LanguageSwitcher;
