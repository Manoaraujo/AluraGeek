import { productServices } from "../services/product-services.js";

// ---UPDATE ITEM ---

const updateForm = document.querySelector("[data-edit-product]");

async function updateProduct(event) {
   event.preventDefault();

   const imageUrl = document.querySelector("[data-edit-url]").value;
   const category = document.querySelector("[data-edit-category]").value;
   const name = document.querySelector("[data-edit-name]").value;
   const price = parseInt(document.querySelector("[data-edit-price]").value);
   const description = document.querySelector("[data-edit-description]").value;

   try {
      await productServices.editProduct(
         imageUrl,
         category,
         name,
         price,
         description
      );
      window.location.href = "../html/products.html";
   } catch (e) {
      console.log(e);
   }
}

updateForm.addEventListener("submit", (event) => updateProduct(event));
