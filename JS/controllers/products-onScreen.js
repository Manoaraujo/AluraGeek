import { productServices } from "../services/product-services.js";

const products = document.querySelector("[data-product]");

export default function card(name, imageUrl, price, id) {
   const showProduct = document.createElement("div");
   showProduct.className = "products__items-all ";
   showProduct.innerHTML = `
   <div class="products__image-box">
   <button class="products__recicle-bin" data-delete></button>
   <button class="products__pen-edit" data-edit></button>         
   <img 
   src="${imageUrl}"
   class="products__image-all"
   />
   </div>
   <p class="products__name">${name}</p>
   <p class="products__price">R$ ${price.toFixed(2)}</p>
   <a class="products__link" href="../views/produto.html?id="${id}" >Ver produto</a>
      
   `;

   const buttonDelete = showProduct.querySelector("[data-delete]");

   buttonDelete.addEventListener("click", () => {
      productServices.deleteProduct(id);
   });

   const buttonEdit = showProduct.querySelector("[data-edit]");
   console.log(buttonEdit);

   buttonEdit.addEventListener("click", () => {
      window.location.href = "../html/products-edit.html";
      // productServices.showEditForm(id); // Call the function to display the edit form
   });

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
