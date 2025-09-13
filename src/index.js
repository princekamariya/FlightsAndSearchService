const express = require("express");
const { PORT } = require("./config/serverConfig");
const setUpAndStartServer = async () => {
    const app = express();
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.listen(3000, () => {
        console.log(`Server started on ${PORT}`);
    });
};

setUpAndStartServer();
