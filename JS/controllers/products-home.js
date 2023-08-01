import { productServices } from "../services/product-services.js";

function createCard(id, name, price, imageUrl) {
   const showProduct = document.createElement("div");

   showProduct.className = "products__items";
   showProduct.setAttribute("data-id", id);

   showProduct.innerHTML = `
   <img src="${imageUrl}" alt="" class="products__image-all" />
   <h2 class="products__name">${name}</h2>
   <p class="products__price">R$ ${price.toFixed(2)}</p>
   <a href="" class="products__link" id="view-product" data-product-id>Ver produto</a>
   `;

   return showProduct;
}

async function listProduct() {
   const mainContainer = document.querySelector(".main__container");
   const listApi = await productServices.getProductList();

   const allCategories = document.createElement("div");
   allCategories.className = "products__home-search";
   allCategories.setAttribute("data-product", "");
   mainContainer.appendChild(allCategories);

   const categoriesList = {};

   listApi.forEach((product) => {
      if (!categoriesList[product.category]) {
         categoriesList[product.category] = [];
      }

      categoriesList[product.category].push(product);
   });

   for (const category in categoriesList) {
      const categoryContainer = document.createElement("section");
      categoryContainer.className = "products__container";

      const categoryHeader = document.createElement("div");
      categoryHeader.className = "products__headline";

      const categoryTitle = document.createElement("h2");
      categoryTitle.className = "products__title";
      categoryTitle.textContent = category;
      categoryHeader.appendChild(categoryTitle);

      const categoryMore = document.createElement("div");
      categoryMore.className = "products__more";

      const categoryLink = document.createElement("a");
      categoryLink.href = "./html/products.html";
      categoryLink.className = "products__link";
      categoryLink.textContent = "Ver Mais";
      categoryMore.appendChild(categoryLink);

      const categoryArrow = document.createElement("img");
      categoryArrow.src = "../assets/img/arrow.svg";
      categoryArrow.className = "products__arrow";
      categoryMore.appendChild(categoryArrow);

      categoryHeader.appendChild(categoryMore);
      categoryContainer.appendChild(categoryHeader);

      const categoryProducts = document.createElement("div");
      categoryProducts.className = "products__box";

      categoryProducts.id = category.toLowerCase().replace(" ", "-");
      categoryContainer.appendChild(categoryProducts);

      categoriesList[category].forEach((product) => {
         categoryProducts.appendChild(
            createCard(
               product.id,
               product.name,
               product.price,
               product.imageUrl
            )
         );
      });

      allCategories.appendChild(categoryContainer);
   }
}

document.addEventListener("DOMContentLoaded", listProduct());

// ****************************
// CHANGE PROMO FRASES

const promoTitle = ["Dezembro Promocional", "Promoção dia dos pais!"];
const promoFrases = [
   "Produtos selecionados com 15% de desconto.",
   "42% de desconto pro seu pai gamer!",
];

let currentIndex = 0;

document.addEventListener("DOMContentLoaded", () => {
   changeFrase(promoTitle[1], promoFrases[currentIndex]);

   // Chamar a função changeFrase a cada 30 segundos
   setInterval(() => {
      currentIndex = (currentIndex + 1) % promoTitle.length;
      changeFrase(promoTitle[1], promoFrases[currentIndex]);
   }, 6000); //
});

function changeFrase(title, frase) {
   const fraseContainer = document.createElement("div");
   const promoContainer = document.querySelector("[data-banner]");
   fraseContainer.className = "banner__box";
   fraseContainer.innerHTML = `
         
         <h1 class="banner__title">${title}</h1>
         <p class="banner__text">
         ${frase}
         </p>
         <a href="#console"
                  ><button class="banner__button">Ver Console</button>
               </a>
         `;
   promoContainer.innerHTML = ""; // Limpar o conteúdo anterior do container
   promoContainer.appendChild(fraseContainer);
}

export const displayProducts = {
   createCard,
};
