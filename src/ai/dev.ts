import { config } from 'dotenv';
config();

import '@/ai/flows/patient-record-summarization.ts';
import '@/ai/flows/generate-discharge-instructions.ts';