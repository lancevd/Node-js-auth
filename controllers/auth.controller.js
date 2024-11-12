export const register = async (req, res) => {
  const {email, password, firstName, lastName} = req.body

  try {
    if (!email || !password || !firstName || !lastName) {
      res.status(400).send("Please fill all fields")
    }

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
