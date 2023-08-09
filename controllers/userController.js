const userService = require("../services/userService");


/* ------------------- Handle Get Sub District Data ------------------- */

const handleGetSubDistrictData = async(req, res) => {

    const { districtName } = req.query;

    const { status, status_code, message, data} = await userService.handleGetSubDistrictData({
        districtName
    });

    res.status(status_code).send({
        status: status,
        message: message,
        data: data,
    });

};

/* ------------------- End Handle Get Sub District Data ------------------- */


/* ------------------- Handle Get Sub District Data By Id ------------------- */

const handleGetSubDistrictDataById = async(req, res) => {

    const { id } = req.params;

    const { status, status_code, message, data} = await userService.handleGetSubDistrictDataById({
        id
    });

    res.status(status_code).send({
        status: status,
        message: message,
        data: data,
    });

};

/* ------------------- End Handle Get Sub District Data By Id ------------------- */


module.exports = { 
    handleGetSubDistrictData,
    handleGetSubDistrictDataById
};

