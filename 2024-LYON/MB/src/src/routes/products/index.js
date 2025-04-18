const { Router } = require("express");
const fs = require("fs");
const express = require("express")
const adminCheckMiddleware = require("../../middlewares/adminCheck");
const prismaClient = require("../../prisma");

const router = Router()

router.use(adminCheckMiddleware)

router.get("/", (_ , res) => {
	return res.type("html").send(fs.readFileSync(__dirname + "/static/index.html"))
})

router.get("/list", async (_, res) => {
	const products = await prismaClient.
		product.findMany()
	
	res.send(products)
})

const productsRouter = router // Better DX
module.exports = productsRouter