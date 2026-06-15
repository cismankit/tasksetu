/**
 * TaskSetu canonical brand tokens — shared across web app, marketing site and mobile.
 * Primary: indigo, Success/accent: emerald, Warm accent: amber, Neutrals: slate.
 */
export const palette = {
  indigo: {
    50: '#EEF2FF',
    100: '#E0E7FF',
    200: '#C7D2FE',
    300: '#A5B4FC',
    400: '#818CF8',
    500: '#6366F1',
    600: '#4F46E5',
    700: '#4338CA',
    800: '#3730A3',
    900: '#312E81',
  },
  emerald: {
    50: '#ECFDF5',
    100: '#D1FAE5',
    300: '#6EE7B7',
    500: '#10B981',
    600: '#059669',
    700: '#047857',
  },
  amber: {
    50: '#FFFBEB',
    100: '#FEF3C7',
    400: '#FBBF24',
    500: '#F59E0B',
    600: '#D97706',
  },
  slate: {
    50: '#F8FAFC',
    100: '#F1F5F9',
    200: '#E2E8F0',
    300: '#CBD5E1',
    400: '#94A3B8',
    500: '#64748B',
    600: '#475569',
    700: '#334155',
    800: '#1E293B',
    900: '#0F172A',
  },
  red: {
    50: '#FEF2F2',
    100: '#FEE2E2',
    500: '#EF4444',
    600: '#DC2626',
    700: '#B91C1C',
  },
} as const;

export const colors = {
  primary: palette.indigo[600],
  primaryDark: palette.indigo[700],
  primaryLight: palette.indigo[100],
  secondary: palette.emerald[500],
  secondaryDark: palette.emerald[600],
  accent: palette.amber[500],
  accentDark: palette.amber[600],
  background: palette.slate[50],
  surface: '#FFFFFF',
  text: palette.slate[900],
  textMuted: palette.slate[500],
  border: palette.slate[200],
  warning: palette.amber[600],
  error: palette.red[600],
  success: palette.emerald[600],
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
} as const;

export const radius = {
  sm: 6,
  control: 8,
  md: 12,
  card: 12,
  lg: 16,
  full: 9999,
} as const;

export const shadows = {
  sm: '0 1px 2px 0 rgba(15, 23, 42, 0.06)',
  md: '0 4px 12px -2px rgba(15, 23, 42, 0.08), 0 2px 4px -2px rgba(15, 23, 42, 0.04)',
  lg: '0 12px 32px -8px rgba(15, 23, 42, 0.12)',
} as const;

export const typography = {
  fontFamily:
    "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  sizes: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 24,
    xxl: 32,
  },
} as const;

export type ColorToken = keyof typeof colors;
export type SpacingToken = keyof typeof spacing;
