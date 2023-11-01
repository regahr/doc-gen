import React, { useState } from 'react';
import { Button } from './button';

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpload: (file: File) => Promise<void>;
}

/**
 * Props for the UploadModal component.
 */
interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpload: (file: File) => Promise<void>;
}

/**
 * A modal component for uploading a docx file.
 * @param isOpen - Whether the modal is open or not.
 * @param onClose - Function to close the modal.
 * @param onUpload - Function to handle the file upload.
 * @returns A JSX element that renders the UploadModal component.
 */
export function UploadModal({
  isOpen,
  onClose,
  onUpload
}: UploadModalProps): JSX.Element {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  /**
   * Handles the file change event and sets the selected file.
   * @param e - The change event.
   */
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (e.target.files) {
      setSelectedFile(e.target.files[0]);
    }
  };

  /**
   * Handles the file upload event and calls the onUpload function.
   */
  const handleUpload = (): void => {
    if (selectedFile) {
      void onUpload(selectedFile);
    }
    onClose();
  };

  return (
    <div
      className={`ui-fixed ui-top-0 ui-left-0 ui-right-0 ui-z-50 ui-w-full ui-p-4 ui-overflow-x-hidden ui-overflow-y-auto md:ui-inset-0 ui-h-[calc(100%-1rem)] ui-max-h-full ${
        isOpen ? 'ui-block' : 'ui-hidden'
      }`}
    >
      <div className="ui-relative ui-bg-white ui-w-96 ui-p-6 ui-mx-auto ui-mt-20 ui-rounded-lg ui-shadow">
        <div className="ui-flex ui-justify-between ui-items-center mb-4">
          <h2 className="ui-text-2xl ui-font-bold">Upload a docx</h2>
          <Button
            className="ui-text-gray-500 ui-hover:text-gray-700 !ui-px-3 !ui-py-1"
            onClick={onClose}
          >
            &times;
          </Button>
        </div>
        <input
          accept=".docx"
          className="mb-4"
          onChange={handleFileChange}
          type="file"
        />
        <Button
          className="ui-bg-blue-500 ui-text-white ui-px-4 ui-py-2 ui-rounded-lg ui-hover:bg-blue-600"
          onClick={handleUpload}
        >
          Upload
        </Button>
      </div>
    </div>
  );
}
