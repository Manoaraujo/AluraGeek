import { productServices } from "../services/product-services.js";

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
      window.location.href = "../html/products-admin.html";
   } catch (e) {
      alert(e);
   }
}

addForm.addEventListener("submit", (event) => postProduct(event));
