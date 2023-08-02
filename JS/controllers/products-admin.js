import { productServices } from "../services/product-services.js";

const productsArea = document.querySelector("[data-product]");
const formArea = document.querySelector("[data-product-container]");

export default function cardAdmin(name, imageUrl, price, id) {
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

   buttonEdit.addEventListener("click", () => {
      showEditForm(id);
   });

   return showProduct;
}

async function productsOnScreenAdmin() {
   try {
      const productsAPI = await productServices.getProductList();
      productsAPI.forEach((element) =>
         productsArea.appendChild(
            cardAdmin(element.name, element.imageUrl, element.price, element.id)
         )
      );
   } catch {
      productsArea.innerHTML = `<h2 >Não foi possível carregar os produtos</h2>`;
   }
}

productsOnScreenAdmin();

// ------------------EDIT FORM------------------

export function editForm(imageUrl, category, name, price, description) {
   const showForm = document.createElement("div");
   showForm.className = "products__area-edit";
   showForm.innerHTML = `
   <form class="products__box products__box-add" data-edit-product>
      <h4 class="products__title-add">Editar produto</h4>
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

               <a class="products__link" href="javascript: history.go(-1)"> voltar</a>
   </form>
      `;

   return showForm;
}

async function showEditForm(id) {
   try {
      const product = await productServices.updateProductList(id);
      // console.table(product);
      formArea.innerHTML = "";
      formArea.appendChild(
         editForm(
            product.imageUrl,
            product.category,
            product.name,
            product.price,
            product.description
         )
      );

      // **************************************

      const editFormArea = document.querySelector("[data-edit-product]");

      async function editProduct(event) {
         event.preventDefault();

         const imageUrl = document.querySelector("[data-edit-url]").value;
         const category = document.querySelector("[data-edit-category]").value;
         const name = document.querySelector("[data-edit-name]").value;
         const price = parseInt(
            document.querySelector("[data-edit-price]").value
         );
         const description = document.querySelector(
            "[data-edit-description]"
         ).value;

         try {
            await productServices.updateProduct(
               id,
               imageUrl,
               name,
               price,
               category,
               description
            );
            console.log("Produto atualizado com sucesso:");
            window.location.href = "../html/products-admin.html";
         } catch (e) {
            alert(e);
         }
      }

      editFormArea.addEventListener("submit", (event) => editProduct(event));

      // **************************************
   } catch (e) {
      console.log(e);
      productsArea.innerHTML = `<h2 >Não foi possível carregar o produto.</h2>`;
   }
}

// --------FILTER-------

async function searchProductListAdmin(event) {
   event.preventDefault();

   const searchData = document.querySelector("[data-search]").value;

   const searchResult = await productServices.searchProduct(searchData);

   const products = document.querySelector("[data-product]");

   while (products.firstChild) {
      products.removeChild(products.firstChild);
   }

   searchResult.forEach((element) => {
      products.appendChild(
         cardAdmin(element.name, element.imageUrl, element.price, element.id)
      );
   });

   if (searchResult.length == 0) {
      products.innerHTML = `<h2 class="error-message">Não existem produtos com esse termo</h2>`;
   }
}

const searchButton = document.querySelector("[data-search-btn]");

searchButton.addEventListener("click", (event) =>
   searchProductListAdmin(event)
);
