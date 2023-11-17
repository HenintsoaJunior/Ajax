document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
  
    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'login.php', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4) {
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