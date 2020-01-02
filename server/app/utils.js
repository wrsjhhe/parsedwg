"use strict";

const crypto = require("crypto");
const fs = require("fs-extra");
const path = require("path");
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
			stream.on("end", function () {
				let md5 = fsHash.digest("hex");
				stream.unpipe();
				resolve(md5);
				return md5;
			});

			stream.on("error", function () {
				reject("get md5 error");
				return null;
			});
		});
	}

	// 文件夹是否存在, 不存在则创建文件
	static async folderIsExit(folder) {
		console.log("folderIsExit", folder);
		return new Promise(async (resolve, reject) => {
			let result = await fs.ensureDirSync(path.join(folder));
			console.log("result----", result);
			resolve(true);
		});
	}
}

module.exports = Utils;
