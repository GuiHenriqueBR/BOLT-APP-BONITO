import React, { useRef, useState } from 'react';
import { Upload, X, File } from 'lucide-react';

interface FileUploadProps {
  accept?: string;
  multiple?: boolean;
  maxSize?: number; // MB
  onFilesChange: (files: File[]) => void;
  className?: string;
  label?: string;
}

const FileUpload: React.FC<FileUploadProps> = ({
  accept = 'image/*',
  multiple = false,
  maxSize = 5,
  onFilesChange,
  className = '',
  label = 'Clique para selecionar arquivos'
}) => {
  const [files, setFiles] = useState<File[]>([]);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (selectedFiles: FileList | null) => {
    if (!selectedFiles) return;

    const validFiles: File[] = [];
    const errors: string[] = [];

    Array.from(selectedFiles).forEach(file => {
      if (file.size > maxSize * 1024 * 1024) {
        errors.push(`${file.name} é muito grande (máx: ${maxSize}MB)`);
        return;
      }
      validFiles.push(file);
    });

    if (errors.length > 0) {
      alert(errors.join('\n'));
    }

    const newFiles = multiple ? [...files, ...validFiles] : validFiles;
    setFiles(newFiles);
    onFilesChange(newFiles);
  };

  const removeFile = (index: number) => {
    const newFiles = files.filter((_, i) => i !== index);
    setFiles(newFiles);
    onFilesChange(newFiles);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    handleFileSelect(e.dataTransfer.files);
  };

  return (
    <div className={className}>
      <div
        className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
          dragOver
            ? 'border-primary-500 bg-primary-50'
            : 'border-gray-300 hover:border-gray-400'
        }`}
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
        <p className="text-sm text-gray-600 mb-1">{label}</p>
        <p className="text-xs text-gray-500">
          Ou arraste e solte aqui (máx: {maxSize}MB)
        </p>
        
        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={(e) => handleFileSelect(e.target.files)}
          className="hidden"
        />
      </div>

      {files.length > 0 && (
        <div className="mt-4 space-y-2">
          {files.map((file, index) => (
            <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
              <div className="flex items-center space-x-2">
                <File className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-700">{file.name}</span>
                <span className="text-xs text-gray-500">
                  ({(file.size / 1024 / 1024).toFixed(2)} MB)
                </span>
              </div>
              <button
                onClick={() => removeFile(index)}
                className="text-red-500 hover:text-red-700"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FileUpload;