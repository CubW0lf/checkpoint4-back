import express from "express";
import Family from "../models/familyModel.js";
const router = express.Router();

router
    .get("/:id", async (req, res) => {
        const id = req.params.id;
        try {
            const family = await Family.getOneById(id);

            res.json(family);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    })

    .get("/", async (req, res) => {
        try {
            const family = await Family.getAll();

            res.json(family);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    });

export default router;
