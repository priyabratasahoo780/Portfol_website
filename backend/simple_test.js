import nodemailer from "nodemailer";
console.log('Nodemailer export:', nodemailer);
import dotenv from "dotenv";
dotenv.config();

async function check() {
  try {
    console.log("Checking Gmail...");
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
    await transporter.verify();
    console.log("Gmail Connection: SUCCESS");
  } catch (e) {
    console.log("Gmail Connection: FAILED");
    console.log("Error:", e.message);
  }
}
check();
