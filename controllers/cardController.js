import express from "express";
import Card from "../models/cardModel.js";
const router = express.Router();

router
    .get("/:id", async (req, res) => {
        const id = req.params.id;
        try {
            const card = await Card.getOneById(id);

            res.json(card);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    })

    .get("/", async (req, res) => {
        try {
            const card = await Card.getAll();

            res.json(card);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    });

export default router;
