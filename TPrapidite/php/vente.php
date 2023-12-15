<?php
	require 'functions.php';

	if ($_POST['date'] == '' || $_POST['categorie'] == '' || $_POST['produit'] == '' || $_POST['quantite'] == '') {
		echo 'Aucun champ de texte ne doit etre vide. Veuiller a tout les completer.';
	}
	else {
		if ($_POST['idVente'] != -1) {
			$achat = modifyVente($_POST['idVente'], $_POST['date'], $_POST['categorie'], $_POST['produit'], $_POST['quantite'], 'Vente');
			if ($achat == -1) {
				echo 'Task failed successfully...';
			}
			elseif ($achat == 0) {
				echo 'Votre achat a ete modifier avec succes. Merci de votre confiance! ($o$)';
			}
		}
		else {
			$achat = addVente($_POST['date'], $_POST['categorie'], $_POST['produit'], $_POST['quantite'], 'Vente');
			if ($achat == -1) {
				echo 'Une erreur a ete trouver';
			}
			elseif ($achat == 0) {
				echo 'Votre achat a ete effectue avec succes. Merci de votre confiance! :)';
			}
			elseif ($achat == 1) {
				echo 'Votre achat a ete ajouter avec succes. Merci de votre confiance! ;)';
			}
		}
	}
?>