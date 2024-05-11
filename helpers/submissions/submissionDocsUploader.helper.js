const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./static/"); // Ensure this directory exists
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + uuidv4() + "-" + file.originalname
    );
  },
});

const upload = multer({ storage: storage });
module.exports = upload;
