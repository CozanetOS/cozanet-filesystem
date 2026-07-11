import fs from 'fs-extra';
import path from 'path';
import chokidar from 'chokidar';
import { SyncResult } from '../types.js';

export class FileSyncEngine {
  async sync(src: string, dest: string, options?: any): Promise<SyncResult> {
    const start = Date.now();
    await fs.ensureDir(dest);
    await fs.copy(src, dest, { overwrite: true });
    
    return {
      copied: [src],
      removed: [],
      duration: Date.now() - start
    };
  }

  watch(dir: string, handler: (event: string, path: string) => void): () => void {
    const watcher = chokidar.watch(dir, { ignoreInitial: true });
    
    watcher.on('all', (event, filePath) => {
      handler(event, filePath);
    });
    
    return () => watcher.close();
  }
}
