import { DocusealForm } from '@docuseal/react';
import { useRouter } from 'next/router';
import useSWRImmutable from 'swr/immutable';
import { FloatingBackButton, LoadingSpinner } from 'ui';

interface Payload {
  templateSlug: string;
}

/**
 * Fetches the template slug by file ID.
 * @param fileId - The ID of the file to fetch the template slug for.
 * @returns A Promise that resolves to a Payload object containing the template slug.
 */
const fetcher = async (fileId: string): Promise<Payload> => {
  const templateSlugByName = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/docuseal/templates/slug/byFileId/${fileId}`
  );
  const payload: Payload = {
    templateSlug: ''
  };
  const templateSlug = await templateSlugByName.text();
  payload.templateSlug = templateSlug;
  return payload;
};

export default function SignDoc(): JSX.Element {
  const router = useRouter();
  const fileId = router.query['file-id'];
  const { data } = useSWRImmutable<Payload, boolean>(
    fileId ? fileId : null,
    fileId ? fetcher : null
  );

  if (!data?.templateSlug) {
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        <LoadingSpinner />
      </div>
    );
  }
  if (data.templateSlug === 'No template found') {
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        <h1>Template not found</h1>
        <FloatingBackButton
          onClick={() => {
            router.back();
          }}
        />
      </div>
    );
  }
  return (
    <>
      <DocusealForm src={`https://docuseal.co/d/${data.templateSlug}`} />
      <FloatingBackButton
        onClick={() => {
          router.back();
        }}
      />
    </>
  );
}
