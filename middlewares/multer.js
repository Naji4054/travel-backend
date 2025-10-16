import multer from "multer";


 const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
      },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
      }
})

 const upload = multer( {
    storage: storage,
    limits: {fileSize: 30 * 1024 * 1024}
})

export const multipleUpload = upload.array("images", 10)

