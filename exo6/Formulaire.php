<?php
include 'connexion.php';
include 'Fonction.php';

$conn = conn();
if (isset($_POST['date'], $_POST['produit'],$_POST['quantite'],$_POST['categorie'],$_POST['prixUnitaire'])) {
    $categorie=$_POST['categorie'];
    $produit = $_POST['produit'];
    $quantite = $_POST['quantite'];
    $prixUnitaire=$_POST['prixUnitaire'];
    $date = $_POST['date'];
    
    Insert($conn,$categorie,$produit,$quantite,$prixUnitaire,$date);
    echo json_encode(array('success' => true));
    
}
else{
    echo json_encode(array('success' => false));
}

?>
