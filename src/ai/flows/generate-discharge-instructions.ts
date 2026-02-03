'use server';

/**
 * @fileOverview Flow for generating patient discharge instructions.
 *
 * - generateDischargeInstructions - Generates discharge instructions for a patient.
 * - GenerateDischargeInstructionsInput - The input type for the generateDischargeInstructions function.
 * - GenerateDischargeInstructionsOutput - The return type for the generateDischargeInstructions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateDischargeInstructionsInputSchema = z.object({
  patientName: z.string().describe('The name of the patient.'),
  medicalCondition: z.string().describe('The patient\'s medical condition.'),
  treatmentSummary: z.string().describe('A summary of the treatment the patient received.'),
  medications: z.string().describe('A list of medications the patient is prescribed, including dosage and frequency.'),
  followUpAppointments: z.string().describe('Details of any follow-up appointments, including date, time, and location.'),
  emergencyContact: z.string().describe('Emergency contact information for the patient.'),
  additionalInstructions: z.string().describe('Any additional instructions for the patient, such as dietary restrictions or activity limitations.'),
});
export type GenerateDischargeInstructionsInput = z.infer<
  typeof GenerateDischargeInstructionsInputSchema
>;

const GenerateDischargeInstructionsOutputSchema = z.object({
  dischargeInstructions: z.string().describe('The generated discharge instructions for the patient.'),
});
export type GenerateDischargeInstructionsOutput = z.infer<
  typeof GenerateDischargeInstructionsOutputSchema
>;

export async function generateDischargeInstructions(
  input: GenerateDischargeInstructionsInput
): Promise<GenerateDischargeInstructionsOutput> {
  return generateDischargeInstructionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateDischargeInstructionsPrompt',
  input: {schema: GenerateDischargeInstructionsInputSchema},
  output: {schema: GenerateDischargeInstructionsOutputSchema},
  prompt: `You are an expert medical professional tasked with generating clear and concise discharge instructions for patients.

  Based on the following information, generate discharge instructions that the patient can easily understand.

  Patient Name: {{{patientName}}}
  Medical Condition: {{{medicalCondition}}}
  Treatment Summary: {{{treatmentSummary}}}
  Medications: {{{medications}}}
  Follow-Up Appointments: {{{followUpAppointments}}}
  Emergency Contact: {{{emergencyContact}}}
  Additional Instructions: {{{additionalInstructions}}}

  Discharge Instructions:`,
});

const generateDischargeInstructionsFlow = ai.defineFlow(
  {
    name: 'generateDischargeInstructionsFlow',
    inputSchema: GenerateDischargeInstructionsInputSchema,
    outputSchema: GenerateDischargeInstructionsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
