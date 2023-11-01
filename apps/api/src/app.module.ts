import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { S3Service } from './aws/s3.service';
import { DocumentService } from './db/document.service';
import { Document, DocumentSchema } from './schemas/document.schema';
import { HttpModule } from '@nestjs/axios';
import { DocusealTemplateService } from './docuseal/template.service';
import { DocusealTokenService } from './docuseal/token.service';

/**
 * The root module of the Doc Gen API.
 */
@Module({
  imports: [
    MongooseModule.forRoot(process.env.DB_URL),
    MongooseModule.forFeature([
      { name: Document.name, schema: DocumentSchema },
    ]),
    HttpModule,
  ],
  controllers: [AppController],
  providers: [
    S3Service,
    DocumentService,
    DocusealTemplateService,
    DocusealTokenService,
  ],
})
export class AppModule {}
