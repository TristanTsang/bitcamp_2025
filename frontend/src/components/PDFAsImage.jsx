import { Document, Page, pdfjs } from "react-pdf";
import { useState } from "react";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";

// Configure worker
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

export default function PDFAsImage({ fileUrl }) {
  const [numPages, setNumPages] = useState(null);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <Document
        file={fileUrl}
        onLoadSuccess={({ numPages }) => setNumPages(numPages)}
        loading="Loading PDF..."
      >
        {Array.from({ length: numPages }, (_, i) => (
          <Page
            key={i}
            pageNumber={i + 1}
            renderTextLayer={false}
            renderAnnotationLayer={false}
            width={300} // 👈 controls "image-like" size
          />
        ))}
      </Document>
    </div>
  );
}
