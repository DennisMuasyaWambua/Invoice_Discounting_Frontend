import React, { useState, useRef } from 'react';
import { UploadCloudIcon, FileTextIcon, XIcon, CheckCircleIcon, LoaderIcon } from 'lucide-react';
type UploadedFile = {
  file: File;
  preview?: string;
  status: 'uploading' | 'processing' | 'complete' | 'error';
  ocrData?: {
    invoiceNumber?: string;
    amount?: string;
    date?: string;
  };
};
type FileUploadProps = {
  onFilesChange: (files: UploadedFile[]) => void;
  accept?: string;
  maxFiles?: number;
  className?: string;
};
export function FileUpload({
  onFilesChange,
  accept = '.pdf,.png,.jpg,.jpeg',
  maxFiles = 5,
  className = ''
}: FileUploadProps) {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const simulateOCR = (file: UploadedFile): Promise<UploadedFile> => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({
          ...file,
          status: 'complete',
          ocrData: {
            invoiceNumber: `INV-2024-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`,
            amount: `KES ${(Math.floor(Math.random() * 500000) + 50000).toLocaleString()}`,
            date: new Date().toISOString().split('T')[0]
          }
        });
      }, 2000);
    });
  };
  const processFile = async (file: File) => {
    const uploadedFile: UploadedFile = {
      file,
      status: 'uploading',
      preview: file.type.startsWith('image/') ? URL.createObjectURL(file) : undefined
    };
    setFiles(prev => {
      const newFiles = [...prev, uploadedFile];
      onFilesChange(newFiles);
      return newFiles;
    });
    // Simulate upload
    await new Promise(r => setTimeout(r, 1000));
    setFiles(prev => {
      const newFiles = prev.map(f => f.file === file ? {
        ...f,
        status: 'processing' as const
      } : f);
      onFilesChange(newFiles);
      return newFiles;
    });
    // Simulate OCR
    const processed = await simulateOCR(uploadedFile);
    setFiles(prev => {
      const newFiles = prev.map(f => f.file === file ? processed : f);
      onFilesChange(newFiles);
      return newFiles;
    });
  };
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFiles = Array.from(e.dataTransfer.files);
    const validFiles = droppedFiles.slice(0, maxFiles - files.length);
    validFiles.forEach(processFile);
  };
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      const validFiles = selectedFiles.slice(0, maxFiles - files.length);
      validFiles.forEach(processFile);
    }
  };
  const removeFile = (index: number) => {
    setFiles(prev => {
      const newFiles = prev.filter((_, i) => i !== index);
      onFilesChange(newFiles);
      return newFiles;
    });
  };
  const getStatusIcon = (status: UploadedFile['status']) => {
    switch (status) {
      case 'uploading':
        return <LoaderIcon className="w-4 h-4 animate-spin text-primary-500" />;
      case 'processing':
        return <LoaderIcon className="w-4 h-4 animate-spin text-pending-500" />;
      case 'complete':
        return <CheckCircleIcon className="w-4 h-4 text-success-500" />;
      case 'error':
        return <XIcon className="w-4 h-4 text-red-500" />;
    }
  };
  const getStatusText = (status: UploadedFile['status']) => {
    switch (status) {
      case 'uploading':
        return 'Uploading...';
      case 'processing':
        return 'Running OCR...';
      case 'complete':
        return 'Ready';
      case 'error':
        return 'Error';
    }
  };
  return <div className={className}>
      <div onDragOver={e => {
      e.preventDefault();
      setIsDragging(true);
    }} onDragLeave={() => setIsDragging(false)} onDrop={handleDrop} onClick={() => inputRef.current?.click()} className={`
          relative border-2 border-dashed rounded-xl p-8
          flex flex-col items-center justify-center gap-3
          cursor-pointer transition-all duration-200
          ${isDragging ? 'border-primary-500 bg-primary-50' : 'border-gray-300 hover:border-primary-400 hover:bg-gray-50'}
        `}>
        <input ref={inputRef} type="file" accept={accept} multiple onChange={handleFileSelect} className="hidden" />
        <div className={`
          w-14 h-14 rounded-full flex items-center justify-center
          ${isDragging ? 'bg-primary-100' : 'bg-gray-100'}
          transition-colors duration-200
        `}>
          <UploadCloudIcon className={`w-7 h-7 ${isDragging ? 'text-primary-600' : 'text-gray-400'}`} />
        </div>
        <div className="text-center">
          <p className="text-sm font-medium text-gray-700">
            <span className="text-primary-600">Click to upload</span> or drag
            and drop
          </p>
          <p className="text-xs text-gray-500 mt-1">
            eTIMS invoices (PDF, PNG, JPG) up to 10MB
          </p>
        </div>
      </div>

      {files.length > 0 && <div className="mt-4 space-y-3">
          {files.map((uploadedFile, index) => <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
              {uploadedFile.preview ? <img src={uploadedFile.preview} alt="Preview" className="w-12 h-12 object-cover rounded" /> : <div className="w-12 h-12 bg-gray-200 rounded flex items-center justify-center">
                  <FileTextIcon className="w-6 h-6 text-gray-500" />
                </div>}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {uploadedFile.file.name}
                </p>
                <div className="flex items-center gap-2 mt-1">
                  {getStatusIcon(uploadedFile.status)}
                  <span className="text-xs text-gray-500">
                    {getStatusText(uploadedFile.status)}
                  </span>
                </div>
                {uploadedFile.ocrData && <div className="flex gap-3 mt-2 text-xs text-gray-600">
                    <span>#{uploadedFile.ocrData.invoiceNumber}</span>
                    <span>{uploadedFile.ocrData.amount}</span>
                  </div>}
              </div>
              <button onClick={e => {
          e.stopPropagation();
          removeFile(index);
        }} className="p-1 hover:bg-gray-200 rounded transition-colors" aria-label="Remove file">
                <XIcon className="w-4 h-4 text-gray-500" />
              </button>
            </div>)}
        </div>}
    </div>;
}