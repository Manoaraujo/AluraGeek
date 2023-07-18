import { productServices } from "../services/product-services.js";
const products = document.querySelector("[data-product]");

export default function card(name, imageUrl, price, id) {
   const showProduct = document.createElement("div");
   showProduct.className = "products__items";
   showProduct.innerHTML = `
   <img   src="${imageUrl}"  alt="" class="products__image"
   />
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

// ---ADD NEW ITEM ---

const addForm = document.querySelector("[data-add-product]");

async function postProduct(event) {
   event.preventDefault();

   const imageUrl = document.querySelector("[data-add-url]").value;
   const category = document.querySelector("[data-add-category]").value;
   const name = document.querySelector("[data-add-name]").value;
   const price = parseInt(document.querySelector("[data-add-price]").value);
   const description = document.querySelector("[data-add-description]").value;

   try {
      await productServices.addProduct(
         imageUrl,
         category,
         name,
         price,
         description
      );
      window.location.href = "../html/home.html";
   } catch (e) {
      alert(e);
   }
}

addForm.addEventListener("submit", (event) => postProduct(event));
