import { productServices } from "../services/product-services.js";

const updateForm = document.querySelector("[data-edit-product]");

export function editForm(imageUrl, category, name, price, description) {
   const showForm = document.createElement("div");
   showForm.className = "products__area-edit";
   showForm.innerHTML = `
      
      <div class="products__area-add">
                  <label for="url" class="products__label-add"
                     >URL da imagem</label
                  >
                  <input
                     value="${imageUrl}"
                     id="url"
                     name="url"
                     type="url"
                     minlength="3"
                     class="products__text-add"
                     required
                     data-edit-url
                  >

                  <span class="error-message"></span>
               </div>

               <div class="products__area-add">
                  <label for="category" class="products__label-add"
                     >Categoria</label
                  ><input
                     value="${category}"
                     id="category"
                     name="category"
                     type="text"
                     class="products__text-add"
                     minlength="3"
                     required
                     data-edit-category
                  />
                  <span class="error-message"></span>
               </div>

               <div class="products__area-add">
                  <label for="name" class="products__label-add"
                     >Nome do produto</label
                  ><input
                     value="${name}"
                     id="itemName"
                     name="name"
                     type="text"
                     class="products__text-add"
                     minlength="3"
                     required
                     data-edit-name
                  />
                  <span class="error-message"></span>
               </div>

               <div class="products__area-add">
                  <label for="price" class="products__label-add"
                     >Preço do produto</label
                  ><input
                     value="${price}"
                     id="price"
                     name="price"
                     type="number"
                     class="products__text-add"
                     required
                     data-edit-price
                  />
                  <span class="error-message"></span>
               </div>

               <div class="products__area-add">
                  <label for="description" class="products__label-add"
                     >Descrição do produto</label
                  >
                  <textarea
                     name="description"
                     id="description"
                     class="products__text-add products__message-add"
                     required
                     data-edit-description
                  >${description}</textarea>
                  <span class="error-message"></span>
               </div>

               <input
                  value="Editar produto"
                  type="submit"
                  class="products__button-add"
               // />
      
      
      `;

   return showForm;
}

const buttonData = [];

async function showEditForm(id) {
   try {
      const product = await productServices.updateProductList(id);

      buttonData.push(product);
      console.table(buttonData);
      window.location.href = "../html/products-edit.html";
      return buttonData;

      // updateForm.appendChild(
      //    editForm(
      //       product.imageUrl,
      //       product.category,
      //       product.name,
      //       product.price,
      //       product.description
      //    )
      // );
   } catch (e) {
      console.log(e);
      updateForm.innerHTML = `<h2 >Não foi possível carregar o produto.</h2>`;
   }
}
console.table(buttonData);

async function createForm() {
   updateForm.appendChild(
      editForm(
         buttonData.imageUrl,
         buttonData.category,
         buttonData.name,
         buttonData.price,
         buttonData.description
      )
   );
}
// showEditForm();
createForm();

export const updates = {
   showEditForm,
};
