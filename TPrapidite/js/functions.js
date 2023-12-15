function xmlHttpRequest() {
    var xhr; 
    try {  xhr = new ActiveXObject('Msxml2.XMLHTTP');   }
    catch (e) 
    {
        try {   xhr = new ActiveXObject('Microsoft.XMLHTTP'); }
        catch (e2) 
        {
           try {  xhr = new XMLHttpRequest();  }
           catch (e3) {  xhr = false;   }
         }
    }
    return xhr;
}

/// To send data to a PHP page
function sendData(id, table, form, method, action) {
    let xhr = xmlHttpRequest();

    // Definissez ce qui se passe en cas d'erreur
    xhr.addEventListener("error", function(event) {
        alert('Oups! Quelque chose s\'est mal passé.');
    });

    if (form != null) {
        // Liez l'objet FormData et l'élément form
        var formData = new FormData(form);

        // Configurez la requête
        xhr.open(method, action);

        // Les données envoyées sont ce que l'utilisateur a mis dans le formulaire
        xhr.send(formData);
    }
    else {
        // Configurez la requête
        xhr.open(method, action);

        // Les données envoyées sont ce que l'utilisateur a mis dans le formulaire
        xhr.send(form);
    }
    
    xhr.onreadystatechange = function() {
        if(xhr.readyState == 4) {
            if(xhr.status == 200) {
                alert(xhr.responseText);
                if (id == 0) {
                    displayVente(form, table, 'json/json1.php');
                    form.elements[0].value = -1;
                }
                else if (id == 1) {
                    displayProduit(table, 'json/json2.php');
                }
                else if (id == 2) {
                    displayCategorie(table, 'json/json3.php');
                }
            }
        }
    }
  }

/// All Display
function displayVente(form, resultat, jsonPath) {
    let xhr = xmlHttpRequest();

    // Definissez ce qui se passe en cas d'erreur
    xhr.addEventListener("error", function(event) {
      alert('Oups! Quelque chose s\'est mal passé.');
    });
    
    xhr.onreadystatechange = function() {
        if(xhr.readyState == 4) {
            if(xhr.status == 200) {
                var retour = JSON.parse(xhr.responseText);
                var el;
                resultat.innerHTML = '<tr> <th>Id de Vente</th> <th>Date de Vente</th> <th>Categorie</th> <th>Produit</th> <th>Quantite</th> <th>Prix</th> <th>Supprimer</th> <th>Modifier</th> </tr>';
                for (var i = 0; i < retour.length; i++) {
                    resultat.innerHTML += '<tr> <td>' + retour[i].idVente + '</td> <td>' + retour[i].dateVente + '</td> <td>' + retour[i].categorie + '</td> <td>' + retour[i].produit + '</td> <td>' + retour[i].quantite + '</td> <td>' + retour[i].quantite * retour[i].prix + '</td> <td> <button id="supprimer' + retour[i].idVente + '" class="btn btn-danger">Supprimer</button> </td> <td> <button class="btn btn-info" id="modifier' + retour[i].idVente + '"> Modifier</button> </td> </tr>';
                }
                for (let i = 0; i < retour.length; i++) {
                    const index = i;
                    document.getElementById('supprimer' + retour[index].idVente).addEventListener('click', e => {
                        sendData(0, resultat, form, 'GET', 'php/supprimer.php?idVente='+ retour[index].idVente);
                    });
                    document.getElementById('modifier' + retour[index].idVente).addEventListener('click', e => {
                        let myForm = document.getElementById('myForm');
                        myForm.elements['idVente'].value = retour[index].idVente;
                        myForm.elements['date'].value = retour[index].dateVente;
                        myForm.elements['categorie'].value = retour[index].idCategorie;
                        myForm.elements['produit'].value = retour[index].idProduit;
                        myForm.elements['quantite'].value = retour[index].quantite;
                    });
                }
            }
        }
    }

    //XMLHttpRequest.open(method, url, async)
    xhr.open("GET", jsonPath,  true); 
       
    //XMLHttpRequest.send(body)
    xhr.send(null); 
  }

