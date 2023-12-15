<?php
	require 'functions.php';
	if (!isset($_GET['idVente']) || $_GET['idVente'] == '') {
		echo 'Pourquoi vouloir supprimer rien?';
	}
	else {
		$delete = deleteElementById($_GET['idVente'], 'Vente', 'Vente');
		if ($delete == 0) {
			echo 'L\'achat a ete supprimer avec success.';
		}
		else {
			echo 'Task failed successfully...';
		}
	}
?>