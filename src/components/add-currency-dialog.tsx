'use client';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const currencySchema = z.object({
  name: z.string().min(1, 'Currency name is required.'),
  code: z.string().min(1, 'Currency code is required.'),
  symbol: z.string().min(1, 'Symbol is required.'),
  exchangeRate: z.coerce.number().min(0, 'Exchange rate must be a positive number.'),
  status: z.enum(['Active', 'Inactive']),
});

export type CurrencyFormValues = z.infer<typeof currencySchema>;

interface AddCurrencyDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (data: CurrencyFormValues) => void;
  currency: Partial<CurrencyFormValues> | null;
}

export function AddCurrencyDialog({
  open,
  onOpenChange,
  onSave,
  currency,
}: AddCurrencyDialogProps) {
  const form = useForm<CurrencyFormValues>({
    resolver: zodResolver(currencySchema),
    defaultValues: {
      name: '',
      code: '',
      symbol: '',
      exchangeRate: 1,
      status: 'Active',
    },
  });

  useEffect(() => {
    if (open && currency) {
      form.reset(currency);
    } else if (open && !currency) {
      form.reset({
        name: '',
        code: '',
        symbol: '',
        exchangeRate: 1,
        status: 'Active',
      });
    }
  }, [currency, form, open]);

  const onSubmit = (data: CurrencyFormValues) => {
    onSave(data);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {currency ? 'Edit Currency' : 'Add New Currency'}
          </DialogTitle>
          <DialogDescription>
            Fill in the details for the currency.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Currency Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. US Dollar" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Code</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. USD" {...field} disabled={!!currency}/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="symbol"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Symbol</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. $" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="exchangeRate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Exchange Rate (to base)</FormLabel>
                  <FormControl>
                    <Input type="number" step="0.0001" placeholder="e.g. 1.00" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                     value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Active">Active</SelectItem>
                      <SelectItem value="Inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
              <Button type="submit">
                {currency ? 'Save Changes' : 'Create Currency'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
