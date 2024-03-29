"use client";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Chip,
  Spinner,
} from "@nextui-org/react";
import styles from "../charts/chart.module.css";
import { usePosts, useReports } from "@/hooks/swr";
import Image from "next/image";
import moment from "moment";
import { campusData } from "@/utils/constants";
import {
  statusPostColorMap,
  statusPostOptions,
  statusReportColorMap,
  statusReportOptions,
} from "@/utils/data";
import { useEffect, useState } from "react";

export default function LatestTable() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const { data: postsData } = usePosts(5);
  const { data: reportsData } = useReports(5);

  useEffect(() => {
    if (postsData?.posts && reportsData?.reports) {
      const combinedData = [
        ...(postsData?.posts || []),
        ...(reportsData?.reports || []),
      ];
      combinedData.sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
      setData(combinedData);
    }
    setIsLoading(false);
  }, [postsData?.posts, reportsData?.reports]);
  return (
    <div className={styles.container}>
      <div className={styles.title_wrapper}>
        <span className={styles.title}>Latest Found & Lost</span>
      </div>
      {isLoading ? (
        <div className="flex justify-center items-center h-full">
          <Spinner label="Loading..." />
        </div>
      ) : (
        <Table
          fullWidth={true}
          aria-label="latest found and service table"
          isHeaderSticky
          classNames={{
            wrapper: "max-h-[382px]",
          }}
        >
          <TableHeader>
            <TableColumn>USER</TableColumn>
            <TableColumn>TITLE</TableColumn>
            <TableColumn>STATUS</TableColumn>
            <TableColumn>CAMPUS</TableColumn>
            <TableColumn>Created At</TableColumn>
          </TableHeader>
          <TableBody
            emptyContent={"No data found"}
            loadingContent={<Spinner color="white" />}
            isLoading={isLoading}
          >
            {data?.length > 0 &&
              data?.map((item) => (
                <TableRow key={item._id}>
                  <TableCell>
                    <div className="flex gap-2 items-center">
                      <Image
                        className="small-avatar"
                        referrerPolicy="no-referrer"
                        src={`${item.user.picture}`}
                        width={30}
                        height={30}
                        alt="avatar"
                        priority
                      />
                      <span className="text-tiny">{item.user.username}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-tiny">{item.title}</TableCell>
                  <TableCell className="text-tiny">
                    <Chip
                      className="capitalize border-none gap-1 text-default-600"
                      color={
                        ["found", "notfound"].includes(item.status)
                          ? statusPostColorMap[item.status]
                          : statusReportColorMap[item.status]
                      }
                      size="sm"
                      variant="dot"
                    >
                      {["found", "notfound"].includes(item.status)
                        ? statusPostOptions.find(
                            (option) => option.uid === item.status
                          ).name
                        : statusReportOptions.find(
                            (option) => option.uid === item.status
                          ).name}
                    </Chip>
                  </TableCell>
                  <TableCell className="text-tiny">
                    {campusData
                      .find((campus) => campus.campId === item.campId)
                      .campNameEng.split("Prince of Songkla University ")[1] ||
                      "-"}
                  </TableCell>
                  <TableCell className="text-tiny">
                    {moment(item.createdAt).fromNow()}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
}
