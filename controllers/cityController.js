const cityService = require("../services/cityService");

/* ------------------- Handle Create City ------------------- */

const handleCreateCity = async (req, res) => {

    const adminId = req.admin.id;

    const { cityName } = req.body;

    const { status, status_code, message, data} = await cityService.handleCreateCity({
        adminId,
        cityName
    });

    res.status(status_code).send({
        status: status,
        message: message,
        data: data,
    });

};

/* ------------------- End Handle Create City ------------------- */

module.exports = { handleCreateCity };