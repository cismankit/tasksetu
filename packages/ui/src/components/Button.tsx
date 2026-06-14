import type { CSSProperties, ReactNode } from 'react';
import { colors, radius, spacing, typography } from '../tokens';

export interface ButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost';
  onClick?: () => void;
  disabled?: boolean;
  style?: CSSProperties;
}

const variantStyles: Record<NonNullable<ButtonProps['variant']>, CSSProperties> = {
  primary: { backgroundColor: colors.primary, color: '#fff' },
  secondary: { backgroundColor: colors.secondary, color: '#fff' },
  ghost: { backgroundColor: 'transparent', color: colors.primary, border: `1px solid ${colors.border}` },
};

export function Button({
  children,
  variant = 'primary',
  onClick,
  disabled,
  style,
}: ButtonProps) {
  const base: CSSProperties = {
    padding: `${spacing.sm}px ${spacing.md}px`,
    borderRadius: radius.md,
    border: 'none',
    fontSize: typography.sizes.md,
    fontWeight: 600,
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.6 : 1,
    ...variantStyles[variant],
    ...style,
  };

  return (
    <button type="button" style={base} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
}
