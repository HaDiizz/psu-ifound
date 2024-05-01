"use client";
import { useState } from "react";
import {
  User,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";
import { FaReply } from "react-icons/fa";
import moment from "moment";
import InputComment from "./InputComment";
import { FaEllipsisVertical } from "react-icons/fa6";
import { deleteComment } from "@/lib/actions";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";
import ReportIssueModal from "./ReportIssueModal";
import { MdDelete, MdReportProblem } from "react-icons/md";

const CommentCard = ({ postId, comment, commentId, campusId, commentRef }) => {
  const [isOpenReportModal, setIsOpenReportModal] = useState(false);
  const { data: session } = useSession();
  const [onReply, setOnReply] = useState(false);

  const handleReply = () => {
    if (onReply) return setOnReply(false);
    setOnReply({
      ...comment,
      commentReply: { _id: commentId, content: comment.content },
    });
  };

  const handleDelete = async () => {
    const result = await deleteComment({ commentId, campusId, postId });
    if (result?.success) {
      toast.success(`${result?.message}`);
    }

    if (result?.error) {
      toast.error(`${result?.message}`);
    }
  };

  return (
    <>
      <ReportIssueModal
        isOpen={isOpenReportModal}
        setIsOpen={setIsOpenReportModal}
        itemId={commentId}
        category={"COMMENT"}
        campId={campusId}
      />
      <div
        className="flex flex-col md:flex-row justify-between border-b-2 dark:border-slate-600/20 pb-3 mb-3"
        ref={commentRef}
      >
        <div>
          <User description={comment.user.email} name={comment.user.fullName}>
            {comment.user.username}
          </User>
        </div>
        <div className="flex justify-between md:justify-normal gap-x-5">
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">
              {moment(comment.createdAt).fromNow()}
            </p>
            <p className="text-bold text-tiny capitalize text-default-400">
              {moment(comment.createdAt).format("llll")}
            </p>
          </div>
          <div className="relative flex justify-end items-center gap-2">
            <Dropdown className="bg-background border-1 border-default-200">
              <DropdownTrigger>
                <Button isIconOnly radius="full" size="md" variant="light">
                  <FaEllipsisVertical className="text-default-400" />
                </Button>
              </DropdownTrigger>
              <DropdownMenu>
                <DropdownItem
                  startContent={<MdReportProblem size={18} />}
                  onClick={() => setIsOpenReportModal(true)}
                  className="text_report_problem"
                >
                  Report Problem
                </DropdownItem>
                {session && session.user.id === comment.user._id && (
                  <DropdownItem
                    className="text-[#F31260]"
                    description="Permanently delete the comment"
                    color="danger"
                    startContent={<MdDelete size={18} />}
                    onClick={() => handleDelete()}
                  >
                    Delete
                  </DropdownItem>
                )}
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>
      </div>
      <div className="border-b-2 dark:border-slate-600/20 pb-3 mb-3 flex flex-col gap-y-4">
        {comment.tag && (
          <div className="flex gap-x-4 border-l-5 dark:border-slate-600 border-slate-200 text-small pl-4 italic">
            <span className="text-indigo-500 dark:text-indigo-400 cursor-pointer">
              {comment.tag.username}
            </span>
            :<span className="text-default-500">{comment.reply.content}</span>
          </div>
        )}
        <span>{comment.content}</span>
      </div>
      {session && (
        <div
          className="flex items-center gap-x-3 cursor-pointer text-sm"
          onClick={() => handleReply()}
        >
          <span>
            <FaReply />
          </span>
          <span>Reply</span>
        </div>
      )}
      <div className="pl-[3rem]">
        {session && onReply && (
          <InputComment
            postId={postId}
            onReply={onReply}
            setOnReply={setOnReply}
            campusId={campusId}
            commentRef={commentRef}
          />
        )}
      </div>
    </>
  );
};

export default CommentCard;
