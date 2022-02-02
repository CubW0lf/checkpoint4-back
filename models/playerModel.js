import dbConnect from "../config/db-config.js";

const getAll = () => {
    return new Promise((resolve, reject) => {
        dbConnect.query("SELECT * FROM joueur", (err, results) => {
            if (err) reject(err);
            else resolve(results);
        });
    });
};

const findByEmail = (email) => {
    return new Promise((resolve, reject) => {
        dbConnect.query("SELECT * FROM joueur WHERE email = ?", email, (err, result) => {
            if (err) reject(err);
            else resolve(result[0]);
        });
    });
};

const findById = (id) => {
    return new Promise((resolve, reject) => {
        dbConnect.query("SELECT * FROM joueur WHERE id = ?", id, (err, result) => {
            if (err) reject(err);
            else resolve(result[0]);
        });
    });
};

const findGames = (id) => {
    return new Promise((resolve, reject) => {
        dbConnect.query("SELECT * FROM joueur_game WHERE joueur_id = ?", id, (err, result) => {
            if (err) reject(err);
            else resolve(result[0]);
        });
    });
};

// CREATE
const createNew = (player) => {
    const { email, password, pseudo } = player;
    return new Promise((resolve, reject) => {
        dbConnect.query(
            "INSERT INTO joueur (email, password, pseudo) VALUES (?, ?, ?)",
            [email, password, pseudo],
            (err, result) => {
                if (err) reject(err);
                else resolve(result.insertId);
            }
        );
    });
};

// DELETE
const deleteById = (id) => {
    return new Promise((resolve, reject) => {
        dbConnect.query("DELETE FROM joueur WHERE id = ?", id, (err, result) => {
            if (err) reject(err);
            else resolve(result.affectedRows);
        });
    });
};

// UPDATE
const updatePlayer = (game) => {
    const { email, pseudo, password, id } = game;
    return new Promise((resolve, reject) => {
        dbConnect.query(
            "UPDATE joueur SET email = ?, pseudo = ?, password = ? WHERE id = ?",
            [email, pseudo, password, id],
            (err, result) => {
                if (err) reject(err);
                else resolve(result);
            }
        );
    });
};

export default { findByEmail, createNew, findById, deleteById, updatePlayer, findGames, getAll };
