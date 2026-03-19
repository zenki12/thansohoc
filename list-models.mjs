import { GoogleGenerativeAI } from '@google/generative-ai';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Simple env loader
const loadEnv = () => {
  try {
    const envData = fs.readFileSync(path.join(__dirname, '.env.local'), 'utf8');
    envData.split('\n').forEach(line => {
      const parts = line.split('=');
      if (parts.length >= 2) {
        process.env[parts[0].trim()] = parts.slice(1).join('=').trim();
      }
    });
  } catch (e) {
    console.log('No .env.local found or error reading it');
  }
};

loadEnv();

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  console.log("No GEMINI_API_KEY found!");
  process.exit(1);
}

const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`;

fetch(url)
  .then(res => res.json())
  .then(data => {
    if (data.models) {
      console.log("AVAILABLE MODELS (supported for generateContent):");
      data.models.forEach(m => {
        if (m.supportedGenerationMethods.includes('generateContent')) {
          console.log(`- ${m.name.replace('models/', '')}`);
        }
      });
    } else {
      console.log(data);
    }
  })
  .catch(err => console.error("Fetch error:", err));
