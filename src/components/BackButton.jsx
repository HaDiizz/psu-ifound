"use client";

import { useRouter } from "next/navigation";
import { Button } from "@nextui-org/react";

const BackButton = () => {
  const router = useRouter();
  return (
    <div className="flex justify-start">
      <Button color="primary" onClick={() => router.back()}>
        Back
      </Button>
    </div>
  );
};

export default BackButton;
