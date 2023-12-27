SHOW DATABASES;

CREATE DATABASE bookstore_sys;
USE bookstore_sys;

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
ALTER TABLE Stock MODIFY COLUMN price DECIMAL(7, 2) NOT NULL; #modifications that I considered after create table

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
ALTER TABLE Register MODIFY COLUMN username VARCHAR(250) NOT NULL UNIQUE;

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
   ("juan", 123);

ALTER VIEW ConsultBook AS
SELECT Book.id, Book.title as Title, Author.name AS Author, Publisher.name AS Publisher, Stock.quantity AS Stock, Stock.Price AS Price
FROM Book
INNER JOIN Author ON Book.author_id = Author.id
INNER JOIN Publisher ON Book.publisher_id = Publisher.id
INNER JOIN Stock ON Book.stock_id = Stock.id;