import { Injectable } from '@nestjs/common';
import {
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class S3Service {
  /**
   * S3 client instance
   */
  s3Client = new S3Client({
    region: process.env.S3_REGION,
    credentials: {
      accessKeyId: process.env.S3_ACCESS_KEY,
      secretAccessKey: process.env.S3_SECRET,
    },
  });

  /**
   * Uploads a document to S3 bucket
   * @param key - S3 object key
   * @param content - Document content as a buffer
   * @param dbId - Database ID for tagging
   * @returns Promise containing the uploaded object details
   */
  uploadDocument = async (key: string, content: Buffer, dbId: string) => {
    console.log('Sending document to s3:', key);
    console.log('Content:', content);
    console.log('Region:', process.env.S3_REGION);
    console.log('Bucket:', process.env.S3_BUCKET);
    console.log('Access Key:', process.env.S3_ACCESS_KEY);
    const command = new PutObjectCommand({
      Bucket: process.env.S3_BUCKET,
      Key: key,
      Body: content,
      Tagging: `dbId=${dbId}`,
    });
    const uploaded = await this.s3Client.send(command);
    return uploaded;
  };

  /**
   * Retrieves a file from S3 bucket
   * @param key - S3 object key
   * @param as - Format to retrieve the file as (base64, buffer, webStream, byteArray)
   * @returns Promise containing the file in the specified format
   * @throws Error if file retrieval fails
   */
  async getFile(key: string, as: string) {
    const bucketParams = {
      Bucket: process.env.S3_BUCKET,
      Key: key,
    };

    try {
      const data = await this.s3Client.send(new GetObjectCommand(bucketParams));

      if (as === 'base64') {
        return data.Body.transformToString('base64');
      } else if (as === 'buffer') {
        return data.Body.transformToString();
      } else if (as === 'webStream') {
        return data.Body.transformToWebStream();
      } else if (as === 'byteArray') {
        return data.Body.transformToByteArray();
      }
    } catch (err: any) {
      throw new Error(err.message);
    }
  }
}
