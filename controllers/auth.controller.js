export const register = (req, res) => {
  res.send("Register");
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
