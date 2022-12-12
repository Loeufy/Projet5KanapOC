fetch('http://localhost:3000/api/products')
  .then((response) => response.json())
  .then((Produits) => {
    console.table(Produits);
    Kanaps(Produits);
  })

  .catch((erreur) => {
    document.querySelector(".titles").innerHTML = "<h1>erreur 404</h1>";
    console.log("erreur 404" + erreur);
  });

  function Kanaps(index) {
    let zoneArticle = document.querySelector("#items");
    for (let article of index) {
      let contentArticle = document.createElement("a");
      contentArticle.href = `./product.html?_id=${article._id}`
      contentArticle.innerHTML = `
      <article>
        <img src="${article.imageUrl}" alt="${article.altTxt}">
        <h3 class="productName">${article.name}</h3>
        <p class="productDescription">${article.description}</p>
      </article>
    `;
    zoneArticle.append(contentArticle)
    }
  }


