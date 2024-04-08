"use client";
import { database } from "@/lib/firebase";
import { FileJson2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const FileCard = () => {
  const [fileList, setFileList] = useState([]);

  useEffect(() => {
    database.files
      .get()
      .then((files) => {
        const allFiles = [];
        files.docs.forEach((doc) => {
          allFiles.push({ data: doc.data(), docId: doc.id });
        });
        setFileList(allFiles);
      })
      .catch((err) => {
        toast.error("Something went wrong, try again later.");
      });
  }, []);

  return (
    <div className="grid grid-cols-12 pt-[4rem] justify-items-center gap-5 pb-[4rem]">
      {fileList.length > 0 &&
        fileList.map((item) => (
          <Link
            key={item.docId}
            href={`/admin/file/view/${item.docId}`}
            className="col-span-12 md:col-span-4 w-full h-full"
          >
            <div className="card border dark:border-slate-600 rounded-lg shadow-sm hover:dark:border-slate-500 hover:border-slate-300 place-content-center items-center">
              <div className="flex flex-col gap-y-8 justify-center items-center p-10">
                <FileJson2 size={40} />
                <span className="text-small text-default-400">
                  {item.data.campus}
                </span>
              </div>
            </div>
          </Link>
        ))}
    </div>
  );
};

export default FileCard;
