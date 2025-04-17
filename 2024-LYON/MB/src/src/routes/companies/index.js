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
	const companies = await prismaClient.
		company.findMany({
			include: {
				contact: true,
				owner: true
			},
		})
	
	res.send(companies)
})

router.get("/toggle/:id", async (req, res) => {
	const id = parseInt(req.params.id)

	if(id === NaN) {
		return res.status(400).send("Invalid Data!")
	}

	const company = await prismaClient.
		company.findFirst({
			where: {
				id
			}
		})
	
	if(!company) {
		return res.status(404).send("Company Not Found")
	}

	await prismaClient.
		company.update({
			where: {
				id
			},
			data: {
				deactivated: {
					set: !company.deactivated
				}
			}
		})
	
	// TODO Hide Products
	
	return res.status(200).redirect("/companies")
})

router.post("/", express.urlencoded(), async (req, res) => {
	const {
		address, name, tel, email, // Company
		owner_name, owner_tel, owner_email, // Owner
		contact_name, contact_tel, contact_email, // Contact
	} = req.body

	const company = await prismaClient.
		company.create({
			data: {
				address,
				name,
				email,
				tel,
				contact: {
					create: {
						email: contact_email,
						tel: contact_tel,
						name: contact_name
					}
				},
				owner: {
					create: {
						email: owner_email,
						tel: owner_tel,
						name: owner_name
					}
				}
			}
		})
	
	return res.type("html").send(fs.readFileSync(__dirname + "/static/success.html"))
})

const companiesRouter = router // Better DX
module.exports = companiesRouter