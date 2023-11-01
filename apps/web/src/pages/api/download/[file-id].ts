import { GetObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import type { NextApiRequest, NextApiResponse } from 'next';

/**
 * @Deprecated do not use this endpoint
 * */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const { query } = req;
  const fileId = query['file-id'] as string;
  const document = new Promise((resolve, reject) => {
    if (process.env.S3_ACCESS_KEY && process.env.S3_SECRET) {
      const s3Client = new S3Client({
        region: process.env.S3_REGION,
        credentials: {
          accessKeyId: process.env.S3_ACCESS_KEY,
          secretAccessKey: process.env.S3_SECRET
        }
      });

      try {
        const command = new GetObjectCommand({
          Bucket: process.env.S3_BUCKET,
          Key: fileId
        });
        resolve(getSignedUrl(s3Client, command, { expiresIn: 3600 }));
      } catch (err) {
        reject(err);
      }
    } else {
      reject(new Error('Please provide s3 access & secret'));
    }
  });
  const response = await document;
  res.send(response);
}
