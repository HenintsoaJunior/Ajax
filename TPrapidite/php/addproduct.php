<?php
	require 'functions.php';

	if ($_POST['categorie'] == '' || $_POST['produitName'] == '' || $_POST['prix'] == '') {
	echo 'Aucun champ de texte ne doit etre vide. Veuiller a tout les completer.';
}
else {
	$achat = addProduit($_POST['categorie'], $_POST['produitName'], $_POST['prix'], 'Vente');
	if ($achat == -1) {
		echo 'Une erreur a ete trouver';
	}
	elseif ($achat == 0) {
		echo 'Le produit a ete ajoute avec succes. Le client peut acheter ce produit maintenant!';
	}
}
?>