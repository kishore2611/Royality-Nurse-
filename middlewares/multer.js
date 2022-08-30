const multer = require('multer');


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      if (file.fieldname == "profilePicture") {
        cb(null, "./uploads/profile/");
      }
      else if (file.fieldname == "driverLicense") { 
        cb(null, "./uploads/driverLicense/");
      } 
      else if (file.fieldname == "cnaCertificate") {
         cb(null, "./uploads/cnaCertificate/");
      }
      else if (file.fieldname == "nursingLicense") {
        cb(null, "./uploads/nursingLicense/");
      }
      else if (file.fieldname == "socialSecurity") {
        cb(null, "./uploads/socialSecurity/");
      }
      else if (file.fieldname == "cpr") {
        cb(null, "./uploads/cpr/");
      }
      else if (file.fieldname == "bls") {
        cb(null, "./uploads/bls/");
      }
      else if (file.fieldname == "acls") {
        cb(null, "./uploads/acls/");
      }
      else if (file.fieldname == "covidVaccination") {
        cb(null, "./uploads/covidVaccination/");
      }
      else if (file.fieldname == "hepatitesSeries") {
        cb(null, "./uploads/hepatitesSeries/");
      }
    },
    filename: function (req, file, cb) {
      cb(null, new Date().toISOString().replace(/:/g, "-") + file.originalname);
    },

    
  });
  function fileFilter(req, file, cb) {
    cb(null, true);
    if (
      file.mimetype === "image/jpeg" ||
      file.mimetype === "image/png" ||
      file.mimetype === "application/pdf"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  }
  const upload = multer({
    storage: storage,
    limits: {
      fileSize: 1024 * 1024 * 5,
    },
    fileFilter: fileFilter,
  }) 

  module.exports = {upload}