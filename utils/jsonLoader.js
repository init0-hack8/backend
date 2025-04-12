import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

export function loadJsonFile(filename) {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);
    const filePath = join(__dirname, '..', filename);
    const jsonContent = readFileSync(filePath, 'utf8');
    return JSON.parse(jsonContent);
} 