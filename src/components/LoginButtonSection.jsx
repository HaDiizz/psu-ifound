"use client";
import { redirect } from "next/navigation";
import { Button } from "@nextui-org/react";
import { useSession, signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";

const LoginButtonSection = () => {
  const { data } = useSession();

  if (data && data.user) {
    redirect("/");
  }

  async function handleGoogleSignIn() {
    await signIn("google", { callbackUrl: process.env.NEXTAUTH_URL });
  }

  return (
    <div className="container grid gap-y-10 pt-[4rem] pb-[2.5rem]">
      <Button
        variant="bordered"
        size="md"
        className="flex gap-5 bg-white text-neutral-700"
        onClick={handleGoogleSignIn}
      >
        <span>
          <FcGoogle size={25} />
        </span>
        <span className="text-lg">Login with Google</span>
      </Button>
    </div>
  );
};

export default LoginButtonSection;
