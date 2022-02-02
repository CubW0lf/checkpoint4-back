import securityController from "../controllers/securityController.js";
import playerController from "../controllers/playerController.js";
import partieController from "../controllers/partieController.js";
import equipeController from "../controllers/equipeController.js";
import songController from "../controllers/songController.js";

export const setupRoutes = (app) => {
    app.use("/security", securityController);
    app.use("/players", playerController);
    app.use("/parties", partieController);
    app.use("/equipes", equipeController);
    app.use("/songs", songController);
};
