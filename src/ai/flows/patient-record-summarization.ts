'use server';
/**
 * @fileOverview AI-powered patient record summarization flow.
 *
 * - summarizePatientRecord - A function that summarizes patient medical records.
 * - SummarizePatientRecordInput - The input type for the summarizePatientRecord function.
 * - SummarizePatientRecordOutput - The return type for the summarizePatientRecord function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizePatientRecordInputSchema = z.object({
  patientHistory: z.string().describe('The patient\'s medical history.'),
  medications: z.string().describe('The patient\'s current medications.'),
  relevantMedicalInformation: z
    .string()
    .describe('Any other relevant medical information about the patient.'),
});
export type SummarizePatientRecordInput = z.infer<typeof SummarizePatientRecordInputSchema>;

const SummarizePatientRecordOutputSchema = z.object({
  summary: z.string().describe('A concise summary of the patient\'s medical history.'),
});
export type SummarizePatientRecordOutput = z.infer<typeof SummarizePatientRecordOutputSchema>;

export async function summarizePatientRecord(
  input: SummarizePatientRecordInput
): Promise<SummarizePatientRecordOutput> {
  return summarizePatientRecordFlow(input);
}

const summarizePatientRecordPrompt = ai.definePrompt({
  name: 'summarizePatientRecordPrompt',
  input: {schema: SummarizePatientRecordInputSchema},
  output: {schema: SummarizePatientRecordOutputSchema},
  prompt: `You are an AI assistant specializing in summarizing patient medical records for doctors.

  Please provide a concise and accurate summary of the patient's medical history based on the information provided below.

  Patient History: {{{patientHistory}}}
  Medications: {{{medications}}}
  Relevant Medical Information: {{{relevantMedicalInformation}}}

  Summary:`,
});

const summarizePatientRecordFlow = ai.defineFlow(
  {
    name: 'summarizePatientRecordFlow',
    inputSchema: SummarizePatientRecordInputSchema,
    outputSchema: SummarizePatientRecordOutputSchema,
  },
  async input => {
    const {output} = await summarizePatientRecordPrompt(input);
    return output!;
  }
);
