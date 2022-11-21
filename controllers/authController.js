const authService = require("../services/authService");


/* ------------------- Handle Register ------------------- */

const handleRegister = async(req, res) => {

    const { name, email, password, phoneNumber, city, picture } = req.body;

    const { status, status_code, message, data} = await authService.handleRegister({
        name,
        email,
        password,
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

module.exports = { handleRegister, handleLogin };