"use client";
import React, { useState } from "react";
import { Textarea } from "@nextui-org/react";
import { BsFillSendFill } from "react-icons/bs";
import { createComment } from "@/lib/actions";

const InputComment = ({ isReply, setIsReply }) => {
  const [content, setContent] = useState("");
  const handleSubmit = async () => {
    if (!content.trim()) {
      if (setIsReply) return setIsReply(false);
      return;
    }
    // const newComment = {
    //   content,
    //   tag: isReply && onReply.user,
    // };
    const result = await createComment({ content, postId: "1" });
  };
  return (
    <div className="pt-7 pb-[3rem] flex items-center gap-x-5">
      <Textarea
        variant="bordered"
        label="Comment"
        labelPlacement="outside"
        placeholder="Enter your comment"
        className="col-span-12 md:col-span-6 mb-6 md:mb-0"
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
