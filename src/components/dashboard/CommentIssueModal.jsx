"use client";
import { useState } from "react";
import { useGetComment } from "@/hooks/swr";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Spinner,
  User,
} from "@nextui-org/react";
import ConfirmDelete from "../ConfirmDelete";
import { deleteCommentAndUpdateIssueStatus } from "@/lib/actions";
import toast from "react-hot-toast";

export default function CommentIssueModal({
  isOpen,
  onOpenChange,
  commentId,
  mutate,
}) {
  const { data, isLoading } = useGetComment(commentId);
  const [isOpenConfirmDeleteModal, setIsOpenConfirmDeleteModal] =
    useState(false);

  const handleDeleteComment = async () => {
    const result = await deleteCommentAndUpdateIssueStatus({
      commentId,
    });
    setIsOpenConfirmDeleteModal(false);
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

  return (
    <>
      <ConfirmDelete
        handleDelete={handleDeleteComment}
        title={data?.content}
        isOpen={isOpenConfirmDeleteModal}
        onClose={() => setIsOpenConfirmDeleteModal(false)}
      />
      <Modal
        backdrop="blur"
        hideCloseButton
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        isDismissable={false}
        isKeyboardDismissDisabled={true}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {data && "Comment Detail"}
              </ModalHeader>
              <ModalBody>
                {isLoading ? (
                  <div className="flex justify-center items-center h-full">
                    <Spinner label="Loading..." />
                  </div>
                ) : (
                  <>
                    {data ? (
                      <table className="table-auto text-small border-separate border-spacing-y-3">
                        <tbody>
                          <tr>
                            <td className="px-4 py-2 w-[8rem]">Comment</td>
                            <td className="text-pretty">{data.content}</td>
                          </tr>
                          <tr>
                            <td className="px-4 py-2 w-[8rem]">Owner</td>
                            <td>
                              <User
                                description={data.user.email}
                                name={data.user.fullName}
                                avatarProps={{
                                  size: "sm",
                                  src: `${data.user.picture}`,
                                }}
                              >
                                {data.user.username}
                              </User>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    ) : (
                      <div className="text-center flex flex-col gap-y-1">
                        <span className="text-red-500 font-bold text-lg mb-4">
                          Comment Not Found
                        </span>
                        <span className="text-default-400">
                          The requested data does not exist or may have been
                          deleted.
                        </span>
                      </div>
                    )}
                  </>
                )}
              </ModalBody>
              <ModalFooter>
                <Button variant="light" onPress={onClose}>
                  Cancel
                </Button>
                {isLoading
                  ? null
                  : data && (
                      <Button
                        color="danger"
                        variant="ghost"
                        onPress={() => {
                          onClose();
                          setIsOpenConfirmDeleteModal(true);
                        }}
                      >
                        Delete
                      </Button>
                    )}
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
