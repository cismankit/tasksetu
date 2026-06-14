import { Pressable, Text, View, StyleSheet } from 'react-native';
import { theme } from '@/lib/theme';

interface SelectChipProps {
  label: string;
  selected: boolean;
  onPress: () => void;
}

export function SelectChip({ label, selected, onPress }: SelectChipProps) {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.chip, selected && styles.chipSelected]}
    >
      <Text style={[styles.text, selected && styles.textSelected]}>{label}</Text>
    </Pressable>
  );
}

export function ChipRow({ children }: { children: React.ReactNode }) {
  return <View style={styles.row}>{children}</View>;
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: theme.spacing.md },
  chip: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: theme.radius.full,
    borderWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.surface,
  },
  chipSelected: {
    borderColor: theme.colors.primary,
    backgroundColor: '#EFF6FF',
  },
  text: { fontSize: 14, color: theme.colors.text },
  textSelected: { color: theme.colors.primary, fontWeight: '600' },
});
