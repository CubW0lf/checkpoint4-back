import dbConnect from "../config/db-config.js";

const getAll = () => {
    return new Promise((resolve, reject) => {
        dbConnect.query("SELECT * FROM hand", (err, results) => {
            if (err) reject(err);
            else resolve(results);
        });
    });
};

// READ ONE
const getOneById = (id) => {
    return new Promise((resolve, reject) => {
        dbConnect.query("SELECT * FROM hand WHERE id = ?", id, (err, result) => {
            if (err) reject(err);
            else resolve(result[0]);
        });
    });
};

// DELETE
const deleteById = (id) => {
    return new Promise((resolve, reject) => {
        dbConnect.query("DELETE FROM hand WHERE id = ?", id, (err, result) => {
            if (err) reject(err);
            else resolve(result.affectedRows);
        });
    });
};

// CREATE
const createNew = (hand) => {
    const { title } = hand;
    return new Promise((resolve, reject) => {
        dbConnect.query("INSERT INTO hand (title) VALUES (?)", title, (err, result) => {
            if (err) reject(err);
            else resolve(result.insertId);
        });
    });
};

// UPDATE
const updateHand = (hand) => {
    const { title, id } = hand;
    return new Promise((resolve, reject) => {
        dbConnect.query("UPDATE hand SET title = ? WHERE id = ?", [title, id], (err, result) => {
            if (err) reject(err);
            else resolve(result);
        });
    });
};

export default { getAll, getOneById, deleteById, createNew, updateHand };
