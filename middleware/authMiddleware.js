import jwt from "jsonwebtoken"
import User from "../models/User.js"

const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt
  const JWT_SECRET = process.env.JWT_SECRET

  //check jwt exists & is verified
  if (token) {
    jwt.verify(token, JWT_SECRET, (err, decodedToken) => {
      if (err) {
        console.log(err.message)
        res.redirect("/login")
      } else {
        next()
      }
    })
  } else {
    res.redirect("/login")
  }
}

//check current user
const checkUser = (req, res, next) => {
  const token = req.cookies.jwt
  const JWT_SECRET = process.env.JWT_SECRET

  //check jwt exists & is verified
  if (token) {
    jwt.verify(token, JWT_SECRET, async (err, decodedToken) => {
      if (err) {
        console.log(err.message)
        res.locals.user = null
        next()
      } else {
        let user = await User.findById(decodedToken.id)
        res.locals.user = user
        next()
      }
    })
  } else {
    res.locals.user = null
    next()
  }
}

export { requireAuth, checkUser }
