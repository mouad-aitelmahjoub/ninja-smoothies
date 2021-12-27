import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import authRoutes from "./routes/authRoutes.js"
const app = express()
dotenv.config()

// middleware
app.use(express.static("public"))

// view engine
app.set("view engine", "ejs")

// database connection
const DB_URI = process.env.DB_URI
mongoose
  .connect(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err))

// routes
app.get("/", (req, res) => res.render("home"))
app.get("/smoothies", (req, res) => res.render("smoothies"))
app.use(authRoutes)
