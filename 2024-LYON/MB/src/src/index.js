const express = require("express")
const loginRouter = require("./routes/login")

const app = express()

app.use("/login", loginRouter)

app.listen(80, "0.0.0.0", () => {
	console.log("Listening on port 80")
})