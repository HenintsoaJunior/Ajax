/// <h1> Achat </h1>
//Les codes ci dessous sont executé lors que la page est chargée
window.addEventListener("load", function () {

/// <h1> Ajout de Listner a tous les Tables </h1>
  /*let resultat = document.getElementById('resultat');
  resultat.addEventListener('click', () => {
    resultat.innerHTML = '';
  });

  let productTable = document.getElementById('productTable');
  productTable.addEventListener('click', () => {
    productTable.innerHTML = '';
  });

  let categoryTable = document.getElementById('categoryTable');
  categoryTable.addEventListener('click', () => {
    categoryTable.innerHTML = '';
  });*/

  // Accédez à l'élément form …
  var form = document.getElementById("myForm");

  // … et prenez en charge l'événement submit.
  form.addEventListener("submit", function (event) {
    event.preventDefault(); // évite de faire le submit par défaut

    sendData(0, resultat, form, "POST", "php/vente.php");

    document.getElementById('date').value = '';
    document.getElementsByClassName('categorie')[1].value = '';
    document.getElementById('produit').value = '';
    document.getElementById('quantite').value = '';
  });

/// <h1> Ajout de Categorie </h1>
  let categorie = document.getElementsByClassName('categorie');
  let produit_list = document.getElementById('produit-list');
  loadCategory(categorie, produit_list, 'json/json3.php');

  let categorieForm = document.getElementById('categorieForm');
  categorieForm.addEventListener("submit", function(event) {
    event.preventDefault();

    sendData(2 ,categoryTable ,categorieForm, "POST", "php/addcategory.php");
    loadCategory(categorie, produit_list, 'json/json3.php');

    document.getElementById('categorieName').value = '';
    });

/// <h1> Ajout de Produit </h1>

  let produitForm = document.getElementById('produitForm');
  produitForm.addEventListener("submit", function(event) {
    event.preventDefault();

    sendData(1, productTable, produitForm, "POST", "php/addproduct.php");

    document.getElementsByClassName('categorie')[0].value = '';
    document.getElementById('produitName').value = '';
    document.getElementById('prix').value = '';
    });

});