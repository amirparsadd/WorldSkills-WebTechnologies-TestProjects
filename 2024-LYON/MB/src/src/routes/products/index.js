const { Router } = require("express");
const fs = require("fs");
const express = require("express")
const adminCheckMiddleware = require("../../middlewares/adminCheck");
const prismaClient = require("../../prisma");
const { isGTINAvailable } = require("../../utils/gtin");

const router = Router()

router.use(adminCheckMiddleware)

router.get("/", (_ , res) => {
	return res.type("html").send(fs.readFileSync(__dirname + "/static/index.html"))
})

router.get("/:gtin.json", async (req, res) => {
	const { gtin } = req.params

	const product = await prismaClient.
		product.findFirst({
			where: {
				gtin: {
					equals: gtin
				}
			}
		})
	
	if(!product) return res.status(404).send({ success: false, error: "Not Found" })

	res.send({ success: true, error: "", ...product })
})

router.get("/toggle/:gtin", async (req, res) => {
	const { gtin } = req.params

	const product = await prismaClient.
		product.findFirst({
			where: {
				gtin: { 
					equals: gtin
				}
			},
			include: {
				company: true
			}
		})
	
	if(!product) return res.status(404).send("Product Not Found")
	if(product.company.deactivated && product.hidden) return res.status(400).send("Cannot Activate Product When Company IS Deactivated")

	await prismaClient.
		product.update({
			where: {
				gtin
			},
			data: {
				hidden: {
					set: !product.hidden
				}
			}
		})
	
	return res.redirect("/products")
})

router.get("/delete/:gtin", async (req, res) => {
	const { gtin } = req.params

	const product = await prismaClient.
		product.findFirst({
			where: {
				gtin: { 
					equals: gtin
				}
			}
		})
	
	if(!product) return res.status(404).send("Product Not Found")
	if(!product.hidden) return res.status(400).send("Product Must Be Hidden")

	await prismaClient.
		product.delete({
			where: {
				gtin
			}
		})
	
	return res.redirect("/products")
})

router.get("/list", async (_, res) => {
	const products = await prismaClient.
		product.findMany()
	
	res.send(products)
})

router.post("/", express.urlencoded(), async (req, res) => {
	const {
		name_EN, name_FR, gtin, companyID,
		brand, country,
		weightUnit, // grossWeight and netContentWeight are raw
		desc_EN, desc_FR
	} = req.body

	const grossWeight = parseFloat(req.body.grossWeight)
	const netContentWeight = parseFloat(req.body.netContentWeight)
	const gtinAvailable = await isGTINAvailable(gtin)

	if(!gtinAvailable || grossWeight === NaN || netContentWeight === NaN)
		return res.status(400).send("Invalid Data")

	await prismaClient.
		product.create({
			data: {
				name_EN,
				name_FR,
				brand,
				country,
				grossWeight,
				gtin,
				weightUnit,
				netContentWeight,
				desc_EN,
				desc_FR,
				companyID: parseInt(companyID)
			}
		})

	return res.type("html").send(fs.readFileSync(__dirname + "/static/success.html"))
})

const productsRouter = router // Better DX
module.exports = productsRouter