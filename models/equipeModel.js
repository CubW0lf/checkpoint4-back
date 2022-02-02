import dbConnect from "../config/db-config.js";

const getAll = () => {
    return new Promise((resolve, reject) => {
        dbConnect.query("SELECT * FROM equipe", (err, results) => {
            if (err) reject(err);
            else resolve(results);
        });
    });
};

// Get By game
const getAllFromGame = (id_partie) => {
    return new Promise((resolve, reject) => {
        dbConnect.query("SELECT * FROM equipe WHERE id_partie = ?", id_partie, (err, result) => {
            if (err) reject(err);
            else resolve(result);
        });
    });
};

// READ ONE
const getOneById = (id) => {
    return new Promise((resolve, reject) => {
        dbConnect.query("SELECT * FROM movie WHERE id = ?", id, (err, result) => {
            if (err) reject(err);
            else resolve(result[0]);
        });
    });
};

// DELETE
const deleteById = (id) => {
    return new Promise((resolve, reject) => {
        dbConnect.query("DELETE FROM movie WHERE id = ?", id, (err, result) => {
            if (err) reject(err);
            else resolve(result.affectedRows);
        });
    });
};

// CREATE
const createNew = (movie) => {
    const { title } = movie;
    return new Promise((resolve, reject) => {
        dbConnect.query("INSERT INTO movie (title) VALUES (?)", title, (err, result) => {
            if (err) reject(err);
            else resolve(result.insertId);
        });
    });
};

// UPDATE
const updateMovie = (movie) => {
    const { title, id } = movie;
    return new Promise((resolve, reject) => {
        dbConnect.query("UPDATE movie SET title = ? WHERE id = ?", [title, id], (err, result) => {
            if (err) reject(err);
            else resolve(result);
        });
    });
};

export default { getAll, getOneById, deleteById, createNew, updateMovie, getAllFromGame };
