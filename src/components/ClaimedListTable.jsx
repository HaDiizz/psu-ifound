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
  Modal,
  ModalContent,
  useDisclosure,
} from "@nextui-org/react";
import {
  FaCheckCircle,
  FaChevronDown,
  FaEye,
  FaTimesCircle,
} from "react-icons/fa";
import { useCallback, useMemo, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { capitalize } from "@/utils/capitalize";
import {
  reportColumns,
  statusReportOptions,
  statusReportColorMap,
} from "@/utils/data";
import moment from "moment";
import Image from "next/image";
import { campusData } from "@/utils/constants";
import DetailModal from "./DetailModal";
import { useSession } from "next-auth/react";

const INITIAL_VISIBLE_COLUMNS = [
  "image",
  "name",
  "title",
  "location",
  "status",
  "actions",
  "createdAt",
  "owner",
];

export default function ClaimedListTable({ claimedList }) {
  const { data: session } = useSession();
  const [previewImage, setPreviewImage] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [itemId, setItemId] = useState("");
  const [isOpenDetailModal, setIsOpenDetailModal] = useState(false);
  const [page, setPage] = useState(1);
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
    if (visibleColumns === "all") return reportColumns;

    return reportColumns.filter((column) =>
      Array.from(visibleColumns).includes(column.uid)
    );
  }, [visibleColumns]);

  const filteredItems = useMemo(() => {
    let filteredReports = [...claimedList];

    if (hasSearchFilter) {
      filteredReports = filteredReports.filter(
        (item) =>
          item.report.user.fullName
            .toLowerCase()
            .includes(filterValue.toLowerCase()) ||
          item.report.user.username
            .toLowerCase()
            .includes(filterValue.toLowerCase()) ||
          item.report.user.email
            .toLowerCase()
            .includes(filterValue.toLowerCase()) ||
          item.report.title.toLowerCase().includes(filterValue.toLowerCase()) ||
          campusData
            .find((campus) => campus.campId === item.report.campId)
            .campNameEng.split("Prince of Songkla University ")[1]
            .toLowerCase()
            .includes(filterValue.toLowerCase()) ||
          item.report.detail
            .toLowerCase()
            .includes(filterValue.toLowerCase()) ||
          item.report.location
            .toLowerCase()
            .includes(filterValue.toLowerCase()) ||
          item.report.subLocation
            .toLowerCase()
            .includes(filterValue.toLowerCase())
      );
    }
    if (
      statusFilter !== "all" &&
      Array.from(statusFilter).length !== statusReportOptions.length
    ) {
      filteredReports = filteredReports.filter((item) =>
        Array.from(statusFilter).includes(item.report.status)
      );
    }
    return filteredReports;
  }, [claimedList, filterValue, statusFilter]);

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

  const handlePreviewImage = async (url) => {
    await onOpen();
    await setPreviewImage(url);
  };

  const renderCell = useCallback((data, columnKey) => {
    const cellValue = data.report[columnKey];

    switch (columnKey) {
      case "createdAt":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">
              {moment(data.report.createdAt).fromNow()}
            </p>
            <p className="text-bold text-tiny capitalize text-default-400">
              {moment(data.report.createdAt).format("llll")}
            </p>
          </div>
        );
      case "updatedAt":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">
              {moment(data.report.updatedAt).fromNow()}
            </p>
            <p className="text-bold text-tiny capitalize text-default-400">
              {moment(data.report.updatedAt).format("llll")}
            </p>
          </div>
        );
      case "image":
        return (
          <div
            onClick={() => handlePreviewImage(data.report.image.url)}
            className="flex justify-center items-center overflow-hidden rounded-lg cursor-pointer"
            style={{ width: "80px", height: "90px" }}
          >
            <Image
              referrerPolicy="no-referrer"
              className="object-cover w-full h-full rounded-md"
              width={100}
              height={100}
              src={data.report.image.url}
              alt="thumbnail"
            />
          </div>
        );
      case "name":
        return (
          <User
            description={data.report.user.email}
            name={data.report.user.fullName}
          >
            {data.report.user.username}
          </User>
        );
      case "location":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">
              {data.report.location || "-"}
            </p>
            <p className="text-bold text-tiny capitalize text-default-400">
              {data.report.subLocation || "-"}
            </p>
          </div>
        );
      case "title":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">
              {data.report.title || "-"}
            </p>
          </div>
        );
      case "campus":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">
              {campusData
                .find((campus) => campus.campId === data.report.campId)
                .campNameEng.split("Prince of Songkla University ")[1] || "-"}
            </p>
          </div>
        );
      case "status":
        return (
          <Chip
            className="capitalize border-none gap-1 text-white"
            color={statusReportColorMap[data.report.status]}
            size="sm"
          >
            {
              statusReportOptions.find((option) => option.uid === cellValue)
                .name
            }
          </Chip>
        );
      case "owner":
        return (
          <div className="flex flex-col gap-y-2">
            {data.report.owner ? (
              <>
                <div className="flex flex-col gap-y-1">
                  <p className="text-bold text-small capitalize">
                    {data?.report?.owner?.fullName.length > 20
                      ? `${data?.report?.owner?.fullName.slice(0, 20)}...`
                      : data?.report?.owner?.fullName || "-"}
                  </p>
                  <p className="text-bold text-tiny text-default-400">
                    (
                    {data?.report?.owner?.email.length > 20
                      ? `${data?.report?.owner?.email.slice(0, 20)}...`
                      : data?.report?.owner?.email || "-"}
                    )
                  </p>
                </div>
                <Chip
                  className={`capitalize border-none gap-1 text-bold text-[10px] ${
                    data.report.owner._id === session.user._id
                      ? "text-green-500 bg-green-100"
                      : "text-red-500 bg-red-100"
                  }`}
                  size="sm"
                  startContent={
                    data.report.owner._id === session.user._id ? (
                      <FaCheckCircle size={18} />
                    ) : (
                      <FaTimesCircle size={18} />
                    )
                  }
                >
                  {data.report.owner._id === session.user._id
                    ? "Claim success"
                    : "Claim fail"}
                </Chip>
              </>
            ) : (
              "-"
            )}
          </div>
        );
      case "actions":
        return (
          <div className="relative flex items-center gap-2">
            <Tooltip content="View">
              <Button
                variant="ghost"
                onClick={() => {
                  setItemId(data.report._id);
                  setIsOpenDetailModal(true);
                }}
                isIconOnly
                className="text-lg text-default-400 cursor-pointer active:opacity-50"
              >
                <FaEye size={20} />
              </Button>
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
                {statusReportOptions.map((status) => (
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
                {reportColumns.map((column) => (
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
            Total {claimedList.length} items
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
    claimedList.length,
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
      {itemId && (
        <DetailModal
          isOpen={isOpenDetailModal}
          onClose={() => setIsOpenDetailModal(false)}
          itemId={itemId}
        />
      )}
      <Modal
        placement="center"
        hideCloseButton
        backdrop="opaque"
        isOpen={isOpen}
        onClose={async () => {
          await onClose();
        }}
        classNames={{
          backdrop:
            "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20",
        }}
      >
        <ModalContent className="bg-transparent">
          <>
            {previewImage && (
              <Image
                referrerPolicy="no-referrer"
                className="block w-full h-full"
                src={previewImage}
                width={100}
                height={100}
                alt="thumbnail"
                unoptimized
              />
            )}
          </>
        </ModalContent>
      </Modal>
      <Table
        fullWidth={true}
        aria-label="claimed list table"
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
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody emptyContent={"No data found"} items={sortedItems}>
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
