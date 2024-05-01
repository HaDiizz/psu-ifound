"use client";
import ModerationStatCard from "@/components/dashboard/ModerationStatCard";
import ModerationCards from "./ModerationCards";
import { Input, Spinner } from "@nextui-org/react";
import { CiSearch } from "react-icons/ci";
import { useCallback, useEffect, useState } from "react";
import { campusData } from "@/utils/constants";

const DisplayModeration = ({ moderationType, data, stats }) => {
  const [filterValue, setFilterValue] = useState("");
  const [dataFilter, setDataFilter] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [statusValues, setStatusValues] = useState({
    total: 0,
    pending: 0,
    inProgress: 0,
    resolved: 0,
    rejected: 0,
  });

  const onClear = useCallback(() => {
    setFilterValue("");
  }, []);

  useEffect(() => {
    const updatedStatusValues = stats?.reduce(
      (acc, cur) => {
        switch (cur._id) {
          case "PENDING":
            acc.pending = cur.count;
            break;
          case "IN_PROGRESS":
            acc.inProgress = cur.count;
            break;
          case "RESOLVED":
            acc.resolved = cur.count;
            break;
          case "REJECTED":
            acc.rejected = cur.count;
            break;
          case "TOTAL":
            acc.total = cur.count;
            break;
          default:
            break;
        }
        return acc;
      },
      {
        total: 0,
        pending: 0,
        inProgress: 0,
        resolved: 0,
        rejected: 0,
      }
    );

    setStatusValues(updatedStatusValues);
  }, [stats]);

  useEffect(() => {
    setDataFilter(data);
    setIsLoading(false);
  }, [data]);

  useEffect(() => {
    const filterItem = data.filter((item) => {
      return (
        item.title.toLowerCase().includes(filterValue.toLowerCase()) ||
        campusData
          .find((campus) => campus.campId === item.campId)
          .campNameEng.split("Prince of Songkla University ")[1]
          .toLowerCase()
          .includes(filterValue.toLowerCase()) ||
        item.owner.fullName.toLowerCase().includes(filterValue.toLowerCase()) ||
        item.owner.username.toLowerCase().includes(filterValue.toLowerCase()) ||
        item.owner.email.toLowerCase().includes(filterValue.toLowerCase())
      );
    });
    setDataFilter(filterItem);
  }, [filterValue, data]);

  return (
    <>
      <ModerationStatCard
        moderationType={moderationType}
        totalItem={statusValues.total}
        totalPending={statusValues.pending}
        totalInProgress={statusValues.inProgress}
        totalResolved={statusValues.resolved}
        totalRejected={statusValues.rejected}
      />
      <div className="pt-[5.5rem]">
        <div className="pb-[3.5rem]">
          <Input
            isClearable
            className="w-full sm:max-w-[44%]"
            placeholder="Search"
            startContent={<CiSearch />}
            onClear={() => onClear()}
            value={filterValue}
            onValueChange={(input) => setFilterValue(input)}
            variant="underlined"
          />
        </div>
        {isLoading ? (
          <div className="flex justify-center pt-7">
            <Spinner label="Loading..." />
          </div>
        ) : (
          <ModerationCards data={dataFilter} />
        )}
      </div>
    </>
  );
};

export default DisplayModeration;
