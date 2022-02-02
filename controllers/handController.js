import express from "express";
import Hand from "../models/handModel.js";
import Joi from "joi";
const router = express.Router();

const schemaHand = Joi.object({
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
            const hand = await Hand.getOneById(id);

            res.json(hand);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    })

    .get("/", async (req, res) => {
        try {
            const hand = await Hand.getAll();

            res.json(hand);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    })

    .put("/:id", async (req, res) => {
        const hand = {
            id: req.params.id,
            title: req.body.title,
            description: req.body.description,
            image: req.body.image,
            date: req.body.date,
            id_category: req.body.id_category,
        };

        try {
            const { error, value } = await schemaHand.validate(hand);
            const handUpdate = await Hand.updateHand(value);
            if (handUpdate) res.json(hand);
            else res.status(422).json({ message: error.message });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    })

    .post("/", async (req, res) => {
        const hand = {
            title: req.body.title,
            description: req.body.description,
            image: req.body.image,
            date: req.body.date,
            id_category: req.body.id_category,
        };

        try {
            const { error, value } = await schemaHand.validate(hand);
            const handCreate = await Hand.createNew(value);
            if (handCreate) {
                const newhand = await Hand.getOneById(handCreate);
                res.json(newhand);
            } else res.status(422).json({ message: error.message });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    })

    .delete("/:id", async (req, res) => {
        const id = req.params.id;
        try {
            const handDelete = await Hand.deleteById(id);
            if (handDelete) {
                res.json(`L'hand ${id} a bien été effacée`);
            } else {
                res.status(422).json(`Une erreur est survenue lors de la suppression`);
            }
        } catch (error) {
            res.status(500).json(`Erreur serveur`);
        }
        return res.status(201).end();
    });

export default router;
