"use client";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import { Input, Button } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import LoginButtonSection from "./LoginButtonSection";

export default function FormDrawer({ open, setOpen, form, setForm }) {
  const { data: session } = useSession();

  function handleOnchange(e) {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
  }

  const DrawerList = (
    <Box
      sx={{
        width: 300,
      }}
      role="presentation"
    >
      <div className="grid gap-y-9 p-3">
        {session ? (
          <>
            <span className="dark:text-white font-semibold">Report</span>
            <form className="grid gap-y-8 p-3" onSubmit={handleSubmit}>
              <Input
                className="dark:text-white"
                type="text"
                label="Title"
                variant="bordered"
                name="title"
                value={form.title}
                onChange={(e) => handleOnchange(e)}
              />
              <Input
                className="dark:text-white"
                type="text"
                label="Detail"
                variant="bordered"
                name="detail"
                value={form.detail}
                onChange={(e) => handleOnchange(e)}
              />
              <Input
                className="dark:text-white"
                type="text"
                label="Location"
                variant="bordered"
                name="location"
                value={form.location}
                onChange={(e) => handleOnchange(e)}
              />
              <Input
                className="dark:text-white"
                type="text"
                label="Sub Location"
                variant="bordered"
                name="subLocation"
                value={form.subLocation}
                onChange={(e) => handleOnchange(e)}
              />
              <Input
                disabled={true}
                className="dark:text-white"
                type="text"
                label="Latitude"
                variant="bordered"
                name="lat"
                value={form.lat}
                onChange={(e) => handleOnchange(e)}
              />
              <Input
                disabled={true}
                className="dark:text-white"
                type="text"
                label="Longitude"
                variant="bordered"
                name="lng"
                value={form.lng}
                onChange={(e) => handleOnchange(e)}
              />
              <Button color="primary" variant="ghost" type="submit">
                Submit
              </Button>
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
      <Drawer anchor={"right"} open={open} onClose={() => setOpen(false)}>
        {DrawerList}
      </Drawer>
    </div>
  );
}
