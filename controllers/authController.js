const authService = require("../services/authService");

/* ------------------- Handle Admin Register ------------------- */

const handleAdminRegister = async(req, res) => {

    const { name, email, password, phoneNumber } = req.body;

    const { status, status_code, message, data} = await authService.handleAdminRegister({
        name,
        email,
        password,
        phoneNumber
    });

    res.status(status_code).send({
        status: status,
        message: message,
        data: data,
    });

};

/* ------------------- End Handle Admin Register ------------------- */


/* ------------------- Handle Admin Login ------------------- */

const handleAdminLogin = async(req, res) => {

    const { email, password } = req.body;

    const { status, status_code, message, data} = await authService.handleAdminLogin({
        email,
        password
    });

    res.status(status_code).send({
        status: status,
        message: message,
        data: data,
    });

};

/* ------------------- End Handle Admin Login ------------------- */


/* ------------------- Handle Current User ------------------- */

const handleCurrentUser = async (req, res) => {
    
    const currentUser = req.user;

    res.status(200).send({
        status: true,
        message: "Berhasil mendapatkan data pengguna yang sedang login!",
        data: {
            currentUser: currentUser,
        }
    });
};

/* ------------------- End Handle Current User ------------------- */


module.exports = { 
    handleAdminRegister, 
    handleAdminLogin, 
    handleCurrentUser
};