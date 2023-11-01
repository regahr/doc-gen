import { DocusealBuilder } from '@docuseal/react';
import { useRouter } from 'next/router';
import useSWRImmutable from 'swr/immutable';
import { FloatingBackButton, LoadingSpinner } from 'ui';

/**
 * Fetches a token by fileId from the API.
 * @param fileId - The id of the file to fetch the token for.
 * @returns A Promise that resolves to a string representing the token.
 */
const fetcher = async (fileId: string): Promise<string> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/docuseal/token/byFileId/${fileId}`
  );
  return res.text();
};

export default function EditTemplate(): JSX.Element {
  const router = useRouter();
  const fileId = router.query['file-id'];
  const { data } = useSWRImmutable<string, boolean>(
    fileId ? fileId : null,
    fileId ? fetcher : null
  );

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      {!data ? <LoadingSpinner /> : <DocusealBuilder token={data} />}
      <FloatingBackButton
        onClick={() => {
          router.back();
        }}
      />
    </div>
  );
}
