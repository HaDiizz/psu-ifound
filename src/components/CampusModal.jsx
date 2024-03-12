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
} from "@nextui-org/react";
import { IoMdOpen } from "react-icons/io";
import { useRouter } from "next/navigation";
import axios from "axios";
import Image from "next/image";
import ErrorImageRobot from "@/assets/images/error.png";

const fetcher = (url) =>
  axios
    .get(url, {
      headers: { credential: process.env.PSU_OPEN_API_SECRET_KEY },
    })
    .then((res) => res.data);

const CampusModal = ({ isOpen, onClose }) => {
  const router = useRouter();
  const { data, error, isLoading } = useSWR(
    `${process.env.PSU_OPEN_API_URL}/Central/GetCampus`,
    fetcher
  );

  //   const campusData = [
  //     {
  //       campId: "01",
  //       campNameThai: "วิทยาเขตหาดใหญ่",
  //       campNameEng: "Hat Yai Campus",
  //     },
  //     {
  //       campId: "02",
  //       campNameThai: "วิทยาเขตปัตตานี",
  //       campNameEng: "Pattani Campus",
  //     },
  //     {
  //       campId: "03",
  //       campNameThai: "วิทยาเขตภูเก็ต",
  //       campNameEng: "Phuket Campus",
  //     },
  //     {
  //       campId: "04",
  //       campNameThai: "วิทยาเขตสุราษฎร์ธานี",
  //       campNameEng: "SuratThani Campus",
  //     },
  //     {
  //       campId: "05",
  //       campNameThai: "วิทยาเขตตรัง",
  //       campNameEng: "Trang Campus",
  //     },
  //   ];

  const handleNavigateCampus = async ({ item }) => {
    await router.push(`/${item.campId}/explore`);
    await onClose();
  };
  return (
    <>
      <Modal backdrop="blur" isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Select Campus
              </ModalHeader>
              <ModalBody>
                {error ? (
                  <div className="flex flex-col justify-center place-content-center items-center">
                    <Image
                      style={{ width: "5rem", height: "8.8rem" }}
                      src={ErrorImageRobot}
                      alt="logo"
                      width={"auto"}
                      height={"auto"}
                      priority
                    />
                    <p>Something went wrong!</p>
                  </div>
                ) : (
                  <Table hideHeader aria-label="static collection table">
                    <TableHeader>
                      <TableColumn>Campus ID</TableColumn>
                      <TableColumn>TH</TableColumn>
                      <TableColumn>EN</TableColumn>
                      <TableColumn>Action</TableColumn>
                    </TableHeader>
                    <TableBody
                      isLoading={isLoading}
                      loadingContent={<Spinner label="Loading..." />}
                    >
                      {data?.data?.map(
                        (item) =>
                          item.campId !== "00" && (
                            <TableRow key={item.campId}>
                              <TableCell>{item.campId}</TableCell>
                              <TableCell>{item.campNameThai}</TableCell>
                              <TableCell>
                                {
                                  item.campNameEng.split(
                                    "Prince of Songkla University "
                                  )[1]
                                }
                              </TableCell>
                              <TableCell>
                                <IoMdOpen
                                  onClick={() => handleNavigateCampus({ item })}
                                  size={18}
                                  className="text-indigo-400 cursor-pointer"
                                />
                              </TableCell>
                            </TableRow>
                          )
                      )}
                    </TableBody>
                  </Table>
                )}
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default CampusModal;
