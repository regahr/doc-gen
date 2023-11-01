import { Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';

dotenv.config();

@Injectable()
export class DocusealTemplateService {
  constructor(private readonly httpService: HttpService) {}

  /**
   * Retrieves all templates from DocuSeal API.
   * @returns Promise containing the templates data.
   * @throws Throws an error if an error occurs during the API request.
   */
  async getAllTemplates(): Promise<any> {
    const options = {
      headers: { 'X-Auth-Token': process.env.DOCUSEAL_API_KEY },
    };

    const { data } = await firstValueFrom(
      this.httpService.get<any>(process.env.DOCUSEAL_URL, options).pipe(
        catchError((error: AxiosError) => {
          throw 'An error happened!';
        }),
      ),
    );

    return data;
  }
}
