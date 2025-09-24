import bcrypt from "bcryptjs";
import transporter from "../config/emailConfig.js";
import UserOTPVerification from "../models/UserOTPVerification.js";
import User from "../models/User.js";

export const sendOTPVerification = async (user) => {
  try {
    const otp = `${Math.floor(1000 + Math.random() * 9000)}`;
    const hashedOTP = await bcrypt.hash(otp, 10);

    await UserOTPVerification.create({
      userId: user._id,
      otp: hashedOTP,
      createdAt: new Date(),
      expiresAt: new Date(Date.now() + 15 * 60 * 1000) // 15 min
    });

    await transporter.sendMail({
      from: process.env.AUTH_EMAIL,
      to: user.email,
      subject: "Verify Your Email",
      html: `<p>Enter this OTP to verify your email: <b>${otp}</b></p>
             <p>This code expires in 15 minutes.</p>`
    });
  } catch (err) {
    console.error("sendOTPVerification error:", err.message);
    throw new Error(err.message);
  }
};

export const resendOTP = async (req, res) => {
  try {
    const { userId } = req.body;
    if (!userId) return res.status(400).json({ message: "User ID required" });

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Delete old OTPs
    await UserOTPVerification.deleteMany({ userId });

    // Send new OTP
    await sendOTPVerification(user);

    res.status(200).json({
      status: "PENDING",
      message: "New OTP sent to your email.",
      data: { userId: user._id, email: user.email },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};