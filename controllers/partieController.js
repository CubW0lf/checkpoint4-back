import express from "express";
import Partie from "../models/partieModel.js";
import Joi from "joi";
const router = express.Router();

router

    // Get One
    .get("/:id", async (req, res) => {
        const id = req.params.id;
        try {
            const partie = await Partie.getOneById(id);

            res.json(partie);
        } catch (error) {
            res.json({ message: error.message }).status(500);
        }
    })

    // Get All
    .get("/", async (req, res) => {
        try {
            const parties = await Partie.getAll();

            res.json(parties);
        } catch (error) {
            res.json({ message: error.message }).status(500);
        }
    })

    .get("/player/:id", async (req, res) => {
        const id = req.params.id;

        try {
            const parties = await Partie.getAllFromPlayer(id);
            res.json(parties);
        } catch (error) {
            res.json({ message: error.message }).status(500);
        }
    })

    .get("/organisateur/:id", async (req, res) => {
        const id = req.params.id;

        try {
            const parties = await Partie.getAllFromOrganisateur(id);
            res.json(parties);
        } catch (error) {
            res.json({ message: error.message }).status(500);
        }
    })

    .get("/available/:id", async (req, res) => {
        const id = req.params.id;

        try {
            const parties = await Partie.getAllAvailable(id);
            res.json(parties);
        } catch (error) {
            res.json({ message: error.message }).status(500);
        }
    })

    // Get All players in a game

    .get("/:id/players", async (req, res) => {
        const id_partie = req.params.id;
        try {
            const players = await Partie.getAllPlayer(id_partie);

            res.json(players);
        } catch (error) {
            res.json({ message: error.message }).status(500);
        }
    })

    .post("/:id_player", async (req, res) => {
        const id_joueur = req.params.id_player;

        try {
            const partieCreate = await Partie.createNew(id_joueur);
            if (partieCreate) {
                const newPartie = await Partie.getOneById(partieCreate);
                res.json(newPartie);
            } else res.json({ message: error.message }).status(422);
        } catch (err) {
            res.json({ message: err.message }).status(500);
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
