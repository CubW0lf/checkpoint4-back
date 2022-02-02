import dbConnect from "../config/db-config.js";

// Get All
const getAll = () => {
    return new Promise((resolve, reject) => {
        dbConnect.query("SELECT * FROM partie", (err, results) => {
            if (err) reject(err);
            else resolve(results);
        });
    });
};

// READ ONE By ID
const getOneById = (id) => {
    return new Promise((resolve, reject) => {
        dbConnect.query("SELECT * FROM partie WHERE id = ?", id, (err, result) => {
            if (err) reject(err);
            else resolve(result[0]);
        });
    });
};

// Get all from a Player

const getAllFromPlayer = (id) => {
    return new Promise((resolve, reject) => {
        dbConnect.query("SELECT * FROM joueur_partie WHERE id_joueur = ?", id, (err, result) => {
            if (err) reject(err);
            else resolve(result);
        });
    });
};

// DELETE
const deleteById = (id) => {
    return new Promise((resolve, reject) => {
        dbConnect.query("DELETE FROM partie WHERE id = ?", id, (err, result) => {
            if (err) reject(err);
            else resolve(result.affectedRows);
        });
    });
};

// CREATE
const createNew = () => {
    return new Promise((resolve, reject) => {
        dbConnect.query("INSERT INTO partie DEFAULT VALUES;", (err, result) => {
            if (err) reject(err);
            else resolve(result.insertId);
        });
    });
};

export default { getAll, getOneById, deleteById, createNew, getAllFromPlayer };
