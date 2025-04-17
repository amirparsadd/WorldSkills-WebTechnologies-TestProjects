const express = require("express")
const loginRouter = require("./routes/login")
const { createDefaultAdmin } = require("./utils/defaultAdmin")

const app = express()

app.use("/login", loginRouter)

app.listen(80, "0.0.0.0", async () => {
	console.log("Listening on port 80")
	createDefaultAdmin()
})

module.exports = app