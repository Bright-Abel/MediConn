'use client';
import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import Image from 'next/image';
import { convertFileToUrl } from '@/lib/utils';
import clsx from 'clsx';

interface FileUploadProperties {
  files: File[] | undefined;
  onChange: (files: File[]) => void;
  className?: string;
  label?: string;
}

const FileUploader: React.FC<FileUploadProperties> = ({
  files,
  onChange,
  className,
  label,
}) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    onChange(acceptedFiles);
  }, []);
  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()} className="file-upload">
      <input {...getInputProps()} />
      {files && files?.length > 0 ? (
        <Image
          src={convertFileToUrl(files[0])}
          alt="uploaded_image"
          width={1000}
          height={1000}
          className="max-h-[400px] overflow-hidden object-cover"
        />
      ) : (
        <>
          <Image
            src="/assets/icons/upload.svg"
            alt="upload_svg"
            height={40}
            width={40}
          />
          <div className="file-upload-label">
            <p className="text-14-regular text-white">
              <span className={clsx(className ?? 'text-[#000443]')}>
                Click to upload
              </span>{' '}
              or drag and drop
            </p>
            <p className="text-white">
              {label ?? 'SVG, PNG, JPG or Gif (max 800x400)'}
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default FileUploader;
