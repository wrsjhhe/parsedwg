"use strict";

const Controller = require("egg").Controller;
const Utils = require("../utils");
const path = require("path");
const fs = require("fs-extra");
const stream = require('stream')
const mongoose = require('mongoose');
const md5 = require("md5");

class FileController extends Controller {
	//上传文件
	async upload() {
		const ctx = this.ctx;
		const fileeStream = await ctx.getFileStream();

		//新建一个文件名
		let fileMd5 = md5(fileeStream);;
		const filePath = path.join(this.config.baseDir, "app/public/uploads", fileMd5);
		await Utils.folderIsExit(filePath);

		const target = path.join(filePath, fileMd5);

		//生成一个文件写入 文件流
		const writeStream = fs.createWriteStream(target);

		fileeStream.pipe(writeStream);
		writeStream.on("finish", () => {
			writeStream.close();
			console.log("写入流关闭成功");
		});
		writeStream.on("error", () => {
			writeStream.close();
			console.log("写入流关闭失败");
		});


		//响应
		ctx.body = {
			code: 0
		};
	}

	//检查文件md5
	async checkMd5() {

	}
}

module.exports = FileController;
