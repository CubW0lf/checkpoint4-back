import express from "express";
import Partie from "../models/partieModel.js";
import Joi from "joi";
const router = express.Router();

router
    .get("/:id", async (req, res) => {
        const id = req.params.id;
        try {
            const partie = await Partie.getOneById(id);

            res.json(partie);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    })

    .get("/", async (req, res) => {
        try {
            const parties = await Partie.getAll();

            res.json(parties);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    })

    .get("/player/:id", async (req, res) => {
        const id = req.params.id;

        try {
            const parties = await Partie.getAllFromPlayer();
            res.json(parties);
        } catch (error) {
            res.json({ message: error.message }).status(500);
        }
    })

    .post("/", async (req, res) => {
        try {
            const partieCreate = await Partie.createNew();
            if (partieCreate) {
                const newPartie = await Partie.getOneById(partieCreate);
                res.json(newPartie);
            } else res.status(422).json({ message: error.message });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    })

    .delete("/:id", async (req, res) => {
        const id = req.params.id;
        try {
            const partieDelete = await Partie.deleteById(id);
            if (partieDelete) {
                res.json(`La partie ${id} a bien été effacée`);
            } else {
                res.status(422).json(`Une erreur est survenue lors de la suppression`);
            }
        } catch (error) {
            res.status(500).json(`Erreur serveur`);
        }
        return res.status(201).end();
    });

export default router;
