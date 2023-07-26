import { productServices } from "../services/product-services.js";

// ---EDIT ITEM ---

const editForm = document.querySelector(".products__box-add");

async function editProduct(event) {
   event.preventDefault();

   const imageUrl = document.querySelector("[data-edit-url]").value;
   const category = document.querySelector("[data-edit-category]").value;
   const name = document.querySelector("[data-edit-name]").value;
   const price = parseInt(document.querySelector("[data-edit-price]").value);
   const description = document.querySelector("[data-edit-description]").value;

   try {
      await productServices.updateProduct(
         imageUrl,
         category,
         name,
         price,
         description
      );
      console.log(
         "Produto atualizado com sucesso:"
         // productServices.updateProduct
      );
      // window.location.href = "../html/products-admin.html";
   } catch (e) {
      alert(e);
   }
}

editForm.addEventListener("submit", (event) => editProduct(event));
