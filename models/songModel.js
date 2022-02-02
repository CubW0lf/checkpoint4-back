import dbConnect from "../config/db-config.js";

const getAll = () => {
    return new Promise((resolve, reject) => {
        dbConnect.query("SELECT * FROM morceau", (err, results) => {
            if (err) reject(err);
            else resolve(results);
        });
    });
};

// READ All FROM A GAME
const getAllByGame = (id_game) => {
    return new Promise((resolve, reject) => {
        dbConnect.query("SELECT * FROM morceau WHERE id_partie = ?", id_game, (err, result) => {
            if (err) reject(err);
            else resolve(result);
        });
    });
};

// READ ONE
const getOneById = (id) => {
    return new Promise((resolve, reject) => {
        dbConnect.query("SELECT * FROM morceau WHERE id = ?", id, (err, result) => {
            if (err) reject(err);
            else resolve(result[0]);
        });
    });
};

// DELETE
const deleteById = (id) => {
    return new Promise((resolve, reject) => {
        dbConnect.query("DELETE FROM morceau WHERE id = ?", id, (err, result) => {
            if (err) reject(err);
            else resolve(result.affectedRows);
        });
    });
};

// CREATE
const createNew = (morceau) => {
    const { auteur, titre, id_partie } = morceau;
    return new Promise((resolve, reject) => {
        dbConnect.query(
            "INSERT INTO morceau (auteur, titre, id_partie) VALUES (?, ?, ?)",
            [auteur, titre, id_partie],
            (err, result) => {
                if (err) reject(err);
                else resolve(result.insertId);
            }
        );
    });
};

// UPDATE
const updatemorceau = (morceau) => {
    const { title, id } = morceau;
    return new Promise((resolve, reject) => {
        dbConnect.query("UPDATE morceau SET title = ? WHERE id = ?", [title, id], (err, result) => {
            if (err) reject(err);
            else resolve(result);
        });
    });
};

export default { getAll, getOneById, deleteById, createNew, updatemorceau, getAllByGame };
