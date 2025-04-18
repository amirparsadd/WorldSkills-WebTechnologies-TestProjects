const prismaClient = require("../prisma")

/**
 * 
 * @param {String} gtin 
 */
function validateGTINFormat(gtin){
	if(![14, 15].includes(gtin.length)) return false
	
	let status = true

	gtin.split().forEach(el => {
		const nums = "1234567890".split()

		if(!nums.includes(el)) {status = false}
	})

	return status
}

/**
 * 
 * @param {String} gtin 
 */
async function validateGTINServer(gtin) {
	const product = await prismaClient.
		product.findFirst({
			where: { gtin }
		})
	
	return !!product
}

/**
 * 
 * @param {String} gtin 
 */
async function isGTINAvailable(gtin) {
	return validateGTINFormat(gtin) && !(await validateGTINServer())
}

module.exports = { validateGTINFormat, validateGTINServer, isGTINAvailable }