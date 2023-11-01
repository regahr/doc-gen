import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, ObjectId, Schema as MongooseSchema } from 'mongoose';

export type DocumentType = HydratedDocument<Document>;

@Schema({ timestamps: true, _id: true, collection: 'documents' })
export class Document {
  @Prop()
  fileName: string;

  @Prop()
  s3FileID: string;

  @Prop()
  fileSize: string;

  @Prop()
  organizationId: ObjectId;

  @Prop()
  relatedDocumentId: ObjectId;

  @Prop()
  docusealTemplateId: string;
}

export const DocumentSchema = SchemaFactory.createForClass(Document);
