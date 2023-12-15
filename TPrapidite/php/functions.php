<?php
require 'connexion.php';

function modifyVente($idVente, $date, $categorie, $produit, $quantite, $dbName) {
	try {
		$sql = 'UPDATE Vente SET dateVente = \''.$date.'\', idCategorie = '.$categorie.', idProduit = '.$produit.', quantite = '.$quantite.' WHERE idVente = '.$idVente;
		mysqli_query(dbconnexion($dbName), $sql);
		return 0;
	} catch (e) {
		return -1;
	}
}

function addVente($date, $categorie, $produit, $quantite, $dbName) {
	$vente = getAllTableElementWhere('Vente', 'idProduit', $produit, 'Vente');
	if (count($vente) != 0) {
		try {
			$sql = 'UPDATE Vente SET quantite = '.$quantite + $vente[0]['quantite'].', dateVente = \''.$date.'\'  WHERE idCategorie = '.$categorie.' AND idProduit = '.$produit;
			mysqli_query(dbconnexion($dbName), $sql);
			return 1;
		} catch (e) {
			return -1;
		}
	}
	else {
		try {
			$sql = 'INSERT INTO Vente(dateVente, idCategorie, idProduit, quantite) VALUES (\''.$date.'\', '.$categorie.', '.$produit.', '.$quantite.')';
			mysqli_query(dbconnexion($dbName), $sql);
			return 0;
		} catch (e) {
			return -1;
		}
	}
}

function addProduit($categorie, $produit, $prix, $dbName) {
	try {
		$sql = 'INSERT INTO Produit(idCategorie, produit, prix) VALUES ('.$categorie.' ,\''.$produit.'\', '.$prix.')';
		mysqli_query(dbconnexion($dbName), $sql);
		return 0;
	} catch (e) {
		return -1;
	}
}

function addCategorie($categorie, $dbName) {
	try {
		$sql = 'INSERT INTO Categorie(categorie) VALUES (\''.$categorie.'\')';
		mysqli_query(dbconnexion($dbName), $sql);
		return 0;
	} catch (e) {
		return -1;
	}
}

function deleteElementById($id, $tableName, $dbName) {
	try {
		$sql = 'DELETE FROM '.$tableName.' WHERE id'.$tableName.' = '.$id;
		mysqli_query(dbconnexion($dbName), $sql);
		return 0;
	} catch(e) {
		return -1;
	}
}

function getAllTableElement($tableName, $dbName) {
	$retour = array();
	$sql = 'SELECT * FROM '.$tableName;
	$resultat = mysqli_query(dbconnexion($dbName), $sql);
	while ($donnees = mysqli_fetch_assoc($resultat)) {
	    $retour[] = $donnees;
	}
	mysqli_free_result($resultat);
	return $retour;
}

function getAllTableElementJoinOn($tableName1, $tableName2, $idJoin, $dbName) {
	$retour = array();
	$sql = 'SELECT '.$tableName1.'.*, '.$tableName2.'.* FROM '.$tableName1.' JOIN '.$tableName2.' ON '.$tableName1.'.'.$idJoin.' = '.$tableName2.'.'.$idJoin;
	$resultat = mysqli_query(dbconnexion($dbName), $sql);
	while ($donnees = mysqli_fetch_assoc($resultat)) {
	    $retour[] = $donnees;
	}
	mysqli_free_result($resultat);
	return $retour;
}

function getAllTableElementWhere($tableName, $column, $where, $dbName) {
	$retour = array();
	$sql = 'SELECT * FROM '.$tableName.' WHERE '.$column.' = '.$where;
	$resultat = mysqli_query(dbconnexion($dbName), $sql);
	while ($donnees = mysqli_fetch_assoc($resultat)) {
	    $retour[] = $donnees;
	}
	mysqli_free_result($resultat);
	return $retour;
}
?>