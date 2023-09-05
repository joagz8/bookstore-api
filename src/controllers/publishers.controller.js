import { connection } from "../db.js";

export const getPublishers = async (req, resp) => {
    try {
        const query = await connection.query('SELECT id, name FROM Publisher')
        resp.send(query[0])
    } catch (error) {
        console.log('Error', error);
    }
}

export const getSpecificPublisher = async (req, resp) => {
    try {
        const query = await connection.query('SELECT * FROM Publisher WHERE name = ? OR id = ?', [req.params.id, req.params.id])
        resp.send(query[0])
    } catch (error) {
        console.log('Error', error);
    }
}

export const updatePublisher = async (req, resp) => {
    try {
        await connection.query('UPDATE Publisher SET name = ? WHERE id = ?', [req.body.name, req.params.id])
        resp.send('Editorial actualizada exitosamente')
    } catch (error) {
        console.log('Error', error);
    }
}

export const deletePublisher = async (req, resp) => {
    try {
        await connection.query('DELETE FROM Publisher WHERE id = ?', [req.params.id])
        resp.send('Editorial eliminada exitosamente')
    } catch (error) {
        console.log('Error', error);
    }
}