CREATE DATABASE Vente;
USE Vente;

CREATE TABLE Categorie (
	idCategorie INT PRIMARY KEY AUTO_INCREMENT,
	categorie VARCHAR(50) NOT NULL
);

CREATE TABLE Produit (
	idProduit INT PRIMARY KEY AUTO_INCREMENT,
	idCategorie INT NOT NULL,
	produit VARCHAR(50) NOT NULL,
	prix DOUBLE NOT NULL,
	FOREIGN KEY (idCategorie) REFERENCES Categorie(idCategorie)
) ENGINE = innodb;

CREATE TABLE Vente (
	idVente INT PRIMARY KEY AUTO_INCREMENT,
	dateVente DATE NOT NULL,
	idCategorie INT NOT NULL,
	idProduit INT NOT NULL,
	quantite INT NOT NULL,
	FOREIGN KEY (idCategorie) REFERENCES Categorie(idCategorie),
	FOREIGN KEY (idProduit) REFERENCES Produit(idProduit)
) ENGINE = innodb;

create or replace view V_ProduitCategorie as select Produit.*, Categorie.categorie from Produit join Categorie on Produit.idCategorie=Categorie.idCategorie;


CREATE FUNCTION calculPrix(quantite INT, prix DOUBLE)
RETURNS DOUBLE
BEGIN
	DECLARE result DOUBLE;
	SET result = quantite * prix;
	RETURN result;
END;
