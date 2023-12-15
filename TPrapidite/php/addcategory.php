<?php
	require 'functions.php';

	if ($_POST['categorieName'] == '') {
	echo 'Aucun champ de texte ne doit etre vide. Veuiller a tout les completer.';
}
else {
	$achat = addCategorie($_POST['categorieName'], 'Vente');
	if ($achat == -1) {
		echo 'Une erreur a ete trouver';
	}
	elseif ($achat == 0) {
		echo 'La categorie a ete ajoutee avec succes. Le client peut voir les produits de cette categorie maintenant!';
	}
}
?>