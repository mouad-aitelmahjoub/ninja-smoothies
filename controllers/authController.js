import User from "../models/User.js"
import { handleUserErrors } from "../helpers/errorHandlers.js"

const signup_get = (req, res) => {
  res.render("signup")
}
const login_get = (req, res) => {
  res.render("login")
}
const signup_post = async (req, res) => {
  const { email, password } = req.body

  try {
    const user = await User.create({ email, password })
    res.status(201).json(user)
  } catch (error) {
    const errors = handleUserErrors(error)
    res.status(400).json({ errors })
  }
}
const login_post = async (req, res) => {
  const { email, password } = req.body
  console.log(email, password)
  res.send("user login")
}

export { signup_get, signup_post, login_get, login_post }
