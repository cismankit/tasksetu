import { useRouter } from 'expo-router';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import type { PaymentMethod, ReceiptCategory } from '@tasksetu/core';
import { Screen } from '@/components/Screen';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { SelectChip, ChipRow } from '@/components/SelectChip';
import { useStore, MOCK_USER_ID } from '@/hooks/useStore';
import { usePreferences } from '@/hooks/usePreferences';

const CATEGORIES: ReceiptCategory[] = ['upi', 'school_fee', 'repair', 'medical', 'grocery', 'business', 'other'];
const METHODS: PaymentMethod[] = ['upi', 'cash', 'card', 'bank_transfer', 'other'];

const schema = z.object({
  vendor: z.string().optional(),
  amount: z.string().min(1, 'Amount is required'),
  category: z.enum(['upi', 'school_fee', 'repair', 'medical', 'grocery', 'rent', 'business', 'subscription', 'travel', 'other']),
  paymentMethod: z.enum(['upi', 'cash', 'card', 'bank_transfer', 'other']),
  date: z.string().min(1, 'Date is required'),
  notes: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

export default function AddReceiptScreen() {
  const router = useRouter();
  const { addReceipt } = useStore();
  const { strings } = usePreferences();
  const { control, handleSubmit, setValue, watch, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      vendor: '',
      amount: '',
      category: 'upi',
      paymentMethod: 'upi',
      date: new Date().toISOString().slice(0, 10),
      notes: '',
    },
  });

  const onSubmit = async (data: FormData) => {
    await addReceipt({
      userId: MOCK_USER_ID,
      vendor: data.vendor,
      amount: parseFloat(data.amount) || 0,
      currency: 'INR',
      category: data.category,
      paymentMethod: data.paymentMethod,
      date: data.date,
      notes: data.notes,
      tags: [],
    });
    router.back();
  };

  return (
    <Screen>
      <Controller
        control={control}
        name="vendor"
        render={({ field: { onChange, value } }) => (
          <Input label="Vendor / shop name" value={value ?? ''} onChangeText={onChange} />
        )}
      />
      <Controller
        control={control}
        name="amount"
        render={({ field: { onChange, value } }) => (
          <Input label="Amount (₹)" value={value} onChangeText={onChange} keyboardType="numeric" error={errors.amount?.message} />
        )}
      />
      <ChipRow>
        {CATEGORIES.map((cat) => (
          <SelectChip
            key={cat}
            label={cat.replace('_', ' ')}
            selected={watch('category') === cat}
            onPress={() => setValue('category', cat)}
          />
        ))}
      </ChipRow>
      <ChipRow>
        {METHODS.map((method) => (
          <SelectChip
            key={method}
            label={method.replace('_', ' ')}
            selected={watch('paymentMethod') === method}
            onPress={() => setValue('paymentMethod', method)}
          />
        ))}
      </ChipRow>
      <Controller
        control={control}
        name="date"
        render={({ field: { onChange, value } }) => (
          <Input label="Date (YYYY-MM-DD)" value={value} onChangeText={onChange} error={errors.date?.message} />
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
