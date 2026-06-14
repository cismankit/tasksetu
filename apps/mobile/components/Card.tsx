import { View, Text, StyleSheet, type ViewStyle } from 'react-native';
import { theme } from '@/lib/theme';

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

export function Card({ children, style }: CardProps) {
  return <View style={[styles.card, style]}>{children}</View>;
}

export function CardTitle({ children }: { children: React.ReactNode }) {
  return <Text style={styles.title}>{children}</Text>;
}

export function CardDesc({ children }: { children: React.ReactNode }) {
  return <Text style={styles.desc}>{children}</Text>;
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.surface,
    padding: theme.spacing.md,
    borderRadius: theme.radius.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    marginBottom: theme.spacing.sm,
  },
  title: { fontSize: 16, fontWeight: '600', color: theme.colors.text },
  desc: { fontSize: 14, color: theme.colors.textMuted, marginTop: 4 },
});
