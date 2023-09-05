import { connection } from "../db.js";

export const getBooks = async (req, resp) => {
    try {
        const query = await connection.query('SELECT * FROM ConsultBook')
        resp.json(query[0])
    } catch (error) {
        console.log('Error: ', error)
    }
}

export const getSpecificBooks = async (req, resp) => {
    try {
        const query = await connection.query('SELECT * FROM ConsultBook WHERE Title = ? OR Author = ? OR id = ?', [req.params.id, req.params.id, req.params.id])
        resp.send(query[0])
    } catch (error) {
        console.log('Error: ', error)
    }
}

export const modifyCatalogue = async(req, resp) => {
  try {
      const {title, author, publisher, stock, price} = req.body
      //Verifica si el author existe
      const getAuthor = await connection.query('SELECT id FROM Author WHERE name = ?', [author])
      let authorId = getAuthor[0].length > 0 ? getAuthor[0][0].id : null
      //Si author no existe
      if (authorId == null) {
          const addAuthor = await connection.query('INSERT INTO Author (name) VALUES (?)', [author])
          authorId = addAuthor[0].insertId
      }
      //Verifica si publisher existe
      const getPublisher = await connection.query('SELECT id FROM Publisher WHERE name = ?', [publisher])
      let publisherId = getPublisher[0].length > 0 ? getPublisher[0][0].id : null
      //Si publisher no existe
      if (publisherId == null) {
          const addPublisher = await connection.query('INSERT INTO Publisher (name) VALUES (?)', [publisher])
          publisherId = addPublisher[0].insertId
      }
      //Buscar si el libro existe con ese title, author y publisher
      const getBook = await connection.query('SELECT id, author_id, publisher_id, stock_id FROM Book WHERE title = ? AND author_id = ? AND publisher_id = ?', [title, authorId, publisherId])
      let bookId = getBook[0].length > 0 ? getBook[0][0].id : null
      let existingStockId
      if (bookId !== null) {
        existingStockId = getBook[0][0].stock_id
      }
      //Si el libro no existe crearlo
      if (bookId == null) {
          const addStock = await connection.query('INSERT INTO Stock (quantity, price) VALUES (?, ?)', [stock, price])
          let stockId = addStock[0].insertId
          const addBook = await connection.query('INSERT INTO Book (title, author_id, publisher_id, stock_id) VALUES (?, ?, ?, ?)', [title, authorId, publisherId, stockId] )
          bookId = addBook[0].insertId
          resp.send('Libro creado exitosamente')
      }
      //Si el libro existe
      else {
          await connection.query('UPDATE Stock SET quantity = quantity + ? WHERE id = ?', [stock, existingStockId] )
          resp.send(`Se añadieron ${stock} nuevas unidades de Stock en el libro ${title} del author ${author}`)
      }
  } catch (error) {
      console.log('Error: ', error)
  }
}

export const updateBooks = async(req, resp) => {
  try {
    let {title, author, publisher, stock, price} = req.body
    const references = await connection.query('SELECT * FROM Book WHERE id = ?', [req.params.id])
    let idBook = references[0][0].id
    let idAuthor = references[0][0].author_id
    let idPublisher = references[0][0].publisher_id
    let idStock = references[0][0].stock_id
    await connection.query('UPDATE Book SET title = ? WHERE id = ?', [title, idBook])
    await connection.query('UPDATE Author SET name = ? WHERE id = ?', [author, idAuthor])
    await connection.query('UPDATE Publisher SET name = ? WHERE id = ?', [publisher, idPublisher])
    await connection.query('UPDATE Stock SET quantity = ?, price = ? WHERE id = ?', [stock, price, idStock])
    resp.send('Actualización correcta')
  } catch (error) {
    console.log('Error', error);
  }
}

export const deleteBook = async (req, resp) => {
  try {
    const references = await connection.query('SELECT * FROM Book WHERE id = ?', [req.params.id])
    let idStock = references[0][0].stock_id
    await connection.query('DELETE FROM Book WHERE id = ?', [req.params.id])
    await connection.query('DELETE FROM Stock WHERE id = ?', [idStock])
    resp.send('Libro eliminado con su respectivo Stock')
  } catch (error) {
    console.log('Error', error);
  }
}

/*
Data of req.body
{
  "title": "They Both Die at the End",
  "author": "Adam Silvera",
  "publisher": "OZ",
  "stock": 3,
  "price": "2300.00"
}
*/




















/* 
const express = require('express');
const mysql = require('mysql2/promise');

const app = express();

const connection = mysql.createPool({
  host: 'localhost',
  user: 'tu_usuario',
  password: 'tu_contraseña',
  database: 'tu_base_de_datos'
});

app.use(express.json());

// Ruta para agregar o actualizar un libro
app.post('/addOrUpdateBook', async (req, res) => {
  const { bookTitle, authorName, publisherName, stockQuantity, stockPrice } = req.body;

  try {
    // Buscar si el autor ya existe
    const [authorRows] = await connection.execute('SELECT id FROM Author WHERE name = ?', [authorName]);
    let authorId = authorRows.length > 0 ? authorRows[0].id : null;

    // Si el autor no existe, insertarlo
    if (authorId === null) {
      const [insertAuthor] = await connection.execute('INSERT INTO Author (name) VALUES (?)', [authorName]);
      authorId = insertAuthor.insertId;
    }

    // Buscar si el libro ya existe con el mismo título y autor
    const [bookRows] = await connection.execute('SELECT id, stock_id FROM Book WHERE title = ? AND author_id = ?', [bookTitle, authorId]);
    let bookId = bookRows.length > 0 ? bookRows[0].id : null;
    let stockId = bookRows.length > 0 ? bookRows[0].stock_id : null;

    // Si el libro no existe, realizar las inserciones
    if (bookId === null) {
      const [insertPublisher] = await connection.execute('INSERT INTO Publisher (name) VALUES (?)', [publisherName]);
      const publisherId = insertPublisher.insertId;

      const [insertStock] = await connection.execute('INSERT INTO Stock (quantity, Price) VALUES (?, ?)', [stockQuantity, stockPrice]);
      stockId = insertStock.insertId;

      const [insertBook] = await connection.execute('INSERT INTO Book (title, author_id, publisher_id, stock_id) VALUES (?, ?, ?, ?)', [bookTitle, authorId, publisherId, stockId]);

      bookId = insertBook.insertId;
    } else {
      // Si el libro ya existe, actualizar el stock
      await connection.execute('UPDATE Stock SET quantity = quantity + ? WHERE id = ?', [stockQuantity, stockId]);
    }

    res.json({ message: 'Libro agregado o actualizado correctamente' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Error al agregar o actualizar el libro' });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor en funcionamiento en el puerto ${PORT}`);
});

*/