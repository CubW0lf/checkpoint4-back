import dbConnect from "../config/db-config.js";

const getAll = () => {
    return new Promise((resolve, reject) => {
        dbConnect.query("SELECT * FROM card", (err, results) => {
            if (err) reject(err);
            else resolve(results);
        });
    });
};

// READ ONE
const getOneById = (id) => {
    return new Promise((resolve, reject) => {
        dbConnect.query("SELECT * FROM card WHERE id = ?", id, (err, result) => {
            if (err) reject(err);
            else resolve(result[0]);
        });
    });
};

export default { getAll, getOneById };
