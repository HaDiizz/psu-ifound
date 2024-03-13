"use client";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { ArrowUpFromLine, X, XCircle } from "lucide-react";
import Image from "next/image";

const UploadImage = ({ file, setFile, register, errors }) => {
  const onDrop = useCallback(
    (acceptedFiles) => {
      if (acceptedFiles?.length) {
        setFile(
          acceptedFiles.map((item) =>
            Object.assign(item, { preview: URL.createObjectURL(item) })
          )
        );
      }
    },
    [setFile]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".webp"],
    },
    maxSize: 1024 * 1024 * 2,
    onDrop,
    multiple: false,
  });

  const removeFile = (name) => {
    setFile((item) => item.filter((obj) => obj.name !== name));
  };

  return (
    <div className="flex flex-col gap-y-2">
      <div className="grid">
        <span className="dark:text-[#9c9ca6]">Upload Image</span>
        <span className="text-[#f5126a] text-[0.75rem]">
          {errors.image?.message}
        </span>
      </div>
      <div
        {...getRootProps({
          className:
            "pl-10 pr-10 pt-5 pb-5 border border-neutral-200 rounded-md cursor-pointer dark:hover:bg-slate-800 hover:bg-slate-100",
        })}
      >
        {file.length > 0 ? (
          <div className="relative">
            <Image
              src={file[0].preview}
              alt={file[0].name}
              width={40}
              height={40}
              onLoad={() => {
                URL.revokeObjectURL(file[0].preview);
              }}
              className="h-full w-full object-contain rounded-md"
              priority
            />
            <button
              type="button"
              className="w-7 h-7 rounded-full flex justify-center items-center absolute -top-12 -right-12 bg-red-500 transition-color hover:scale-125 delay-150 duration-100"
              onClick={() => removeFile(file[0].name)}
            >
              <X className="w-5 h-5 text-white rounded-full bg-red-500 fill-red-500 hover:fill-red-600 transition-colors" />
            </button>
          </div>
        ) : (
          <>
            <input
              {...getInputProps()}
              {...register("image", { value: file })}
              value={file}
            />
            <div className="flex flex-col items-center justify-center gap-4 text-center dark:text-white text-sm">
              <ArrowUpFromLine className="w-5 h-5 fill-current" />
              {isDragActive ? (
                <p>Drop the files here ...</p>
              ) : (
                <p>Drag & drop files here, or click to select files</p>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default UploadImage;
