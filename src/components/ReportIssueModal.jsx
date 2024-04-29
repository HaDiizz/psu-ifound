import { useState } from "react";
import {
  Button,
  Input,
  Modal,
  ModalContent,
  ModalBody,
  ModalHeader,
  Select,
  SelectItem,
  Textarea,
} from "@nextui-org/react";
import FormButton from "./FormButton";
import { addReportProblem } from "@/lib/actions";
import toast from "react-hot-toast";

const ReportIssueModal = ({ isOpen, setIsOpen, itemId, category }) => {
  const [selectedType, setSelectedType] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({
    title: "",
    detail: "",
    otherType: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    if (!form.title) {
      toast.error(`Title is required.`);
      setIsSubmitting(false);
      return;
    }
    if (!selectedType) {
      toast.error(`Type is required.`);
      setIsSubmitting(false);
      return;
    }
    if (selectedType === "Other" && !form.otherType) {
      toast.error(`Other Type is required.`);
      setIsSubmitting(false);
      return;
    }
    if (!form.detail) {
      toast.error(`Detail is required.`);
      setIsSubmitting(false);
      return;
    }
    const result = await addReportProblem({
      title: form.title,
      detail: form.detail,
      type: selectedType,
      otherType: form.otherType,
      itemId,
      category,
    });
    if (result?.success) {
      toast.success(`${result?.message}`);
    }

    if (result?.error) {
      toast.error(`${result?.message}`);
    }
    setIsSubmitting(false);
    setIsOpen(false);
  };

  return (
    <Modal
      backdrop="blur"
      isOpen={isOpen}
      onClose={async () => {
        await setIsOpen(false);
      }}
    >
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">
          Report a Problem
        </ModalHeader>
        <ModalBody>
          <form className="p-3" onSubmit={handleSubmit}>
            <div className="grid gap-5 grid-cols-1">
              <Input
                defaultValue=""
                className="dark:text-white"
                type="text"
                label="Title"
                variant="bordered"
                onValueChange={(input) => setForm({ ...form, title: input })}
              />
              <Select
                variant="bordered"
                label="Type"
                placeholder="Select Type"
                onSelectionChange={(key) => setSelectedType(key.currentKey)}
              >
                <SelectItem
                  key={"Inappropriate Content"}
                  value="Inappropriate Content"
                >
                  Inappropriate Content
                </SelectItem>
                <SelectItem key={"Spam"} value="Spam">
                  Spam
                </SelectItem>
                <SelectItem key={"Harassment"} value="Harassment">
                  Harassment
                </SelectItem>
                <SelectItem key={"Other"} value="Other">
                  Other
                </SelectItem>
              </Select>
              {selectedType === "Other" && (
                <Input
                  defaultValue=""
                  className="dark:text-white"
                  type="text"
                  label="Other Type"
                  variant="bordered"
                  onValueChange={(input) =>
                    setForm({ ...form, otherType: input })
                  }
                />
              )}
              <Textarea
                defaultValue=""
                className="dark:text-white"
                type="text"
                label="Detail"
                variant="bordered"
                onValueChange={(input) => setForm({ ...form, detail: input })}
              />
            </div>
            <div className="flex justify-end items-end gap-x-3 pt-8">
              <Button
                color="danger"
                variant="flat"
                onPress={() => setIsOpen(false)}
              >
                Close
              </Button>
              <FormButton isSubmitting={isSubmitting} text={"Submit"} />
            </div>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ReportIssueModal;
