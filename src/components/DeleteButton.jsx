"use client";
import { Button, useDisclosure } from "@nextui-org/react";
import ConfirmDelete from "./ConfirmDelete";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import {
  deletePostAndUpdateIssueStatus,
  deleteReportAndUpdateIssueStatus,
} from "@/lib/actions";
import { useState } from "react";

const DeleteButton = ({ itemId, itemTitle, issueType }) => {
  const router = useRouter();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async () => {
    let result;
    setIsLoading(true);
    await onClose();
    if (issueType === "post") {
      result = await deletePostAndUpdateIssueStatus({ postId: itemId });
    } else if (issueType === "report") {
      result = await deleteReportAndUpdateIssueStatus({ reportId: itemId });
    }
    if (result?.success) {
      toast.success(`${result?.message}`);
    }

    if (result?.error) {
      toast.error(`${result?.message}`);
    }
    setIsLoading(false);
    await new Promise((resolve) => setTimeout(resolve, 500));
    await router.replace(`/admin/issue/${issueType}/${itemId}`);
  };
  return (
    <>
      <ConfirmDelete
        title={itemTitle}
        isOpen={isOpen}
        onClose={onClose}
        handleDelete={handleDelete}
      />
      <Button
        isDisabled={isLoading}
        variant="ghost"
        color="danger"
        onPress={onOpen}
      >
        {isLoading ? "Deleting..." : "Delete"}
      </Button>
    </>
  );
};

export default DeleteButton;
