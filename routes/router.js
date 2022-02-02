import securityController from "../controllers/securityController.js";
import adminController from "../controllers/adminController.js";
import boardController from "../controllers/boardController.js";
import cardController from "../controllers/cardController.js";
import familyController from "../controllers/familyController.js";
import gameController from "../controllers/gameController.js";
import handController from "../controllers/handController.js";
import playerController from "../controllers/playerController.js";

export const setupRoutes = (app) => {
    app.use("/security", securityController);
    app.use("/admin", adminController);
    app.use("/board", boardController);
    app.use("/card", cardController);
    app.use("/family", familyController);
    app.use("/game", gameController);
    app.use("/hand", handController);
    app.use("/player", playerController);

    // ... les autres routes ...
};
