import React from 'react';
import { useRouter } from 'next/router';
import useSWRImmutable from 'swr/immutable';
import { FloatingBackButton, LoadingSpinner, PdfViewer } from 'ui';
import type { NextPageLayout } from '../_app';

/**
 * Fetches a Blob object of a document file from the server.
 * @param fileId - The ID of the document file to fetch.
 * @returns A Promise that resolves with a Blob object of the fetched document file.
 */
const fetcher = async (fileId: string): Promise<Blob> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/document/download/${fileId}`
  );
  return res.blob();
};

const Preview: NextPageLayout = () => {
  const router = useRouter();
  const fileId = router.query['file-id'];

  const { data, isLoading } = useSWRImmutable<Blob, boolean>(
    fileId ? fileId : null,
    fileId ? fetcher : null
  );

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      {!data || isLoading ? <LoadingSpinner /> : <PdfViewer blob={data} />}
      <FloatingBackButton
        onClick={() => {
          router.back();
        }}
      />
    </div>
  );
};

export default Preview;
