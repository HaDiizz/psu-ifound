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
  RadioGroup,
  cn,
} from "@nextui-org/react";
import { useRouter, usePathname } from "next/navigation";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { OptionsSelection } from "./OptionsSelection";
import { campusData } from "@/utils/constants";

const fetcher = (url) =>
  axios
    .get(url, {
      headers: { credential: process.env.PSU_OPEN_API_SECRET_KEY },
    })
    .then((res) => res.data);

const steps = ["Select options", "Select Campus"];

const CampusModal = ({ isOpen, onClose }) => {
  const pathname = usePathname();
  const [isRedirecting, setIsDirecting] = useState(false);
  const [selectCampus, setSelectCampus] = useState("01");
  const [selectOption, setSelectOption] = useState("found");
  const [activeStep, setActiveStep] = useState(0);
  const router = useRouter();
  const { data, error, isLoading } = useSWR(
    `${process.env.PSU_OPEN_API_URL}/Central/GetCampus`,
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false
    }
  );

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleNavigateCampus = async () => {
    if (pathname === `/${selectCampus}/explore/${selectOption}`) {
      setIsDirecting(false);
      onClose();
      setActiveStep(0);
      setSelectCampus("01");
      setSelectOption("found");
      return;
    }
    setIsDirecting(true);
    router.replace(`/${selectCampus}/explore/${selectOption}`);
  };

  useEffect(() => {
    setIsDirecting(false);
    onClose();
    setActiveStep(0);
    setSelectCampus("01");
    setSelectOption("found");
  }, [pathname, onClose]);
  return (
    <>
      <Modal backdrop="blur" isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          <>
            <ModalHeader className="flex flex-col gap-1">
              <Box sx={{ width: "100%", paddingTop: "1.5rem" }}>
                <Stepper activeStep={activeStep}>
                  {steps.map((label) => {
                    const stepProps = {};
                    const labelProps = {};
                    return (
                      <Step key={label} {...stepProps}>
                        <StepLabel {...labelProps}>
                          <span className="dark:text-white">{label}</span>
                        </StepLabel>
                      </Step>
                    );
                  })}
                </Stepper>
              </Box>
            </ModalHeader>
            <ModalBody>
              <Box sx={{ width: "100%" }}>
                {activeStep === steps.length - 1 ? (
                  <>
                    {error ? (
                      campusData ? (
                        <Table
                          disallowEmptySelection={true}
                          color="primary"
                          selectionMode="single"
                          hideHeader
                          aria-label="static collection table"
                          selectionBehavior="replace"
                          defaultSelectedKeys={[selectCampus]}
                          onSelectionChange={(key) =>
                            setSelectCampus(key.currentKey)
                          }
                        >
                          <TableHeader>
                            <TableColumn>Campus ID</TableColumn>
                            <TableColumn>TH</TableColumn>
                            <TableColumn>EN</TableColumn>
                          </TableHeader>
                          <TableBody
                            isLoading={isLoading}
                            loadingContent={<Spinner label="Loading..." />}
                          >
                            {campusData?.map(
                              (item) =>
                                item.campId !== "00" && (
                                  <TableRow
                                    className="cursor-pointer"
                                    key={item.campId}
                                  >
                                    <TableCell>{item.campId}</TableCell>
                                    <TableCell>{item.campNameThai}</TableCell>
                                    <TableCell>
                                      {
                                        item.campNameEng.split(
                                          "Prince of Songkla University "
                                        )[1]
                                      }
                                    </TableCell>
                                  </TableRow>
                                )
                            )}
                          </TableBody>
                        </Table>
                      ) : (
                        <div className="flex flex-col justify-center place-content-center items-center">
                          <Image
                            style={{ width: "5rem", height: "8.8rem" }}
                            src={"/error.png"}
                            alt="logo"
                            width={"auto"}
                            height={"auto"}
                            priority
                          />
                          <p>Something went wrong!</p>
                        </div>
                      )
                    ) : (
                      <Table
                        disallowEmptySelection={true}
                        color="primary"
                        selectionMode="single"
                        hideHeader
                        aria-label="static collection table"
                        selectionBehavior="replace"
                        defaultSelectedKeys={[selectCampus]}
                        onSelectionChange={(key) =>
                          setSelectCampus(key.currentKey)
                        }
                      >
                        <TableHeader>
                          <TableColumn>Campus ID</TableColumn>
                          <TableColumn>TH</TableColumn>
                          <TableColumn>EN</TableColumn>
                        </TableHeader>
                        <TableBody
                          isLoading={isLoading}
                          loadingContent={<Spinner label="Loading..." />}
                        >
                          {data?.data?.map(
                            (item) =>
                              item.campId !== "00" && (
                                <TableRow
                                  className="cursor-pointer"
                                  key={item.campId}
                                >
                                  <TableCell>{item.campId}</TableCell>
                                  <TableCell>{item.campNameThai}</TableCell>
                                  <TableCell>
                                    {
                                      item.campNameEng.split(
                                        "Prince of Songkla University "
                                      )[1]
                                    }
                                  </TableCell>
                                </TableRow>
                              )
                          )}
                        </TableBody>
                      </Table>
                    )}
                  </>
                ) : (
                  <>
                    <RadioGroup
                      defaultValue={selectOption || "found"}
                      label="Lost & Found"
                      onValueChange={(value) => setSelectOption(value)}
                    >
                      <OptionsSelection
                        description="If you've found an item, please click here to report it. You can drop a pin on the map and provide details."
                        value="found"
                      >
                        Report Found Item
                      </OptionsSelection>
                      <OptionsSelection
                        description="If you've lost something, you can report about it here. Please provide details about the lost item."
                        value="lost"
                      >
                        Search for Lost Item
                      </OptionsSelection>
                    </RadioGroup>
                  </>
                )}
              </Box>
            </ModalBody>
            <ModalFooter>
              <Box sx={{ width: "100%" }}>
                {activeStep === steps.length - 1 ? (
                  <>
                    <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                      <Button
                        variant="light"
                        color="default"
                        disabled={activeStep === 0}
                        onClick={handleBack}
                        sx={{ mr: 1 }}
                      >
                        Back
                      </Button>
                      <Box sx={{ flex: "1 1 auto" }} />
                      <Button
                        isLoading={isRedirecting}
                        spinner={
                          <svg
                            className="animate-spin h-5 w-5 text-current"
                            fill="none"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            />
                            <path
                              className="opacity-75"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              fill="currentColor"
                            />
                          </svg>
                        }
                        variant="solid"
                        color="primary"
                        onClick={handleNavigateCampus}
                        isDisabled={
                          selectCampus === "" && selectOption === ""
                            ? true
                            : false
                        }
                      >
                        {isRedirecting ? "Redirecting" : "Confirm"}
                      </Button>
                    </Box>
                  </>
                ) : (
                  <>
                    <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                      <Box sx={{ flex: "1 1 auto" }} />

                      <Button
                        variant="light"
                        color="default"
                        onClick={handleNext}
                      >
                        Next
                      </Button>
                    </Box>
                  </>
                )}
              </Box>
            </ModalFooter>
          </>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CampusModal;
