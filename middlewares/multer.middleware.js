import multer from "multer";

const storage = multer.diskStorage({
    destination: function (req,file,cb) {
        cb(null,"./public/temp")
    },
    filename: function (req,file,cb) {
        cb(null,Date.now() + '-' + file.fieldname + '.jpg')
    }
})

export const upload = multer({
    storage
})