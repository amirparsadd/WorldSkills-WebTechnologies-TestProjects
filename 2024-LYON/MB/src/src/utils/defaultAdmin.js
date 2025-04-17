const prismaClient = require("../prisma")
const { hash } = require("./hash")

const DEFAULT_ADMIN = "admin"

async function createDefaultAdmin() {
	const admin = await prismaClient.
		admin.findFirst({
			where: {
				passphrase: hash(DEFAULT_ADMIN)
			}
		})

	if(!admin){
		console.log("Default Admin Not Found! Creating it...")

		await prismaClient.
			admin.create({
				data: {
					passphrase: hash(DEFAULT_ADMIN)
				}
			})

		console.log("Created Default Admin")
	} else {
		console.log("Default Admin Found!")
	}
}

module.exports = { createDefaultAdmin }