import multer from "multer";
import { v1 as uuid } from "uuid";

const MIME_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpeg",
  "image/jpg": "jpg",
};

const fileUpload = multer({
  limits: 500000,
  storage: multer.diskStorage({
    destination: (req, file, callback) => {
      let productFolder;
      switch (req.body.product) {
        case "dish":
          productFolder = "dishes";
          break;
        case "drink":
          productFolder = "drinks";
          break;
        case "dessert":
          productFolder = "desserts";
          break;
        default:
          productFolder = "dishes";
      }
      callback(null, `uploads/images/${productFolder}`);
    },
    filename: (req, file, callback) => {
      // extract extension of the image from mimetype
      const extension = MIME_TYPE_MAP[file.mimetype];
      // generate unique filename with right extension
      const fileNameWithoutExtension = file.originalname.split(".")[0];
      callback(null, `${fileNameWithoutExtension}-${uuid()}.${extension}`);
    },
  }),
  fileFilter: (req, file, callback) => {
    // if upload file mimetype don't have png,jpeg,jpg we have null or undefine and we convert it to false (!!)
    // if it has right extension we convert it to true
    const isValid = !!MIME_TYPE_MAP[file.mimetype];
    let error = isValid ? null : new Error("Invalid mime type!");
    callback(error, isValid);
  },
});

const configuredUploadFileMiddleware = fileUpload.single("image");

export default configuredUploadFileMiddleware;
