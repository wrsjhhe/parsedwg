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

	// 文件夹是否存在, 不存在则创建文件
	static async folderIsExit(folder) {
		console.log("folderIsExit", folder);
		return new Promise(async (resolve, reject) => {
			let result = await fs.ensureDirSync(path.join(folder));
			console.log("result----", result);
			resolve(true);
		});
	}

	// 文件或文件夹是否存在
	static async isExist(filePath) {
		return new Promise((resolve, reject) => {
			fs.stat(filePath, (err, stats) => {
				// 文件不存在
				if (err && err.code === "ENOENT") {
					resolve(false);
				} else {
					resolve(true);
				}
			});
		});
	}

	// 列出文件夹下所有文件
	static async listDir(path) {
		return new Promise((resolve, reject) => {
			fs.readdir(path, (err, data) => {
				if (err) {
					reject(err);
					return;
				}
				// 把mac系统下的临时文件去掉
				if (data && data.length > 0 && data[0] === ".DS_Store") {
					data.splice(0, 1);
				}
				resolve(data);
			});
		});
	}

	static async writeFileStreamSyn(fileeStream, target) {
		const writeStream = fs.createWriteStream(target);
		fileeStream.pipe(writeStream);
		return new Promise((resolve, reject) => {
			writeStream.on("finish", () => {
				writeStream.close();
				resolve(true);
			});
			writeStream.on("error", () => {
				writeStream.close();
				resolve(false);
			});
		});
	}
}

module.exports = Utils;
