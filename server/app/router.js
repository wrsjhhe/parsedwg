"use strict";

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
	const { router, controller } = app;
	router.get("/", controller.home.index);

	//文件
	router.get("/file/preUpdate", controller.file.preUpdate);
	router.post("/file/onUpload", controller.file.onUpload);
	router.post("/file/endUpload", controller.file.endUpload);

	router.post("/convert/convertDwg", controller.convert.convertDwg);
};