function displayProduit(productTable, jsonPath) {
    let xhr = xmlHttpRequest();

    // Definissez ce qui se passe en cas d'erreur
    xhr.addEventListener("error", function(event) {
      alert('Oups! Quelque chose s\'est mal passé.');
    });

    //XMLHttpRequest.open(method, url, async)
    xhr.open("GET", jsonPath + "?get=1",  true); 
       
    //XMLHttpRequest.send(body)
    xhr.send(null);
    
    xhr.onreadystatechange = function() {
        if(xhr.readyState == 4) {
            if(xhr.status == 200) {
                var retour = JSON.parse(xhr.responseText);
                productTable.innerHTML = '<tr> <th>Id de Produit</th> <th>Categorie</th> <th>Produit</th> <th>Prix</th> </tr>';
                for (var i = 0; i < retour.length; i++) {
                    productTable.innerHTML += '<tr> <td>' + retour[i].idProduit + '</td> <td>' + retour[i].categorie + '</td> <td>' + retour[i].produit + '</td> <td>' + retour[i].prix + '</td> </tr>';
                    
                }
            }
        }
    }
  }

function displayCategorie(categoryTable, jsonPath) {
    let xhr = xmlHttpRequest();

    // Definissez ce qui se passe en cas d'erreur
    xhr.addEventListener("error", function(event) {
      alert('Oups! Quelque chose s\'est mal passé.');
    });
    
    xhr.onreadystatechange = function() {
        if(xhr.readyState == 4) {
            if(xhr.status == 200) {
                var retour = JSON.parse(xhr.responseText);
                categoryTable.innerHTML = '<tr> <th>Id de Categorie</th> <th>Categorie</th> </tr>';
                for (var i = 0; i < retour.length; i++) {
                    categoryTable.innerHTML += '<tr> <td>' + retour[i].idCategorie + '</td> <td>' + retour[i].categorie + '</td> </tr>';
                }
            }
        }
    }

    //XMLHttpRequest.open(method, url, async)
    xhr.open("GET", jsonPath,  true); 
       
    //XMLHttpRequest.send(body)
    xhr.send(null); 
  }

/// All Load
function loadProduct(categorie, produit, jsonPath) {
    let xhr = xmlHttpRequest();

    // Definissez ce qui se passe en cas d'erreur
    xhr.addEventListener("error", function(event) {
      alert('Oups! Quelque chose s\'est mal passé.');
    });

    //XMLHttpRequest.open(method, url, async)
    xhr.open("GET", jsonPath + '?categorie=' + categorie.value,  true); 
       
    //XMLHttpRequest.send(body)
    xhr.send(JSON.stringify({}));
    
    xhr.onreadystatechange = function() {
        if(xhr.readyState == 4) {
            if(xhr.status == 200) {
                if (xhr.responseText != '') {
                    var retour = JSON.parse(xhr.responseText);
                    produit.innerHTML = '';
                    for (var i = 0; i < retour.length; i++) {
                        produit.innerHTML += '<option value="' + retour[i].idProduit + '">' + retour[i].produit + '</option>';
                    }
                }
            }
        }
    } 
  }

function loadCategory(categorie, produit, jsonPath) {
    let xhr = xmlHttpRequest();

    // Definissez ce qui se passe en cas d'erreur
    xhr.addEventListener("error", function(event) {
      alert('Oups! Quelque chose s\'est mal passé.');
    });
    
    xhr.onreadystatechange = function() {
        if(xhr.readyState == 4) {
            if(xhr.status == 200) {
                var retour = JSON.parse(xhr.responseText);
                let categorieOption = [];
                for (let j = 0; j < categorie.length; j++) {
                    categorie[j].innerHTML = '';
                    for (let i = 0; i < retour.length; i++) {
                        if (j == 0) {
                            categorie[j].innerHTML += '<option value="' + retour[i].idCategorie + '">' + retour[i].categorie + '</option>';
                        }
                        else {
                            categorie[j].innerHTML += '<option value="' + retour[i].idCategorie + '">' + retour[i].categorie + '</option>';                            
                            categorieOption.push(document.getElementById('categorieOption' + retour[i].idCategorie));
                        }
                    } 
                    if (j == categorie.length - 1) {
                        if (categorie[j].value != '') {
                            loadProduct(categorie[j], produit, 'json/json2.php');
                        }
                        categorie[j].addEventListener('change', () => {
                            loadProduct(categorie[j], produit, 'json/json2.php');
                        });
                    }
                }
            }
        }
    }

    //XMLHttpRequest.open(method, url, async)
    xhr.open("GET", jsonPath,  true); 
       
    //XMLHttpRequest.send(body)
    xhr.send(null); 
  }