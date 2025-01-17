import { User } from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import generateTokenAndSetCookie from "../utils/generateTokenAndSetCookie.js";
import { sendVerificationEmail, sendWelcomeEmail } from "../mailtrap/emails.js";

export const register = async (req, res) => {
  const { email, password, firstName, lastName } = req.body;
  try {
    if (!email || !password || !firstName || !lastName) {
      throw new Error("Please fill all fields");
    }

    // Check email
    const userAlreadyExists = await User.findOne({ email });

    if (userAlreadyExists) {
      res.status(400).json({
        message: "An account already exist with this email",
        success: false,
      });
    }

    // Check password
    const hashedPassword = await bcryptjs.hash(password, 10);
    console.log("called");

    // Create verification code
    const verificationToken = Math.floor(
      100000 + Math.random() * 9000000
    ).toString();

    const user = new User({
      email,
      password: hashedPassword,
      firstName,
      lastName,
      verificationToken,
      verificationTokenExpiresAt: Date.now() + 2 * 60 * 60 * 1000,
    });

    await user.save();
    // JWT authentication
    generateTokenAndSetCookie(res, user._id);

    // send token to email
    await sendVerificationEmail(user.email, verificationToken);

    console.log("passed");
    res.status(201).json({
      message: "User created successfully",
      success: true,
      user: { ...user._doc, password: undefined },
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};

export const verifyEmail = async (req, res) => {
  const { verificationCode } = req.body;

  try {
    const user = await User.findOne({
      verificationToken: verificationCode,
      verificationTokenExpiresAt: { $gt: Date.now() },
    });

    if (!user) {
      throw new Error("Invalid or expired verification code");
    }

    user.verified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpiresAt = undefined;
    await user.save();

    await sendWelcomeEmail(user.email, user.firstName);

    res.status(200).json({
      message: "Email verified successfully",
      success: true,
      user: { ...user._doc, password: undefined },
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "Email not found",
        success: false,
      });
    }

    const isMatch = await bcryptjs.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid credentials",
        success: false,
      });
    }

    generateTokenAndSetCookie(res, user._id);

    await user.save();
    res.status(200).json({
      message: "Logged in successfully",
      success: true,
      user: { ...user._doc, password: undefined },
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};

export const logout = (req, res) => {
  res.clearCookie("token").send("Logged out");

  res.status(200).json({
    message: "Logged out successfully",
    success: true,
  });
};

export const forgot = (req, res) => {
  res.send("Forgot Password");
};

export const reset = (req, res) => {
  res.send("Reset Password");
};

export const verify = (req, res) => {
  res.send("Verify Email");
};

export const resend = (req, res) => {
  res.send("Resend Verification Email");
};
