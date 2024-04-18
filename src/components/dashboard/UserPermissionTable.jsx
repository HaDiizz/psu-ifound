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
  Select,
  SelectItem,
  Spinner,
} from "@nextui-org/react";
import { FaChevronDown, FaEye } from "react-icons/fa";
import { useCallback, useMemo, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { capitalize } from "@/utils/capitalize";
import {
  userColumns,
  roleUserOptions,
  roleUserColorMap,
  statusUserColorMap,
  statusUserOptions,
} from "@/utils/data";
import moment from "moment";
import { useSession } from "next-auth/react";
import { updateUserRole, updateUserStatus } from "@/lib/actions";
import toast from "react-hot-toast";
import { useUsers } from "@/hooks/swr";
import Image from "next/image";
import RemarkModal from "./RemarkModal";

const INITIAL_VISIBLE_COLUMNS = [
  "picture",
  "name",
  "email",
  "role",
  "status",
  "createdAt",
];

export default function UserPermissionTable() {
  const { data: session } = useSession();
  const { data, isLoading, mutate } = useUsers();
  const [previewImage, setPreviewImage] = useState("");
  const [remark, setRemark] = useState("");
  const [statusUserId, setStatusUserId] = useState("");
  const [isOpenRemarkModal, setIsOpenRemarkModal] = useState(false);
  const [status, setStatus] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [page, setPage] = useState(1);
  const [filterValue, setFilterValue] = useState("");
  const [selectedKeys, setSelectedKeys] = useState(new Set([]));
  const [visibleColumns, setVisibleColumns] = useState(
    new Set(INITIAL_VISIBLE_COLUMNS)
  );
  const [roleFilter, setRoleFilter] = useState("all");
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [sortDescriptor, setSortDescriptor] = useState({
    column: "role",
    direction: "ascending",
  });

  const handleUpdateRole = async (userId, role) => {
    const result = await updateUserRole({ userId, role });
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

  const handleUpdateStatus = async () => {
    if (status === "ACTIVE") {
      setRemark("");
    }
    const result = await updateUserStatus({
      userId: statusUserId,
      status,
      remark,
    });
    setIsOpenRemarkModal(false);
    setRemark("");
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

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = useMemo(() => {
    if (visibleColumns === "all") return userColumns;

    return userColumns.filter((column) =>
      Array.from(visibleColumns).includes(column.uid)
    );
  }, [visibleColumns]);

  const filteredItems = useMemo(() => {
    let filteredUsers = isLoading ? [] : [...data?.users];

    if (hasSearchFilter) {
      filteredUsers = filteredUsers.filter(
        (user) =>
          user.fullName.toLowerCase().includes(filterValue.toLowerCase()) ||
          user.username.toLowerCase().includes(filterValue.toLowerCase()) ||
          user.email.toLowerCase().includes(filterValue.toLowerCase()) ||
          user.role.toLowerCase().includes(filterValue.toLowerCase())
      );
    }
    if (
      roleFilter !== "all" &&
      Array.from(roleFilter).length !== roleUserOptions.length
    ) {
      filteredUsers = filteredUsers.filter((user) =>
        Array.from(roleFilter).includes(user.role)
      );
    }
    return filteredUsers;
  }, [data?.users, filterValue, roleFilter]);

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
      case "picture":
        return (
          <div
            onClick={() => handlePreviewImage(data.picture)}
            className="flex justify-center items-center overflow-hidden rounded-lg cursor-pointer"
            style={{ width: "80px", height: "90px" }}
          >
            <Image
              referrerPolicy="no-referrer"
              className="object-cover w-full h-full rounded-md"
              width={100}
              height={100}
              src={data.picture}
              alt="user profile"
            />
          </div>
        );
      case "name":
        return (
          <User description={data.email} name={data.fullName}>
            {data.username}
          </User>
        );
      case "role":
        if (session.user.id === data._id) {
          return (
            <Chip
              className="capitalize border-none gap-1 text-default-600"
              color={roleUserColorMap[data.role]}
              size="sm"
              variant="dot"
            >
              {roleUserOptions.find((option) => option.uid === cellValue).name}
            </Chip>
          );
        }
        return (
          <Select
            aria-labelledby="select role"
            classNames={{
              trigger: "border-[0.4px]",
            }}
            disallowEmptySelection={true}
            fullWidth={true}
            defaultSelectedKeys={[data.role]}
            onSelectionChange={(e) => {
              handleUpdateRole(data._id, e.currentKey);
            }}
            variant="bordered"
            renderValue={(items) => {
              return items.map((item) => (
                <Chip
                  key={item.key}
                  className="capitalize border-none gap-1 text-default-600"
                  color={roleUserColorMap[item.props.textValue]}
                  size="sm"
                  variant="dot"
                >
                  {
                    roleUserOptions.find(
                      (option) => option.uid === item.props.textValue
                    ).name
                  }
                </Chip>
              ));
            }}
          >
            <SelectItem key="admin" textValue="admin">
              <Chip
                className="capitalize border-none gap-1 text-default-600"
                color={"danger"}
                size="sm"
                variant="dot"
              >
                Admin
              </Chip>
            </SelectItem>
            <SelectItem key="user" textValue="user">
              <Chip
                className="capitalize border-none gap-1 text-default-600"
                color={"success"}
                size="sm"
                variant="dot"
              >
                User
              </Chip>
            </SelectItem>
          </Select>
        );
      case "status":
        if (session.user.id === data._id) {
          return (
            <Button
              disableAnimation={true}
              className="border-none hover:bg-transparent bg-transparent"
            >
              <Chip
                className="capitalize border-none gap-1 text-white"
                color={statusUserColorMap[data.status]}
                size="sm"
              >
                {
                  statusUserOptions.find((option) => option.uid === cellValue)
                    .name
                }
              </Chip>
            </Button>
          );
        }
        return (
          <Button
            variant="light"
            onClick={() => {
              setIsOpenRemarkModal(true);
              setStatus(data.status);
              setStatusUserId(data._id);
              setRemark(data.remark);
            }}
          >
            <Chip
              className="capitalize border-none gap-1 font-extrabold"
              color={statusUserColorMap[data.status]}
              size="sm"
              variant="light"
            >
              {
                statusUserOptions.find((option) => option.uid === data.status)
                  .name
              }
            </Chip>
          </Button>
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
        <div className="flex flex-col md:flex-row justify-between gap-3 items-end">
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
                  Roles
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={roleFilter}
                selectionMode="multiple"
                onSelectionChange={setRoleFilter}
              >
                {roleUserOptions.map((role) => (
                  <DropdownItem key={role.uid} className="capitalize">
                    {capitalize(role.name)}
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
                {userColumns.map((column) => (
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
            Total {data?.users?.length} items
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
    roleFilter,
    visibleColumns,
    onRowsPerPageChange,
    data?.users?.length,
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
      <RemarkModal
        isOpen={isOpenRemarkModal}
        handleCancel={() => {
          setIsOpenRemarkModal(false);
          setRemark("");
        }}
        setRemark={setRemark}
        handleUpdateStatus={handleUpdateStatus}
        status={status}
        setStatus={setStatus}
        remark={remark}
      />
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
        aria-label="user table"
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
              className={`${
                column.uid === "status" &&
                "flex justify-center items-center lg:pr-[2rem]"
              }`}
              key={column.uid}
              align={column.uid === "status" ? "center" : "start"}
              allowsSorting={column.sortable}
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
            <TableRow key={item._id} align="center">
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
