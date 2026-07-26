import { Injectable } from '@nestjs/common';
import { mkdir, rm, writeFile } from 'fs/promises';
import { join } from 'path';

@Injectable()
export class ResumeStorageService {
  private readonly root = process.env.RESUME_STORAGE_PATH ?? join(process.cwd(), 'uploads', 'resumes');

  async save(userId: string, resumeId: string, originalName: string, buffer: Buffer) {
    await mkdir(join(this.root, userId), { recursive: true });
    const safeName = originalName.replace(/[^a-zA-Z0-9._-]/g, '_');
    const storageKey = join(userId, `${resumeId}-${safeName}`);
    await writeFile(join(this.root, storageKey), buffer, { flag: 'wx' });
    return storageKey;
  }

  async remove(storageKey: string) { await rm(join(this.root, storageKey), { force: true }); }
}
