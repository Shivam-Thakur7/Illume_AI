import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');

const requiredVars = [
  'AZURE_ENDPOINT',
  'AZURE_API_KEY',
  'DEPLOYMENT_NAME',
  'API_VERSION'
];

try {
  const envPath = path.join(rootDir, '.env');
  const envContent = fs.readFileSync(envPath, 'utf8');
  const envVars = Object.fromEntries(
    envContent
      .split('\n')
      .filter(line => line.trim() && !line.startsWith('#'))
      .map(line => line.split('=').map(part => part.trim()))
  );

  const missing = requiredVars.filter(key => !envVars[key]);

  if (missing.length > 0) {
    console.error('❌ Missing required environment variables:', missing.join(', '));
    process.exit(1);
  }

  console.log('✅ All required environment variables are present');
} catch (error) {
  console.error('❌ Error reading .env file:', error.message);
  process.exit(1);
}