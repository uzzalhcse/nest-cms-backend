// file-upload.service.ts

import { Injectable, BadRequestException } from '@nestjs/common';
import { extname } from 'path';
import { createWriteStream } from 'fs';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class FileUploadService {
  private allowedFileExtensions = ['.jpg', '.jpeg', '.png', '.gif'];

  async uploadFile(
    file: Express.Multer.File,
    uploadPath: string
  ): Promise<string> {
    const fileExtension = extname(file.originalname).toLowerCase();

    if (!this.allowedFileExtensions.includes(fileExtension)) {
      throw new BadRequestException('Invalid file type');
    }

    const fileName = `${uuidv4()}${fileExtension}`;
    const filePath = `${uploadPath}/${fileName}`;

    const writeStream = createWriteStream(filePath);
    writeStream.write(file.buffer);

    return fileName;
  }

  async uploadThumbnail(file: Express.Multer.File): Promise<string> {
    return this.uploadFile(file, 'thumbnails');
  }

  async uploadBanner(file: Express.Multer.File): Promise<string> {
    return this.uploadFile(file, 'banners');
  }
}
