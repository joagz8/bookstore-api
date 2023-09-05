import { connection } from "../db.js";

export const getBooksSold = async (req, resp) => {
    try {
        const query = await connection.query('SELECT * FROM Sale')
        resp.send(query[0])
    } catch (error) {
        console.log('Error', error);
    }
}

export const sellBook = async (req, resp) => {
    try {
        let {cantidad} = req.body
        const referencesId = await connection.query('SELECT * FROM Book WHERE id = ?', [req.params.id])
        let idStock = referencesId[0][0].stock_id
        const references = await connection.query('SELECT * FROM Stock WHERE id = ?', [idStock])
        let price = references[0][0].price
        await connection.query('UPDATE Stock SET quantity = quantity - ? WHERE id = ?', [cantidad, idStock])
        await connection.query('INSERT INTO Sale (quantity_sold, total_profit, id_book) VALUES (?, ?, ?)', [cantidad, cantidad * price, idStock])
        resp.send('Venta realizada')
    } catch (error) {
        console.log('Error', error);
    }
}