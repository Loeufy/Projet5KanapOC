// valeur du numero de commande
let numCom = new URLSearchParams(document.location.search).get("commande");
document.querySelector("#orderId").innerHTML = `<br>${numCom}<br>Merci pour votre achat`;
console.log("valeur de l'orderId venant de l'url: " + numCom);