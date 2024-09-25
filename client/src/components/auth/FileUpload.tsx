import React, { useState, useCallback } from 'react';
import styled from 'styled-components';

// Define types for props and state
type FileUploadProps = {
  onFileUpload: (files: File[]) => void;
  label: string;
  acceptedFormats?: string[];
  maxFileSizeMB?: number;
};

const Container = styled.div`
  border: 2px dashed #ccc;
  padding: 20px;
  text-align: center;
  border-radius: 10px;
  width: 100%;
  max-width: 600px;
  margin: 20px auto;
  background-color: #f9f9f9;
`;

const UploadButton = styled.button`
  margin-top: 15px;
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background-color: #0056b3;
  }
`;

const DragText = styled.p`
  font-size: 18px;
  color: #666;
`;

const FileInput = styled.input`
  display: none;
`;

const FileUpload: React.FC<FileUploadProps> = ({
  onFileUpload,
  label,
  acceptedFormats = ['.jpg', '.png', '.gif', '.tiff', '.bmp', '.pdf'],
  maxFileSizeMB = 100,
}) => {
  const [dragging, setDragging] = useState(false);
  const [files, setFiles] = useState<File[]>([]);

  const handleDragEnter = () => setDragging(true);
  const handleDragLeave = () => setDragging(false);

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(false);

    const droppedFiles = Array.from(e.dataTransfer.files);
    const validFiles = validateFiles(droppedFiles);
    setFiles(validFiles);
    onFileUpload(validFiles);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    const validFiles = validateFiles(selectedFiles);
    setFiles(validFiles);
    onFileUpload(validFiles);
  };

  const validateFiles = (files: File[]) => {
    return files.filter(file => {
      const isValidType = acceptedFormats.includes(
        `.${file.name.split('.').pop()?.toLowerCase()}`
      );
      const isValidSize = file.size <= maxFileSizeMB * 1024 * 1024;

      return isValidType && isValidSize;
    });
  };

  return (
    <Container
      onDragEnter={handleDragEnter}
      onDragOver={e => e.preventDefault()}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      style={{
        borderColor: dragging ? '#007bff' : '#ccc',
        backgroundColor: dragging ? '#e6f7ff' : '#f9f9f9',
      }}
    >
      <DragText>
        {files.length === 0
          ? `Drag and drop your ${label}, or click to select`
          : `${files.length} file(s) selected`}
      </DragText>
      <FileInput
        type="file"
        id="fileUpload"
        accept={acceptedFormats.join(',')}
        multiple
        onChange={handleFileSelect}
      />
      <label htmlFor="fileUpload">
        <UploadButton>Select Files</UploadButton>
      </label>
    </Container>
  );
};

export default FileUpload;
