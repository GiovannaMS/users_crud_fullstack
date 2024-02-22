import { db } from "../db.js";

export const getUsers = (_, res) => {
    const q = "SELECT * FROM users";
    const response = (err, data) => {
        if (err) return res.json(err);

        return res.status(200).json(data); 
    };

    db.query(q, response);
};