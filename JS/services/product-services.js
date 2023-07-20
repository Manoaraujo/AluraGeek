// ---GET---

// const productList = () => {
//    fetch("https://64b5bca0f3dbab5a95c79f73.mockapi.io/products")
//       .then((response) => response.json())
//       .catch((error) => console.log(error));
// };

// export const productServices = {
//    productList,
// };

async function getProductList() {
   const productList = await fetch(
      "https://64b5bca0f3dbab5a95c79f73.mockapi.io/products"
   );
   const productsListConverted = productList.json();

   return productsListConverted;
}

async function addProduct(imageUrl, category, name, price, description) {
   const connection = await fetch(
      "https://64b5bca0f3dbab5a95c79f73.mockapi.io/products",
      {
         method: "POST",
         headers: {
            "content-type": "application/json",
         },
         body: JSON.stringify({
            name: name,
            imageUrl: imageUrl,
            price: price,
            category: category,
            description: description,
         }),
      }
   );

   if (!connection.ok) {
      throw new Error("Não foi possível cadastrar o produto.");
   }

   const productsListConverted = await connection.json();
   return productsListConverted;
}

async function deleteProduct(id) {
   const connection = await fetch(
      `https://64b5bca0f3dbab5a95c79f73.mockapi.io/products/${id}`,
      {
         method: "DELETE",
      }
   );

   if (!connection.ok) {
      throw new Error("Não foi possível apagar o produto.");
   }

   window.location.href = "../html/products.html";
   const productsListConverted = await connection.json();
   return productsListConverted;
}

async function editProduct(id, imageUrl, category, name, price, description) {
   const connection = await fetch(
      `https://64b5bca0f3dbab5a95c79f73.mockapi.io/products/${id}`,
      {
         method: "PUT",
         headers: {
            "content-type": "application/json",
         },
         body: JSON.stringify({
            name: name,
            imageUrl: imageUrl,
            price: price,
            category: category,
            description: description,
         }),
      }
   );

   if (!connection.ok) {
      throw new Error("Não foi possível apagar o produto.");
   }

   window.location.href = "../html/products.html";
   const productsListConverted = await connection.json();
   return productsListConverted;
}

export const productServices = {
   getProductList,
   addProduct,
   deleteProduct,
};
