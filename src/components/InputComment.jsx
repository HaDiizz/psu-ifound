"use client";
import React, { useState } from "react";
import { Textarea } from "@nextui-org/react";
import { BsFillSendFill } from "react-icons/bs";
import { createComment } from "@/lib/actions";
import toast from "react-hot-toast";

const InputComment = ({ postId, onReply, setOnReply, campusId }) => {
  const [content, setContent] = useState("");
  const handleSubmit = async () => {
    if (!content.trim()) {
      if (setOnReply) return setOnReply(false);
      return;
    }
    const newComment = {
      postId,
      content,
      reply: onReply && onReply.commentReply,
      tag: onReply && onReply.user._id,
      campusId,
    };
    const result = await createComment(newComment);
    if (result?.success) {
      toast.success(`${result?.message}`);
    }

    if (result?.error) {
      toast.error(`${result?.message}`);
    }
    if (setOnReply) return setOnReply(false);
    setContent("");
  };
  return (
    <div className="pt-7 pb-[3rem] flex items-center gap-x-5">
      <Textarea
        variant="bordered"
        label="Comment"
        labelPlacement="outside"
        placeholder="Enter your comment"
        className="col-span-12 md:col-span-6 mb-6 md:mb-0"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <BsFillSendFill
        className="pt-3 cursor-pointer"
        size={30}
        onClick={handleSubmit}
      />
    </div>
  );
};

export default InputComment;
