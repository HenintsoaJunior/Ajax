<?php
  require '../php/functions.php';

  header( "Content-Type: application/json"); 

  $retour = getAllTableElementJoinON('Vente', 'V_ProduitCategorie', 'idProduit', 'Vente');

   echo json_encode($retour);
  

?>