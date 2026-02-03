'use client';
import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Sparkles } from 'lucide-react';
import { summarizePatientRecord } from '@/ai/flows/patient-record-summarization';

const formSchema = z.object({
  patientHistory: z.string().min(10, 'Please provide more details.'),
  medications: z.string().min(5, 'Please list medications.'),
  relevantMedicalInformation: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export default function SummarizePage() {
  const [summary, setSummary] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      patientHistory: '',
      medications: '',
      relevantMedicalInformation: '',
    },
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setIsLoading(true);
    setSummary('');
    setError('');
    try {
      const result = await summarizePatientRecord(data);
      setSummary(result.summary);
    } catch (e) {
      setError('Failed to generate summary. Please try again.');
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex-1 space-y-6 p-4 md:p-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
          AI Patient Record Summarization
        </h1>
        <p className="text-muted-foreground">
          Generate a concise summary of a patient&apos;s medical record using AI.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Patient Information</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="patientHistory"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Patient History</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Enter patient's medical history..."
                          className="min-h-[120px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="medications"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Current Medications</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="List current medications, dosages, and frequency..."
                          className="min-h-[80px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="relevantMedicalInformation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Other Relevant Information</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Allergies, recent lab results, etc."
                          className="min-h-[80px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Sparkles className="mr-2 h-4 w-4" />
                      Generate Summary
                    </>
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Generated Summary</CardTitle>
          </CardHeader>
          <CardContent className="min-h-[300px]">
            {isLoading && (
              <div className="flex h-full items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
              </div>
            )}
            {error && (
              <div className="text-destructive">{error}</div>
            )}
            {summary && (
              <div className="prose prose-sm max-w-none text-foreground dark:prose-invert">
                <p>{summary}</p>
              </div>
            )}
            {!isLoading && !summary && !error && (
              <div className="flex h-full flex-col items-center justify-center text-center text-muted-foreground">
                <Sparkles className="mb-2 h-8 w-8" />
                <p>The AI-generated summary will appear here.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
