"use client";
import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import { Input, Select, SelectItem } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import LoginButtonSection from "./LoginButtonSection";
import { addPost } from "@/lib/actions";
import FormButton from "./FormButton";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormFoundItemSchema } from "@/lib/schema";
import UploadImage from "./UploadImage";

export default function FormDrawer({ open, setOpen, form, campusId }) {
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
      campusId: "",
    },
  });

  const onSubmit = async (data, e) => {
    if (!file) return;
    data = { ...data, lat: Number(form.lat), lng: Number(form.lng) };
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
    const result = await addPost(formData);
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
    setValue("campusId", campusId);
  }, [setValue, file, campusId]);

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
                <FormButton isSubmitting={isSubmitting} />
              </div>
              <div className="grid gap-y-5 pt-[3rem]">
                <Select
                  {...register("campusId")}
                  variant="bordered"
                  label="Campus"
                  placeholder="Select campus"
                  defaultSelectedKeys={[campusId]}
                  className="max-w-xs"
                  errorMessage={errors.campusId?.message}
                  isInvalid={errors.campusId?.message}
                  onSelectionChange={(e) => setValue(e.currentKey)}
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
              </div>
            </form>
          </>
        ) : (
          <LoginButtonSection />
        )}
      </div>
    </Box>
  );

  return (
    <div>
      <Drawer
        anchor={"right"}
        open={open}
        onClose={() => {
          setOpen(false);
          setFile("");
          reset();
        }}
      >
        {DrawerList}
      </Drawer>
    </div>
  );
}
