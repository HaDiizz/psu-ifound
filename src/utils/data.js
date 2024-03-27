export const columns = [
  { name: "IMAGE", uid: "image" },
  { name: "NAME", uid: "name", sortable: true },
  { name: "TITLE", uid: "title", sortable: true },
  { name: "DETAIL", uid: "detail", sortable: true },
  { name: "CONTACT", uid: "contact", sortable: true },
  { name: "LOCATION", uid: "location", sortable: true },
  { name: "SUB LOCATION", uid: "subLocation", sortable: true },
  { name: "STATUS", uid: "status", sortable: true },
  { name: "CAMPUS", uid: "campus", sortable: true },
  { name: "CREATED AT", uid: "createdAt", sortable: true },
  { name: "UPDATED AT", uid: "updatedAt", sortable: true },
  { name: "ACTIONS", uid: "actions" },
];

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

export const dataReports = [
  {
    image: {
      public_id: "PSU_iFound/rhxmdworq7inacvdftyk",
      url: "http://res.cloudinary.com/dklebdons/image/upload/v1710250523/PSU_iFound/rhxmdworq7inacvdftyk.jpg",
    },
    _id: "1",
    title: "ไอแพด Gen 9",
    detail: "IPAD gen 9 เคสสีดำ ตั้งอยู่บนโต๊ะชั้นสาม",
    location: "หอสมุดคุณหญิงหลง",
    subLocation: "หอสมุดคุณหญิงหลง ชั้นสาม",
    contact: "tanapat@gmail.com",
    status: "notfound",
    user: {
      _id: "1",
      username: "H4D!s_",
      fullName: "H4D!s_ Ntp",
      email: "disssvs@gmail.com",
      picture:
        "https://lh3.googleusercontent.com/a/ACg8ocLF5_Nit2z3vaD9mSl8MMUkHhexZvI6SrH7gajTWakm=s96-c",
    },
    comments: [
      {
        _id: "1",
        postId: "1",
        content: "I found it at SKY ICT Company",
        user: {
          _id: "65f4d5f9fd3d07029a0853ea",
          username: "NATTAPOL",
          fullName: "NATTAPOL SINGHAD",
          email: "6310110240@psu.ac.th",
          picture:
            "https://lh3.googleusercontent.com/a/ACg8ocIvqAd7uE0iK-c7ph1Ha-prG4Wv3NUpXiLjjtbIRjQ=s96-c",
        },
      },
    ],
    createdAt: "2024-03-12T13:35:22.425Z",
    updatedAt: "2024-03-15T23:23:30.635Z",
    __v: 6,
    campId: "01",
  },
  // {
  //   _id: "1",
  //   fullName: "Nattapol Singhad",
  //   email: "dis@gmail.com",
  //   username: "hadis",
  //   status: "claimed",
  //   title: "TEST TITLE",
  //   location: "SCI",
  //   subLocation: "ตึกฟักทอง",
  //   url: "https://lh3.googleusercontent.com/a/ACg8ocLF5_Nit2z3vaD9mSl8MMUkHhexZvI6SrH7gajTWakm=s96-c",
  // },
  // {
  //   _id: "2",
  //   fullName: "Nattapol Singhad",
  //   email: "dis@gmail.com",
  //   username: "hadis",
  //   status: "claimed",
  //   title: "TEST TITLE",
  //   location: "SCI",
  //   subLocation: "ตึกฟักทอง",
  //   url: "https://lh3.googleusercontent.com/a/ACg8ocLF5_Nit2z3vaD9mSl8MMUkHhexZvI6SrH7gajTWakm=s96-c",
  // },
  // {
  //   _id: "3",
  //   fullName: "Tanapat Roardpasa",
  //   email: "tle@gmail.com",
  //   username: "title",
  //   status: "unclaimed",
  //   title: "CHICK",
  //   location: "ENG",
  //   subLocation: "COM R",
  //   url: "http://res.cloudinary.com/dklebdons/image/upload/v1710250523/PSU_iFound/rhxmdworq7inacvdftyk.jpg",
  // },
];
