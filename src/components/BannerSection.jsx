"use client";
import { FaSearchLocation } from "react-icons/fa";
import { Button, useDisclosure } from "@nextui-org/react";
import Image from "next/image";
import CampusModal from "./CampusModal";
import Globe from "../../public/globe-webp.webp";

const BannerSection = () => {
  const { isOpen, onClose, onOpen } = useDisclosure();

  const handleOpen = () => {
    onOpen();
  };

  return (
    <div>
      <CampusModal isOpen={isOpen} onClose={onClose} />
      <div className="flex justify-between md:pt-[4rem]">
        <div className="flex flex-col max-w-[730px] gap-y-8 items-start">
          <span
            className="flex justify-center items-center"
            style={{ lineHeight: 2 }}
          >
            <span className="letter">P</span>
            <span className="letter">S</span>
            <span className="letter mr-5">U</span>
            <span className="letter ml-5">i</span>
            <span className="letter">F</span>
            <span className="letter">o</span>
            <span className="letter">u</span>
            <span className="letter">n</span>
            <span className="letter">d</span>
          </span>
          <p>
            Lost and Found Hub. Discover and announce lost items within all 5
            campuses of Price of Songkla University. Connect with owners or
            finders. Your lost belongings might just find their way back to you
          </p>
          <div>
            <Button
              className="items-center align-middle"
              size="lg"
              color="primary"
              variant="ghost"
              endContent={<FaSearchLocation size={20} />}
              onClick={handleOpen}
            >
              Discover
            </Button>
          </div>
        </div>
        {Globe && (
          <Image
            style={{ width: "25rem", height: "25rem" }}
            className="hidden md:block"
            src={Globe}
            alt="banner globe"
            width={100}
            height={100}
            priority
            unoptimized
          />
        )}
      </div>
    </div>
  );
};

export default BannerSection;
