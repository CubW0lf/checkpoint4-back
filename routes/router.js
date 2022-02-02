import securityController from "../controllers/securityController.js";

export const setupRoutes = (app) => {
    app.use("/security", securityController);

    // ... les autres routes ...
};
