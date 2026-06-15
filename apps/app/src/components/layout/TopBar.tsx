import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Globe, Search } from 'lucide-react';
import { useAppStore } from '@/lib/store';
import { useI18n } from '@/hooks/useI18n';

export function TopBar() {
  const navigate = useNavigate();
  const { strings, locale } = useI18n();
  const profileName = useAppStore((s) => s.profileName);
  const setPreferences = useAppStore((s) => s.setPreferences);
  const [query, setQuery] = useState('');

  const initials = useMemo(() => {
    const name = profileName || 'TS';
    return name
      .split(' ')
      .map((p) => p[0])
      .join('')
      .slice(0, 2)
      .toUpperCase();
  }, [profileName]);

  const toggleLanguage = () => {
    setPreferences({ language: locale === 'en' ? 'hi' : 'en' });
  };

  const onSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const q = query.trim().toLowerCase();
    if (!q) return;
    navigate(`/tasks?q=${encodeURIComponent(q)}`);
  };

  return (
    <header className="app-topbar">
      <form className="app-topbar__search" onSubmit={onSearch}>
        <Search size={18} />
        <input
          type="search"
          placeholder={`${strings.common.search} tasks, documents…`}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Search"
        />
      </form>
      <div className="app-topbar__actions">
        <button type="button" className="ts-btn ts-btn--ghost ts-btn--sm" onClick={toggleLanguage}>
          <Globe size={16} />
          {locale === 'en' ? 'EN' : 'हि'}
        </button>
        <div className="ts-avatar app-topbar__avatar" style={{ width: 36, height: 36 }}>
          {initials}
        </div>
      </div>
    </header>
  );
}
