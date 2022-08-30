const User = require("../models/User");
const Document = require("../models/documents");

const documents = async (req, res) => {
  try {
    const finddoc = await Document.findOne({ user_id: req.user._id });
    console.log(finddoc.driverLicense.status)
    if (finddoc) {
      const updatedoc = await Document.findOneAndUpdate(
        { user_id: finddoc.user_id },
        {
          "driverLicense.document": req.files.driverLicense
            ? req.files.driverLicense[0].path
            : req.body.driverLicense,
          "driverLicense.status": req.files.driverLicense ? 1 : finddoc.driverLicense.status,
          "cnaCertificate.document": req.files.cnaCertificate
            ? req.files.cnaCertificate[0].path
            : req.body.cnaCertificate,
          "cnaCertificate.status": req.files.cnaCertificate ? 1 : finddoc.cnaCertificate.status,
          "nursingLicense.document": req.files.nursingLicense
            ? req.files.nursingLicense[0].path
            : req.body.nursingLicense,
          "nursingLicense.status": req.files.nursingLicense ? 1 : finddoc.nursingLicense.status,
          "socialSecurity.document": req.files.socialSecurity
            ? req.files.socialSecurity[0].path
            : req.body.socialSecurity,
          "socialSecurity.status": req.files.socialSecurity ? 1 : finddoc.socialSecurity.status,
          "cpr.document": req.files.cpr ? req.files.cpr[0].path : req.body.cpr,
          "cpr.status": req.files.cpr ? 1 : finddoc.cpr.status,
          "bls.document": req.files.bls ? req.files.bls[0].path : req.body.bls,
          "bls.status": req.files.bls ? 1 : finddoc.bls.status,
          "acls.document": req.files.acls
            ? req.files.acls[0].path
            : req.body.acls,
          "acls.status": req.files.acls ? 1 : finddoc.acls.status,
          "covidVaccination.document": req.files.covidVaccination
            ? req.files.covidVaccination[0].path
            : req.body.covidVaccination,
          "covidVaccination.status": req.files.covidVaccination ? 1 : finddoc.covidVaccination.status,
          "hepatitesSeries.document": req.files.hepatitesSeries
            ? req.files.hepatitesSeries[0].path
            : req.body.hepatitesSeries,
          "hepatitesSeries.status": req.files.hepatitesSeries ? 1 : finddoc.hepatitesSeries.status,
        },
        { new: true }
      );
      return res.status(200).send({
        status: 1,
        message: "Documents Updated",
        updatedoc,
      });
    } else {
      if (!req.files) {
        return res.status(400).send({
          status: 0,
          message: "Files are Required",
        });
      }
      // else if(!req.files.cnaCertificate){
      //     return res.status(400).send({
      //         status: 0,
      //         message: 'cnaCertificate is Required',
      //     })
      // }
      // else if(!req.files.nursingLicense){
      //     return res.status(400).send({
      //         status: 0,
      //         message: 'nursingLicense is Required',
      //     })
      // }
      // else if(!req.files.hepatitesSeries){
      //     return res.status(400).send({
      //         status: 0,
      //         message: 'hepatitesSeries is Required',
      //     })
      // }
      // else if(!req.files.covidVaccination){
      //     return res.status(400).send({
      //         status: 0,
      //         message: 'covidVaccination is Required',
      //     })
      // }
      // else if(!req.files.acls){
      //     return res.status(400).send({
      //         status: 0,
      //         message: 'acls is Required',
      //     })
      // }
      // else if(!req.files.bls){
      //     return res.status(400).send({
      //         status: 0,
      //         message: 'bls is Required',
      //     })
      // }
      // else if(!req.files.socialSecurity){
      //     return res.status(400).send({
      //         status: 0,
      //         message: 'social Security is Required',
      //     })
      // }
      // else if(!req.files.cpr){
      //     return res.status(400).send({
      //         status: 0,
      //         message: 'cpr is Required',
      //     })
      // }
      else {
        const doc = await Document.create({
          user_id: req.user._id,
          "driverLicense.document": req.files.driverLicense
            ? req.files.driverLicense[0].path
            : req.body.driverLicense,
          "driverLicense.status": req.files.driverLicense ? 1 : 0,
          "cnaCertificate.document": req.files.cnaCertificate
            ? req.files.cnaCertificate[0].path
            : req.body.cnaCertificate,
          "cnaCertificate.status": req.files.cnaCertificate ? 1 : 0,
          "nursingLicense.document": req.files.nursingLicense
            ? req.files.nursingLicense[0].path
            : req.body.nursingLicense,
          "nursingLicense.status": req.files.nursingLicense ? 1 : 0,
          "socialSecurity.document": req.files.socialSecurity
            ? req.files.socialSecurity[0].path
            : req.body.socialSecurity,
          "socialSecurity.status": req.files.socialSecurity ? 1 : 0,
          "cpr.document": req.files.cpr ? req.files.cpr[0].path : req.body.cpr,
          "cpr.status": req.files.cpr ? 1 : 0,
          "bls.document": req.files.bls ? req.files.bls[0].path : req.body.bls,
          "bls.status": req.files.bls ? 1 : 0,
          "acls.document": req.files.acls
            ? req.files.acls[0].path
            : req.body.acls,
          "acls.status": req.files.acls ? 1 : 0,
          "covidVaccination.document": req.files.covidVaccination
            ? req.files.covidVaccination[0].path
            : req.body.covidVaccination,
          "covidVaccination.status": req.files.covidVaccination ? 1 : 0,
          "hepatitesSeries.document": req.files.hepatitesSeries
            ? req.files.hepatitesSeries[0].path
            : req.body.hepatitesSeries,
          "hepatitesSeries.status": req.files.hepatitesSeries ? 1 : 0,
        });
        // doc.save()
        return res.status(200).send({
          status: 1,
          message: "documents uploaded successfully",
          data: doc,
        });
      }
    }
  } catch (error) {
    return res.status(400).send(error.message);
  }
};

const approvedoc = async (req, res) => {
  try {
    const docapprove = await Document.findByIdAndUpdate(
      { user_id: req.user._id },
      {
        "driverLicense.status": 2,
        "cnaCertificate.status": 2,
        "nursingLicense.status": 2,
        "socialSecurity.status": 2,
        "cpr.status": 2,
        "bls.status": 2,
        "acls.status": 2,
        "covidVaccination.status": 2,
        "hepatitesSeries.status": 2,
      },
      { new: true }
    );
    return res.status(200).send({
      status: 1,
      message: "success",
      docapprove,
    });
  } catch (error) {
    return res.status(400).send(error.message);
  }
};

module.exports = {
  documents,
  approvedoc
};
