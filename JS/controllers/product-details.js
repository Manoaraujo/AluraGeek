import { productServices } from "../services/product-services.js";
import { displayProducts } from "../controllers/products-home.js";

const urlParams = new URLSearchParams(window.location.search);
const idUrl = urlParams.get("id");
const productSection = document.querySelector("[data-details]");

function ShowDetails(imageUrl, name, price, description) {
   const productDiv = document.createElement("div");
   productDiv.className = "product__display-box";
   
   productDiv.innerHTML = `
   <img class="product__display-image" src="${imageUrl}">
   
   <div class="product__display-textbox">
   <p class="product__display-title">${name}</p>
   <p class="product__display-price">R$ ${price.toFixed(2)} </p>
   <p class="product__display-text">${description}</p>
   <a class="products__link" href="javascript: history.go(-1)"> voltar</a>
   </div> 
   `;
   
   return productDiv;
}

async function listSimilarProducts() {
   const similarSection = document.querySelector("[data-similar]");
   const selectedItemApi = await productServices.updateProductList(idUrl);
   const categoryApi = selectedItemApi.category
   const selectedCategory = await productServices.searchProductCategory(categoryApi)
   
   const similarCategory = {};
   selectedCategory.forEach((product) => {
      if (!similarCategory[product.category]) {
         similarCategory[product.category] = [];
      }
      similarCategory[product.category].push(product);
   });
   
   console.table(similarCategory);
   for (const category in similarCategory) {
      
      const categoryTitle = document.createElement("h2");
      categoryTitle.className = "products__title";
      categoryTitle.textContent = "Produtos similares";
      similarSection.appendChild(categoryTitle);
      
      const categoryProducts = document.createElement("div");
      categoryProducts.className = "products__box";
      
      similarSection.appendChild(categoryProducts);
      
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
      
      async function loadProduct() {
         const product = await productServices.updateProductList(idUrl);
         const displayDiv = ShowDetails(
            product.imageUrl,
            product.name,
            product.price,
            product.description
            );
            
            productSection.appendChild(displayDiv);
         }
         
         loadProduct();
         listSimilarProducts();
         