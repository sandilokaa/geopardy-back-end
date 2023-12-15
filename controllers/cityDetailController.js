const cityDetailService = require("../services/cityDetailService");

/* ------------------- Handle Update City Detail ------------------- */

const handleUpdateCityDetail = async (req, res) => {

    const { id } = req.params;

    const { riskLevelId, latitude, longitude, description } = req.body;

    let picture = "";

    if (req.file) {
        picture = req.file.path;
    }

    const { status, status_code, message, data} = await cityDetailService.handleUpdateCityDetail({
        id,
        riskLevelId,
        latitude,
        longitude,
        description,
        picture
    });

    res.status(status_code).send({
        status: status,
        message: message,
        data: data,
    });

};

/* ------------------- End Handle Update City Detail ------------------- */

module.exports = { handleUpdateCityDetail };