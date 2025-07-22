import { Injectable } from '@nestjs/common';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UploadService {
  private s3 = new S3Client({
    region: process.env.AWS_REGION || 'us-east-1',
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID || 'test',
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || 'test',
    },
    endpoint: process.env.AWS_S3_ENDPOINT || undefined, // Para uso com MinIO/local
    forcePathStyle: !!process.env.AWS_S3_ENDPOINT,
  });
  private bucket = process.env.AWS_S3_BUCKET || 'uploads';

  async upload(file: Express.Multer.File, type: string) {
    const key = `${type}/${uuidv4()}-${file.originalname}`;
    await this.s3.send(new PutObjectCommand({
      Bucket: this.bucket,
      Key: key,
      Body: file.buffer,
      ContentType: file.mimetype,
    }));
    return { url: `${process.env.AWS_S3_PUBLIC_URL || ''}/${key}` };
  }
}