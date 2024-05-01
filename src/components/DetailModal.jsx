"use client";
import useSWR from "swr";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Spinner,
  Chip,
  User,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Avatar,
  AvatarGroup,
  Tooltip,
} from "@nextui-org/react";
import { axios } from "@/lib/axios";
import ClaimItem from "./ClaimItem";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import { statusReportColorMap } from "@/utils/data";
import Image from "next/image";
import { MdReportProblem, MdCheckCircle } from "react-icons/md";
import { useState } from "react";
import ReportIssueModal from "./ReportIssueModal";

const DetailModal = ({ isOpen, onClose, itemId }) => {
  const { data, isLoading, mutate } = useSWR(`/report/${itemId}`);
  const { data: session } = useSession();
  const [isOpenReportModal, setIsOpenReportModal] = useState(false);

  const handleClaimItem = async () => {
    await onClose();
    try {
      const response = await axios.put(`/report/${itemId}`, {
        status: data?.status,
      });
      toast.success(`${response?.data?.message}`);
      await mutate();
    } catch (error) {
      toast.error(`${error?.response?.data?.message}`);
    }
  };
  return (
    <>
      <ReportIssueModal
        isOpen={isOpenReportModal}
        setIsOpen={setIsOpenReportModal}
        itemId={itemId}
        category={"REPORT"}
        campId={data?.campId}
      />
      <Modal
        classNames={{
          base: "dark:bg-[#0F1729]",
        }}
        backdrop="blur"
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <>
                {isLoading ? (
                  <div className="flex justify-center items-center pt-10">
                    <Spinner label="Loading..." />
                  </div>
                ) : (
                  <>
                    <ModalHeader>{data?.title}</ModalHeader>
                    <ModalBody>
                      <div className="flex flex-col justify-center items-center gap-y-5">
                        <div
                          className="flex justify-center items-center overflow-hidden rounded-lg cursor-pointer"
                          style={{ width: "100px", height: "110px" }}
                        >
                          <Image
                            referrerPolicy="no-referrer"
                            className="object-cover w-full h-full rounded-md"
                            width={100}
                            height={100}
                            src={data?.image?.url}
                            alt="thumbnail"
                          />
                        </div>
                        <div>
                          <Table aria-labelledby="table detail">
                            <TableHeader>
                              <TableColumn>Properties</TableColumn>
                              <TableColumn>Value</TableColumn>
                            </TableHeader>
                            <TableBody>
                              <TableRow key="1">
                                <TableCell>Detail</TableCell>
                                <TableCell>{data.detail}</TableCell>
                              </TableRow>
                              <TableRow key="2">
                                <TableCell>Location</TableCell>
                                <TableCell>
                                  <div className="flex flex-col">
                                    <p className="text-bold text-small capitalize">
                                      {data.location}
                                    </p>
                                    <p className="text-bold text-tiny capitalize text-default-400">
                                      {data?.subLocation
                                        ? data?.subLocation
                                        : "-"}
                                    </p>
                                  </div>
                                </TableCell>
                              </TableRow>
                              <TableRow key="3">
                                <TableCell>Contact</TableCell>
                                <TableCell>{data.contact}</TableCell>
                              </TableRow>
                              <TableRow key="4">
                                <TableCell>Status</TableCell>
                                <TableCell>
                                  <Chip
                                    className="capitalize"
                                    color={statusReportColorMap[data.status]}
                                    size="sm"
                                    variant="flat"
                                  >
                                    {data.status}
                                  </Chip>
                                </TableCell>
                              </TableRow>
                              <TableRow key="5">
                                <TableCell>Report by</TableCell>
                                <TableCell>
                                  <User
                                    avatarProps={{
                                      radius: "lg",
                                      size: "sm",
                                    }}
                                    description={data.user.email}
                                    name={data.user.fullName}
                                  >
                                    {data.user.username}
                                  </User>
                                </TableCell>
                              </TableRow>
                              <TableRow key="6">
                                <TableCell>List of Claimants</TableCell>
                                <TableCell>
                                  <AvatarGroup isBordered max={4}>
                                    {data?.userList.map((user) => (
                                      <Tooltip
                                        key={user._id}
                                        placement="bottom"
                                        content={user.fullName}
                                        color="primary"
                                      >
                                        <Avatar src={user.picture} size="sm" />
                                      </Tooltip>
                                    ))}
                                  </AvatarGroup>
                                </TableCell>
                              </TableRow>
                            </TableBody>
                          </Table>
                        </div>
                      </div>
                    </ModalBody>
                  </>
                )}
              </>
              <ModalFooter className="flex justify-between items-center">
                {!isLoading && (
                  <>
                    <Button
                      size="sm"
                      color="danger"
                      aria-label="Report problem"
                      startContent={<MdReportProblem />}
                      onPress={() => {
                        setIsOpenReportModal(true);
                        onClose();
                      }}
                    >
                      Report Problem
                    </Button>
                    <div>
                      <Button color="primary" variant="light" onPress={onClose}>
                        Close
                      </Button>
                      {data?.status !== "claimed" ? (
                        data?.userList.some(
                          (user) => user._id === session?.user?.id
                        ) ? (
                          <Button
                            color="success"
                            variant="light"
                            endContent={<MdCheckCircle size={20} />}
                          >
                            Claimed
                          </Button>
                        ) : data?.user?._id === session?.user?.id ? null : (
                          <Popover placement="top-start" backdrop="blur">
                            <PopoverTrigger>
                              <Button color="warning" variant="light">
                                Claim
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent>
                              <ClaimItem handleClaimItem={handleClaimItem} />
                            </PopoverContent>
                          </Popover>
                        )
                      ) : null}
                    </div>
                  </>
                )}
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default DetailModal;
