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


module.exports = { handleAdminUpdateProfile };