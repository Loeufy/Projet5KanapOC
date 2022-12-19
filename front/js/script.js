/* 
  Ici le fetch peut être optimisable
  Pour cela je te conseil de le factoriser ainsi tu ne devras pas dupliquer la fonctione pour son prochain usage.
  C'est l'ocasion pour mettre en place un fichier dans lequel tu pourras lister les functions dont tu auras besoins à différents endroit, 
  et de plus c'est l'ocasion de découvrir une syntaxe plus appropriée pour l'usage des méthodes asyncrones.
  Liens utiles pour mieux comprendre ce code : 
  - https://m.youtube.com/watch?v=05mKXSdkCJg
  - https://fr.javascript.info/async-await 
  - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises 
  - https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Error/Error

  exemple : 
  const getData = async(url) => {
    try{
        let result = await fetch(url);
        if(result.ok){
            let response = await result.json();
            return response;
        }else{
            throw new Error("Probleme de connexion")
        }
    }catch(err){
        console.log("Erreur",err)
    }
};
*/ 

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
// TODO ici ton indentation n'est pas bonne
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


