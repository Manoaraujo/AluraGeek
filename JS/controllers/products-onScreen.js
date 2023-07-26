import { productServices } from "../services/product-services.js";

const products = document.querySelector("[data-product]");

export default function card(name, imageUrl, price, id) {
   const showProduct = document.createElement("div");
   showProduct.className = "products__items-all ";
   showProduct.innerHTML = `
   <div class="products__image-box">
   
   <img 
   src="${imageUrl}"
   class="products__image-all"
   />
   </div>
   <p class="products__name">${name}</p>
   <p class="products__price">R$ ${price.toFixed(2)}</p>
   <a class="products__link" href="../views/produto.html?id="${id}" >Ver produto</a>
      
   `;

   return showProduct;
}

async function productsOnScreen() {
   try {
      const productsAPI = await productServices.getProductList();
      productsAPI.forEach((element) =>
         products.appendChild(
            card(element.name, element.imageUrl, element.price, element.id)
         )
      );
   } catch {
      products.innerHTML = `<h2 >Não foi possível carregar os produtos</h2>`;
   }
}

productsOnScreen();
