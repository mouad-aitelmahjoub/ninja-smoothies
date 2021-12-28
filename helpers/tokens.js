import jwt from "jsonwebtoken"

const maxAge = 3 * 24 * 60 * 60

const createToken = (id) => {
  const JWT_SECRET = process.env.JWT_SECRET

  const token = jwt.sign({ id }, JWT_SECRET, {
    expiresIn: maxAge,
  })

  return token
}

export { createToken }
