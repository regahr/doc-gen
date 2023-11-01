import { Viewer, Worker } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import { useMemo } from 'react';

/**
 * Renders a PDF viewer component.
 * @param blob - The blob of the PDF file to display.
 * @returns A JSX Element representing PDF viewer component.
 */
export function PdfViewer({ blob }: { blob: Blob }): JSX.Element {
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  const blobUrl = useMemo(() => URL.createObjectURL(blob), [blob]);

  return (
    <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
      <Viewer fileUrl={blobUrl} plugins={[defaultLayoutPluginInstance]} />
    </Worker>
  );
}
