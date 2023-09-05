import { connection } from "../db.js";

export const getAuthors = async (req, resp) => {
    try {
        const query = await connection.query('SELECT id, name FROM Author')
        resp.send(query[0])
    } catch (error) {
        console.log('Error', error);
    }
}

export const getSpecificAuthor = async (req, resp) => {
    try {
        const query = await connection.query('SELECT * FROM Author WHERE name = ? OR id = ?', [req.params.id, req.params.id])
        resp.send(query[0])
    } catch (error) {
        console.log('Error', error);
    }
}

export const updateAuthor = async (req, resp) => {
    try {
        await connection.query('UPDATE Author SET name = ? WHERE id = ?', [req.body.name, req.params.id])
        resp.send('Autor actualizado exitosamente')
    } catch (error) {
        console.log('Error', error);
    }
}

export const deleteAuthor = async (req, resp) => {
    try {
        await connection.query('DELETE FROM Author WHERE id = ?', [req.params.id])
        resp.send('Author eliminado exitosamente')
    } catch (error) {
        console.log('Error', error);
    }
}