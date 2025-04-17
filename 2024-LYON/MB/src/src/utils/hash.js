const crypto = require("crypto")

/**
 * Hash String With Sha256
 * 
 * @param {String} string 
 */
function hash(string) {
	const result = crypto.createHash("sha256").update(string).digest().toString("hex")

	return result
}

module.exports = {
	hash
}