"use client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { EditFormFoundItemSchema } from "@/lib/schema";
import UploadImage from "./UploadImage";
import { Input, Select, SelectItem, Textarea, Chip } from "@nextui-org/react";
import FormButton from "./FormButton";
import { editReport } from "@/lib/actions";
import toast from "react-hot-toast";

const EditReport = ({ report, campusId }) => {
  const [file, setFile] = useState("");
  const {
    setValue,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(EditFormFoundItemSchema),
    defaultValues: {
      title: "",
      detail: "",
      location: "",
      subLocation: "",
      contact: "",
      status: "",
    },
  });

  const onSubmit = async (data, e) => {
    if (!file) return;
    data = {
      ...data,
      image: file[0]?.isEdit ? undefined : file,
      reportId: report._id,
      oldImage: file[0]?.isEdit ? undefined : report.image.public_id,
      campusId,
    };
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
    const result = await editReport(formData);
    if (result?.success) {
      toast.success(`${result?.message}`);
      return;
    }

    if (result?.error) {
      toast.error(`${result?.message}`);
      return;
    }
  };

  useEffect(() => {
    setValue("title", report.title);
    setValue("detail", report.detail);
    setValue("location", report.location);
    setValue("subLocation", report.subLocation);
    setValue("contact", report.contact);
    setValue("status", report.status);
  }, [setValue, report]);
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 md:grid-cols-12 pt-7 pb-5">
          <div className="md:col-span-2">
            <UploadImage
              register={register}
              file={file}
              setFile={setFile}
              errors={errors}
              defaultImage={report.image}
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-12 pt-7 pb-5 gap-x-4 gap-y-8 bg-slate-200/25 dark:bg-slate-800/50 rounded-xl p-7">
          <div className="md:col-span-4">
            <Select
              fullWidth={true}
              variant="bordered"
              label="Campus"
              placeholder="Select campus"
              defaultSelectedKeys={[campusId]}
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
          </div>
          <div className="md:col-span-4">
            <Select
              {...register("status")}
              fullWidth={true}
              variant="bordered"
              label="Status"
              placeholder="Select Status"
              defaultSelectedKeys={[report.status]}
              isInvalid={errors.status?.message}
              errorMessage={errors.status?.message}
              onSelectionChange={(e) => setValue(e.currentKey)}
              renderValue={(items) => {
                return items.map((item) => (
                  <Chip
                    key={item.key}
                    className="capitalize border-none gap-1 text-default-600"
                    color={item.key === "claimed" ? "success" : "danger"}
                    size="sm"
                    variant="dot"
                  >
                    {item.textValue}
                  </Chip>
                ));
              }}
            >
              <SelectItem
                key={"unclaimed"}
                value="unclaimed"
                textValue="Unclaimed"
              >
                <Chip
                  className="capitalize border-none gap-1 text-default-600"
                  color="danger"
                  size="sm"
                  variant="dot"
                >
                  Unclaimed
                </Chip>
              </SelectItem>
              <SelectItem key={"claimed"} value="claimed" textValue="Claimed">
                <Chip
                  className="capitalize border-none gap-1 text-default-600"
                  color="success"
                  size="sm"
                  variant="dot"
                >
                  Claimed
                </Chip>
              </SelectItem>
            </Select>
          </div>
          <div className="md:col-span-4">
            <Input
              {...register("title")}
              defaultValue={report?.title}
              className="dark:text-white"
              type="text"
              label="Title"
              variant="bordered"
              isInvalid={errors.title?.message}
              errorMessage={errors.title?.message}
            />
          </div>
          <div className="md:col-span-12">
            <Textarea
              {...register("detail")}
              defaultValue={report?.detail}
              className="dark:text-white"
              type="text"
              label="Detail"
              variant="bordered"
              isInvalid={errors.detail?.message}
              errorMessage={errors.detail?.message}
            />
          </div>
          <div className="md:col-span-4">
            <Input
              {...register("contact")}
              defaultValue={report?.contact}
              className="dark:text-white"
              label="Contact"
              variant="bordered"
              isInvalid={errors.contact?.message}
              errorMessage={errors.contact?.message}
            />
          </div>
          <div className="md:col-span-4">
            <Input
              {...register("location")}
              defaultValue={report?.location}
              className="dark:text-white"
              type="text"
              label="Location"
              variant="bordered"
              isInvalid={errors.location?.message}
              errorMessage={errors.location?.message}
            />
          </div>
          <div className="md:col-span-4">
            <Input
              {...register("subLocation")}
              defaultValue={report?.subLocation}
              className="dark:text-white"
              label="Sub Location"
              variant="bordered"
              isInvalid={errors.subLocation?.message}
              errorMessage={errors.subLocation?.message}
            />
          </div>
        </div>
        <div className="flex justify-end items-end gap-x-3 pt-8">
          <FormButton isSubmitting={isSubmitting} text={"Edit"} />
        </div>
      </form>
    </>
  );
};

export default EditReport;
