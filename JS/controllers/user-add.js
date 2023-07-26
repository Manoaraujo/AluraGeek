import { userServices } from "../services/user-services.js";

const userForm = document.querySelector("[data-user-add]");

async function userAdd(event) {
   event.preventDefault();

   const userName = document.querySelector("[data-user-name]").value;
   const userEmail = document.querySelector("[data-user-email]").value;
   const userPassword = document.querySelector("[data-user-password]").value;

   try {
      await userServices.user(userName, userEmail, userPassword);
      userForm.innerHTML = `
      <div class="register__ok"
      <h2 class="register__ok-title">${userName} cadastrado com sucesso </h2>
      <a class="register__ok-link" href="../html/home-login.html">Login</a>
      `;
   } catch (e) {
      alert(e);
   }
}

userForm.addEventListener("submit", (event) => userAdd(event));
