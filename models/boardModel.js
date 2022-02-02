import dbConnect from "../config/db-config.js";

const getAll = () => {
    return new Promise((resolve, reject) => {
        dbConnect.query("SELECT * FROM board", (err, results) => {
            if (err) reject(err);
            else resolve(results);
        });
    });
};

// READ ONE
const getOneById = (id) => {
    return new Promise((resolve, reject) => {
        dbConnect.query("SELECT * FROM board WHERE id = ?", id, (err, result) => {
            if (err) reject(err);
            else resolve(result[0]);
        });
    });
};

// DELETE
const deleteById = (id) => {
    return new Promise((resolve, reject) => {
        dbConnect.query("DELETE FROM board WHERE id = ?", id, (err, result) => {
            if (err) reject(err);
            else resolve(result.affectedRows);
        });
    });
};

// CREATE
const createNew = (board) => {
    const { title } = board;
    return new Promise((resolve, reject) => {
        dbConnect.query("INSERT INTO board (title) VALUES (?)", title, (err, result) => {
            if (err) reject(err);
            else resolve(result.insertId);
        });
    });
};

// UPDATE
const updateBoard = (board) => {
    const { title, id } = board;
    return new Promise((resolve, reject) => {
        dbConnect.query("UPDATE board SET title = ? WHERE id = ?", [title, id], (err, result) => {
            if (err) reject(err);
            else resolve(result);
        });
    });
};

export default { getAll, getOneById, deleteById, createNew, updateBoard };
