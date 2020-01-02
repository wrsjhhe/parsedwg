"use strict";

const crypto = require("crypto");
const fs = require("fs-extra");

class Utils {
	static getRandom32() {
		return crypto
			.randomBytes(32)
			.toString("hex")
			.slice(0, 32);
	}

	static async getMd5byFilePath(filePath) {
		let stream = fs.createReadStream(filePath);
		return await this.getMd5byStream(stream);
	}

	static async getMd5byStream(stream) {
		let fsHash = crypto.createHash("md5");
		stream.on("data", fsHash.update.bind(fsHash));

		return new Promise((resolve, reject) => {
			stream.on("end", function() {
				let md5 = fsHash.digest("hex");
				stream.unpipe();
				resolve(md5);
				return md5;
			});

			stream.on("error", function() {
				reject("get md5 error");
				return null;
			});
		});
	}
}

module.exports = Utils;
