import bcrypt from "bcryptjs";

const users = [
  {
    name: "Admin User",
    email: "admin@example.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: true,
  },
  {
    name: "Rrezarta Idrizi",
    email: "rrezarta@example.com",
    password: bcrypt.hashSync("123456", 10),
  },
  {
    name: "Arbidona Hodaj",
    email: "arbidona@example.com",
    password: bcrypt.hashSync("123456", 10),
  },
  {
    name: "Enis Hamza",
    email: "enis@example.com",
    password: bcrypt.hashSync("123456", 10),
  },
];

export default users;
