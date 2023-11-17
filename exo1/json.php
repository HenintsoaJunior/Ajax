<?php


  header( "Content-Type: application/json"); 

  $retour = array(
  				0 => array("Nom"=>"Rakoto", "Prenom"=>"John", "AnneeNaissance"=>1990),
  				1 => array("Nom"=>"Rasoa", "Prenom"=>"Kininina", "AnneeNaissance"=>1994),
  				2 => array("Nom"=>"Rabe", "Prenom"=>"Jean", "AnneeNaissance"=>1993)
  			); 

   echo json_encode($retour);
  

?>



document.getElementById('loginForm').addEventListener('submit', function(event) {
  event.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  const xhr = new XMLHttpRequest();
  xhr.open('POST', 'login.php', true);
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  xhr.onreadystatechange = function() {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        const response = JSON.parse(xhr.responseText);
        if (response.success) {
          // Rediriger ou afficher un message de succès
        } else {
          document.getElementById('error').innerText = 'Login incorrect';
        }
      } else {
        document.getElementById('error').innerText = 'Erreur de connexion';
      }
    }
  };
  const data = `email=${email}&password=${password}`;
  xhr.send(data);
});
