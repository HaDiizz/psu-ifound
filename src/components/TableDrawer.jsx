"use client";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import { styled } from "@mui/material/styles";
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
  Image,
  Modal,
  ModalContent,
  useDisclosure,
} from "@nextui-org/react";
import { IoIosCloseCircle } from "react-icons/io";
import { FaChevronDown, FaEye } from "react-icons/fa";
import { MdMyLocation } from "react-icons/md";
import { useCallback, useMemo, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { capitalize } from "@/utils/capitalize";
import { columns, statusReportOptions, statusReportColorMap } from "@/utils/data";
import moment from "moment";

const INITIAL_VISIBLE_COLUMNS = [
  "image",
  "name",
  "title",
  "location",
  "status",
  "actions",
  "createdAt",
];

export default function TableDrawer({
  open,
  setOpen,
  flyTo,
  reports,
  handleOpenDetailModal,
}) {
  const [previewImage, setPreviewImage] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
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
    if (visibleColumns === "all") return columns;

    return columns.filter((column) =>
      Array.from(visibleColumns).includes(column.uid)
    );
  }, [visibleColumns]);

  const filteredItems = useMemo(() => {
    let filteredReports = [...reports];

    if (hasSearchFilter) {
      filteredReports = filteredReports.filter(
        (report) =>
          report.user.fullName
            .toLowerCase()
            .includes(filterValue.toLowerCase()) ||
          report.user.username
            .toLowerCase()
            .includes(filterValue.toLowerCase()) ||
          report.user.email.toLowerCase().includes(filterValue.toLowerCase()) ||
          report.title.toLowerCase().includes(filterValue.toLowerCase()) ||
          report.detail.toLowerCase().includes(filterValue.toLowerCase()) ||
          report.location.toLowerCase().includes(filterValue.toLowerCase()) ||
          report.subLocation.toLowerCase().includes(filterValue.toLowerCase())
      );
    }
    if (
      statusFilter !== "all" &&
      Array.from(statusFilter).length !== statusReportOptions.length
    ) {
      filteredReports = filteredReports.filter((report) =>
        Array.from(statusFilter).includes(report.status)
      );
    }
    return filteredReports;
  }, [reports, filterValue, statusFilter]);

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
    await setOpen(false);
    await onOpen();
    await setPreviewImage(url);
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
      case "image":
        return (
          <div
            onClick={() => handlePreviewImage(data.image.url)}
            className="flex justify-center items-center overflow-hidden rounded-lg cursor-pointer"
            style={{ width: "80px", height: "90px" }}
          >
            <Image
              referrerPolicy="no-referrer"
              className="object-cover w-full h-full rounded-md"
              width={100}
              height={100}
              src={data.image.url}
              alt="thumbnail"
              loading="lazy"
            />
          </div>
        );
      case "name":
        return (
          <User
            // avatarProps={{ radius: "lg", src: data.user.picture }}
            description={data.user.email}
            name={data.user.fullName}
          >
            {data.user.username}
          </User>
        );
      case "location":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">{data.location}</p>
            <p className="text-bold text-tiny capitalize text-default-400">
              {data.subLocation}
            </p>
          </div>
        );
      case "title":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">{data.title}</p>
          </div>
        );
      case "status":
        return (
          <Chip
            className="capitalize"
            color={statusReportColorMap[data.status]}
            size="sm"
            variant="flat"
          >
            {cellValue}
          </Chip>
        );
      case "actions":
        return (
          <div className="relative flex items-center gap-2">
            <Tooltip content="Locate">
              <span className="text-lg text-orange-400 cursor-pointer active:opacity-50">
                <MdMyLocation
                  size={20}
                  onClick={() => flyTo(data.lat, data.lng)}
                />
              </span>
            </Tooltip>
            <Tooltip content="Detail">
              <span
                className="text-lg text-violet-400 cursor-pointer active:opacity-50"
                onClick={() => {
                  setOpen(false);
                  handleOpenDetailModal(data._id, data.lat, data.lng);
                }}
              >
                <FaEye size={20} />
              </span>
            </Tooltip>
          </div>
        );
      default:
        return cellValue;
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
        <div className="flex justify-between gap-3 items-end">
          <Input
            isClearable
            className="w-full sm:max-w-[44%]"
            placeholder="Search"
            startContent={<CiSearch />}
            value={filterValue}
            onClear={() => onClear()}
            onValueChange={onSearchChange}
          />
          <div className="flex gap-3">
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
                {columns.map((column) => (
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
            Total {reports.length} items
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
    reports.length,
    onSearchChange,
    hasSearchFilter,
  ]);

  const bottomContent = useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-between items-center">
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

  const DrawerList = (
    <Box
      sx={{
        height: 250,
      }}
    >
      <div className="grid gap-y-9 p-3">
        <Table
          removeWrapper
          aria-label="location table"
          className="dark:text-white"
          isHeaderSticky
          bottomContent={bottomContent}
          bottomContentPlacement="outside"
          classNames={{
            wrapper: "max-h-[382px]",
          }}
          // selectedKeys={selectedKeys}
          // selectionMode="multiple"
          sortDescriptor={sortDescriptor}
          topContent={topContent}
          topContentPlacement="outside"
          // onSelectionChange={setSelectedKeys}
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
      </div>
    </Box>
  );

  const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: theme.spacing(0, 3),
    ...theme.mixins.toolbar,
  }));

  return (
    <>
      <Modal
        placement="center"
        hideCloseButton
        backdrop="opaque"
        isOpen={isOpen}
        onClose={async () => {
          await onClose();
          await setOpen(true);
        }}
        classNames={{
          backdrop:
            "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20",
        }}
      >
        <ModalContent>
          <>
            <Image
              referrerPolicy="no-referrer"
              className="block w-full h-full"
              showSkeleton
              src={previewImage}
              width="auto"
              height="auto"
              alt="thumbnail"
              loading="lazy"
            />
          </>
        </ModalContent>
      </Modal>
      <Drawer
        variant="persistent"
        hideBackdrop={true}
        anchor={"bottom"}
        open={open}
      >
        <DrawerHeader>
          <div className="dark:text-white font-semibold text-2xl">List</div>
          <Button
            isIconOnly
            color="danger"
            aria-label="Close"
            onClick={() => setOpen(false)}
          >
            <IoIosCloseCircle size={25} />
          </Button>
        </DrawerHeader>
        {DrawerList}
      </Drawer>
    </>
  );
}
