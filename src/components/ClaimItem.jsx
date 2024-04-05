import { Button } from "@nextui-org/react";

const ClaimItem = ({ handleClaimItem }) => {
  return (
    <div
      className="grid"
      style={{
        borderRadius: "14px",
        padding: "0.75rem",
        minWidth: "330px",
      }}
    >
      <div className="text-left">
        <div className="text-lg font-semibold">Confirm</div>
      </div>
      <div>
        <div className="text-sm font-semibold pt-2">
          Are you sure you want to claim this item ? by doing this, you will not
          be able to edit the data.
        </div>
      </div>
      <div className="flex items-start pt-5">
        <Button color="warning" variant="ghost" onPress={handleClaimItem}>
          Claim
        </Button>
      </div>
    </div>
  );
};

export default ClaimItem;
