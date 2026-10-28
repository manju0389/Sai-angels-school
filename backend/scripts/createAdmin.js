
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Admin = require("../src/models/Admin");

async function main() {
  const { MONGO_URI, ADMIN_NAME, ADMIN_EMAIL, ADMIN_PASSWORD } =
    process.env;

  if (!MONGO_URI || !ADMIN_NAME || !ADMIN_EMAIL || !ADMIN_PASSWORD) {
    throw new Error("Missing required environment variables.");
  }

  if (ADMIN_PASSWORD.length < 12) {
    throw new Error("Use an admin password of at least 12 characters.");
  }

  await mongoose.connect(MONGO_URI);

  const email = ADMIN_EMAIL.trim().toLowerCase();
  const existing = await Admin.findOne({ email });

  if (existing) {
    throw new Error("An admin with this email already exists.");
  }

  const password = await bcrypt.hash(ADMIN_PASSWORD, 12);

  await Admin.create({
    name: ADMIN_NAME.trim(),
    email,
    password,
    role: "admin",
  });

  console.log("Admin account created.");
}

main()
  .catch((error) => {
    console.error(error.message);
    process.exitCode = 1;
  })
  .finally(async () => {
    await mongoose.disconnect();
  });
