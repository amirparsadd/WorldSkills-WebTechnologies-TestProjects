const prismaClient = require("../prisma")
const { hash } = require("../utils/hash")

/**
 * 
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 * @param {import("express").NextFunction} next 
 */
async function adminCheckMiddleware(req, res, next) {
	const pass = req.cookies.pass

	if(!pass) return res.redirect("/login")

	const admin = prismaClient.
		admin.findFirst({
			where: {
				passphrase: {
					equals: hash(pass)
				}
			}
		})
	
	if(!admin){
		return res.clearCookie("pass").redirect("login")
	}

	next()
}

module.exports = adminCheckMiddleware