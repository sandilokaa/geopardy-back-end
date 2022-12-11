const adminRepository = require("../repositories/adminRepository");
const cloudinary = require("../cloudinaries/cloudinary");

class adminService {

    /* ------------------- Handle Admin Update Profile ------------------- */

    static async handleAdminUpdateProfile({ id, name, email, phoneNumber, city, picture }) {

        try {

            const getAdminById = await adminRepository.handleGetAdminById({ id });

            if (getAdminById.id == id) {

                let pictures = "";

                if (picture) {
                    const fileBase64 = picture.buffer.toString("base64");
                    const file = `data:${picture.mimetype};base64,${fileBase64}`;
                    const cloudinaryPicture = await cloudinary.uploader.upload(file);
                    pictures = cloudinaryPicture.url;
                } else {
                    pictures = getAdminById.picture;
                }

                if (!name) {
                    name = getAdminById.name;
                }

                if (!email) {
                    email = getAdminById.email;
                }

                if (!phoneNumber) {
                    phoneNumber = getAdminById.phoneNumber;
                }

                if (!city) {
                    city = getAdminById.city;
                }


                const updatedAdminProfile = await adminRepository.handleAdminUpdateProfile({
                    id,
                    name,
                    email,
                    phoneNumber,
                    city,
                    picture: pictures
                });

                return {
                    status: true,
                    status_code: 200,
                    message: "Admin berhasil merubah profile akun!",
                    data: {
                        updatedAdmin: updatedAdminProfile,
                    },
                };
            }

        } catch (err) {

            return {
                status: false,
                status_code: 500,
                message: err.message,
                data: {
                    updatedAdmin: null,
                },
            };

        }
    };

    /* ------------------- End Handle Admin Update Profile ------------------- */


    /* ------------------- Handle Create Risk Level ------------------- */

    static async handleCreateRiskLevel({ riskLevel }) {
        
        try {

            if (!riskLevel) {
                return {
                    status: false,
                    status_code: 400,
                    message: "Risk level wajib diisi",
                    data: {
                        riskLevel: null,
                    }
                }
            }

            const createdRiskLevel = await adminRepository.handleCreateRiskLevel({ riskLevel });

            return {
                status: true,
                status_code: 201,
                message: "Risk level berhasil dibuat!",
                data: {
                    riskLevel: createdRiskLevel
                }
            };

        } catch (err) {
            return {
                status: false,
                status_code: 500,
                message: err.message,
                data: {
                    forgotPassword: null
                },
            };
        }

    }

    /* ------------------- End Handle Create Risk Level ------------------- */

};

module.exports = adminService;