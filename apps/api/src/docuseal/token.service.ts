import { Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { sign } from 'jsonwebtoken';

dotenv.config();

@Injectable()
export class DocusealTokenService {
  /**
   * Generates a DocuSeal token for the given file ID and templates.
   * @param fileId - The ID of the file to generate the token for.
   * @param templates - The templates to use for generating the token.
   * @returns A Promise that resolves to the generated token.
   */
  async getToken(fileId: string, templates: any): Promise<string> {
    const data = templates.data;
    const template = data.find((d) => d.name === fileId);
    const payload: any = {
      templateId: '',
      documentUrl: '',
    };
    if (!template || (template && !template.length)) {
      const encoded = encodeURIComponent(fileId);
      payload.documentUrl = encoded;
    } else {
      payload.templateId = template.id;
    }
    const token = sign(
      {
        user_email: process.env.DOCUSEAL_USER_EMAIL,
        integration_email:
          process.env.DOCUSEAL_INTEGRATION_EMAIL || 'signer@example.com',
        name: fileId,
        ...(payload.documentUrl
          ? {
              document_urls: [`${process.env.S3_URL}/${payload.documentUrl}`],
            }
          : {}),
        ...(payload.templateId ? { template_id: payload.templateId } : {}),
      },
      process.env.DOCUSEAL_API_KEY,
    );
    return token;
  }
}
