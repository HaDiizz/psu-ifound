"use client";
import ModerationStatCard from "@/components/dashboard/ModerationStatCard";
import ModerationCards from "./ModerationCards";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
  Spinner,
} from "@nextui-org/react";
import { CiSearch } from "react-icons/ci";
import { useCallback, useEffect, useMemo, useState } from "react";
import { campusData } from "@/utils/constants";
import { FaChevronDown } from "react-icons/fa";
import { issueFilterOptions } from "@/utils/data";
import { capitalize } from "@/utils/capitalize";

const DisplayModeration = ({ moderationType, data, stats }) => {
  const [filterValue, setFilterValue] = useState("");
  const [filterStatusValue, setFIlterStatusValue] = useState(["non-deleted"]);
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
    setIsLoading(false);
  }, [data]);

  const hasSearchFilter = Boolean(filterValue);

  const filteredItems = useMemo(() => {
    let filteredIssues = [...data];

    if (hasSearchFilter) {
      filteredIssues = filteredIssues.filter((item) => {
        return (
          item?.title?.toLowerCase().includes(filterValue.toLowerCase()) ||
          campusData
            .find((campus) => campus?.campId === item?.campId)
            ?.campNameEng.split("Prince of Songkla University ")[1]
            .toLowerCase()
            .includes(filterValue.toLowerCase()) ||
          item?.owner?.fullName
            .toLowerCase()
            .includes(filterValue.toLowerCase()) ||
          item?.owner?.username
            .toLowerCase()
            .includes(filterValue.toLowerCase()) ||
          item?.owner?.email.toLowerCase().includes(filterValue.toLowerCase())
        );
      });
    }
    if (
      filterStatusValue !== "all" &&
      Array.from(filterStatusValue).length !== issueFilterOptions.length
    ) {
      filteredIssues = filteredIssues.filter((issue) =>
        Array.from(filterStatusValue).includes(issue.status)
      );
    }

    return filteredIssues;
  }, [filterValue, filterStatusValue, data, hasSearchFilter]);

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
      <div className="pt-[4.5rem]">
        <div className="pb-[2.5rem] flex flex-col md:flex-row justify-between gap-4">
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
          <Dropdown>
            <DropdownTrigger className="hidden sm:flex">
              <Button
                endContent={<FaChevronDown className="text-small" />}
                variant="flat"
              >
                Status
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              disallowEmptySelection
              aria-label="Table Columns"
              closeOnSelect={false}
              selectedKeys={filterStatusValue}
              selectionMode="multiple"
              onSelectionChange={setFIlterStatusValue}
            >
              {issueFilterOptions.map((item) => (
                <DropdownItem key={item.uid} className="capitalize">
                  {capitalize(item.name)}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
        </div>
        {isLoading ? (
          <div className="flex justify-center pt-7">
            <Spinner label="Loading..." />
          </div>
        ) : (
          <ModerationCards
            data={filteredItems}
            moderationType={moderationType}
          />
        )}
      </div>
    </>
  );
};

export default DisplayModeration;
