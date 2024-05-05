"use client";

import { Button, Link } from "@nextui-org/react";

const BackButtonIssue = ({ category }) => {
  return (
    <div className="flex justify-start">
      <Button as={Link} color="primary" href={`/admin/issue/${category}`}>
        Back
      </Button>
    </div>
  );
};

export default BackButtonIssue;
