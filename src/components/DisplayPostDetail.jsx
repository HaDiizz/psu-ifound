"use client";
import BackButton from "./BackButton";
import InputComment from "./InputComment";
import CommentCard from "./CommentCard";
import DetailSection from "./DetailSection";
import { usePost } from "@/hooks/swr";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { notFound } from "next/navigation";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { LockKeyhole } from "lucide-react";
import { useRef } from "react";

const DisplayPostDetail = ({ postId, campusId }) => {
  const { data, isLoading } = usePost(postId);
  const { data: session } = useSession();
  const commentRef = useRef(null)

  if (!data && !isLoading) {
    return notFound();
  }
  return (
    <>
      <BackButton />
      {isLoading ? (
        <>
          <div className="pt-7 pb-5">
            <Typography component="div" variant="h2">
              <Skeleton variant="text" />
            </Typography>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 place-items-center">
            <div
              className="md:col-span-5 w-full h-[410px] p-4 bg-slate-200/25 dark:bg-slate-800/50 rounded-xl"
              radius="lg"
            >
              <Skeleton variant="rounded" width="100%" height="100%" />
            </div>
            <div
              className="md:col-span-7 w-full h-[410px] p-5 bg-slate-200/25 dark:bg-slate-800/50 rounded-xl"
              radius="lg"
            >
              <Stack spacing={4}>
                <Typography component="div" variant="h3">
                  <Skeleton variant="text" />
                </Typography>
                <Typography component="div" variant="body">
                  <Skeleton variant="text" />
                </Typography>
                <Typography component="div" variant="body">
                  <Skeleton variant="text" />
                </Typography>
                <Typography component="div" variant="body">
                  <Skeleton variant="text" />
                </Typography>
                <Typography component="div" variant="body">
                  <Skeleton variant="text" />
                </Typography>
                <Typography component="div" variant="body">
                  <Skeleton variant="text" />
                </Typography>
              </Stack>
            </div>
          </div>
        </>
      ) : (
        <>
          <DetailSection post={data} />
          {session ? (
            <InputComment postId={data._id} campusId={campusId} commentRef={commentRef} />
          ) : (
            <div className="pt-7 pb-[3rem]">
              <div className="flex gap-x-3 border dark:border-slate-600 p-3 rounded-lg shadow-md hover:dark:border-slate-500">
                <span>You must be logged in to comment on this post.</span>
                <span>
                  <LockKeyhole />
                </span>
                <Link href={"/login"}>
                  <span className="underline text-indigo-500 pl-3">Login</span>
                </Link>
              </div>
            </div>
          )}
          <div className="grid gap-y-5">
            {data?.comments?.length > 0 ? (
              data?.comments?.map((comment) => (
                <div
                  key={comment._id}
                  className="card border dark:border-slate-600 p-5 rounded-lg shadow-md bg-slate-200/25 dark:bg-slate-800/50 hover:dark:border-slate-500 hover:border-slate-300"
                >
                  <CommentCard
                    comment={comment}
                    postId={data._id}
                    commentId={comment._id}
                    campusId={campusId}
                    commentRef={commentRef}
                  />
                </div>
              ))
            ) : (
              <span>No comment</span>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default DisplayPostDetail;
