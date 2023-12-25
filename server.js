const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");

const fileUpload = require("./utils/fileUpload");

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

// ------------------------- Public File Access ------------------------- //

app.use("/storages", express.static(path.join(__dirname, "storages")));

// ------------------------- End Public File Access ------------------------- //



// ------------------------- Import Controllers ------------------------- //

const authController = require("./controllers/authController");
const riskLevelController = require("./controllers/riskLevelController");
const cityController = require("./controllers/cityController");
const cityDetailController = require("./controllers/cityDetailController");

// ------------------------- End Import Controllers ------------------------- //



// ------------------------- Import middlewares ------------------------- //

const middleware = require("./middlewares/auth");

// ------------------------- End Import middlewares ------------------------- //



// ------------------------- Define Routes ------------------------- //


/* -------------- Auth Endpoint -------------- */

app.post('/api/v1/auth/register', authController.handleAdminRegister);
app.post('/api/v1/auth/login', authController.handleAdminLogin);
app.get('/api/v1/auth/me', middleware.authenticate, authController.handleCurrentUser);

/* -------------- End Auth Endpoint -------------- */

/* -------------- Risk Level Endpoint -------------- */

app.post('/api/v1/risk-level', middleware.authenticate, riskLevelController.handleCreateRiskLevel);

/* -------------- End Risk Level Endpoint -------------- */

/* -------------- City Endpoint -------------- */

app.post('/api/v1/city', middleware.authenticate, cityController.handleCreateCity);
app.get('/api/v1/city', cityController.handleGetAllCity);

/* -------------- End City Endpoint -------------- */

/* -------------- City Detail Endpoint -------------- */

app.put('/api/v1/city-detail/:id', middleware.authenticate, fileUpload.single("picture"), cityDetailController.handleUpdateCityDetail);
app.get('/api/v1/city/:cityId', cityDetailController.handleGetCityByCityId);

/* -------------- End City Detail Endpoint -------------- */


/* -------------- City Summary Endpoint -------------- */


/* -------------- End City Summary Endpoint -------------- */


// ------------------------- End Define Routes ------------------------- //


// ------------------------- Server Listen ------------------------- //

app.listen(PORT, () => {
    console.log(`Server is running successfully on PORT http://localhost:${PORT}`);
});

// ------------------------- End Server Listen ------------------------- //

module.exports = app;