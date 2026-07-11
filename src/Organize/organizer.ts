import fs from 'fs-extra';
import path from 'path';
import crypto from 'crypto';

export class FileOrganizer {
  async sortByType(dir: string): Promise<void> {
    const items = await fs.readdir(dir);
    for (const item of items) {
      const fullPath = path.join(dir, item);
      const stat = await fs.stat(fullPath);
      
      if (stat.isFile()) {
        const ext = path.extname(item).substring(1) || 'no-extension';
        const targetDir = path.join(dir, ext);
        await fs.ensureDir(targetDir);
        await fs.move(fullPath, path.join(targetDir, item));
      }
    }
  }

  async flatten(dir: string, dest: string): Promise<void> {
    await fs.ensureDir(dest);
    
    async function traverse(currentDir: string) {
      const items = await fs.readdir(currentDir);
      for (const item of items) {
        const fullPath = path.join(currentDir, item);
        const stat = await fs.stat(fullPath);
        
        if (stat.isDirectory()) {
          await traverse(fullPath);
        } else {
          await fs.copy(fullPath, path.join(dest, item));
        }
      }
    }
    
    await traverse(dir);
  }

  async deduplicate(dir: string): Promise<string[]> {
    const items = await fs.readdir(dir);
    const hashes = new Map<string, string>();
    const duplicates: string[] = [];
    
    for (const item of items) {
      const fullPath = path.join(dir, item);
      const stat = await fs.stat(fullPath);
      
      if (stat.isFile()) {
        const content = await fs.readFile(fullPath);
        const hash = crypto.createHash('md5').update(content).digest('hex');
        
        if (hashes.has(hash)) {
          duplicates.push(fullPath);
          await fs.remove(fullPath);
        } else {
          hashes.set(hash, fullPath);
        }
      }
    }
    
    return duplicates;
  }
}
