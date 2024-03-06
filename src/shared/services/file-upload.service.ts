import { Injectable, Logger } from '@nestjs/common';
import { extname, join } from 'path';
import { createWriteStream, existsSync, mkdirSync } from 'fs';
import { v4 as uuidv4 } from 'uuid';
import { IFile } from '../../interfaces';

@Injectable()
export class FileUploadService {
  private readonly logger = new Logger(FileUploadService.name);

  async uploadFile(file: IFile, uploadPath: string): Promise<string> {
    try {
      const fileExtension = extname(file.originalname).toLowerCase();

      const fileName = `${uuidv4()}${fileExtension}`;
      const uploadDirectory = join('public/uploads', uploadPath);

      // Ensure the directory exists, create it if not
      if (!existsSync(uploadDirectory)) {
        mkdirSync(uploadDirectory, { recursive: true });
      }

      const filePath = join(uploadDirectory, fileName);

      const writeStream = createWriteStream(filePath);
      writeStream.write(file.buffer);

      return filePath;
    } catch (error) {
      this.logger.error(`File upload failed: ${error.message}`);
      throw error;
    }
  }
}
