const authRepository = require("../repositories/authRepository");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT } = require("../libs/jwtSecurity");
const cloudinary = require("../cloudinaries/cloudinary");

const SALT_ROUND = 10;

class authService {

    /* ------------------- Handle Register ------------------- */

    static async handleRegister({ name, email, password, phoneNumber, city, picture, role }) {

        try {

            // ------------------------- Payload Validation ------------------------- //

            if (!name) {
                return {
                    status: false,
                    status_code: 400,
                    message: "Nama admin wajib diisi!",
                    data: {
                        registeredUser: null,
                    },
                };
            }

            if (!email) {
                return {
                    status: false,
                    status_code: 400,
                    message: "Email admin wajib diisi!",
                    data: {
                        registeredUser: null,
                    },
                };
            }

            if (!password) {
                return {
                    status: false,
                    status_code: 400,
                    message: "Password admin wajib diisi!",
                    data: {
                        registeredUser: null,
                    },
                };
            } else if (password.length < 8) {
                return {
                    status: false,
                    status_code: 400,
                    message: "Password admin minimal 8 karakter!",
                    data: {
                        registeredUser: null,
                    },
                };
            }

            if (!phoneNumber) {
                return {
                    status: false,
                    status_code: 400,
                    message: "Nomor telepon admin wajib diisi!",
                    data: {
                        registeredUser: null,
                    },
                };
            }

            if (!city) {
                return {
                    status: false,
                    status_code: 400,
                    message: "Kota admin wajib diisi!",
                    data: {
                        registeredUser: null,
                    },
                };
            }

            if (!picture) {
                return {
                    status: false,
                    status_code: 400,
                    message: "Foto profile admin wajib diisi!",
                    data: {
                        registeredUser: null,
                    },
                };
            }

            if (!role) {
                return {
                    status: false,
                    status_code: 400,
                    message: "Role wajib diisi!",
                    data: {
                        registeredUser: null,
                    },
                };
            }

            // ------------------------- End Payload Validation ------------------------- //

            const getUserByEmail = await authRepository.handleGetUserByEmail({ email });

            if (getUserByEmail) {

                return {
                    status: false,
                    status_code: 400,
                    message: "Email sudah digunakan!",
                    data: {
                        registeredUser: null,
                    },
                };

            } else {

                const hashedPassword = await bcrypt.hash(password, SALT_ROUND);

                let pictures = "";

                if (picture) {
                    const fileBase64 = picture.buffer.toString("base64");
                    const file = `data:${picture.mimetype};base64,${fileBase64}`;
                    const cloudinaryPicture = await cloudinary.uploader.upload(file);
                    pictures = cloudinaryPicture.url;
                }

                const createdUser = await authRepository.handleRegister({
                    name,
                    email,
                    password: hashedPassword,
                    phoneNumber,
                    city,
                    picture: pictures,
                    role
                });

                return {
                    status: true,
                    status_code: 201,
                    message: "Berhasil mendaftarkan user!",
                    data: {
                        registeredUser: createdUser,
                    },
                };
            }

        } catch (err) {

            return {
                status: false,
                status_code: 500,
                message: err.message,
                data: {
                    registeredUser: null,
                },
            };

        }
    };

    /* ------------------- End Handle Register ------------------- */


    /* ------------------- Handle Login ------------------- */

    static async handleLogin({ email, password }) {


        try {
            
            // ------------------------- Payload Validation ------------------------- //

            if (!email) {
                return {
                    status: false,
                    status_code: 400,
                    message: "Email wajib diisi",
                    data: {
                        login_user: null,
                    },
                };
            }

            if (!password) {
                return {
                    status: false,
                    status_code: 400,
                    message: "Password wajib diisi",
                    data: {
                        login_user: null,
                    },
                };
            } else if (password.length < 8) {
                return {
                    status: false,
                    status_code: 400,
                    message: "Password minimal 8 karakter",
                    data: {
                        login_user: null,
                    },
                };
            }

            // ------------------------- End Payload Validation ------------------------- //


            const getUserByEmail = await authRepository.handleGetUserByEmail({ email });

            if (!getUserByEmail) {
                return {
                    status: false,
                    status_code: 404,
                    message: "Email belum terdaftar",
                    data: {
                        logedinUser: null,
                    },
                };
            } else {

                const isPasswordMatch = await bcrypt.compare(password, getUserByEmail.password);

                if (isPasswordMatch) {

                    const token = jwt.sign({
                        id: getUserByEmail.id,
                        email: getUserByEmail.email,
                    },
                        JWT.SECRET,
                        {
                            expiresIn: JWT.EXPIRED,
                        });

                    return {
                        status: true,
                        status_code: 201,
                        message: "User berhasil login!",
                        data: {
                            token,
                        },
                    };

                } else {

                    return {
                        status: false,
                        status_code: 400,
                        message: "Email atau password anda salah!",
                        data: {
                            logedinUser: null,
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
                    registeredUser: null,
                },
            };

        }
    };

    /* ------------------- End Handle Login ------------------- */

};

module.exports = authService;