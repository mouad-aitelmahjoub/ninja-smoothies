import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import authRoutes from "./routes/authRoutes.js"
import { requireAuth } from "./middleware/authMiddleware.js"

const app = express()
dotenv.config()

// middleware
app.use(express.static("public"))
app.use(express.json())
app.use(cookieParser())

// view engine
app.set("view engine", "ejs")

// database connection
const DB_URI = process.env.DB_URI
mongoose
  .connect(DB_URI, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err))

// routes
app.get("/", (req, res) => res.render("home"))
app.get("/smoothies", requireAuth, (req, res) => res.render("smoothies"))
app.use(authRoutes)
