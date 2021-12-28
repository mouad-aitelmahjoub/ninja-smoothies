const handleUserErrors = (err) => {
  let errorMessages = { email: "", password: "" }

  //login with incorrect email
  if (err.message.includes("incorrect email")) {
    errorMessages.email = "That email is not registered"
  }

  //login with incorrect password
  if (err.message.includes("incorrect password")) {
    errorMessages.password = "That password is incorrect"
  }

  //validate duplicate email
  if (err.code === 11000) {
    errorMessages.email = "That email is already taken"
    return errorMessages
  }
  //validation errors
  if (err.message.includes("user validation failed")) {
    Object.values(err.errors).forEach((error) => {
      const { path, message } = error.properties
      errorMessages[path] = message
    })
  }

  return errorMessages
}

export { handleUserErrors }
