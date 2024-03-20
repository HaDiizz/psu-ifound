import { useEffect, useState } from "react";
import {
  Button,
  Input,
  Modal,
  ModalContent,
  ModalBody,
  ModalHeader,
  Select,
  SelectItem,
} from "@nextui-org/react";
import FormButton from "./FormButton";
import UploadImage from "./UploadImage";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormLostItemSchema } from "@/lib/schema";
import { addPost } from "@/lib/actions";

const AddPostModal = ({ isOpen, setIsOpen, campusId }) => {
  const [file, setFile] = useState("");
  const {
    setValue,
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(FormLostItemSchema),
    defaultValues: {
      title: "",
      detail: "",
      location: "",
      subLocation: "",
      contact: "",
      image: undefined,
      campusId: "",
    },
  });

  const onSubmit = async (data, e) => {
    if (!file) return;
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
      await setIsOpen(false);
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

  return (
    <Modal
      scrollBehavior={"outside"}
      placement="center"
      backdrop="opaque"
      isOpen={isOpen}
      onClose={async () => {
        await setIsOpen(false);
        await setFile("");
        await reset();
      }}
      classNames={{
        backdrop:
          "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20",
      }}
    >
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">เพิ่มข้อมูล</ModalHeader>
        <ModalBody>
          <form className="p-3" onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-5 grid-cols-1 md:grid-cols-2">
              <Select
                {...register("campusId")}
                variant="bordered"
                label="Campus"
                placeholder="Select campus"
                defaultSelectedKeys={[campusId]}
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
                {...register("contact")}
                defaultValue=""
                className="dark:text-white"
                label="Contact"
                variant="bordered"
                isInvalid={errors.contact?.message}
                errorMessage={errors.contact?.message}
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
              <div className="md:col-span-2">
                <UploadImage
                  register={register}
                  file={file}
                  setFile={setFile}
                  errors={errors}
                />
              </div>
            </div>
            <div className="flex justify-end items-end gap-x-3 pt-8">
              <Button
                color="danger"
                variant="flat"
                onPress={() => setIsOpen(false)}
              >
                Close
              </Button>
              <FormButton isSubmitting={isSubmitting} />
            </div>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default AddPostModal;
