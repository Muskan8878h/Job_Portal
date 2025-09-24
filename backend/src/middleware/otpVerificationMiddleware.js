import nodemailer from "nodemailer";
import bcrypt from "bcryptjs";
import UserOTPVerification from "../models/UserOTPVerification.js"

export const sendOTPVerification = async ({ _id, email}, res) => {
    try {
        const otp = `${Math.floor(1000 + Math.random() * 9000)}`;
        const mailOptions = {
            from: process.env.Auth_EMAIL,
            to: email,
            subject: "Verify Your Email",
            html: <p>Here is the one time password verification code for verification: <b>${otp}</b>. <br>This code is expire in 15 Minutes.</br></p>
        };

        const hashedOTP = await bcrypt.hash(otp, 10);
        const newOTPVerification = await new UserOTPVerification({
            
        })
    } catch (err) {
        
    }
}