import dbConnect from "../config/db-config.js";

const getAll = () => {
    return new Promise((resolve, reject) => {
        dbConnect.query("SELECT * FROM game", (err, results) => {
            if (err) reject(err);
            else resolve(results);
        });
    });
};

// READ ONE
const getOneById = (id) => {
    return new Promise((resolve, reject) => {
        dbConnect.query("SELECT * FROM game WHERE id = ?", id, (err, result) => {
            if (err) reject(err);
            else resolve(result[0]);
        });
    });
};

// DELETE
const deleteById = (id) => {
    return new Promise((resolve, reject) => {
        dbConnect.query("DELETE FROM game WHERE id = ?", id, (err, result) => {
            if (err) reject(err);
            else resolve(result.affectedRows);
        });
    });
};

// CREATE
const createNew = (game) => {
    const { title } = game;
    return new Promise((resolve, reject) => {
        dbConnect.query("INSERT INTO game (title) VALUES (?)", title, (err, result) => {
            if (err) reject(err);
            else resolve(result.insertId);
        });
    });
};

// UPDATE
const updateGame = (game) => {
    const { title, id } = game;
    return new Promise((resolve, reject) => {
        dbConnect.query("UPDATE game SET title = ? WHERE id = ?", [title, id], (err, result) => {
            if (err) reject(err);
            else resolve(result);
        });
    });
};

export default { getAll, getOneById, deleteById, createNew, updateGame };
