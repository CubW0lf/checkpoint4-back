import express from "express";
import Player from "../models/playerModel.js";
import Joi from "joi";
const router = express.Router();

const schemaPlayer = Joi.object({
    id: Joi.number().integer(),
    title: Joi.string().min(3).max(255).required(),
    description: Joi.string().min(3).required(),
    image: Joi.string().min(3),
    date: Joi.date().required(),
    id_category: Joi.number().integer().required(),
});

router
    .get("/:id", async (req, res) => {
        const id = req.params.id;

        try {
            const player = await Player.findById(id);

            res.json(player).status(200);
        } catch (error) {
            res.json({ message: error.message }).status(500);
        }
    })

    .get("/", async (req, res) => {
        try {
            const player = await Player.getAll();

            res.json(player);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    })

    .put("/:id", async (req, res) => {
        const player = {
            id: req.params.id,
            title: req.body.title,
            description: req.body.description,
            image: req.body.image,
            date: req.body.date,
            id_category: req.body.id_category,
        };

        try {
            const { error, value } = await schemaPlayer.validate(player);
            const playerUpdate = await Player.updateplayer(value);
            if (playerUpdate) res.json(player);
            else res.status(422).json({ message: error.message });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    })

    .post("/", async (req, res) => {
        const player = {
            title: req.body.title,
            description: req.body.description,
            image: req.body.image,
            date: req.body.date,
            id_category: req.body.id_category,
        };

        try {
            const { error, value } = await schemaPlayer.validate(player);
            const playerCreate = await Player.createNew(value);
            if (playerCreate) {
                const newPlayer = await Player.getOneById(playerCreate);
                res.json(newPlayer);
            } else res.status(422).json({ message: error.message });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    })

    .delete("/:id", async (req, res) => {
        const id = req.params.id;
        try {
            const playerDelete = await Player.deleteById(id);
            if (playerDelete) {
                res.json(`L'player ${id} a bien été effacée`);
            } else {
                res.status(422).json(`Une erreur est survenue lors de la suppression`);
            }
        } catch (error) {
            res.status(500).json(`Erreur serveur`);
        }
        return res.status(201).end();
    });

export default router;
