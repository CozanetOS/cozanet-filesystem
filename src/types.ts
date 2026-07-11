export interface FileEntry {
  path: string;
  name: string;
  ext: string;
  size: number;
  isDir: boolean;
  createdAt: Date;
  modifiedAt: Date;
}

export interface SearchOptions {
  pattern: string;
  dir: string;
  maxDepth?: number;
  include?: string[];
  exclude?: string[];
}

export interface SyncResult {
  copied: string[];
  removed: string[];
  duration: number;
}
