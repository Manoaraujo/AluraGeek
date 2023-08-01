function showDetailedProducts(event) {
   const product = event.target.closest("[data-product-id]");

   if (product) {
      event.preventDefault();
      const selectedProduct = product.parentNode.getAttribute("data-id");

      const productUrl = `./html/products.html?id=${selectedProduct}`;

      window.location.href = productUrl;
   }
}

document.addEventListener("click", showDetailedProducts);
