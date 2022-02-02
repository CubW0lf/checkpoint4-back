import securityController from "../controllers/securityController.js";
import playerController from "../controllers/playerController.js";
import partieController from "../controllers/partieController.js";

export const setupRoutes = (app) => {
    app.use("/security", securityController);
    app.use("/players", playerController);
    app.use("/parties", partieController);

    // ... les autres routes ...
};
