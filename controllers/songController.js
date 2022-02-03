import express from "express";
import Morceau from "../models/songModel.js";
import Joi from "joi";
const router = express.Router();

const schemaSong = Joi.object({
    auteur: Joi.string().min(3).max(255).required(),
    titre: Joi.string().min(3).max(255).required(),
    id_partie: Joi.number().integer().required(),
});

router

    .get("/", async (req, res) => {
        try {
            const morceau = await Morceau.getAll();

            res.json(morceau);
        } catch (error) {
            res.json({ message: error.message }).status(500);
        }
    })

    .get("/game/:id", async (req, res) => {
        const id_game = req.params.id;

        try {
            const morceaux = await Morceau.getAllByGame(id_game);

            res.json(morceaux);
        } catch (error) {
            res.json({ message: error.message }).status(500);
        }
    })

    .get("/:id", async (req, res) => {
        const id = req.params.id;
        try {
            const morceau = await Morceau.getOneById(id);

            res.json(morceau);
        } catch (error) {
            res.json({ message: error.message }).status(500);
        }
    })

    .post("/", async (req, res) => {
        const song = {
            auteur: req.body.auteur,
            titre: req.body.titre,
            id_partie: req.body.id_partie,
        };

        try {
            const { error, value } = await schemaSong.validate(song);
            const songCreate = await Morceau.createNew(value);
            if (songCreate) {
                const newSong = await Morceau.getOneById(songCreate);
                res.json(newSong);
            } else res.json({ message: error.message }).status(422);
        } catch (err) {
            res.json({ message: err.message }).status(500);
        }
    })

    .delete("/:id", async (req, res) => {
        const id = req.params.id;
        try {
            const articleDelete = await Morceau.deleteById(id);
            if (articleDelete) {
                res.json(`Le Morceau ${id} a bien été effacée`);
            } else {
                res.json(`Une erreur est survenue lors de la suppression`).status(422);
            }
        } catch (error) {
            res.json(`Erreur serveur`).status(500);
        }
        return res.status(201).end();
    });

export default router;
