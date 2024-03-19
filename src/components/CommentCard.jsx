"use client";
import { useState } from "react";
import { User } from "@nextui-org/react";
import { FaReply } from "react-icons/fa";
import moment from "moment";
import InputComment from "./InputComment";

const CommentCard = () => {
  const [isReply, setIsReply] = useState(false);
  return (
    <>
      <div className="flex justify-between border-b-2 dark:border-slate-600 pb-3 mb-3">
        <div>
          <User description={"milo@gmail.com"} name={"Chatatorn Roardpasa"}>
            Milozaza
          </User>
        </div>
        <div className="flex flex-col">
          <p className="text-bold text-small capitalize">
            {moment("2024-03-12T13:35:22.425Z").fromNow()}
          </p>
          <p className="text-bold text-tiny capitalize text-default-400">
            {moment("2024-03-12T13:35:22.425Z").format("llll")}
          </p>
        </div>
      </div>
      <div className="border-b-2 dark:border-slate-600 pb-3 mb-3">
        <span>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Molestias
          vel laborum eius excepturi provident dolorem quasi earum magnam quos
          explicabo rerum optio recusandae, enim exercitationem. Possimus ullam
          inventore quibusdam maxime!
        </span>
      </div>
      <div
        className="flex items-center gap-x-3 cursor-pointer text-sm"
        onClick={() => setIsReply((prev) => !prev)}
      >
        <span>
          <FaReply />
        </span>
        <span>Reply</span>
      </div>
      <div className="pl-[3rem]">
        {isReply && <InputComment isReply={isReply} setIsReply={setIsReply} />}
      </div>
    </>
  );
};

export default CommentCard;
