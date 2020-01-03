// 文件表
module.exports = app => {
	const mongoose = app.mongoose;
	const Schema = mongoose.Schema;

	const FileSchema = new Schema({
		uid: { type: String, unique: true }, // 文件id（md5）
		name: String, // 文件名
		type: String, // 类型
		path: String, //储存路径
		size: Number, // 文件大小
		state: Number, // 文件状态1完整，2未上传完整
		add_time: {
			type: Number,
			default: +new Date()
		}
	});
	FileSchema.index({ uid: 1, type: 1 });
	return mongoose.model("Files", FileSchema);
};
