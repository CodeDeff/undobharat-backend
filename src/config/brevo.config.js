import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { BrevoClient } from '@getbrevo/brevo';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../../.env') });
 

const getBrevoClient = () => {
  const apiKey = process.env.BREVO_API_KEY;
  if (!apiKey) {
    throw new Error("BREVO_API_KEY is missing in environment variables");
  }
  return new BrevoClient({ apiKey });
};

export default getBrevoClient;