"use client";
import { useGetPostIssues } from "@/hooks/swr";
import IssueDetailTable from "./IssueDetailTable";

const IssueDetail = ({ itemId, category }) => {
  const { data, mutate, isLoading } = useGetPostIssues(itemId, category);
  return (
    <div className="pt-5">
      <IssueDetailTable
        dataItems={data || []}
        mutate={mutate}
        isLoading={isLoading}
        category={category}
      />
    </div>
  );
};

export default IssueDetail;
