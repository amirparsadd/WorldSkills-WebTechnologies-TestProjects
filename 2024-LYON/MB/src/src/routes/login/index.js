const { Router } = require("express");
const fs = require("fs");
const express = require("express");
const prismaClient = require("../../prisma");
const { hash } = require("../../utils/hash");

const router = Router()

router.get("/", (_ , res) => {
	return res.type("html").send(fs.readFileSync(__dirname + "/static/index.html"))
})

router.post("/", express.urlencoded(), (req, res) => {
	const { pass } = req.body

	if(!pass) return res.status(400).send("Invalid Data!")

	const admin = prismaClient.
		admin.findFirst({
			select: {
				passphrase: hash(pass)
			}
		})
	
	if(!admin) return res.status(401).send("Invalid Pass!")

	return res.cookie("pass", pass).type("html").send(fs.readFileSync(__dirname + "/static/success.html"))
})

const loginRouter = router // Better DX
module.exports = loginRouter