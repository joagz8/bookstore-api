SHOW DATABASES;

CREATE DATABASE bookstore_sys;
USE bookstore_sys;

SELECT * FROM Sale;

CREATE TABLE IF NOT EXISTS Book
(
	id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(50) NOT NULL,
    author_id INT NOT NULL,
    publisher_id INT NOT NULL,
    stock_id INT NOT NULL,
    PRIMARY KEY(id),
    FOREIGN KEY(author_id) REFERENCES Author(id),
    FOREIGN KEY(publisher_id) REFERENCES Publisher(id),
    FOREIGN KEY(stock_id) REFERENCES Stock(id)
);

CREATE TABLE IF NOT EXISTS Author
(
	id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(50),
    PRIMARY KEY(id)
);
ALTER TABLE Author MODIFY COLUMN name VARCHAR(50) NOT NULL;

CREATE TABLE IF NOT EXISTS Publisher
(
	id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(50),
    PRIMARY KEY(id)
);
ALTER TABLE Publisher MODIFY COLUMN name VARCHAR(50) NOT NULL;

CREATE TABLE IF NOT EXISTS Stock 
(
	id INT NOT NULL AUTO_INCREMENT,
    quantity INT NOT NULL,
    price INT NOT NULL,
    PRIMARY KEY(id)
);
ALTER TABLE Stock MODIFY COLUMN price DECIMAL(7, 2) NOT NULL;

CREATE TABLE IF NOT EXISTS Sale 
(
	id INT NOT NULL AUTO_INCREMENT,
    quantity_sold INT NOT NULL,
    total_profit INT NOT NULL,
    id_book INT NOT NULL,
    PRIMARY KEY(id),
    FOREIGN KEY(id_book) REFERENCES Stock(id) 
);
ALTER TABLE Sale MODIFY COLUMN total_profit DECIMAL(10, 2) NOT NULL;

CREATE TABLE IF NOT EXISTS Register
(
	id INT NOT NULL AUTO_INCREMENT,
    username VARCHAR(50) NOT NULL,
    password VARCHAR(250) NOT NULL,
    PRIMARY KEY(id)
);

SHOW TABLES;

INSERT INTO Book (title, author_id, publisher_id, stock_id)
VALUES
	("Salem's Lot", 1, 1, 1),
    ("Verity", 2, 2, 2);
    
INSERT INTO Author (name)
VALUES
	("Stephen King"),
    ("Collen Hoover");
    
INSERT INTO Publisher (name)
VALUES
	("Planeta"),
    ("AZ");
    
INSERT INTO Stock (quantity, price)
VALUES
	(8, 5400),
    (17, 3800);

INSERT INTO Sale (quantity_sold, total_profit, id_book)
VALUES 
	(1, 5400, 1),
    (3, 11400, 2);
    
INSERT INTO Register (username, password) 
VALUES
	("joaquin", 1234);

#Create Views GET
CREATE VIEW ConsultBook AS 
SELECT Book.title, Author.name, Publisher.name AS publisher, Stock.quantity, Stock.Price
FROM Book
INNER JOIN Author ON Book.author_id = Author.id
INNER JOIN Publisher ON Book.publisher_id = Publisher.id
INNER JOIN Stock ON Book.stock_id = Stock.id;

#Update view created
ALTER VIEW ConsultBook AS
SELECT Book.id, Book.title as Title, Author.name AS Author, Publisher.name AS Publisher, Stock.quantity AS Stock, Stock.Price AS Price
FROM Book
INNER JOIN Author ON Book.author_id = Author.id
INNER JOIN Publisher ON Book.publisher_id = Publisher.id
INNER JOIN Stock ON Book.stock_id = Stock.id;

#Settings
UPDATE Author SET id = -1 WHERE id = 21;
SELECT * FROM Author;
INSERT INTO Publisher (name) VALUES ("De Bolsillo");
DELETE FROM Author WHERE id IN (3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20); 
#18, 19, 20, 21, 22);
DELETE FROM Book WHERE id = 3;
DELETE FROM Author WHERE id = 16;




/*
#Store Procedure POST (first thought form)

DELIMETER //
CREATE PROCEDURE AddBook 
(
IN book_title VARCHAR(50), 
IN author_name VARCHAR(50), 
IN publisher_name VARCHAR(50), 
IN stock_quantity INT, 
IN stock_price DECIMAL(7, 2)
)
BEGIN
DECLARE author_id INT,
DECLARE publisher_id INT,
DECLARE stock_id INT,
DECLARE book_id INT,

#Verificar si author existe
SELECT id INTO author_id FROM Author WHERE name = author_name,

#Si author no existe crearlo
IF author_id IS NULL THEN
INSERT INTO Author (name) VALUES (author_name),
SET author_id = LAST_INSERT_ID(),
END IF

#Verificar si book existe
SELECT id, author_id, publisher_id INTO book_id, author_id, publisher_id FROM Book WHERE title = book_title,
#Si book no existe crearlo
IF book_id IS NULL THEN
INSERT INTO Publisher (name) VALUES (publisher_name),
SET publisher_id = LAST_INSERT_ID(),
INSERT INTO Stock (quantity, price) VALUES(stock_quantity, stock_price),
SET stock_id = LAST_INSERT_ID(),
INSERT INTO Book (title, author_id, publisher_id, stock_id) VALUES (book_title, author_id, publisher_id, stock_id)

ELSEIF publisher_id 


SELECT id INTO publisher_id FROM Publisher WHERE name = publisher_name,
IF publisher_id IS NULL THEN
INSERT INTO Publisher (name) VALUES (publisher_name),
SET publisher_id = LAST_INSERT_ID(),
END IF,

SELECT id INTO stock_id FROM Stock WHERE 

END 
DELIMETER //
*/







#other posibility
/*
DELIMITER //
CREATE PROCEDURE AddOrUpdateBook(
    IN bookTitle VARCHAR(255),
    IN authorName VARCHAR(255),
    IN publisherName VARCHAR(255),
    IN stockQuantity INT,
    IN stockPrice DECIMAL(10, 2)
)
BEGIN
    DECLARE authorId INT;
    DECLARE publisherId INT;
    DECLARE stockId INT;
    DECLARE bookId INT;

    -- Buscar si el autor ya existe
    SELECT id INTO authorId FROM Author WHERE name = authorName;

    -- Si el autor no existe, insertarlo
    IF authorId IS NULL THEN
        INSERT INTO Author (name) VALUES (authorName);
        SET authorId = LAST_INSERT_ID();
    END IF;

    -- Buscar si el libro ya existe con el mismo título y autor
    SELECT id, stock_id INTO bookId, stockId FROM Book WHERE title = bookTitle AND author_id = authorId;

    -- Si el libro no existe, realizar las inserciones
    IF bookId IS NULL THEN
        -- Insertar la editorial si no existe
        INSERT INTO Publisher (name) VALUES (publisherName);
        SET publisherId = LAST_INSERT_ID();

        -- Insertar el stock
        INSERT INTO Stock (quantity, Price) VALUES (stockQuantity, stockPrice);
        SET stockId = LAST_INSERT_ID();

        -- Insertar el libro con las referencias a las tablas relacionadas
        INSERT INTO Book (title, author_id, publisher_id, stock_id)
        VALUES (bookTitle, authorId, publisherId, stockId);
    ELSE
        -- Si el libro ya existe, actualizar el stock
        UPDATE Stock SET quantity = quantity + stockQuantity WHERE id = stockId;
    END IF;
END //

DELIMITER ;
*/





