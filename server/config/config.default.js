/* eslint valid-jsdoc: "off" */

"use strict";

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
	/**
	 * built-in config
	 * @type {Egg.EggAppConfig}
	 **/
	const config = (exports = {});

	// use for cookie sign key, should change to your own and keep security
	config.keys = appInfo.name + "_1577794204624_8129";

	// add your middleware config here
	config.middleware = [];

	// add your user config here
	const userConfig = {
		// myAppName: 'egg',
		security: {
			csrf: {
				enable: false
			}
		}
	};

	// 连接数据库
	exports.mongoose = {
		client: {
			url: "mongodb://127.0.0.1/ParseDwg",
			options: {}
		},
		open() { }
	};

	config.cors = {
		origin: '*',
		allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH'
	};

	config.multipart = {
		whitelist: [   // 只允许上传png格式
			'.dwg',
		],
		fileSize: '100mb',  // 最大5mb  
	};

	return {
		...config,
		...userConfig
	};
};
