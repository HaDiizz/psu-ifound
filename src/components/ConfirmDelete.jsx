import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";

const ConfirmDelete = ({ handleDelete, title, isOpen, onClose }) => {
  return (
    <Modal backdrop={"blur"} isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">Confirm</ModalHeader>
            <ModalBody>
              <div className="grid">
                <div>
                  <div className="text-sm font-semibold pt-2">
                    Are you sure you want to delete
                    <i className="text-indigo-500">({title})</i> ? by doing
                    this, you will not be able to recover the data.
                  </div>
                </div>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color="default" variant="light" onPress={onClose}>
                Close
              </Button>
              <Button color="danger" onPress={handleDelete}>
                Delete
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default ConfirmDelete;
