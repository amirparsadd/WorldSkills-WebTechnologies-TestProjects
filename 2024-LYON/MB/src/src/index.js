const express = require("express")
const loginRouter = require("./routes/login")
const { createDefaultAdmin } = require("./utils/defaultAdmin")
const cookieParser = require("cookie-parser")
const companiesRouter = require("./routes/companies")
const productsRouter = require("./routes/products")

const app = express()

app.use(cookieParser())

app.use("/login", loginRouter)
app.use("/companies", companiesRouter)
app.use("/products", productsRouter)

app.listen(80, "0.0.0.0", async () => {
	console.log("Listening on port 80")
	createDefaultAdmin()
})

module.exports = app