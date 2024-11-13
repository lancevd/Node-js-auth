import { User } from "../models/user.model.js"
import bcrypt from "bcryptjs"

export const register = async (req, res) => {
  const {email, password, firstName, lastName} = req.body

  try {
    if (!email || !password || !firstName || !lastName) {
      throw new Error("Please fill all fields")
    }

    // Check email
    const  userAlreadyExists = await User.findOne({email})

    if (userAlreadyExists) {
      res.status(400).json({
        message: "An account already exist with this email",
        success: false,
      });
    }

    // Check password
    const hashedPassword = await bcrypt.hash(password, 25)

    // Create verification code
    const verificationToken = Math.floor(Math.random() * 1000000) + 1

    const user = new User({
      email,
      password: hashedPassword,
      firstName,
      lastName,
      verificationToken,
      verificationTokenExpiresAt: Date.now() + 2 * 60 * 60 * 1000
    })

    await user.save();

    // JWT authentication
    generateTokenAndSetCookie(res, user._id)

    res.status(201).json({
      message: "User created successfully",
      success: true,
      user: {
        _id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        verified: user.verified
      }
    })

  } catch (error) {
    
  }

}

export const login = (req, res) => {
  res.send("Login");
}

export const logout =  (req, res) => {
  res.send("Logout");
}

export const forgot = (req, res) => {
  res.send("Forgot Password");
}

export const reset = (req, res) => {
  res.send("Reset Password");
}

export const verify = (req, res) => {
  res.send("Verify Email");
}

export const resend = (req, res) => {
  res.send("Resend Verification Email");
}
