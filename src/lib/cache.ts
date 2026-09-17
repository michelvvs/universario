import fs from 'fs';
import path from 'path';
import { BirthDataPayload } from '@/types/universario';

const CACHE_DIR = path.join(process.cwd(), 'data', 'cache');

// Ensure cache directory exists
function ensureCacheDir() {
  try {
    if (!fs.existsSync(CACHE_DIR)) {
      fs.mkdirSync(CACHE_DIR, { recursive: true });
    }
  } catch (err) {
    console.error('Error creating cache directory:', err);
  }
}

// In-memory quick cache
const memoryCache = new Map<string, BirthDataPayload>();

export function getCachedBirthData(dateStr: string): BirthDataPayload | null {
  // Check memory cache first
  if (memoryCache.has(dateStr)) {
    const data = memoryCache.get(dateStr)!;
    return { ...data, isCached: true };
  }

  // Check file system cache
  ensureCacheDir();
  const filePath = path.join(CACHE_DIR, `${dateStr}.json`);
  if (fs.existsSync(filePath)) {
    try {
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      const data = JSON.parse(fileContent) as BirthDataPayload;
      memoryCache.set(dateStr, data);
      return { ...data, isCached: true };
    } catch (err) {
      console.error(`Error reading cache for ${dateStr}:`, err);
    }
  }

  return null;
}

export function saveCachedBirthData(dateStr: string, data: BirthDataPayload): void {
  try {
    ensureCacheDir();
    memoryCache.set(dateStr, data);
    const filePath = path.join(CACHE_DIR, `${dateStr}.json`);
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.error(`Error saving cache for ${dateStr}:`, err);
  }
}

export function clearCache(): void {
  memoryCache.clear();
  try {
    ensureCacheDir();
    const files = fs.readdirSync(CACHE_DIR);
    for (const file of files) {
      if (file.endsWith('.json')) {
        fs.unlinkSync(path.join(CACHE_DIR, file));
      }
    }
  } catch (err) {
    console.error('Error clearing cache:', err);
  }
}


