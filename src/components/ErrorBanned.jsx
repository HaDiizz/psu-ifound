"use client";
import Image from "next/image";
import { Button } from "@nextui-org/react";
import { backToHome } from "@/lib/actions";

const ErrorBanned = () => {
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center gap-y-5">
      <Image
        src="/banned.svg"
        alt="Access denied"
        height={200}
        width={200}
        priority
      />
      <span className="pr-4 pl-4 pt-8">
        Your account is inactive. Please contact support for reactivation.
      </span>
      <form action={backToHome}>
        <Button color="warning" type="submit">
          Back to home
        </Button>
      </form>
    </div>
  );
};

export default ErrorBanned;
