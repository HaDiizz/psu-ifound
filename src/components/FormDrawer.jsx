"use client";
import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import { Input, Select, SelectItem, Button, Tooltip } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import { addReport } from "@/lib/actions";
import FormButton from "./FormButton";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormFoundItemSchema } from "@/lib/schema";
import UploadImage from "./UploadImage";
import Link from "next/link";
import { FaTimes } from "react-icons/fa";

export default function FormDrawer({ open, setOpen, form, campusId, setForm }) {
  const [file, setFile] = useState("");
  const { data: session } = useSession();
  const {
    setValue,
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(FormFoundItemSchema),
    defaultValues: {
      title: "",
      detail: "",
      location: "",
      subLocation: "",
      contact: "",
      lat: 0,
      lng: 0,
      image: undefined,
    },
  });

  const onSubmit = async (data, e) => {
    if (!file) return;
    data = { ...data, lat: Number(form.lat), lng: Number(form.lng), campusId };
    const formData = new FormData();
    for (const [key, value] of Object.entries(data)) {
      if (value !== undefined && value !== null) {
        if (key === "image") {
          formData.append(key, value[0]);
        } else {
          formData.append(key, value);
        }
      }
    }
    const result = await addReport(formData);
    if (result?.success) {
      await reset();
      await setOpen(false);
      await setFile("");
      return;
    }

    if (result?.error) {
      return;
    }
  };

  useEffect(() => {
    setValue("image", file);
    setValue("location", form?.location);
  }, [setValue, file, form?.location]);

  const DrawerList = (
    <Box
      sx={{
        width: 300,
      }}
      role="presentation"
    >
      <div className="p-3">
        {session ? (
          <>
            <form className="p-3" onSubmit={handleSubmit(onSubmit)}>
              <div className="flex justify-between items-center">
                <span className="dark:text-white font-semibold pl-3">
                  Report
                </span>
                <Tooltip content="Close" color="danger">
                  <Button
                    color="danger"
                    isIconOnly
                    aria-label="Close"
                    onClick={() => {
                      setOpen(false);
                      setFile("");
                      reset();
                    }}
                  >
                    <FaTimes />
                  </Button>
                </Tooltip>
              </div>
              <div className="grid gap-y-5 pt-[3rem]">
                <Select
                  variant="bordered"
                  label="Campus"
                  placeholder="Select campus"
                  defaultSelectedKeys={[campusId]}
                  className="max-w-xs"
                  isDisabled
                >
                  <SelectItem key={"01"} value="01">
                    Hatyai Campus
                  </SelectItem>
                  <SelectItem key={"02"} value="02">
                    Pattani Campus
                  </SelectItem>
                  <SelectItem key={"03"} value="03">
                    Phuket Campus
                  </SelectItem>
                  <SelectItem key={"04"} value="04">
                    SuratThani Campus
                  </SelectItem>
                  <SelectItem key={"05"} value="05">
                    Trang Campus
                  </SelectItem>
                </Select>
                <Input
                  {...register("title")}
                  defaultValue=""
                  className="dark:text-white"
                  type="text"
                  label="Title"
                  variant="bordered"
                  isInvalid={errors.title?.message}
                  errorMessage={errors.title?.message}
                />
                <Input
                  {...register("detail")}
                  defaultValue=""
                  className="dark:text-white"
                  type="text"
                  label="Detail"
                  variant="bordered"
                  isInvalid={errors.detail?.message}
                  errorMessage={errors.detail?.message}
                />
                <Input
                  {...register("location")}
                  defaultValue=""
                  className="dark:text-white"
                  type="text"
                  label="Location"
                  variant="bordered"
                  isInvalid={errors.location?.message}
                  errorMessage={errors.location?.message}
                  value={form?.location}
                  onValueChange={(input) =>
                    setForm({ ...form, location: input })
                  }
                />
                <Input
                  {...register("subLocation")}
                  defaultValue=""
                  className="dark:text-white"
                  label="Sub Location"
                  variant="bordered"
                  isInvalid={errors.subLocation?.message}
                  errorMessage={errors.subLocation?.message}
                />
                <Input
                  {...register("contact")}
                  defaultValue=""
                  className="dark:text-white"
                  label="Contact"
                  variant="bordered"
                  isInvalid={errors.contact?.message}
                  errorMessage={errors.contact?.message}
                />
                <Input
                  {...register("lat", { value: Number(form.lat) })}
                  readOnly={true}
                  className="dark:text-white hidden"
                  label="Latitude"
                  variant="bordered"
                  isInvalid={errors.lat?.message}
                  errorMessage={errors.lat?.message}
                  value={Number(form.lat)}
                />
                <Input
                  {...register("lng", { value: Number(form.lng) })}
                  readOnly={true}
                  className="dark:text-white hidden"
                  label="Longitude"
                  variant="bordered"
                  isInvalid={errors.lng?.message}
                  errorMessage={errors.lng?.message}
                  value={Number(form.lng)}
                />
                <UploadImage
                  register={register}
                  file={file}
                  setFile={setFile}
                  errors={errors}
                />
                <FormButton isSubmitting={isSubmitting} text={"Submit"} />
              </div>
            </form>
          </>
        ) : (
          <div className="pt-[4rem] grid gap-4 dark:text-white">
            <span className="text-4xl font-bold text-inherit text-center">
              PSU iFound
            </span>
            <span className="font-bold text-sm pt-8">
              Please sign in to unlock the available features.
            </span>
            <Link className="underline text-sm" href="/login">
              Click here to signIn
            </Link>
          </div>
        )}
      </div>
    </Box>
  );

  return (
    <div>
      <Drawer
        variant="persistent"
        hideBackdrop={true}
        anchor={"right"}
        open={open}
      >
        {DrawerList}
      </Drawer>
    </div>
  );
}
