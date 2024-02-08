import { db } from "../db.js";

export const getUsers = (_, res) => { //_ seria o request enviado para a método getUser, no caso não se aplica
                                      //res é a resposta do método
    const q = "SELECT * FROM users"; //comando sql q a query vai executar no banco
    const response = (err, data) => {
        if (err) return res.json(err); //se houver erro retorna um json com o erro

        return res.status(200).json(data); //se não houver erro retorna status code de 200 e um json com os usuários
    };

    db.query(q, response); //cria query passando o comando sql e a função para tratar a resposta
};