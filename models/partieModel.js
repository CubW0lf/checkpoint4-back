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

const getAllFromPlayer = (id_player) => {
    return new Promise((resolve, reject) => {
        dbConnect.query("SELECT * FROM joueur_partie WHERE id_joueur = ?", id_player, (err, result) => {
            if (err) reject(err);
            else resolve(result);
        });
    });
};

// Get all players from a game

const getAllPlayer = (id_partie) => {
    return new Promise((resolve, reject) => {
        dbConnect.query("SELECT * FROM joueur_partie WHERE id_partie = ?", id_partie, (err, result) => {
            if (err) reject(err);
            else resolve(result);
        });
    });
};

// Get all from organisateur

const getAllFromOrganisateur = (id) => {
    return new Promise((resolve, reject) => {
        dbConnect.query("SELECT * FROM partie WHERE organisateur = ?", id, (err, result) => {
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
const createNew = (id_organisateur) => {
    return new Promise((resolve, reject) => {
        dbConnect.query("INSERT INTO partie (organisateur) VALUES (?);", id_organisateur, (err, result) => {
            if (err) reject(err);
            else resolve(result.insertId);
        });
    });
};

// ADD Player
const addPlayer = (id_joueur, id_partie, organisateur) => {
    return new Promise((resolve, reject) => {
        dbConnect.query(
            "INSERT INTO joueur_partie (id_joueur, id_partie) VALUES (?, ?)",
            [id_joueur, id_partie, organisateur],
            (err, result) => {
                if (err) reject(err);
                else resolve(result.insertId);
            }
        );
    });
};

export default {
    getAll,
    getOneById,
    deleteById,
    createNew,
    getAllFromPlayer,
    getAllFromOrganisateur,
    addPlayer,
    getAllPlayer,
};
