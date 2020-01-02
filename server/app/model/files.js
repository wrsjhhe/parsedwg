// 文件表
module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;

    const FileSchema = new Schema({
        uid: String,                // 文件id（md5）
        name: String,               // 文件名
        type: String,               // 类型
        size: Number,                // 文件大小
        add_time: {
            type: Number,
            default: +new Date()
        }
    });

    return mongoose.model('Files', FileSchema);
}