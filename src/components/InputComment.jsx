"use client";
import { useState } from "react";
import { Textarea, CircularProgress } from "@nextui-org/react";
import { BsFillSendFill } from "react-icons/bs";
import { createComment } from "@/lib/actions";
import toast from "react-hot-toast";

const InputComment = ({
  postId,
  onReply,
  setOnReply,
  campusId,
  commentRef,
}) => {
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    setIsLoading(true);
    if (!content.trim()) {
      if (setOnReply) return setOnReply(false);
      setIsLoading(false);
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
      if (commentRef && commentRef.current) {
        await new Promise((resolve) => setTimeout(resolve, 2000));
        await commentRef.current?.scrollIntoView({ behavior: "smooth" });
      }
      toast.success(`${result?.message}`);
    }

    if (result?.error) {
      toast.error(`${result?.message}`);
    }
    if (setOnReply) return setOnReply(false);
    setContent("");
    setIsLoading(false);
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
      {isLoading ? (
        <CircularProgress aria-label="Loading..." />
      ) : (
        <BsFillSendFill
          className="pt-3 cursor-pointer"
          size={30}
          onClick={handleSubmit}
        />
      )}
    </div>
  );
};

export default InputComment;
