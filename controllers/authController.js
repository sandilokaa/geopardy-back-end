const authService = require("../services/authService");
const { generatedOTP } = require("../utils/otpGenerator");

/* ------------------- Handle Register ------------------- */

const handleRegister = async(req, res) => {

    const { name, email, password, phoneNumber, city, role } = req.body;

    const { status, status_code, message, data} = await authService.handleRegister({
        name,
        email,
        password,
        phoneNumber,
        city,
        picture: req.file,
        role
    });

    res.status(status_code).send({
        status: status,
        message: message,
        data: data,
    });

};

/* ------------------- End Handle Register ------------------- */


/* ------------------- Handle Login ------------------- */

const handleLogin = async(req, res) => {

    const { email, password } = req.body;

    const { status, status_code, message, data} = await authService.handleLogin({
        email,
        password
    });

    res.status(status_code).send({
        status: status,
        message: message,
        data: data,
    });

};

/* ------------------- End Handle Login ------------------- */


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


/* ------------------- Handle Forgot Password ------------------- */

const handleForgotPassword = async(req, res) => {

    const { email, userId } = req.body;

    const { status, status_code, message, data } = await authService.handleForgotPassword({
        email,
        userId,
        otp: generatedOTP()
    });

    res.status(status_code).send({
        status: status, 
        message: message,
        data: data,
    });

};

/* ------------------- End Handle Forgot Password ------------------- */


/* ------------------- Handle Verify Forgot Password ------------------- */

const handleVerifyForgotPassword = async(req, res) => {

    const { otp, isVerified } = req.body;

    const { status, status_code, message, data } = await authService.handleVerifyForgotPassword({
        otp,
        isVerified
    });

    res.status(status_code).send({
        status: status, 
        message: message,
        data: data,
    });

};

/* ------------------- End Handle Verify Forgot Password ------------------- */


/* ------------------- Handle Reset Forgot Password ------------------- */

const handleResetPassword = async(req, res) => {

    const { email, otp, password } = req.body;

    const { status, status_code, message, data } = await authService.handleResetPassword({
        email,
        otp,
        password
    });

    res.status(status_code).send({
        status: status, 
        message: message,
        data: data,
    });

};

/* ------------------- End Handle Reset Forgot Password ------------------- */


module.exports = { 
    handleRegister, 
    handleLogin, 
    handleCurrentUser,
    handleForgotPassword,
    handleVerifyForgotPassword,
    handleResetPassword
};