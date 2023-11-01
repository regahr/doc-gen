import { Button, LoadingSpinner, NoRecordsFound, Table, UploadModal } from 'ui';
import { useState } from 'react';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import type { NextPageLayout } from '../_app';
import Layout from '../../components/layout';

interface DocumentResponse {
  s3FileID: string;
  fileName: string;
  fileSize: string;
  relatedDocumentId: string;
  _id: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * Fetches an array of DocumentResponse objects from the API.
 * @returns A Promise that resolves to an array of DocumentResponse objects.
 */
const fetcher = async (): Promise<DocumentResponse[]> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/documents`);
  return res.json() as Promise<DocumentResponse[]>;
};

interface Document {
  fileName: string;
  fileSize: string;
  s3FileID: string;
  relatedDocumentId: string;
  createdAt: string;
  updatedAt: string;
}

const HomePage: NextPageLayout = () => {
  const router = useRouter();

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const { data, isLoading, mutate } = useSWR<Document[], boolean>(
    'getDocuments',
    fetcher
  );

  /**
   * Handles the upload of a file to the server.
   * @param file - The file to be uploaded.
   * @returns A Promise that resolves when the upload is complete.
   */
  const handleUpload = async (file: File): Promise<void> => {
    const formData = new FormData();
    formData.append('file', file);
    setIsUploading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/documents/upload-docx`,
        {
          method: 'POST',
          body: formData
        }
      );

      if (response.ok) {
        setIsUploading(false);
        void mutate();
      } else {
        setIsUploading(false);
      }
    } catch (error) {
      setIsUploading(false);
    }
  };

  return (
    <>
      <div
        className={`flex flex-col justify-center items-center min-h-screen p-10 ${
          modalIsOpen ? 'opacity-50' : ''
        } `}
      >
        {!data || isLoading || isUploading ? (
          <LoadingSpinner />
        ) : (
          <div className="flex flex-col w-50">
            <Button
              className="mb-4"
              onClick={() => {
                setModalIsOpen(true);
              }}
            >
              Upload docx
            </Button>

            {data.length === 0 ? (
              <NoRecordsFound />
            ) : (
              <Table>
                <thead className="sticky top-0 bg-white border-b">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Filename / Template ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Filetype
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Filesize
                    </th>

                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {data.map((document) => {
                    return (
                      <tr key={document.s3FileID}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {document.s3FileID}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">PDF</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            {(Number(document.fileSize) / 1024 / 1000).toFixed(
                              2
                            )}{' '}
                            MB
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <button
                            className="px-2 py-1 text-xs font-semibold text-yellow-600 hover:text-yellow-800"
                            onClick={() => {
                              window.open(
                                `${process.env.NEXT_PUBLIC_API_URL}/document/download/related/${document.s3FileID}`
                              );
                            }}
                            type="button"
                          >
                            Download Docx
                          </button>
                          <button
                            className="px-2 py-1 text-xs font-semibold text-blue-600 hover:text-blue-800"
                            onClick={() => {
                              void router.push(`/preview/${document.s3FileID}`);
                              // window.open(
                              //   `${process.env.NEXT_PUBLIC_API_URL}/preview/${document.s3FileID}`
                              // );
                            }}
                            type="button"
                          >
                            View PDF
                          </button>
                          <button
                            className="px-2 py-1 text-xs font-semibold text-green-600 hover:text-green-800"
                            onClick={() => {
                              void router.push(
                                `/edit-template/${document.s3FileID}`
                              );
                            }}
                            type="button"
                          >
                            Create / Edit Template
                          </button>
                          <button
                            className="px-2 py-1 text-xs font-semibold text-red-600 hover:text-red-800"
                            onClick={() => {
                              void router.push(
                                `/sign-doc/${document.s3FileID}`
                              );
                            }}
                            type="button"
                          >
                            Test Sign PDF
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            )}
          </div>
        )}
      </div>
      <UploadModal
        isOpen={modalIsOpen}
        onClose={() => {
          setModalIsOpen(false);
        }}
        onUpload={handleUpload}
      />
    </>
  );
};

HomePage.getLayout = Layout;

export default HomePage;
