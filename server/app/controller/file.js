"use strict";

const Controller = require("egg").Controller;
const Utils = require("../utils");
const crypto = require("crypto");
const path = require("path");
const fs = require("fs-extra");

class FileController extends Controller {
	async upload() {
		const ctx = this.ctx;
		const stream = await ctx.getFileStream();

		//新建一个文件名
		let fileMd5 = await Utils.getMd5byStream(stream);
		const filename = fileMd5 + path.extname(stream.filename).toLocaleLowerCase();
		//文件生成绝对路径
		//当然这里这样市不行的，因为你还要判断一下是否存在文件路径
		const target = path.join(this.config.baseDir, "app/public/uploads", filename);
		//生成一个文件写入 文件流
		const writeStream = fs.createWriteStream(target);

		stream.pipe(writeStream);
		writeStream.on("finish", () => {
			console.log("写入流关闭成功");
		});
		writeStream.on("error", () => {
			console.log("写入流关闭失败");
		});
		//文件响应
		ctx.body = {
			url: "/public/uploads/" + filename
		};
		/////
		/* const { ctx } = this;

		let stream = await ctx.getFileStream();
		let filename = new Date().getTime() + stream.filename; // stream对象也包含了文件名，大小等基本信息

		// 创建文件写入路径
		let target = path.join(this.config.baseDir, "app/public/uploads", filename);

		const result = await new Promise((resolve, reject) => {
			// 创建文件写入流
			const remoteFileStrem = fs.createWriteStream(target);
			// 以管道方式写入流
			stream.pipe(remoteFileStrem);

			let errFlag;
			// 监听error事件
			remoteFileStrem.on("error", err => {
				errFlag = true;
				// 停止写入
				sendToWormhole(stream);
				remoteFileStrem.destroy();
				console.log(err);
				reject(err);
			});

			// 监听写入完成事件
			remoteFileStrem.on("finish", () => {
				if (errFlag) return;
				resolve({ filename, name: stream.fields.name });
			});
		});

		ctx.body = { code: 200, message: "", data: result }; */
	}
}

module.exports = FileController;
