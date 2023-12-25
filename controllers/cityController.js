const cityService = require("../services/cityService");

/* ------------------- Handle Create City ------------------- */

const handleCreateCity = async (req, res) => {

    const adminId = req.admin.id;

    const { cityName, cityId } = req.body;

    const { status, status_code, message, data} = await cityService.handleCreateCity({
        adminId,
        cityName,
        cityId
    });

    res.status(status_code).send({
        status: status,
        message: message,
        data: data,
    });

};

/* ------------------- End Handle Create City ------------------- */


/* ------------------- Handle Get All City ------------------- */

const handleGetAllCity = async (req, res) => {

    const { cityName } = req.query;

    const { status, status_code, message, data} = await cityService.handleGetAllCity({
        cityName
    });

    res.status(status_code).send({
        status: status,
        message: message,
        data: data,
    });

};

/* ------------------- End Handle Get All City ------------------- */


module.exports = { handleCreateCity, handleGetAllCity };