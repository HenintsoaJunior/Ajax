CREATE DATABASE bitcoin;
USE bitcoin;

CREATE TABLE initial_rate(
    name VARCHAR(3) NOT NULL PRIMARY KEY,
    value NUMERIC(18, 2) NOT NULL DEFAULT 0
);

CREATE TABLE transaction_category(
    name VARCHAR(5) NOT NULL PRIMARY KEY
);

CREATE TABLE transaction_bitcoin(
    id INT PRIMARY KEY AUTO_INCREMENT,
    bitcoin VARCHAR(3) NOT NULL REFERENCES initial_rate(name),
    category VARCHAR(5) NOT NULL REFERENCES transaction_category(name),
    date DATE NOT NULL,
    price NUMERIC(18, 2) NOT NULL DEFAULT 0,
    quantity NUMERIC(18) NOT NULL DEFAULT 0,
    
    CHECK(price > 0),
    CHECK(quantity > 0)
);

INSERT INTO initial_rate VALUES('BTC', 43500), ('BEP', 39000), ('WRP', 40000);
INSERT INTO transaction_category VALUES('Achat'), ('Vente');

INSERT INTO transaction_bitcoin (bitcoin, category, date, price, quantity) VALUES ('BTC', 'Achat', '2021-01-01', 43500, 10);
INSERT INTO transaction_bitcoin (bitcoin, category, date, price, quantity) VALUES ('BTC', 'Vente', '2021-01-01', 43500, 15);
INSERT INTO transaction_bitcoin (bitcoin, category, date, price, quantity) VALUES ('BEP', 'Achat', '2021-01-01', 39000, 20);
INSERT INTO transaction_bitcoin (bitcoin, category, date, price, quantity) VALUES ('BEP', 'Vente', '2021-01-01', 39000, 30);
INSERT INTO transaction_bitcoin (bitcoin, category, date, price, quantity) VALUES ('WRP', 'Achat', '2021-01-01', 40000, 10);
INSERT INTO transaction_bitcoin (bitcoin, category, date, price, quantity) VALUES ('WRP', 'Vente', '2021-01-01', 40000, 30);
INSERT INTO transaction_bitcoin (bitcoin, category, date, price, quantity) VALUES ('BTC', 'Achat', '2021-01-01', 43500, 15);
INSERT INTO transaction_bitcoin (bitcoin, category, date, price, quantity) VALUES ('BTC', 'Vente', '2021-01-01', 43500, 20);
INSERT INTO transaction_bitcoin (bitcoin, category, date, price, quantity) VALUES ('BEP', 'Achat', '2021-01-01', 39000, 10);
INSERT INTO transaction_bitcoin (bitcoin, category, date, price, quantity) VALUES ('BEP', 'Vente', '2021-01-01', 39000, 15);