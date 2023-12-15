<?php
  require '../php/functions.php';

  header( "Content-Type: application/json"); 

  if (isset($_GET['categorie'])) {
    if ($_GET['categorie'] != '') {
      $retour = getAllTableElementWhere('V_ProduitCategorie', 'idCategorie', $_GET['categorie'], 'Vente');

      echo json_encode($retour);
    }
  }
  elseif (isset($_GET['get'])) {
    $retour = getAllTableElement('V_ProduitCategorie', 'Vente');

    echo json_encode($retour);
  }
  else {
    echo '';
  }
  

?>