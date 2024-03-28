import { LayoutDashboard, UserRoundCog, MapPinned } from "lucide-react";
export const SideBarMenus = [
  {
    id: "dashboard",
    name: "Dashboard",
    url: "/admin/dashboard",
    icon: LayoutDashboard,
  },
  {
    id: "user_permission",
    name: "User Permission",
    url: "/admin/permission",
    icon: UserRoundCog,
  },
  {
    id: "location",
    name: "Location",
    url: "/admin/location",
    icon: MapPinned,
  },
];
