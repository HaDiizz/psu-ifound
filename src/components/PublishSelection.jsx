"use client";

import { updateIsPublish } from "@/lib/actions";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import { useMemo, useState } from "react";
import toast from "react-hot-toast";

const PublishSelection = ({ itemId, isPublish, tableType }) => {
  const [selectedKeys, setSelectedKeys] = useState(
    new Set([isPublish ? "Published" : "Unpublished"])
  );

  const selectedValue = useMemo(
    () => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
    [selectedKeys]
  );

  const handleUpdateIsPublish = async (status) => {
    const isPublishStatus = (await status) === "Published" ? true : false;
    const result = await updateIsPublish({
      itemId,
      isPublish: isPublishStatus,
      tableType,
    });
    if (result?.success) {
      toast.success(`${result?.message}`);
      return;
    }

    if (result?.error) {
      toast.error(`${result?.message}`);
      return;
    }
  };

  return (
    <div className="flex justify-start">
      <Dropdown>
        <DropdownTrigger>
          <Button
            className="text-white"
            color={selectedValue === "Published" ? "success" : "danger"}
          >
            {selectedValue}
          </Button>
        </DropdownTrigger>
        <DropdownMenu
          aria-label="Publish status selection"
          variant="flat"
          disallowEmptySelection
          selectionMode="single"
          selectedKeys={selectedKeys}
          onSelectionChange={setSelectedKeys}
          onAction={(key) => handleUpdateIsPublish(key)}
        >
          <DropdownItem key="Published">Published</DropdownItem>
          <DropdownItem key="Unpublished">Unpublished</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};

export default PublishSelection;
