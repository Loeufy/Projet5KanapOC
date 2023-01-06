const params = new URLSearchParams(document.location.search); 
// _id
const id = params.get("_id");


// Création articleClient
let articleClient = {};

// Fetch
fetch("http://localhost:3000/api/products/" + id)
  .then((res) => res.json())
  .then((produit) => {
    afficherProduit(produit);
  })
  .catch((err) => {
    document.querySelector(".item").innerHTML = "<h1>erreur 404</h1>";
    console.log("Oups ..." + err);
  });
  
function afficherProduit(produit) {
  articleClient = produit;
  // déclaration des variables
  let imageAlt = document.querySelector("article div.item__img");
  let titre = document.querySelector("#title");
  let prix = document.querySelector("#price");
  let description = document.querySelector("#description");
  let couleurOption = document.querySelector("#colors");
  
  document.title = produit.name;
  imageAlt.innerHTML = `<img src="${produit.imageUrl}" alt="${produit.altTxt}">`;
  titre.textContent = `${produit.name}`;
  prix.textContent = `${produit.price}`;
  description.textContent = `${produit.description}`;
  // boucle
  for (let couleur of produit.colors) {
    // couleur
    couleurOption.innerHTML += `<option value="${couleur}">${couleur}</option>`;
  }
  console.log("affichage effectué");
}

let choixCouleur = document.querySelector("#colors");
choixCouleur.addEventListener("input", (ec) => {
  let couleurProduit;
  couleurProduit = ec.target.value;
  articleClient.couleur = couleurProduit;
  // reset
  document.querySelector("#addToCart").style.color = "white";
  document.querySelector("#addToCart").textContent = "Ajouter au panier";
  console.log(couleurProduit);
});

// quantité
let choixQuantité = document.querySelector('input[id="quantity"]');
let quantitéProduit;
choixQuantité.addEventListener("input", (eq) => {
  quantitéProduit = eq.target.value;
  articleClient.quantité = quantitéProduit;
  // reset 
  document.querySelector("#addToCart").style.color = "white";
  document.querySelector("#addToCart").textContent = "Ajouter au panier";
  console.log(quantitéProduit);
});

// condition bouton panier

let choixProduit = document.querySelector("#addToCart");
choixProduit.addEventListener("click", () => {
  if (
    articleClient.quantité < 1 ||
    articleClient.quantité > 100 ||
    articleClient.quantité === undefined ||
    articleClient.couleur === "" ||
    articleClient.couleur === undefined
  ) {
    // alerte
    alert("Pour valider le choix de cet article, veuillez renseigner une couleur, et/ou une quantité valide entre 1 et 100");
    // si
  } else {
    // ok panier
    Panier();
    console.log("clic effectué");
    //effets
    document.querySelector("#addToCart").style.color = "rgb(0, 205, 0)";
    document.querySelector("#addToCart").textContent = "Produit ajouté !";
  }
});

// Tableaux
let choixProduitClient = [];
let produitsEnregistrés = [];
let produitsTemporaires = [];
let produitsAPousser = [];

function ajoutPremierProduit() {
  console.log(produitsEnregistrés);
  if (produitsEnregistrés === null) {
    choixProduitClient.push(articleClient);
    console.log(articleClient);
    // Last order local storage "panierStocké"
    return (localStorage.panierStocké = JSON.stringify(choixProduitClient));
  }
}

function ajoutAutreProduit() {
  produitsAPousser = [];
  produitsTemporaires.push(articleClient);
  produitsAPousser = [...produitsEnregistrés, ...produitsTemporaires];
  produitsAPousser.sort(function triage(a, b) {
    if (a._id < b._id) return -1;
    if (a._id > b._id) return 1;
    if (a._id = b._id){
      if (a.couleur < b.couleur) return -1;
      if (a.couleur > b.couleur) return 1;
    }
    return 0;
  });

  produitsTemporaires = [];
  return (localStorage.panierStocké = JSON.stringify(produitsAPousser));
}

// Ajuste la quantité si déjà au panier

function Panier() {
  produitsEnregistrés = JSON.parse(localStorage.getItem("panierStocké"));
  if (produitsEnregistrés) {
    for (let choix of produitsEnregistrés) {
      if (choix._id === id && choix.couleur === articleClient.couleur) {
        alert("RAPPEL: Vous aviez déja choisit cet article.");
        let additionQuantité = parseInt(choix.quantité) + parseInt(quantitéProduit);
        choix.quantité = JSON.stringify(additionQuantité);
        return (localStorage.panierStocké = JSON.stringify(produitsEnregistrés));
      }
    }
    return ajoutAutreProduit();
  }
  return ajoutPremierProduit();
}
