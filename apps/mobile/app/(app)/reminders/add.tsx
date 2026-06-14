import { useRouter } from 'expo-router';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import type { ReminderType } from '@tasksetu/core';
import { Screen } from '@/components/Screen';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { SelectChip, ChipRow } from '@/components/SelectChip';
import { useStore, MOCK_USER_ID } from '@/hooks/useStore';
import { usePreferences } from '@/hooks/usePreferences';

const REMINDER_TYPES: ReminderType[] = [
  'document_expiry',
  'form_deadline',
  'payment_due',
  'follow_up',
  'custom',
];

const schema = z.object({
  title: z.string().min(1, 'Title is required'),
  type: z.enum(['document_expiry', 'form_deadline', 'payment_due', 'medicine', 'follow_up', 'service_pickup', 'warranty_expiry', 'status_check', 'custom']),
  scheduledAt: z.string().min(1, 'Date is required'),
  notes: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

export default function AddReminderScreen() {
  const router = useRouter();
  const { addReminder } = useStore();
  const { strings } = usePreferences();
  const { control, handleSubmit, setValue, watch, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: '',
      type: 'custom',
      scheduledAt: new Date(Date.now() + 86400000).toISOString().slice(0, 10),
      notes: '',
    },
  });

  const reminderType = watch('type');

  const onSubmit = async (data: FormData) => {
    await addReminder({
      userId: MOCK_USER_ID,
      title: data.title,
      type: data.type,
      scheduledAt: new Date(data.scheduledAt).toISOString(),
      status: 'scheduled',
      notes: data.notes,
    });
    router.back();
  };

  return (
    <Screen>
      <Controller
        control={control}
        name="title"
        render={({ field: { onChange, value } }) => (
          <Input label="Reminder title" value={value} onChangeText={onChange} error={errors.title?.message} />
        )}
      />
      <ChipRow>
        {REMINDER_TYPES.map((type) => (
          <SelectChip
            key={type}
            label={type.replace('_', ' ')}
            selected={reminderType === type}
            onPress={() => setValue('type', type)}
          />
        ))}
      </ChipRow>
      <Controller
        control={control}
        name="scheduledAt"
        render={({ field: { onChange, value } }) => (
          <Input
            label="Date (YYYY-MM-DD)"
            value={value}
            onChangeText={onChange}
            error={errors.scheduledAt?.message}
          />
        )}
      />
      <Controller
        control={control}
        name="notes"
        render={({ field: { onChange, value } }) => (
          <Input label="Notes" value={value ?? ''} onChangeText={onChange} multiline />
        )}
      />
      <Button title={strings.common.save} onPress={handleSubmit(onSubmit)} />
    </Screen>
  );
}
