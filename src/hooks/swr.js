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

export const usePosts = (limit) => {
  return useSWR(`/post?limit=${limit}`, { refreshInterval: 10000 });
};

export const useReports = (limit) => {
  return useSWR(`/report?limit=${limit}`, { refreshInterval: 10000 });
};

export const useUsers = () => {
  return useSWR(`/user`);
};

export const useAdmins = () => {
  return useSWR(`/admin`);
};

export const useCountsByCampId = () => {
  return useSWR(`/countsByCampId`);
};

export const useLocations = (campusId) => {
  return useSWR(`/location/campus/${campusId}`);
};

export const useLocation = (locationId) => {
  return useSWR(`/location/${locationId}`);
};

export const useGetPostIssues = (postId) => {
  return useSWR(`/issue/post/${postId}`);
};
