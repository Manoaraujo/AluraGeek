import { userServices } from "../services/user-services.js";

const userForm = document.querySelector("[data-user-login]");

async function userLogin(event) {
   event.preventDefault();

   const userEmail = document.querySelector("[data-user-email]").value;
   const userPassword = document.querySelector("[data-user-password]").value;

   try {
      const user = await userServices.verifyUser(userEmail, userPassword);
      if (user) {
         console.log("User verified and logged in!");
         window.location.href = "../html/products-admin.html";
      } else {
         alert("E-mail ou senha não estão corretos");
      }
   } catch (e) {
      alert(e);
   }
}

userForm.addEventListener("submit", (event) => userLogin(event));
