/**
 * 改下保存的文件名
 */
import * as multer from "multer";
import * as fs from 'fs';

// multer.distkStorage 是磁盘存储
const storage = multer.diskStorage({
    // 保存的目录
    destination: function (req, file, cb) {
        try {
            fs.mkdirSync('uploads');
        }
        catch(e) {}

        cb(null, 'uploads')
    },

    // 保存的文件名
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9) + '-' + file.originalname
        
        cb(null, uniqueSuffix)
    }
});

export { storage };
