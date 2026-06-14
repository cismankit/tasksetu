import { useRouter } from 'expo-router';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { DOCUMENT_TYPES, type DocumentTypeId } from '@tasksetu/core';
import { Screen } from '@/components/Screen';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { SelectChip, ChipRow } from '@/components/SelectChip';
import { useStore, MOCK_USER_ID } from '@/hooks/useStore';
import { usePreferences } from '@/hooks/usePreferences';

const schema = z.object({
  name: z.string().min(1, 'Document name is required'),
  documentTypeId: z.string().min(1),
  expiryDate: z.string().optional(),
  notes: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

export default function AddDocumentScreen() {
  const router = useRouter();
  const { addDocument } = useStore();
  const { strings } = usePreferences();
  const { control, handleSubmit, setValue, watch, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { name: '', documentTypeId: 'aadhaar', notes: '' },
  });

  const docType = watch('documentTypeId');

  const onSubmit = async (data: FormData) => {
    await addDocument({
      userId: MOCK_USER_ID,
      name: data.name,
      documentTypeId: data.documentTypeId as DocumentTypeId,
      expiryDate: data.expiryDate || undefined,
      notes: data.notes,
      tags: [],
    });
    router.back();
  };

  return (
    <Screen>
      <Controller
        control={control}
        name="name"
        render={({ field: { onChange, value } }) => (
          <Input label="Document name" value={value} onChangeText={onChange} error={errors.name?.message} />
        )}
      />
      <ChipRow>
        {DOCUMENT_TYPES.slice(0, 8).map((type) => (
          <SelectChip
            key={type.id}
            label={(strings.doc as Record<string, string>)[type.id.replace(/-/g, '_')] ?? type.id}
            selected={docType === type.id}
            onPress={() => setValue('documentTypeId', type.id)}
          />
        ))}
      </ChipRow>
      <Controller
        control={control}
        name="expiryDate"
        render={({ field: { onChange, value } }) => (
          <Input label="Expiry date (YYYY-MM-DD)" value={value ?? ''} onChangeText={onChange} placeholder="2026-12-31" />
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
