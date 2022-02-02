import securityController from "../controllers/securityController.js";
import playerController from "../controllers/playerController.js";
import partieController from "../controllers/partieController.js";
import equipeController from "../controllers/equipeController.js";

export const setupRoutes = (app) => {
    app.use("/security", securityController);
    app.use("/players", playerController);
    app.use("/parties", partieController);
    app.use("/equipes", equipeController);
};
