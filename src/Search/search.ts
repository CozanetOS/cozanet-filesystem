import { glob } from 'glob';
import { SearchOptions } from '../types.js';
import fs from 'fs-extra';
import path from 'path';

export class FileSearch {
  async find(pattern: string, options?: SearchOptions): Promise<string[]> {
    const cwd = options?.dir || process.cwd();
    return glob(pattern, { cwd, absolute: true });
  }

  async findByContent(dir: string, text: string): Promise<string[]> {
    const files = await glob('**/*', { cwd: dir, absolute: true, nodir: true });
    const matches: string[] = [];
    
    for (const file of files) {
      try {
        const content = await fs.readFile(file, 'utf-8');
        if (content.includes(text)) {
          matches.push(file);
        }
      } catch {
        // Skip files that cannot be read
      }
    }
    
    return matches;
  }
}
