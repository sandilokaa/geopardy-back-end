const adminService = require("../services/adminService");

/* ------------------- Handle Admin Update Profile ------------------- */

const handleAdminUpdateProfile = async(req, res) => {

    const { id } = req.params;

    const { name, email, phoneNumber, city } = req.body;

    const { status, status_code, message, data} = await adminService.handleAdminUpdateProfile({
        id,
        name,
        email,
        phoneNumber,
        city,
        picture: req.file
    });

    res.status(status_code).send({
        status: status,
        message: message,
        data: data,
    });

};

/* ------------------- End Handle Admin Update Profile ------------------- */


/* ------------------- Handle Create Risk Level ------------------- */

const handleCreateRiskLevel = async(req, res, next) => {

    const { riskLevel } = req.body;

    const { status, status_code, message, data} = await adminService.handleCreateRiskLevel({
        riskLevel
    });

    res.status(status_code).send({
        status: status,
        message: message,
        data: data,
    });

}

/* ------------------- End Handle Create Risk Level ------------------- */


module.exports = { 
    handleAdminUpdateProfile,
    handleCreateRiskLevel 
};