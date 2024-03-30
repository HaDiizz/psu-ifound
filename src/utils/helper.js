import { LayoutDashboard, UserRoundCog, MapPinned, FileSearch } from "lucide-react";
export const SideBarMenus = [
  {
    id: "dashboard",
    name: "Dashboard",
    url: "/admin/dashboard",
    icon: LayoutDashboard,
  },
  {
    id: "reports",
    name: "Report",
    url: "/admin/report",
    icon: FileSearch,
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
