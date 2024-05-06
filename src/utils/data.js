export const columns = [
  { name: "IMAGE", uid: "image" },
  { name: "NAME", uid: "name" },
  { name: "TITLE", uid: "title", sortable: true },
  { name: "DETAIL", uid: "detail", sortable: true },
  { name: "CONTACT", uid: "contact", sortable: true },
  { name: "LOCATION", uid: "location", sortable: true },
  { name: "SUB LOCATION", uid: "subLocation", sortable: true },
  { name: "STATUS", uid: "status", sortable: true },
  { name: "CAMPUS", uid: "campus" },
  { name: "PUBLISHED", uid: "isPublish", sortable: true },
  { name: "CREATED AT", uid: "createdAt", sortable: true },
  { name: "UPDATED AT", uid: "updatedAt", sortable: true },
  { name: "ACTIONS", uid: "actions" },
];

export const reportColumns = [
  { name: "IMAGE", uid: "image" },
  { name: "NAME", uid: "name" },
  { name: "TITLE", uid: "title", sortable: true },
  { name: "DETAIL", uid: "detail", sortable: true },
  { name: "CONTACT", uid: "contact", sortable: true },
  { name: "LOCATION", uid: "location", sortable: true },
  { name: "SUB LOCATION", uid: "subLocation", sortable: true },
  { name: "STATUS", uid: "status", sortable: true },
  { name: "CAMPUS", uid: "campus" },
  { name: "CLAIMED AT", uid: "createdAt", sortable: true },
  { name: "ACTIONS", uid: "actions" },
];

export const userColumns = [
  { name: "PICTURE", uid: "picture" },
  { name: "NAME", uid: "name" },
  { name: "FULLNAME", uid: "fullName", sortable: true },
  { name: "EMAIL", uid: "email", sortable: true },
  { name: "USERNAME", uid: "username", sortable: true },
  { name: "ROLE", uid: "role", sortable: true },
  { name: "STATUS", uid: "status", sortable: true },
  { name: "REMARK", uid: "remark", sortable: true },
  { name: "STUDENT ID", uid: "studentId", sortable: true },
  { name: "SEX", uid: "titleName", sortable: true },
  { name: "YEAR", uid: "yearStatus", sortable: true },
  { name: "MAJOR", uid: "majorNameThai", sortable: true },
  { name: "DEPARTMENT", uid: "deptNameThai", sortable: true },
  { name: "CAMPUS", uid: "campusNameThai" },
  { name: "CREATED AT", uid: "createdAt", sortable: true },
  { name: "UPDATED AT", uid: "updatedAt", sortable: true },
];

export const issueColumn = [
  { name: "REPORTED BY", uid: "name" },
  { name: "TITLE", uid: "title", sortable: true },
  { name: "DETAIL", uid: "detail", sortable: true },
  { name: "TYPE", uid: "type", sortable: true },
  { name: "STATUS", uid: "status", sortable: true },
  { name: "CAMPUS", uid: "campus" },
  { name: "CREATED AT", uid: "createdAt", sortable: true },
  { name: "UPDATED AT", uid: "updatedAt", sortable: true },
  { name: "ACTIONS", uid: "actions" },
];

export const issueFilterOptions = [
  { name: "Non-Deleted", uid: "non-deleted" },
  { name: "Deleted", uid: "deleted" },
];

export const roleUserOptions = [
  { name: "User", uid: "user" },
  { name: "Admin", uid: "admin" },
];

export const roleUserColorMap = {
  admin: "danger",
  user: "success",
};

export const issueStatusOptions = [
  { name: "PENDING", uid: "PENDING" },
  { name: "IN PROGRESS", uid: "IN_PROGRESS" },
  { name: "RESOLVED", uid: "RESOLVED" },
  { name: "REJECTED", uid: "REJECTED" },
];

export const issueStatusColorMap = {
  PENDING: "warning",
  IN_PROGRESS: "primary",
  RESOLVED: "success",
  REJECTED: "danger",
};

export const statusUserOptions = [
  { name: "ACTIVE", uid: "ACTIVE" },
  { name: "INACTIVE", uid: "INACTIVE" },
];

export const statusUserColorMap = {
  ACTIVE: "success",
  INACTIVE: "danger",
};

export const statusReportOptions = [
  { name: "Claimed", uid: "claimed" },
  { name: "Unclaimed", uid: "unclaimed" },
];

export const statusPostOptions = [
  { name: "Found", uid: "found" },
  { name: "Not Found", uid: "notfound" },
];

export const statusPostColorMap = {
  notfound: "danger",
  found: "success",
};

export const statusReportColorMap = {
  claimed: "success",
  unclaimed: "danger",
};
