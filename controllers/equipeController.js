import express from "express";
import Equipe from "../models/equipeModel.js";
import Joi from "joi";
const router = express.Router();

const schemaEquipe = Joi.object({
    id: Joi.number().integer(),
    nom: Joi.string().min(3).max(255).required(),
    score: Joi.number().integer().required(),
    couleur: Joi.string().min(3).max(255).required(),
    id_partie: Joi.number().integer().required(),
});

router
    .get("/:id", async (req, res) => {
        const id = req.params.id;
        try {
            const equipe = await Equipe.getOneById(id);

            res.json(equipe);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    })

    .get("/", async (req, res) => {
        try {
            const equipe = await Equipe.getAll();

            res.json(equipe);
        } catch (error) {
            res.json({ message: error.message }).status(500);
        }
    })

    .put("/:id", async (req, res) => {
        const equipe = {
            id: req.params.id,
            title: req.body.title,
            description: req.body.description,
            image: req.body.image,
            date: req.body.date,
            id_category: req.body.id_category,
        };

        try {
            const { error, value } = await schemaEquipe.validate(equipe);
            const equipeUpdate = await Equipe.updateequipe(value);
            if (equipeUpdate) res.json(equipe);
            else res.status(422).json({ message: error.message });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    })

    .post("/", async (req, res) => {
        const equipe = {
            title: req.body.title,
            description: req.body.description,
            image: req.body.image,
            date: req.body.date,
            id_category: req.body.id_category,
        };

        try {
            const { error, value } = await schemaEquipe.validate(equipe);
            const equipeCreate = await Equipe.createNew(value);
            if (equipeCreate) {
                const newequipe = await Equipe.getOneById(equipeCreate);
                res.json(newequipe);
            } else res.status(422).json({ message: error.message });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    })

    .delete("/:id", async (req, res) => {
        const id = req.params.id;
        try {
            const equipeDelete = await Equipe.deleteById(id);
            if (equipeDelete) {
                res.json(`L'equipe ${id} a bien été effacée`);
            } else {
                res.status(422).json(`Une erreur est survenue lors de la suppression`);
            }
        } catch (error) {
            res.status(500).json(`Erreur serveur`);
        }
        return res.status(201).end();
    });

export default router;
