"use client";
import { useGetPostIssues } from "@/hooks/swr";
import IssueDetailTable from "./IssueDetailTable";

const IssueDetail = ({ postId }) => {
  const { data, mutate, isLoading } = useGetPostIssues(postId);
  return (
    <div className="pt-5">
      <IssueDetailTable
        dataItems={data || []}
        mutate={mutate}
        isLoading={isLoading}
      />
    </div>
  );
};

export default IssueDetail;
