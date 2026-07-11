import fs from 'fs-extra';

export class FileWriter {
  async write(path: string, content: string): Promise<void> {
    await fs.outputFile(path, content);
  }

  async writeJSON(path: string, data: any): Promise<void> {
    await fs.outputJson(path, data, { spaces: 2 });
  }

  async append(path: string, content: string): Promise<void> {
    await fs.appendFile(path, content);
  }

  async mkdir(path: string): Promise<void> {
    await fs.ensureDir(path);
  }

  async copy(src: string, dest: string): Promise<void> {
    await fs.copy(src, dest);
  }

  async move(src: string, dest: string): Promise<void> {
    await fs.move(src, dest, { overwrite: true });
  }
}
