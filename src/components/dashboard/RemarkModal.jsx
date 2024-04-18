"use client";
import { statusUserColorMap, statusUserOptions } from "@/utils/data";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Textarea,
  Select,
  SelectItem,
  Chip,
} from "@nextui-org/react";

export default function RemarkModal({
  isOpen,
  setRemark,
  handleUpdateStatus,
  handleCancel,
  status,
  setStatus,
  remark,
}) {
  return (
    <>
      <Modal
        hideCloseButton
        isOpen={isOpen}
        isDismissable={false}
        isKeyboardDismissDisabled={true}
      >
        <ModalContent>
          <>
            <ModalHeader className="flex flex-col gap-1">
              Update status user
            </ModalHeader>
            <ModalBody>
              <Select
                aria-labelledby="select status"
                classNames={{
                  trigger: "border-[0.4px]",
                }}
                disallowEmptySelection={true}
                fullWidth={true}
                defaultSelectedKeys={[status]}
                onSelectionChange={(e) => {
                  setStatus(e.currentKey);
                  if (e.currentKey === "ACTIVE") {
                    setRemark("");
                  }
                }}
                variant="bordered"
                renderValue={(items) => {
                  return items.map((item) => (
                    <Chip
                      key={item.key}
                      className="capitalize border-none gap-1 font-extrabold"
                      color={statusUserColorMap[item.props.textValue]}
                      size="sm"
                      variant="light"
                    >
                      {
                        statusUserOptions.find(
                          (option) => option.uid === item.props.textValue
                        ).name
                      }
                    </Chip>
                  ));
                }}
              >
                <SelectItem key="ACTIVE" textValue="ACTIVE">
                  <Chip
                    className="capitalize border-none gap-1 font-extrabold"
                    color={"success"}
                    size="sm"
                    variant="light"
                  >
                    ACTIVE
                  </Chip>
                </SelectItem>
                <SelectItem key="INACTIVE" textValue="INACTIVE">
                  <Chip
                    className="capitalize border-none gap-1 font-extrabold"
                    color={"danger"}
                    size="sm"
                    variant="light"
                  >
                    INACTIVE
                  </Chip>
                </SelectItem>
              </Select>
              {status === "INACTIVE" && (
                <Textarea
                  label="Remark"
                  variant="bordered"
                  placeholder="Enter your remark"
                  defaultValue={remark}
                  onValueChange={(e) => setRemark(e)}
                />
              )}
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={handleCancel}>
                Cancel
              </Button>
              <Button
                color="primary"
                onPress={handleUpdateStatus}
                isDisabled={remark === "" && status === "INACTIVE"}
              >
                Confirm
              </Button>
            </ModalFooter>
          </>
        </ModalContent>
      </Modal>
    </>
  );
}
