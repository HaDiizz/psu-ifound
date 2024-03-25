"use client";
import useSWR from "swr";

export const usePost = (postId) => {
  return useSWR(`/post/${postId}`, { refreshInterval: 1000 });
};
