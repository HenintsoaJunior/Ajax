function graph()
{
    document.addEventListener('DOMContentLoaded', function () {
        var ctx = document.getElementById('myChart').getContext('2d');
        var myChart = new Chart(ctx, {
            type: 'line', // Changez le type de graphique en 'line'
            data: {
                labels: ['Label1', 'Label2', 'Label3'], // Les étiquettes de l'axe des X
                datasets: [{
                    label: 'Nom du dataset',
                    data: [10, 20, 30], // Les données du graphique
                    backgroundColor: 'rgba(75, 192, 192, 0.2)', // Couleur de fond
                    borderColor: 'rgba(75, 192, 192, 1)', // Couleur de la ligne
                    borderWidth: 1 // Largeur de la ligne
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    });
}

function graph2() {
    document.addEventListener('DOMContentLoaded', function () {
        var ctx = document.getElementById('myChart').getContext('2d');
        var myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['2023-12-01', '2023-12-02', '2023-12-03', '2023-12-04', '2023-12-05'],
                datasets: [{
                    label: 'Ventes journalières',
                    data: [12, 19, 3, 5, 2],
                    fill: false,
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 2,
                    pointBackgroundColor: 'rgba(75, 192, 192, 1)',
                    pointRadius: 5,
                    pointHoverRadius: 8
                }]
            },
            options: {
                scales: {
                    x: {
                        type: 'time',
                        time: {
                            unit: 'day',
                            displayFormats: {
                                day: 'YYYY-MM-DD'
                            }
                        },
                        grid: {
                            display: false
                        }
                    },
                    y: {
                        beginAtZero: true,
                        ticks: {
                            stepSize: 2
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: true,
                        position: 'top'
                    }
                }
            }
        });
    });
}



function getXhr()
{
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
  return xhr ; ;
}

function makeinfo()
{
            function sendData() {
                var xhr = getXhr() ;   
                // Liez l'objet FormData et l'élément form
                var formData = new FormData(form);

                xhr.addEventListener("error", function(event) {
                  alert('Oups! Quelque chose s\'est mal passé.');
                });

                // Configurez la requête
                xhr.open("POST", "pages/dashboard/traitement.php")
                // Les données envoyées sont ce que l'utilisateur a mis dans le formulaire
                xhr.send(formData);
              }
              // Accédez à l'élément form …
              var form = document.getElementById("myForm");
              // … et prenez en charge l'événement submit.
              form.addEventListener("submit", function (event) {
              event.preventDefault(); // évite de faire le submit par défaut
                sendData();
              });  
}

function generate_table(country) {
 
    var tbl = document.createElement("table");
    var tblBody = document.createElement("tbody");
  
    for (var i = 0; i < country.length; i++) {
  
        var row = document.createElement("tr");
        row.setAttribute('id' ,country[i].idVente) ;
        var input = document.createElement("input") ;
        input.setAttribute( 'value' , 'suprimer' ) ; 
        input.setAttribute( 'type' , 'submit' ) ;
        const index =  country[i].idVente;
        input.addEventListener("click", function(event)
        { 
              //console.log(index) ; 
              var id = document.getElementById(index.toString()) ; 
              //console.log(id) ; 
              suprimer(index) ; 
        }) ;  
        var input1 = document.createElement("input") ;
        input1.setAttribute( 'value' , 'modifier' ) ; 
        input1.setAttribute( 'type' , 'submit' ) ;
  
  
        for (var property in country[i]) {
  
            var cell = document.createElement("td");
            var cellText = document.createTextNode(country[i][property]);
            cell.appendChild(cellText);
            cell.className = 'table' ; 
            row.appendChild(cell);
        }
        var cell1 = document.createElement("td");
        cell1.append(input) ; 
        var cell2 = document.createElement("td");
  
        cell1.className = 'table' ; 
        cell2.className = 'table' ;
  
        cell2.append(input1) ; 
        row.appendChild(cell1) ; 
        row.appendChild(cell2) ; 
        tblBody.appendChild(row);
    }
    tbl.appendChild(tblBody); 
    return tbl ; 
  }

function showdonne()
{ 
        function sendData() {
          var xhr = getXhr() ; 
          // Liez l'objet FormData et l'élément form
          var formData = new FormData(form);
          
          var div = document.getElementById('table') ;
          xhr.onreadystatechange = () => {
            if(xhr.readyState == 4)
            {
                if(xhr.status == 200) {
                    var tabJSON = JSON.parse(xhr.responseText);
                    var table = document.getElementById("table-body");
                    table.replaceChildren();
                        for(var date in tabJSON)
                        {
                            const dateData = date;
                            var trow = document.createElement("tr");
                            var datecell = document.createElement("td");
                            datecell.textContent = date;
                            trow.append(datecell);
                            for(let i = 0; i < tabJSON[date].length; i++)
                            {
                                var cell = document.createElement("td");
                                cell.textContent = tabJSON[date][i].value;
                                trow.append(cell);
                            }

                        // <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#myModal">Voir Info</button>
                        var button = document.createElement("button");
                        button.setAttribute("class", "btn btn-primary");
                        button.setAttribute("data-bs-toggle", "modal");
                        button.setAttribute("data-bs-target", "#myModal");
                        button.textContent = "Voir Info";
                        button.addEventListener("click", e => {
                            xhr.addEventListener("error", function(event) {
                              alert('Oups! Quelque chose s\'est mal passé.');
                            });
            
                            xhr.onreadystatechange = () => {
                                if(xhr.readyState == 4)
                                {
                                    if(xhr.status == 200)
                                    {
                                        document.getElementById("modalkely").replaceChildren();
                                        JSON.parse(xhr.responseText).forEach(line => document.getElementById("modalkely").innerHTML += "<p> " + line.category + " " + line.bitcoin + " " + line.price + " x " + line.quantity + " </p>");
                                    }
                                }
                            }
                            // Configurez la requête
                            xhr.open("GET", "pages/dashboard/get-transaction.php?date=" + dateData);
                            // Les données envoyées sont ce que l'utilisateur a mis dans le formulaire
                            xhr.send(null);
                        });
                            trow.append(button);
                            table.append(trow);
                        }
                    }
            }
          }; 
          xhr.open("POST", "pages/dashboard/traitement.php");
          xhr.send(formData);
        }
        var form = document.getElementById("myForm");
        form.addEventListener("submit", function (event) {
        event.preventDefault();
      
          sendData();
        });
      
}