export const columns = [
  { name: "ID", uid: "_id", sortable: true },
  { name: "NAME", uid: "name", sortable: true },
  { name: "EMAIL", uid: "email", sortable: true },
  { name: "USERNAME", uid: "username", sortable: true },
  { name: "TITLE", uid: "title", sortable: true },
  { name: "LOCATION", uid: "location", sortable: true },
  { name: "SUB LOCATION", uid: "subLocation", sortable: true },
  { name: "STATUS", uid: "status", sortable: true },
  { name: "ACTIONS", uid: "actions" },
];

export const statusOptions = [
  { name: "Claimed", uid: "claimed" },
  { name: "Unclaimed", uid: "unclaimed" },
];

export const dataReports = [
  {
    _id: "1",
    fullName: "Nattapol Singhad",
    email: "dis@gmail.com",
    username: "hadis",
    status: "claimed",
    title: "TEST TITLE",
    location: "SCI",
    subLocation: "ตึกฟักทอง",
  },
  {
    _id: "2",
    fullName: "Nattapol Singhad",
    email: "dis@gmail.com",
    username: "hadis",
    status: "claimed",
    title: "TEST TITLE",
    location: "SCI",
    subLocation: "ตึกฟักทอง",
  },
  {
    _id: "3",
    fullName: "Tanapat Roardpasa",
    email: "tle@gmail.com",
    username: "title",
    status: "unclaimed",
    title: "CHICK",
    location: "ENG",
    subLocation: "COM R",
  },
];
