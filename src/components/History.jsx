"use client";
import { useState } from "react";
import { Tabs, Tab, Spinner } from "@nextui-org/react";
import { usePostsMe, useReportsMe } from "@/hooks/swr";
import HistoryTable from "./HistoryTable";

const HistorySection = () => {
  const [selected, setSelected] = useState("lost");
  const { data: posts, isLoading: isPostLoading } = usePostsMe();
  const { data: reports, isLoading: isReportLoading } = useReportsMe();
  return (
    <Tabs
      color="default"
      selectedKey={selected}
      onSelectionChange={setSelected}
      aria-label="Tabs options"
    >
      <Tab key="lost" title="ประกาศหาของหาย">
        {isPostLoading ? (
          <div className="flex justify-center items-center pt-5">
            <Spinner label="Loading..." />
          </div>
        ) : (
          <HistoryTable posts={posts} tableType={selected} />
        )}
      </Tab>
      <Tab key="found" title="ประกาศเจอของหาย">
        {isReportLoading ? (
          <div className="flex justify-center items-center pt-5">
            <Spinner label="Loading..." />
          </div>
        ) : (
          <HistoryTable posts={reports} tableType={selected} />
        )}
      </Tab>
    </Tabs>
  );
};

export default HistorySection;
