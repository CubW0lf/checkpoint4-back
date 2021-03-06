import express from "express";
import Player from "../models/playerModel.js";
import Joi from "joi";
const router = express.Router();

const schemaPlayer = Joi.object({
    id: Joi.number().integer(),
    pseudo: Joi.string().min(3).max(255).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(3).max(255).required(),
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
            res.json({ message: error.message }).status(500);
        }
    })

    .get("/team/:id", async (req, res) => {
        const team_id = req.params.id;
        try {
            const player = await Player.getAllFromTeam(team_id);

            res.json(player);
        } catch (error) {
            res.json({ message: error.message }).status(500);
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

    .patch("/:id", async (req, res) => {
        const player = {
            id: req.params.id,
            pseudo: req.body.pseudo,
            email: req.body.email,
        };

        try {
            const { error, value } = await schemaPlayer.validate(player);

            const fullPlayer = await Player.findById(player.id);

            if (fullPlayer) {
                const patchedPlayer = await Player.patchPlayer(value, fullPlayer.password);
                if (patchedPlayer) res.json(player);
                else {
                    res.json({ message: error.message }).status(422);
                }
            } else {
                res.json({ message: error.message }).status(422);
            }
        } catch (err) {
            res.json({ message: err.message }).status(500);
        }
    })

    .delete("/:id", async (req, res) => {
        const id = req.params.id;
        try {
            const playerDelete = await Player.deleteById(id);
            if (playerDelete) {
                res.json(`Le joueur ${id} a bien ??t?? effac??e`);
            } else {
                res.status(422).json(`Une erreur est survenue lors de la suppression`);
            }
        } catch (error) {
            res.status(500).json(`Erreur serveur`);
        }
        return res.status(201).end();
    });

export default router;
