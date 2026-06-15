import { NavLink } from 'react-router-dom';
import {
  Bell,
  CheckSquare,
  FileText,
  Home,
  Lightbulb,
  Receipt,
  Settings,
  Sparkles,
  Users,
  Activity,
} from 'lucide-react';
import { useI18n } from '@/hooks/useI18n';

const navItems = [
  { to: '/dashboard', icon: Home, label: 'Dashboard' },
  { to: '/tasks', icon: CheckSquare, label: 'Tasks' },
  { to: '/documents', icon: FileText, label: 'Documents' },
  { to: '/reminders', icon: Bell, label: 'Reminders' },
  { to: '/status', icon: Activity, label: 'Status' },
  { to: '/receipts', icon: Receipt, label: 'Receipts' },
  { to: '/family', icon: Users, label: 'Family' },
  { to: '/recommendations', icon: Lightbulb, label: 'Recommendations' },
  { to: '/settings', icon: Settings, label: 'Settings' },
];

export function Sidebar() {
  const { strings } = useI18n();

  return (
    <aside className="app-sidebar">
      <div className="app-sidebar__brand">
        <div className="app-sidebar__logo">
          <Sparkles size={20} />
        </div>
        <div>
          <strong>{strings.app.name}</strong>
          <span>{strings.app.tagline}</span>
        </div>
      </div>
      <nav className="app-sidebar__nav">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `app-sidebar__link${isActive ? ' app-sidebar__link--active' : ''}`
            }
          >
            <item.icon size={18} />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
