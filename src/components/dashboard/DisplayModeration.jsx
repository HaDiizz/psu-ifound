"use client";
import ModerationStatCard from "@/components/dashboard/ModerationStatCard";
import ModerationCards from "./ModerationCards";
import { Input } from "@nextui-org/react";
import { CiSearch } from "react-icons/ci";
import { useCallback, useState } from "react";

const DisplayModeration = ({ moderationType }) => {
  const [filterValue, setFilterValue] = useState("");

  const onClear = useCallback(() => {
    setFilterValue("");
  }, []);

  const onSearchChange = useCallback((value) => {
    if (value) {
      setFilterValue(value);
    } else {
      setFilterValue("");
    }
  }, []);

  return (
    <>
      <ModerationStatCard
        moderationType={moderationType}
        totalItem={16}
        totalPending={3}
        totalInProgress={2}
        totalResolved={9}
        totalRejected={2}
      />
      <div className="pt-[5.5rem]">
        <div className="pb-[3.5rem]">
          <Input
            isClearable
            className="w-full sm:max-w-[44%]"
            placeholder="Search"
            startContent={<CiSearch />}
            value={filterValue}
            onClear={() => onClear()}
            onValueChange={onSearchChange}
            variant="underlined"
          />
        </div>
        <ModerationCards data={[]} />
      </div>
    </>
  );
};

export default DisplayModeration;
