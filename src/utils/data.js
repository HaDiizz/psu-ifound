export const columns = [
  { name: "ID", uid: "_id", sortable: true },
  { name: "IMAGE", uid: "image" },
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
    url:
      "https://lh3.googleusercontent.com/a/ACg8ocLF5_Nit2z3vaD9mSl8MMUkHhexZvI6SrH7gajTWakm=s96-c",
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
    url:
      "https://lh3.googleusercontent.com/a/ACg8ocLF5_Nit2z3vaD9mSl8MMUkHhexZvI6SrH7gajTWakm=s96-c",
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
    url:
      "http://res.cloudinary.com/dklebdons/image/upload/v1710250523/PSU_iFound/rhxmdworq7inacvdftyk.jpg",
  },
];
