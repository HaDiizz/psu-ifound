import {
  LayoutDashboard,
  UserRoundCog,
  MapPinned,
  FileSearch,
  FileJson,
  ShieldAlert,
  FileWarning,
  ClipboardMinus,
  UsersRound,
  MessagesSquare,
} from "lucide-react";

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
  {
    id: "manage_file",
    name: "Manage File",
    url: "/admin/file",
    icon: FileJson,
  },
  {
    id: "issue",
    name: "Issue",
    url: "/admin/issue",
    icon: ShieldAlert,
  },
];

export const IssueMenuItems = [
  {
    id: "report",
    name: "Report",
    url: "/admin/issue/report",
    icon: FileWarning,
  },
  {
    id: "post",
    name: "Post",
    url: "/admin/issue/post",
    icon: ClipboardMinus,
  },
  {
    id: "user",
    name: "User",
    url: "/admin/issue/user",
    icon: UsersRound,
  },
  {
    id: "comment",
    name: "Comment",
    url: "/admin/issue/comment",
    icon: MessagesSquare,
  },
];
