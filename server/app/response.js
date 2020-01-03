const codeMap = {
	0: "成功",
	1: "失败",
	2: "文件已存在",
	3: "文件不存在",
	4: "文件部分上传",
	5: "参数错误"
};

function setResponse(code, message = null, extra = null) {
	if (message === null) {
		message = codeMap[code];
	}
	let resBody = {
		code: code,
		message: message,
		extra: extra
	};

	return resBody;
}

module.exports = setResponse;
