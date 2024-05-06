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
import Image from "next/image";

const EditReport = ({ report, campusId }) => {
  const [checkStatus, setCheckStatus] = useState("");
  const [owner, setOwner] = useState("");
  const [isOwnerError, setIsOwnerError] = useState(false);
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
    if (data.status === "claimed" && (owner === "" || !owner)) {
      setIsOwnerError(true);
      return;
    }
    setIsOwnerError(false);
    if (!file) return;
    data = {
      ...data,
      image: file[0]?.isEdit ? undefined : file,
      reportId: report._id,
      oldImage: file[0]?.isEdit ? undefined : report.image.public_id,
      campusId,
      owner,
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
    setOwner(report?.owner);
    setCheckStatus(report.status);
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
          <div className="md:col-span-8">
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
          <div className="md:col-span-6">
            <Select
              {...register("status")}
              fullWidth={true}
              variant="bordered"
              label="Status"
              placeholder="Select Status"
              defaultSelectedKeys={[report.status]}
              isInvalid={errors.status?.message}
              errorMessage={errors.status?.message}
              onSelectionChange={(e) => {
                setValue(e.currentKey);
                setCheckStatus(e.currentKey);
              }}
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
          <div className="md:col-span-6">
            {checkStatus === "claimed" ? (
              report.userList.length > 0 ? (
                <Select
                  defaultSelectedKeys={
                    report?.owner?._id && [report?.owner?._id]
                  }
                  onSelectionChange={(e) => {
                    if (e.currentKey) {
                      setIsOwnerError(false);
                    }
                    setOwner(e.currentKey);
                  }}
                  isInvalid={isOwnerError}
                  errorMessage={isOwnerError && "Owner is required."}
                  label="Owner"
                  fullWidth={true}
                  placeholder="Select Owner"
                  items={report.userList}
                  variant="bordered"
                  classNames={{
                    label: "group-data-[filled=true]:-translate-y-3",
                  }}
                  listboxProps={{
                    itemClasses: {
                      base: [
                        "rounded-md",
                        "text-default-500",
                        "transition-opacity",
                        "data-[hover=true]:text-foreground",
                        "data-[hover=true]:bg-default-100",
                        "dark:data-[hover=true]:bg-default-50",
                        "data-[selectable=true]:focus:bg-default-50",
                        "data-[pressed=true]:opacity-70",
                        "data-[focus-visible=true]:ring-default-500",
                      ],
                    },
                  }}
                  popoverProps={{
                    classNames: {
                      base: "before:bg-default-200",
                      content: "p-0 border-small border-divider bg-background",
                    },
                  }}
                  renderValue={(items) => {
                    return items.map((item) => (
                      <div
                        key={item.data._id}
                        className="flex items-center gap-2"
                      >
                        <Image
                          className="small-avatar"
                          referrerPolicy="no-referrer"
                          src={`${item.data.picture}`}
                          width={30}
                          height={30}
                          alt="avatar"
                          priority
                        />
                        <div className="flex gap-x-2 items-center">
                          <span>{item.data.fullName}</span>-
                          <span className="text-default-500 text-tiny">
                            ({item.data.email})
                          </span>
                        </div>
                      </div>
                    ));
                  }}
                >
                  {(user) => (
                    <SelectItem key={user._id} textValue={user._id}>
                      <div className="flex gap-2 items-center">
                        <Image
                          className="small-avatar"
                          referrerPolicy="no-referrer"
                          src={`${user.picture}`}
                          width={30}
                          height={30}
                          alt="avatar"
                          priority
                        />
                        <div className="flex flex-col">
                          <span className="text-small">{user.fullName}</span>
                          <span className="text-tiny text-default-400">
                            {user.email}
                          </span>
                        </div>
                      </div>
                    </SelectItem>
                  )}
                </Select>
              ) : (
                <div className="flex justify-center items-center h-full">
                  <span className="text-red-500">
                    User does not invalid in claimed list.
                  </span>
                </div>
              )
            ) : null}
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
              placeholder="Building/Floor/Room"
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
