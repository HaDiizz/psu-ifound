"use client";
import { useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { ArrowUpFromLine, X } from "lucide-react";
import Image from "next/image";

const UploadImage = ({ file, setFile, register, errors, defaultImage }) => {
  useEffect(() => {
    if (defaultImage) {
      setFile((prev) => [
        ...prev,
        {
          preview: defaultImage.url,
          name: defaultImage.public_id,
          isEdit: true,
        },
      ]);
    }
  }, [defaultImage, setFile]);

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
      <div className="relative flex justify-center">
        {file?.length > 0 && (
          <button
            type="button"
            className="w-7 h-7 rounded-full flex justify-center items-center absolute right-[2px] -top-2 bg-red-500 transition-color hover:scale-125 delay-150 duration-100"
            onClick={() => removeFile(file[0].name)}
          >
            <X className="w-5 h-5 text-white rounded-full bg-red-500 fill-red-500 hover:fill-red-600 transition-colors" />
          </button>
        )}
        <div
          {...getRootProps({
            className:
              "border border-neutral-200 rounded-md cursor-pointer dark:hover:bg-slate-800 hover:bg-slate-100 flex justify-center items-center overflow-hidden",
          })}
          style={{ width: "200px", height: "210px" }}
        >
          {file?.length > 0 ? (
            <Image
              src={file[0].preview}
              alt={file[0].name}
              width={100}
              height={100}
              onLoad={() => {
                URL.revokeObjectURL(file[0].preview);
              }}
              className="h-full w-full object-cover rounded-md"
              priority
              unoptimized
            />
          ) : (
            <>
              <input
                {...getInputProps()}
                {...register("image", { value: file })}
                value={file}
              />
              <div className="flex flex-col items-center justify-center gap-4 text-center dark:text-white text-sm pl-10 pr-10 pt-5 pb-5 ">
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
    </div>
  );
};

export default UploadImage;
