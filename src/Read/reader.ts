import fs from 'fs-extra';
import readline from 'readline';

export class FileReader {
  async read(path: string): Promise<string> {
    return fs.readFile(path, 'utf-8');
  }

  async readJSON<T = any>(path: string): Promise<T> {
    return fs.readJSON(path);
  }

  async readLines(path: string): Promise<string[]> {
    const fileStream = fs.createReadStream(path);
    const rl = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity
    });
    
    const lines: string[] = [];
    for await (const line of rl) {
      lines.push(line);
    }
    return lines;
  }

  async exists(path: string): Promise<boolean> {
    return fs.pathExists(path);
  }
}
