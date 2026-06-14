import { useRouter } from 'expo-router';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { USER_TYPES, type UserType } from '@tasksetu/core';
import { Screen } from '@/components/Screen';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { SelectChip, ChipRow } from '@/components/SelectChip';
import { useStore, MOCK_USER_ID } from '@/hooks/useStore';
import { usePreferences } from '@/hooks/usePreferences';

const schema = z.object({
  name: z.string().min(1, 'Name is required'),
  relationship: z.enum(['self', 'spouse', 'child', 'parent', 'sibling', 'other']),
  userType: z.enum([
    'student', 'parent', 'shopkeeper', 'farmer', 'gig_worker',
    'senior_citizen', 'professional', 'service_provider', 'family_manager',
  ] as const).optional(),
  notes: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

const RELATIONSHIPS = ['self', 'spouse', 'child', 'parent', 'sibling', 'other'] as const;

export default function AddFamilyMemberScreen() {
  const router = useRouter();
  const { addFamilyMember } = useStore();
  const { strings } = usePreferences();
  const { control, handleSubmit, setValue, watch, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { name: '', relationship: 'child', notes: '' },
  });

  const relationship = watch('relationship');

  const onSubmit = async (data: FormData) => {
    await addFamilyMember({
      userId: MOCK_USER_ID,
      profileId: MOCK_USER_ID,
      name: data.name,
      relationship: data.relationship,
      userType: data.userType as UserType | undefined,
      notes: data.notes,
    });
    router.back();
  };

  return (
    <Screen>
      <Controller
        control={control}
        name="name"
        render={({ field: { onChange, value } }) => (
          <Input label="Name" value={value} onChangeText={onChange} error={errors.name?.message} />
        )}
      />
      <ChipRow>
        {RELATIONSHIPS.map((rel) => (
          <SelectChip
            key={rel}
            label={rel}
            selected={relationship === rel}
            onPress={() => setValue('relationship', rel)}
          />
        ))}
      </ChipRow>
      <ChipRow>
        {USER_TYPES.slice(0, 5).map((type) => (
          <SelectChip
            key={type}
            label={type.replace('_', ' ')}
            selected={watch('userType') === type}
            onPress={() => setValue('userType', type)}
          />
        ))}
      </ChipRow>
      <Controller
        control={control}
        name="notes"
        render={({ field: { onChange, value } }) => (
          <Input label="Notes (optional)" value={value ?? ''} onChangeText={onChange} multiline />
        )}
      />
      <Button title={strings.common.save} onPress={handleSubmit(onSubmit)} />
    </Screen>
  );
}
