"use strict";

const Controller = require("egg").Controller;
const Utils = require("../utils");
const path = require("path");
const fs = require("fs-extra");
const stream = require("stream");
const mongoose = require("mongoose");
const md5 = require("md5");
const setRes = require("../response");

// 获取文件Chunk列表
async function getChunkList(filePath, folderPath) {
	let isFileExit = await Utils.isExist(filePath);
	let result = {};
	// 如果文件(文件名, 如:node-v7.7.4.pkg)已在存在, 不用再继续上传, 真接秒传
	if (isFileExit) {
		result = {
			stat: 0
		};
	} else {
		let isFolderExist = await Utils.isExist(folderPath);
		console.log(folderPath);
		// 如果文件夹(md5值后的文件)存在, 就获取已经上传的块
		let fileList = [];
		if (isFolderExist) {
			fileList = await Utils.listDir(folderPath);
		}
		result = {
			stat: 1,
			chunkList: fileList
		};
	}

	return result;
}

class FileController extends Controller {
	constructor(...args) {
		super(...args);
		this.uploadPath = path.join(this.config.baseDir, "app/public/uploads");
	}

	//检查文件md5
	async preUpdate() {
		let ctx = this.ctx;
		let res;

		let md5 = ctx.query.md5;
		let name = ctx.query.name;
		let type = ctx.query.type;
		let size = ctx.query.size;

		if (md5 === null || name === null || parseInt(size) < 0) {
			res = setRes(5);
			ctx.body = res;
			return;
		}
		let result = await ctx.model.Files.findOne({ uid: md5 });

		if (result === null) {
			//文件首次上传已经
			await ctx.model.Files.create({
				uid: md5,
				name: name,
				type: type,
				path: "",
				size: size,
				state: 2
			});
			res = setRes(3);
		} else if (result.state === 1) {
			//文件已存在
			res = setRes(2);
		} else if (result.state === 2) {
			//文件未上传完整
			const folderPath = path.join(this.uploadPath, md5);
			await Utils.folderIsExit(folderPath);
			const filePath = path.join(folderPath, md5);
			let chunkStat = await getChunkList(filePath, folderPath);
			if (chunkStat.stat === 0) {
				await ctx.model.Files.update({
					state: 1
				});
				res = setRes(2);
			} else {
				res = setRes(4, null, chunkStat.chunkList);
			}
		}

		ctx.body = res;
	}

	//上传文件
	async onUpload() {
		const ctx = this.ctx;
		const fileeStream = await ctx.getFileStream();

		//新建一个文件名
		let fileMd5 = md5(fileeStream);
		const filePath = path.join(this.uploadPath, fileMd5);
		await Utils.folderIsExit(filePath);

		const target = path.join(filePath, fileMd5);

		let writeRet = await Utils.writeFileStreamSyn(fileeStream, target);
		ctx.body = {
			code: writeRet ? 0 : 1
		};
	}

	async endUpload() {
		const ctx = this.ctx;
	}
}

module.exports = FileController;
