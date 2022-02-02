import express from "express";
import Board from "../models/boardModel.js";
import Joi from "joi";
const router = express.Router();

const schemaBoard = Joi.object({
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
            const board = await Board.getOneById(id);

            res.json(board);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    })

    .get("/", async (req, res) => {
        try {
            const board = await Board.getAll();

            res.json(board);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    })

    .put("/:id", async (req, res) => {
        const board = {
            id: req.params.id,
            title: req.body.title,
            description: req.body.description,
            image: req.body.image,
            date: req.body.date,
            id_category: req.body.id_category,
        };

        try {
            const { error, value } = await schemaBoard.validate(board);
            const boardUpdate = await Board.updateBoard(value);
            if (boardUpdate) res.json(board);
            else res.status(422).json({ message: error.message });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    })

    .post("/", async (req, res) => {
        const board = {
            title: req.body.title,
            description: req.body.description,
            image: req.body.image,
            date: req.body.date,
            id_category: req.body.id_category,
        };

        try {
            const { error, value } = await schemaBoard.validate(board);
            const boardCreate = await Board.createNew(value);
            if (boardCreate) {
                const newBoard = await Board.getOneById(boardCreate);
                res.json(newBoard);
            } else res.status(422).json({ message: error.message });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    })

    .delete("/:id", async (req, res) => {
        const id = req.params.id;
        try {
            const boardDelete = await Board.deleteById(id);
            if (boardDelete) {
                res.json(`Le plateau ${id} a bien été effacée`);
            } else {
                res.status(422).json(`Une erreur est survenue lors de la suppression`);
            }
        } catch (error) {
            res.status(500).json(`Erreur serveur`);
        }
        return res.status(201).end();
    });

export default router;
