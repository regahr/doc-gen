import { Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { InjectModel } from '@nestjs/mongoose';
import { Document } from 'src/schemas/document.schema';
import { Model, ObjectId } from 'mongoose';

dotenv.config();

@Injectable()
export class DocumentService {
  constructor(
    @InjectModel(Document.name)
    private documentModel: Model<Document>,
  ) {}

  /**
   * Creates a new Document.
   * @param payload - The data to create the Document with.
   * @returns A Promise that resolves to the created Document.
   */
  async create(payload: object): Promise<Document> {
    const createdDocument = new this.documentModel(payload);
    return createdDocument.save(payload);
  }

  /**
   * Updates an existing Document.
   * @param _id - The ID of the Document to update.
   * @param payload - The data to update the Document with.
   * @returns A Promise that resolves to the updated Document.
   */
  async update(_id: string, payload: object): Promise<Document> {
    const updatedDocument = new this.documentModel(payload);
    return updatedDocument.updateOne({ _id }, payload);
  }

  /**
   * Finds all Documents.
   * @returns A Promise that resolves to an array of all Documents.
   */
  async findAll(): Promise<Document[]> {
    return this.documentModel.find().exec();
  }

  /**
   * Finds Documents that match the given query.
   * @param query - The query to match Documents against.
   * @returns A Promise that resolves to an array of matching Documents.
   */
  async findByQuery(query: object): Promise<Document[]> {
    return this.documentModel.find(query).exec();
  }

  /**
   * Finds a single Document that matches the given query.
   * @param query - The query to match a Document against.
   * @returns A Promise that resolves to the matching Document.
   */
  async findOneByQuery(query: object): Promise<Document> {
    return this.documentModel.findOne(query).exec();
  }

  /**
   * Finds a Document by its ID.
   * @param _id - The ID of the Document to find.
   * @returns A Promise that resolves to the matching Document.
   */
  async findById(_id: ObjectId): Promise<Document> {
    return this.documentModel.findById(_id).exec();
  }
}
