"use client";
import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";

export default function Error({ reset }) {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col justify-center items-center px-6 py-8">
      <h2 className="text-4xl font-bold text-gray-800 dark:text-white tracking-wide">
        Oops! Something went wrong.
      </h2>
      <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
        We are sorry, but there seems to be a problem. Please try again later.
      </p>
      <div className="mt-6 flex gap-4">
        <Button onClick={() => router.push("/")} color="primary">
          Back to Home
        </Button>
        <Button onClick={() => reset()} color="secondary">
          Try Again
        </Button>
      </div>
    </div>
  );
}
