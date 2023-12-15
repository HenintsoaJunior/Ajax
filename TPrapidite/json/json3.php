<?php
  require '../php/functions.php';

  header( "Content-Type: application/json"); 

  $retour = getAllTableElement('Categorie', 'Vente');

   echo json_encode($retour);
  

?>