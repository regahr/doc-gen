import {
  Controller,
  Get,
  Param,
  Post,
  Res,
  StreamableFile,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { convert } from 'libreoffice-convert';
import { promisify } from 'bluebird';
import { S3Service } from './aws/s3.service';
import { DocumentService } from './db/document.service';
import mongoose from 'mongoose';
import { DocusealTemplateService } from './docuseal/template.service';
import type { Response } from 'express';
import { DocusealTokenService } from './docuseal/token.service';

const convertFile = promisify(convert);

/**
 * Controller for the API endpoints related to document generation.
 */
@Controller('api/v1/doc-gen')
export class AppController {
  constructor(
    private readonly s3Service: S3Service,
    private readonly docService: DocumentService,
    private readonly docusealTemplateService: DocusealTemplateService,
    private readonly docusealTokenService: DocusealTokenService,
  ) {}

  /**
   * Endpoint to get all documents.
   * @returns {Promise<any>} Promise that resolves to an array of documents.
   */
  @Get('documents')
  async getAllDocuments(): Promise<any> {
    const documents = await this.docService.findByQuery({
      relatedDocumentId: { $exists: true },
    });
    return documents;
  }

  /**
   * Endpoint to upload a docx file.
   * @param {Express.Multer.File} file The file to upload.
   * @returns {Promise<string>} Promise that resolves to the URL of the uploaded PDF file.
   */
  @Post('documents/upload-docx')
  @UseInterceptors(FileInterceptor('file'))
  async uploadDocx(@UploadedFile() file: Express.Multer.File): Promise<string> {
    console.log('Uploading docx file:', file.originalname);
    const id = new mongoose.Types.ObjectId();
    const s3FileID = `${Date.now()}-${file.originalname.toLowerCase()}`;
    await this.s3Service.uploadDocument(s3FileID, file.buffer, id.toString());
    await this.docService.create({
      fileName: file.originalname.toLowerCase(),
      s3FileID,
      _id: id,
      fileSize: file.size.toString(),
    });
    const pdfFile = await convertFile(file.buffer, '.pdf', undefined);
    const s3PDFFileID = `${Date.now()}-${file.originalname
      .toLowerCase()
      .replace('.docx', '')}.pdf`;
    await this.s3Service.uploadDocument(s3PDFFileID, pdfFile, id.toString());
    await this.docService.create({
      fileName: `${file.originalname.toLowerCase().replace('.docx', '')}.pdf`,
      s3FileID: s3PDFFileID,
      relatedDocumentId: id,
      fileSize: pdfFile.length.toString(),
    });
    const pdfBase64 = Buffer.from(pdfFile).toString('base64');
    const pdfUrl = `data:application/pdf;base64,${pdfBase64}`;
    return pdfUrl;
  }

  /**
   * Endpoint to download a document by file ID.
   * @param {any} params The parameters of the request.
   * @param {Response} res The response object.
   * @returns {Promise<void>} Promise that resolves when the document is downloaded.
   */
  @Get('document/download/:fileId')
  async downloadDocumentByFileId(
    @Param() params: any,
    @Res() res: Response,
  ): Promise<void> {
    const fileId = params.fileId;
    const file = await this.s3Service.getFile(fileId, 'base64');
    const fileBuffer = Buffer.from(file as string, 'base64');
    res.set({
      'Content-Type': 'application/pdf',
    });
    const streamFile = new StreamableFile(fileBuffer);
    const stream = streamFile.getStream();
    stream.pipe(res);
  }

  /**
   * Endpoint to download a related document by file ID.
   * @param {any} params The parameters of the request.
   * @param {Response} res The response object.
   * @returns {Promise<void>} Promise that resolves when the related document is downloaded.
   */
  @Get('document/download/related/:fileId')
  async downloadRelatedDocumentByFileId(
    @Param() params: any,
    @Res() res: Response,
  ): Promise<void> {
    const fileId = params.fileId;
    const document = await this.docService.findOneByQuery({
      s3FileID: fileId,
    });
    const relatedDocument = await this.docService.findById(
      document.relatedDocumentId,
    );
    console.log(relatedDocument);
    const relatedDocumentFileId = relatedDocument.s3FileID;
    const file = await this.s3Service.getFile(relatedDocumentFileId, 'base64');
    const fileBuffer = Buffer.from(file as string, 'base64');
    res.set({
      'Content-Type': 'application/docx',
      'Content-Disposition': `attachment; filename=${relatedDocument.s3FileID}`,
    });
    const streamFile = new StreamableFile(fileBuffer);
    const stream = streamFile.getStream();
    stream.pipe(res);
  }

  /**
   * Endpoint to get the template slug by file ID.
   * @param {any} params The parameters of the request.
   * @returns {Promise<string>} Promise that resolves to the template slug.
   */
  @Get('docuseal/templates/slug/byFileId/:fileId')
  async getTemplateSlugByName(@Param() params: any): Promise<string> {
    const templates = await this.docusealTemplateService.getAllTemplates();
    const data = templates.data;
    const template = data.find((d) => d.name === params.fileId);
    console.log(template);
    if (!template) {
      return 'No template found';
    }
    return template.slug;
  }

  /**
   * Endpoint to get the DocuSeal token by file ID.
   * @param {any} params The parameters of the request.
   * @returns {Promise<string>} Promise that resolves to the DocuSeal token.
   */
  @Get('docuseal/token/byFileId/:fileId')
  async docusealTokenByFileId(@Param() params: any): Promise<string> {
    const fileId = params.fileId;
    const templates = await this.docusealTemplateService.getAllTemplates();
    const token = this.docusealTokenService.getToken(fileId, templates);
    return token;
  }
}
