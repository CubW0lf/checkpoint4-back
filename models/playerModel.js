import dbConnect from "../config/db-config.js";

const findByEmail = (email) => {
    return new Promise((resolve, reject) => {
        dbConnect.query("SELECT * FROM player WHERE email = ?", email, (err, result) => {
            if (err) reject(err);
            else resolve(result[0]);
        });
    });
};

const findById = (id) => {
    return new Promise((resolve, reject) => {
        dbConnect.query("SELECT * FROM player WHERE id = ?", id, (err, result) => {
            if (err) reject(err);
            else resolve(result[0]);
        });
    });
};

const findGames = (id) => {
    return new Promise((resolve, reject) => {
        dbConnect.query("SELECT * FROM player_game WHERE player_id = ?", id, (err, result) => {
            if (err) reject(err);
            else resolve(result[0]);
        });
    });
};

// CREATE
const createNew = (player) => {
    const { email, password, pseudo, is_admin } = player;
    return new Promise((resolve, reject) => {
        dbConnect.query(
            "INSERT INTO player (email, password, pseudo, is_admin) VALUES (?, ?, ?, ?)",
            [email, password, pseudo, is_admin],
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
        dbConnect.query("DELETE FROM player WHERE id = ?", id, (err, result) => {
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
            "UPDATE player SET email = ?, pseudo = ?, password = ? WHERE id = ?",
            [email, pseudo, password, id],
            (err, result) => {
                if (err) reject(err);
                else resolve(result);
            }
        );
    });
};

export default { findByEmail, createNew, findById, deleteById, updatePlayer, findGames };
