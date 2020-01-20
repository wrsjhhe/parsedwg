import md5 from "md5";
import axios from "axios";
import path from "path";

const preUploadUrl = "http://127.0.0.1:7001/file/preUpdate";
const doUploadUrl = "http://127.0.0.1:7001/file/onUpload";

class CommonUpload {
	constructor(filePath, fileData) {
		this.filePath = filePath;
		this.fileMd5 = md5(this.filePath);
		this.fileData = fileData;
	}

	async checkFile() {
		let fileName = this.fileData.name;
		let index1 = fileName.lastIndexOf(".") + 1;
		let index2 = fileName.length;
		let suffix = fileName.substring(index1, index2);
		let res = await axios.get(preUploadUrl, {
			params: {
				md5: this.fileMd5,
				name: this.fileData.name,
				size: this.fileData.size,
				type: suffix
			}
		});

		return res.data;
	}

	async doUpload() {
		let forms = new FormData();
		let configs = {
			headers: { "Content-Type": "multipart/form-data" }
		};

		forms.append("fileName", this.fileData.name);
		forms.append("file", this.fileData);
		let res = await axios.post(doUploadUrl, forms, configs);
		return res.data;
	}
}

export { CommonUpload };
