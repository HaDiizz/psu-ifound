"use client";
import useSWR from "swr";

export const usePost = (postId) => {
  return useSWR(`/post/${postId}`, { refreshInterval: 1000 });
};

export const usePostsMe = () => {
  return useSWR("/post/me", { refreshInterval: 3000 });
};

export const useReportsMe = () => {
  return useSWR("/report/me", { refreshInterval: 3000 });
};
