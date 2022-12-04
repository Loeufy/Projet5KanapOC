fetch('http://localhost:3000/api/products')
  .then((response) => response.json())
  .then((Produits) => {
    LesKanaps(ProduitsKanaps);
  })

  .catch((erreur) => {
    document.querySelector(".item").innerHTML = "<h1>erreur 404</h1>";
    console.log("erreur 404" + erreur);
  });

  let articleClient = {};
  articleClient._id = id;

  function LesKanaps(Pkanaps) {
    let photos = document.querySelector("article div.item__img");
    let titre = document.querySelector("#title");
    let tarif = document.querySelector("#price");
    let description = document.querySelector("#description");
    let couleur = document.querySelector("#colors");

    for (let choix of produit) {
        
        if (id === choix._id) {
            photos.innerHTML = `<img src="${choix.imageUrl}" alt="${choix.altTxt}">`;
            titre.textContent = `${choix.name}`;
            tarif.textContent = `${choix.price}`;
            description.textContent = `${choix.description}`;

            for (let couleurs of choix.colors) {
              couleurOption.innerHTML += `<option value="${couleur}">${couleur}</option>`;
            }
          }
        }
        console.log("affichage effectué");
      }
