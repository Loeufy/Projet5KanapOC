
// Récup API 
fetch("http://localhost:3000/api/products")
  // conversion en json.
  .then((res) => res.json())
  // devient objetProduits
  .then((objetProduits) => {
    // info sous forme tableau
    console.table(objetProduits);
    // affichage des produits
    lesKanaps(objetProduits);
  })
  // erreur
  .catch((err) => {
    document.querySelector(".titles").innerHTML = "<h1>erreur 404</h1>";
    console.log("Oups ..." + err);
  });

function lesKanaps(index) {
  // zone d'article
  let zoneArticle = document.querySelector("#items");
  // boucle
  for (let article of index) {
    zoneArticle.innerHTML += `<a href="./product.html?_id=${article._id}">
    <article>
      <img src="${article.imageUrl}" alt="${article.altTxt}">
      <h3 class="productName">${article.name}</h3>
      <p class="productDescription">${article.description}</p>
    </article>
  </a>`;
  }
}
