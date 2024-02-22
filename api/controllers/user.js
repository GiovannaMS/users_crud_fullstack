import { db } from "../db.js";

export const getUsers = (_, res) => {
    const q = "SELECT * FROM users";
    const response = (err, data) => {
        if (err) return res.json(err);

        return res.status(200).json(data); 
    };

    db.query(q, response);
};

export const addUser = (req, res) => {
    const q = "INSERT INTO users(`name`, `email`, `phone_number`, `date_of_birth`) VALUES(?)";
    
    const values = [
        req.body.name,
        req.body.email,
        req.body.phone_number,
        req.body.date_of_birth,
    ];

    const response = (err) => {
        if (err) return res.json(err);

        return res.status(200).json("Usuário criado com sucesso.");
    };

    db.query(q, [values], response);
};

export const updateUser = (req, res) => {
    const q = 
        "UPDATE users SET `name` = ?, `email` = ?, `phone_number` = ?, `date_of_birth` = ? WHERE `id` = ?";
    
    const values = [
        req.body.name,
        req.body.email,
        req.body.phone_number,
        req.body.date_of_birth,
    ];

    const response = (err) => {
        if (err) return res.json(err);

        return res.status(200).json("Usuário atualizado com sucesso.");
    };

    db.query(q, [...values, req.params.id], response);
};

export const deleteUser = (req, res) => {
    const q = "DELETE FROM users WHERE `id` = ?";
    const response = (err) => {
        if (err) return res.json(err);

        return res.status(200).json("Usuário deletado com sucesso."); 
    };

    db.query(q, [req.params.id], response);
};