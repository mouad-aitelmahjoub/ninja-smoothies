import jwt from "jsonwebtoken"

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

export { requireAuth }
