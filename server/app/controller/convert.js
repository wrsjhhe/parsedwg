"use strict";

const Controller = require("egg").Controller;
const exec = require("child_process").execFile;
const path = require("path");

class ConvertController extends Controller {
	constructor(...args) {
		super(...args);
		this.convertExePath = path.join(this.config.baseDir, "program/CppTest.exe");
	}

	async convertDwg() {
		const ctx = this.ctx;
		console.log("open start");
		exec(this.convertExePath, ["this is test"], (err, data) => {
			console.log(err);
			console.log(data.toString());
		});
		console.log("open end");
		ctx.body = "abc";
	}
}

module.exports = ConvertController;
