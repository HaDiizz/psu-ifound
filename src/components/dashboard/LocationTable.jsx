"use client";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Tooltip,
  Button,
  Pagination,
  Input,
  Spinner,
} from "@nextui-org/react";
import { FaPlus } from "react-icons/fa";
import { useCallback, useMemo, useState } from "react";
import { CiSearch } from "react-icons/ci";
import moment from "moment";
import toast from "react-hot-toast";
import { AiFillEdit } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import { useSession } from "next-auth/react";
import Link from "next/link";
import ConfirmDelete from "../ConfirmDelete";
import { deleteLocation } from "@/lib/actions";
import { useLocations } from "@/hooks/swr";

const locationColumns = [
  { name: "LOCATION NAME", uid: "name", sortable: true },
  { name: "LATITUDE", uid: "lat", sortable: true },
  { name: "LONGITUDE", uid: "lng", sortable: true },
  { name: "CREATED AT", uid: "createdAt", sortable: true },
  { name: "UPDATED AT", uid: "updatedAt", sortable: true },
  { name: "ACTIONS", uid: "actions" },
];

export default function LocationTable({ campusId }) {
  const { data: locations, isLoading } = useLocations(campusId);
  const { data: session } = useSession();
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const [locationName, setLocationName] = useState("");
  const [locationId, setLocationId] = useState("");
  const [page, setPage] = useState(1);
  const [filterValue, setFilterValue] = useState("");
  const [selectedKeys, setSelectedKeys] = useState(new Set([]));
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [sortDescriptor, setSortDescriptor] = useState({
    column: "updatedAt",
    direction: "descending",
  });

  const handleDeleteLocation = async () => {
    const result = await deleteLocation(locationId);
    await setIsOpenDeleteModal(false);
    if (result?.success) {
      toast.success(`${result?.message}`);
      return;
    }

    if (result?.error) {
      toast.error(`${result?.message}`);
      return;
    }
  };

  const hasSearchFilter = Boolean(filterValue);

  const filteredItems = useMemo(() => {
    let filteredLocations = isLoading ? [] : [...locations];

    if (hasSearchFilter) {
      filteredLocations = filteredLocations.filter(
        (location) =>
          location.locationName
            .toLowerCase()
            .includes(filterValue.toLowerCase()) ||
          location.lat === filterValue ||
          location.lng === filterValue
      );
    }
    return filteredLocations;
  }, [locations, filterValue]);

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

  const renderCell = useCallback(
    (data, columnKey) => {
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
        case "actions":
          return (
            <div className="relative flex items-center gap-2">
              {session && session.user.role === "admin" && (
                <>
                  <Tooltip content="Edit">
                    <Link
                      className="text-lg text-default-400 cursor-pointer active:opacity-50"
                      href={`/admin/location/${data.campId}/edit/${data._id}`}
                    >
                      <AiFillEdit size={20} />
                    </Link>
                  </Tooltip>
                  <Tooltip content="Delete" color="danger">
                    <span
                      className="text-lg text-red-500 cursor-pointer active:opacity-50"
                      onClick={async () => {
                        await setLocationId(data?._id);
                        await setLocationName(data?.name);
                        await setIsOpenDeleteModal(true);
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
          return cellValue || "-";
      }
    },
    [session]
  );

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
            {session && (
              <Link
                href={`/admin/location/${campusId}/create`}
                className="flex items-center gap-x-3 p-2 bg-slate-900 text-white dark:bg-slate-100 dark:text-black rounded-lg text-tiny md:text-medium"
              >
                <span>
                  <FaPlus />
                </span>
                <span>Add new location</span>
              </Link>
            )}
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">
            Total {locations?.length} items
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
    onRowsPerPageChange,
    locations?.length,
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
        <TableHeader columns={locationColumns}>
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
      <ConfirmDelete
        title={locationName}
        isOpen={isOpenDeleteModal}
        onClose={() => setIsOpenDeleteModal(false)}
        handleDelete={handleDeleteLocation}
      />
    </>
  );
}
