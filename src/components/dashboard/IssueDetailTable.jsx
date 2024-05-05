"use client";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  User,
  Chip,
  Tooltip,
  Button,
  Pagination,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
  Select,
  SelectItem,
  Spinner,
  useDisclosure,
} from "@nextui-org/react";
import { FaChevronDown, FaEye } from "react-icons/fa";
import { useCallback, useMemo, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { capitalize } from "@/utils/capitalize";
import {
  issueColumn,
  issueStatusOptions,
  issueStatusColorMap,
} from "@/utils/data";
import moment from "moment";
import toast from "react-hot-toast";
import Link from "next/link";
import { campusData } from "@/utils/constants";
import { updateIssueStatus } from "@/lib/actions";
import CommentIssueModal from "./CommentIssueModal";

const INITIAL_VISIBLE_COLUMNS = [
  "name",
  "title",
  "type",
  "detail",
  "campus",
  "status",
  "actions",
  "createdAt",
  "updatedAt",
];

export default function IssueDetailTable({
  dataItems,
  mutate,
  isLoading,
  category,
}) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [page, setPage] = useState(1);
  const [commentId, setCommentId] = useState("");
  const [filterValue, setFilterValue] = useState("");
  const [selectedKeys, setSelectedKeys] = useState(new Set([]));
  const [visibleColumns, setVisibleColumns] = useState(
    new Set(INITIAL_VISIBLE_COLUMNS)
  );
  const [statusFilter, setStatusFilter] = useState("all");
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [sortDescriptor, setSortDescriptor] = useState({
    column: "createdAt",
    direction: "descending",
  });

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = useMemo(() => {
    if (visibleColumns === "all") return issueColumn;

    return issueColumn.filter((column) =>
      Array.from(visibleColumns).includes(column.uid)
    );
  }, [visibleColumns]);

  const filteredItems = useMemo(() => {
    let filteredDataItems = isLoading ? [] : [...dataItems];

    if (hasSearchFilter) {
      filteredDataItems = filteredDataItems.filter(
        (element) =>
          element.reportedBy.fullName
            .toLowerCase()
            .includes(filterValue.toLowerCase()) ||
          element.reportedBy.username
            .toLowerCase()
            .includes(filterValue.toLowerCase()) ||
          element.reportedBy.email
            .toLowerCase()
            .includes(filterValue.toLowerCase()) ||
          element.title.toLowerCase().includes(filterValue.toLowerCase()) ||
          campusData
            .find((campus) => campus.campId === element.campId)
            .campNameEng.split("Prince of Songkla University ")[1]
            .toLowerCase()
            .includes(filterValue.toLowerCase()) ||
          element.detail.toLowerCase().includes(filterValue.toLowerCase())
      );
    }
    if (
      statusFilter !== "all" &&
      Array.from(statusFilter).length !== issueStatusOptions.length
    ) {
      filteredDataItems = filteredDataItems.filter((element) =>
        Array.from(statusFilter).includes(element.status)
      );
    }
    return filteredDataItems;
  }, [dataItems, filterValue, statusFilter]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = useMemo(() => {
    return [...items].sort((a, b) => {
      const first = a[sortDescriptor.column];
      const second = b[sortDescriptor.column];
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  const handleUpdateIssueStatus = async (issueId, status) => {
    const result = await updateIssueStatus({ issueId, status });
    if (result?.success) {
      mutate();
      toast.success(`${result?.message}`);
      return;
    }

    if (result?.error) {
      toast.error(`${result?.message}`);
      return;
    }
  };

  const renderCell = useCallback((data, columnKey) => {
    const cellValue = data[columnKey];

    switch (columnKey) {
      case "createdAt":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">
              {moment(data.createdAt).fromNow()}
            </p>
            <p className="text-bold text-tiny capitalize text-default-400">
              {moment(data.createdAt).format("llll")}
            </p>
          </div>
        );
      case "updatedAt":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">
              {moment(data.updatedAt).fromNow()}
            </p>
            <p className="text-bold text-tiny capitalize text-default-400">
              {moment(data.updatedAt).format("llll")}
            </p>
          </div>
        );
      case "name":
        return (
          <User
            description={data.reportedBy.email}
            name={data.reportedBy.fullName}
          >
            {data.reportedBy.username}
          </User>
        );
      case "title":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">
              {data.title || "-"}
            </p>
          </div>
        );
      case "campus":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">
              {campusData
                .find((campus) => campus?.campId === data?.campId)
                .campNameEng.split("Prince of Songkla University ")[1] || "-"}
            </p>
          </div>
        );
      case "status":
        return (
          <Select
            aria-labelledby="issue status selection"
            classNames={{
              trigger: "border-[0.4px]",
            }}
            disallowEmptySelection={true}
            fullWidth={true}
            selectedKeys={[data.status]}
            onSelectionChange={(e) => {
              handleUpdateIssueStatus(data._id, e.currentKey);
            }}
            variant="bordered"
            renderValue={(items) => {
              return items.map((item) => (
                <Chip
                  key={item.key}
                  className="capitalize border-none gap-1"
                  color={issueStatusColorMap[data.status]}
                  size="sm"
                  variant="dot"
                >
                  {
                    issueStatusOptions.find(
                      (option) => option.uid === cellValue
                    ).name
                  }
                </Chip>
              ));
            }}
          >
            <SelectItem key="PENDING" textValue="PENDING">
              <Chip
                className="capitalize border-none gap-1"
                color={"warning"}
                size="sm"
                variant="dot"
              >
                PENDING
              </Chip>
            </SelectItem>
            <SelectItem key="IN_PROGRESS" textValue="IN_PROGRESS">
              <Chip
                className="capitalize border-none gap-1"
                color={"primary"}
                size="sm"
                variant="dot"
              >
                IN PROGRESS
              </Chip>
            </SelectItem>
            <SelectItem key="RESOLVED" textValue="RESOLVED">
              <Chip
                className="capitalize border-none gap-1"
                color={"success"}
                size="sm"
                variant="dot"
              >
                RESOLVED
              </Chip>
            </SelectItem>
            <SelectItem key="REJECTED" textValue="REJECTED">
              <Chip
                className="capitalize border-none gap-1"
                color={"danger"}
                size="sm"
                variant="dot"
              >
                REJECTED
              </Chip>
            </SelectItem>
          </Select>
        );
      case "actions":
        return (
          <div className="relative flex items-center gap-2">
            <Tooltip content="View">
              {data.category === "POST" ? (
                <Link
                  className="text-lg text-default-400 cursor-pointer active:opacity-50"
                  href={`/${data.campId}/explore/lost/edit/${data.itemId}`}
                >
                  <FaEye size={20} />
                </Link>
              ) : data.category === "REPORT" ? (
                <Link
                  className="text-lg text-default-400 cursor-pointer active:opacity-50"
                  href={`/${data.campId}/explore/found/edit/${data.itemId}`}
                >
                  <FaEye size={20} />
                </Link>
              ) : (
                <Button
                  isIconOnly
                  color="warning"
                  className="text-lg cursor-pointer active:opacity-50 text-white"
                  onPress={() => {
                    setCommentId(data.itemId);
                    onOpen();
                  }}
                >
                  <FaEye size={20} />
                </Button>
              )}
            </Tooltip>
          </div>
        );
      default:
        return cellValue || "-";
    }
  }, []);

  const onNextPage = useCallback(() => {
    if (page < pages) {
      setPage(page + 1);
    }
  }, [page, pages]);

  const onPreviousPage = useCallback(() => {
    if (page > 1) {
      setPage(page - 1);
    }
  }, [page]);

  const onRowsPerPageChange = useCallback((e) => {
    setRowsPerPage(Number(e.target.value));
    setPage(1);
  }, []);

  const onSearchChange = useCallback((value) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);

  const onClear = useCallback(() => {
    setFilterValue("");
    setPage(1);
  }, []);

  const topContent = useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between gap-3 items-end options_top_table">
          <Input
            isClearable
            className="w-full sm:max-w-[44%]"
            placeholder="Search"
            startContent={<CiSearch />}
            value={filterValue}
            onClear={() => onClear()}
            onValueChange={onSearchChange}
          />
          <div className="flex gap-3 filter_right">
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
                selectedKeys={statusFilter}
                selectionMode="multiple"
                onSelectionChange={setStatusFilter}
              >
                {issueStatusOptions.map((status) => (
                  <DropdownItem key={status.uid} className="capitalize">
                    {capitalize(status.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button
                  endContent={<FaChevronDown className="text-small" />}
                  variant="flat"
                >
                  Columns
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={visibleColumns}
                selectionMode="multiple"
                onSelectionChange={setVisibleColumns}
              >
                {issueColumn.map((column) => (
                  <DropdownItem key={column.uid} className="capitalize">
                    {capitalize(column.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">
            Total {dataItems.length} items
          </span>
          <label className="flex items-center text-default-400 text-small">
            Rows per page:
            <select
              className="bg-transparent outline-none text-default-400 text-small"
              onChange={onRowsPerPageChange}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
            </select>
          </label>
        </div>
      </div>
    );
  }, [
    filterValue,
    statusFilter,
    visibleColumns,
    onRowsPerPageChange,
    dataItems.length,
    onSearchChange,
    hasSearchFilter,
  ]);

  const bottomContent = useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-between items-center z-30">
        <span className="w-[30%] text-small text-default-400">
          {selectedKeys === "all"
            ? "All items selected"
            : `${selectedKeys.size} of ${filteredItems.length} selected`}
        </span>
        <Pagination
          isCompact
          showControls
          showShadow
          color="primary"
          page={page}
          total={pages}
          onChange={setPage}
        />
        <div className="hidden sm:flex w-[30%] justify-end gap-2">
          <Button
            isDisabled={pages === 1}
            size="sm"
            variant="flat"
            onPress={onPreviousPage}
          >
            Previous
          </Button>
          <Button
            isDisabled={pages === 1}
            size="sm"
            variant="flat"
            onPress={onNextPage}
          >
            Next
          </Button>
        </div>
      </div>
    );
  }, [selectedKeys, items.length, page, pages, hasSearchFilter]);

  return (
    <>
      {category === "comment" && commentId && (
        <CommentIssueModal
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          commentId={commentId}
          mutate={mutate}
        />
      )}
      <Table
        fullWidth={true}
        aria-label="issue table"
        className="dark:text-white"
        isHeaderSticky
        bottomContent={bottomContent}
        bottomContentPlacement="outside"
        classNames={{
          wrapper: "max-h-[382px]",
        }}
        sortDescriptor={sortDescriptor}
        topContent={topContent}
        topContentPlacement="outside"
        onSortChange={setSortDescriptor}
      >
        <TableHeader columns={headerColumns}>
          {(column) => (
            <TableColumn
              key={column.uid}
              align={column.uid === "actions" ? "center" : "start"}
              allowsSorting={column.sortable}
              width={
                column.uid === "status" ||
                column.uid === "updatedAt" ||
                column.uid === "createdAt"
                  ? 140
                  : 50
              }
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody
          emptyContent={"No data found"}
          items={sortedItems}
          isLoading={isLoading}
          loadingContent={<Spinner label="Loading..." />}
        >
          {(item) => (
            <TableRow key={item._id}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  );
}
