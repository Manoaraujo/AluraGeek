import { productServices } from "../services/product-services.js";
import card from "../controllers/products-onScreen.js";

async function searchProductList(category) {
   const searchResult = await productServices.searchProductCategory(category);

   const products = document.querySelector("[data-product]");

   while (products.firstChild) {
      products.removeChild(products.firstChild);
   }

   searchResult.forEach((element) => {
      products.appendChild(
         card(element.name, element.imageUrl, element.price, element.id)
      );
   });

   if (searchResult.length == 0) {
      products.innerHTML = `<h2 class="error-message">Não existem produtos com esse termo</h2>`;
   }
}
const category = document.querySelector("[data-category]").innerText;

console.log(category);
searchProductList(category);
