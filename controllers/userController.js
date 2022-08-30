const User = require('../models/User')
const Document = require('../models/documents')


const profileSetup = async (req, res) => {
    try {
        if (!req.body.name) {
            return res.status(400).send({
                status: 0,
                message: "name field is required"
            })
        }
        // else if (!req.body.licenseNumber) {
        //     return res.status(400).send({
        //         status: 0,
        //         message: "licenseNumber field is required"
        //     })
        // }
        // else if (!req.body.ssn) {
        //     return res.status(400).send({
        //         status: 0,
        //         message: "ssn field is required"
        //     })
        // }
        // else if (!req.body.position) {
        //     return res.status(400).send({
        //         status: 0,
        //         message: "position field is required"
        //     })
        // }
        else {

            if (req.file) {
                profilePicture = req.file.path
            }

            const setup = await User.findById(req.user._id)

            setup.name = req.body.name,
            setup.licenseNumber = req.body.licenseNumber,
            setup.ssn = req.body.ssn,
            setup.position = req.body.position,
            setup.profilePicture =  (req.file ? req.file.path : req.body.profilePicture)

            setup.save()

            return res.status(200).send({
                status: 1,
                message: "profile setup completed",
                data: {
                    setup: setup,
                    profilePicture: setup.profilePicture
                }
            })


        }

    } catch (error) {
        return res.status(400).send(error.message)
    }
}

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find()

        if(!users){
            return res.status(400).send({
                status: 0,
                message: "User not found"
            })
        }
        else{
            return res.status(200).send({
                status: 1,
                message: 'Success',
                users
            })

        }
    } catch (error) {
        return res.status(400).send(error.message)
    }
}

const userDetail = async (req, res) => {
    try {
        const user = await User.findById(req.user._id)

        if(!user){
            return res.status(400).send({
                status: 0,
                message: "User not found"
            })
        }
        else{
            return res.status(200).send({
                status: 1,
                message: 'Success',
                data: {
                    profilePicture: user.profilePicture,
                    name: user.name,
                    email: user.email,
                    licenseNumber : user.licenseNumber,
                    ssn : user.ssn,
                    position : user.position
                    
                }
            })

        }
    } catch (error) {
        return res.status(400).send(error.message)
    }
}

const getDocuments = async (req, res) => {
    try {
        const documents = await Document.findOne({user_id: req.user._id})
        if(!documents){
            return res.status(404).send({
                status: 0,
                message: 'not found'
            })
        }
        else{
            const {driverLicense, cnaCertificate, nursingLicense, socialSecurity, cpr, bls, acls, covidVaccination, hepatitesSeries} = documents
        return res.status(200).send({
            status: 1,
            message: 'Success',
            data: [driverLicense, cnaCertificate, nursingLicense, socialSecurity, cpr, bls, acls, covidVaccination, hepatitesSeries]

            // data: {
            //     driverLicense: documents[0].driverLicense,
            //     cnaCertificate: documents[0].cnaCertificate,
            //     nursingLicense: documents[0].nursingLicense,
            //     socialSecurity: documents[0].socialSecurity,
            //     cpr: documents[0].cpr,
            //     bls: documents[0].bls,
            //     acls: documents[0].acls,
            //     covidVaccination: documents[0].covidVaccination,
            //     hepatitesSeries: documents[0].hepatitesSeries
            // }
        })
            
        }
    } catch (error) {
        return res.status(400).send(error.message)
    }
}

const updateUser = async (req, res) => {
    try {
        if (req.file) {
            profilePicture = req.file.path
        }

        const updateuser = {
            name : req.body.name,
            profilePicture : (req.file ? req.file.path : req.body.profilePicture),
            licenseNumber : req.body.licenseNumber,
            ssn : req.body.ssn,
            position: req.body.position
        }

        const updateduser = await User.findByIdAndUpdate({_id: req.user._id}, updateuser, {new: true})

        // updateuser.name = req.body.name
        // updateuser.profilePicture = (req.file ? req.file.path : req.body.profilePicture)

        // updateuser.save()

        if(!updateduser) {
            return res.status(404).send({
                status: 0,
                message: 'not updated'
            })
        }
        else{
            // updateuser.name = req.body.name

            return res.status(200).send({
                status: 1,
                message: "success",
                data: updateduser
            })
        }
    } catch (error) {
        return res.status(400).send(error.message)
    }
}



module.exports = {
    profileSetup,
    userDetail,
    getDocuments,
    updateUser,
    getAllUsers
}