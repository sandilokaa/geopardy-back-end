const authRepository = require("../repositories/authRepository");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { JWT } = require("../libs/jwtSecurity");

const SALT_ROUND = 10;

class AuthService {

    /* ------------------- Handle Admin Register ------------------- */

    static async handleAdminRegister({ name, email, password, phoneNumber }) {

        try {

            // ------------------------- Payload Validation ------------------------- //

            if (!name) {
                return {
                    status: false,
                    status_code: 400,
                    message: "Name is required!",
                    data: {
                        registeredAdmin: null,
                    },
                };
            }

            if (!email) {
                return {
                    status: false,
                    status_code: 400,
                    message: "Email is required!",
                    data: {
                        registeredAdmin: null,
                    },
                };
            }

            if (!password) {
                return {
                    status: false,
                    status_code: 400,
                    message: "Password is required!",
                    data: {
                        registeredAdmin: null,
                    },
                };
            } else if (password.length < 8) {
                return {
                    status: false,
                    status_code: 400,
                    message: "Admin password is at least 8 characters long!",
                    data: {
                        registeredAdmin: null,
                    },
                };
            }

            if (!phoneNumber) {
                return {
                    status: false,
                    status_code: 400,
                    message: "Phone Number is required!",
                    data: {
                        registeredAdmin: null,
                    },
                };
            }

            // ------------------------- End Payload Validation ------------------------- //

            const getAdminByEmail = await authRepository.handleGetAdminByEmail({ email });

            if (getAdminByEmail) {

                return {
                    status: false,
                    status_code: 400,
                    message: "Email already in use!",
                    data: {
                        registeredAdmin: null,
                    },
                };

            } else {

                const hashedPassword = await bcrypt.hash(password, SALT_ROUND);

                const handleAdminRegistered = await authRepository.handleAdminRegister({
                    name,
                    email,
                    password: hashedPassword,
                    phoneNumber
                });

                return {
                    status: true,
                    status_code: 201,
                    message: "Successfully registered admin!",
                    data: {
                        registeredAdmin: handleAdminRegistered,
                    },
                };
            }

        } catch (err) {

            return {
                status: false,
                status_code: 500,
                message: err.message,
                data: {
                    registeredAdmin: null,
                },
            };

        }
    };

    /* ------------------- End Handle Admin Register ------------------- */


    /* ------------------- Handle Admin Login ------------------- */

    static async handleAdminLogin({ email, password }) {


        try {
            
            // ------------------------- Payload Validation ------------------------- //

            if (!email) {
                return {
                    status: false,
                    status_code: 400,
                    message: "Email is required!",
                    data: {
                        adminLogin: null,
                    },
                };
            }

            if (!password) {
                return {
                    status: false,
                    status_code: 400,
                    message: "Password is required!",
                    data: {
                        adminLogin: null,
                    },
                };
            } else if (password.length < 8) {
                return {
                    status: false,
                    status_code: 400,
                    message: "Admin password is at least 8 characters long!",
                    data: {
                        adminLogin: null,
                    },
                };
            }

            // ------------------------- End Payload Validation ------------------------- //


            const getAdminByEmail = await authRepository.handleGetAdminByEmail({ email });

            if (!getAdminByEmail) {
                return {
                    status: false,
                    status_code: 404,
                    message: "Email not registered ):",
                    data: {
                        adminLogin: null,
                    },
                };
            } else {

                const isPasswordMatch = await bcrypt.compare(password, getAdminByEmail.password);

                if (isPasswordMatch) {

                    const token = jwt.sign({
                        id: getAdminByEmail.id,
                        email: getAdminByEmail.email,
                    },
                        JWT.SECRET,
                        {
                            expiresIn: JWT.EXPIRED,
                        });

                    return {
                        status: true,
                        status_code: 201,
                        message: "Admin login successfully!",
                        data: {
                            token,
                        },
                    };

                } else {

                    return {
                        status: false,
                        status_code: 400,
                        message: "Your email or password is incorrect!",
                        data: {
                            adminLogin: null,
                        },
                    };

                }
            }

        } catch (err) {

            return {
                status: false,
                status_code: 500,
                message: err.message,
                data: {
                    adminLogin: null,
                },
            };

        }
    };

    /* ------------------- End Handle Login ------------------- */

};

module.exports = AuthService;