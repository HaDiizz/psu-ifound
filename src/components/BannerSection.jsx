"use client";
import { FaSearchLocation } from "react-icons/fa";
import { Button, useDisclosure } from "@nextui-org/react";
import Image from "next/image";
import CampusModal from "./CampusModal";

const BannerSection = () => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const handleOpen = () => {
    onOpen();
  };
  return (
    <div>
      <CampusModal isOpen={isOpen} onClose={onClose} />
      <div className="flex justify-between md:pt-[4rem]">
        <div className="flex flex-col max-w-[750px] gap-y-8 items-start">
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
            Lorem ipsum dolor sit amet consectetur, adipisicing elit.
            Praesentium vel nobis earum animi maiores asperiores, provident quae
            perferendis necessitatibus dicta in tenetur ex a quis delectus qui.
            Cumque incidunt omnis reiciendis cum inventore sint quis id facilis
            dolore corrupti modi ratione eius vitae iure, nulla iste quaerat.
            Voluptas, dolor optio.
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
        <Image
          style={{ width: "25rem", height: "25rem" }}
          className="hidden md:block"
          src={"/globe.svg"}
          alt="banner globe"
          width={100}
          height={100}
          priority
        />
      </div>
    </div>
  );
};

export default BannerSection;
