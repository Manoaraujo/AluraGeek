import { productServices } from "../services/product-services.js";
import { displayProducts } from "./products-home.js";

const searchButton = document.querySelector("[data-search-btn]");
const productSection = document.querySelector("[data-product]");
const productSearch = document.querySelector("[data-search]").value;

async function listSimilarProducts() {
   const similarSection = document.querySelector("[data-similar]");
   const selectedItemApi = await productServices.updateProductList(
      productSearch
   );
   const categoryApi = selectedItemApi.name;
   const selectedCategory = await productServices.searchProduct(categoryApi);

   const similarCategory = {};
   selectedCategory.forEach((product) => {
      if (!similarCategory[product.category]) {
         similarCategory[product.category] = [];
      }
      similarCategory[product.category].push(product);
   });

   console.table(selectedCategory);
   for (const category in similarCategory) {
      const categoryTitle = document.createElement("h2");
      categoryTitle.className = "products__title";
      categoryTitle.textContent = "Produtos similares";
      similarSection.appendChild(categoryTitle);

      const categoryProducts = document.createElement("div");
      categoryProducts.className = "products__box";

      productSection.appendChild(categoryProducts);

      similarCategory[category].forEach((product) => {
         categoryProducts.appendChild(
            displayProducts.createCard(
               product.id,
               product.name,
               product.price,
               product.imageUrl
            )
         );
      });

      similarSection.appendChild(similarSection);
   }
}

listSimilarProducts();

searchButton.addEventListener("click", () => listSimilarProducts());
