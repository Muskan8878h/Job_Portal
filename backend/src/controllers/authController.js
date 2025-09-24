import jwt from "jsonwebtoken";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { sendOTPVerification } from "./otpController.js";
import UserOTPVerification from "../models/UserOTPVerification.js";

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
}

export const register = async (req, res) => {
  try {
    const { name, email, password, avatar, role } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: "User already exist" });

    const user = await User.create({
      name,
      email,
      password,
      role,
      avatar,
      verified: false,
    });

    await sendOTPVerification(user);

    res.status(201).json({
      status: "PENDING",
      message: "Registration successful. Please verify your email.",
      data: { userId: user._id, email: user.email }
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const verifyOTP = async (req, res) => {
  try {
    const { userId, otp } = req.body;
    if (!userId || !otp) return res.status(400).json({ message: "Empty OTP details" });

    const record = await UserOTPVerification.findOne({ userId });
    if (!record) return res.status(400).json({ message: "No OTP record found" });

    if (record.expiresAt < Date.now()) {
      await UserOTPVerification.deleteMany({ userId });
      return res.status(400).json({ message: "OTP expired. Request a new one." });
    }

    const isValid = await bcrypt.compare(otp, record.otp);
    if (!isValid) return res.status(400).json({ message: "Invalid OTP" });

    await User.updateOne({ _id: userId }, { verified: true });
    await UserOTPVerification.deleteMany({ userId });

    const user = await User.findById(userId);

    res.json({
      status: "VERIFIED",
      message: "Email verified successfully.",
      data: {
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          avatar: user.avatar,
          token: generateToken(user._id),
          companyName: user.companyName || '',
          companyDescription: user.companyDescription || '',
          companyLogo: user.companyLogo || '',
          resume: user.resume || '',
        }
      },
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "Invalid email or password" });

    if (!(await user.matchPassword(password))) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    if (!user.verified) {
      return res.status(401).json({ message: "Email not verified. Please check your inbox." });
    }

    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      role: user.role,
      token: generateToken(user._id),
      companyName: user.companyName || '',
      companyDescription: user.companyDescription || '',
      companyLogo: user.companyLogo || '',
      resume: user.resume || '',
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getMe = async (req, res) => {
  res.json(req.user);
};