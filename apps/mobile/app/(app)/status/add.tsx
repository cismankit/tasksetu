import { useRouter } from 'expo-router';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import type { StatusTrackerState } from '@tasksetu/core';
import { Screen } from '@/components/Screen';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { SelectChip, ChipRow } from '@/components/SelectChip';
import { useStore, MOCK_USER_ID } from '@/hooks/useStore';
import { usePreferences } from '@/hooks/usePreferences';

const STATUSES: StatusTrackerState[] = [
  'submitted',
  'under_review',
  'pending_documents',
  'approved',
  'rejected',
  'on_hold',
  'completed',
  'unknown',
];

const schema = z.object({
  taskName: z.string().min(1, 'Task name is required'),
  referenceNumber: z.string().optional(),
  portalLink: z.string().optional(),
  currentStatus: z.enum([
    'submitted', 'under_review', 'pending_documents', 'approved',
    'rejected', 'on_hold', 'completed', 'unknown',
  ]),
  notes: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

export default function AddStatusTrackerScreen() {
  const router = useRouter();
  const { addStatusTracker } = useStore();
  const { strings } = usePreferences();
  const { control, handleSubmit, setValue, watch, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { taskName: '', currentStatus: 'submitted', notes: '' },
  });

  const status = watch('currentStatus');

  const onSubmit = async (data: FormData) => {
    await addStatusTracker({
      userId: MOCK_USER_ID,
      taskName: data.taskName,
      referenceNumber: data.referenceNumber,
      portalLink: data.portalLink,
      currentStatus: data.currentStatus,
      notes: data.notes,
      attachmentIds: [],
    });
    router.back();
  };

  return (
    <Screen>
      <Controller
        control={control}
        name="taskName"
        render={({ field: { onChange, value } }) => (
          <Input label="Application / task name" value={value} onChangeText={onChange} error={errors.taskName?.message} />
        )}
      />
      <Controller
        control={control}
        name="referenceNumber"
        render={({ field: { onChange, value } }) => (
          <Input label="Reference number" value={value ?? ''} onChangeText={onChange} />
        )}
      />
      <Controller
        control={control}
        name="portalLink"
        render={({ field: { onChange, value } }) => (
          <Input label="Portal link" value={value ?? ''} onChangeText={onChange} />
        )}
      />
      <ChipRow>
        {STATUSES.map((s) => (
          <SelectChip
            key={s}
            label={s.replace('_', ' ')}
            selected={status === s}
            onPress={() => setValue('currentStatus', s)}
          />
        ))}
      </ChipRow>
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
