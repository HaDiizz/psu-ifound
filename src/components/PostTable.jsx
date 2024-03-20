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
  Image,
  Modal,
  ModalContent,
  useDisclosure,
} from "@nextui-org/react";
import { FaChevronDown, FaEye, FaPlus } from "react-icons/fa";
import { useCallback, useMemo, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { capitalize } from "@/utils/capitalize";
import { columns, statusPostOptions } from "@/utils/data";
import moment from "moment";
import { useRouter } from "next/navigation";
import AddPostModal from "./AddPostModal";
import { AiFillEdit } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import { useSession } from "next-auth/react";

const INITIAL_VISIBLE_COLUMNS = [
  "image",
  "name",
  "title",
  "location",
  "status",
  "actions",
  "createdAt",
];

const statusColorMap = {
  notfound: "danger",
  found: "success",
};

export default function PostTable({ campusId, posts }) {
  const { data: session } = useSession();
  const [isOpenAddModal, setIsOpenAddModal] = useState(false);
  const router = useRouter();
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
    column: "name",
    direction: "ascending",
  });

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = useMemo(() => {
    if (visibleColumns === "all") return columns;

    return columns.filter((column) =>
      Array.from(visibleColumns).includes(column.uid)
    );
  }, [visibleColumns]);

  const filteredItems = useMemo(() => {
    let filteredPosts = [...posts];

    if (hasSearchFilter) {
      filteredPosts = filteredPosts.filter((post) =>
        post.user.fullName.toLowerCase().includes(filterValue.toLowerCase())
      );
    }
    if (
      statusFilter !== "all" &&
      Array.from(statusFilter).length !== statusPostOptions.length
    ) {
      filteredPosts = filteredPosts.filter((post) =>
        Array.from(statusFilter).includes(post.status)
      );
    }
    return filteredPosts;
  }, [posts, filterValue, statusFilter]);

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
          <User description={data.user.email} name={data.user.fullName}>
            {data.user.username}
          </User>
        );
      case "location":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">
              {data.location || "-"}
            </p>
            <p className="text-bold text-tiny capitalize text-default-400">
              {data.subLocation || "-"}
            </p>
          </div>
        );
      case "title":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">
              {data.title || "-"}
            </p>
          </div>
        );
      case "status":
        return (
          <Chip
            className="capitalize border-none gap-1 text-default-600"
            color={statusColorMap[data.status]}
            size="sm"
            variant="dot"
          >
            {statusPostOptions.find((option) => option.uid === cellValue).name}
          </Chip>
        );
      case "actions":
        return (
          <div className="relative flex items-center gap-2">
            <Tooltip content="View">
              <span
                className="text-lg text-default-400 cursor-pointer active:opacity-50"
                onClick={() => {
                  router.push(
                    `/${data.campId}/explore/lost/detail/${data._id}`
                  );
                }}
              >
                <FaEye size={20} />
              </span>
            </Tooltip>
            {session &&
              data.user._id.toString() === session.user.id.toString() && (
                <>
                  <Tooltip content="Edit">
                    <span
                      className="text-lg text-default-400 cursor-pointer active:opacity-50"
                      onClick={() => {
                        // router.push(
                        //   `/${data.campId}/explore/lost/detail/${data._id}`
                        // );
                      }}
                    >
                      <AiFillEdit size={20} />
                    </span>
                  </Tooltip>
                  <Tooltip content="Delete" color="danger">
                    <span
                      className="text-lg text-red-500 cursor-pointer active:opacity-50"
                      onClick={() => {
                        // router.push(
                        //   `/${data.campId}/explore/lost/detail/${data._id}`
                        // );
                      }}
                    >
                      <MdDelete size={20} />
                    </span>
                  </Tooltip>
                </>
              )}
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
            placeholder="Search by name..."
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
                {statusPostOptions.map((status) => (
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
            <Button
              color="primary"
              endContent={<FaPlus />}
              onPress={() => setIsOpenAddModal(true)}
            >
              เพิ่มรายการตามหาของหายของคุณ
            </Button>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">
            Total {posts.length} items
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
    posts.length,
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
      <AddPostModal
        isOpen={isOpenAddModal}
        setIsOpen={setIsOpenAddModal}
        campusId={campusId}
      />
      <Table
        fullWidth={true}
        // removeWrapper
        aria-label="post table"
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
    </>
  );
}
