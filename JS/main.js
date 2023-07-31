// -----FORM SEND MESSAGE-----

const form = document.querySelector("[data-form]");

form.addEventListener("submit", (e) => {
   e.preventDefault();

   const answerList = {
      nome: e.target.elements["nome"].value,
      message: e.target.elements["message"].value,
   };

   const params = new URLSearchParams();
   params.append("subject", answerList.assunto);
   params.append(
      "body",
      `      Nome: ${answerList.nome}
      Mensagem: ${answerList.message}`
   );

   const mailtoLink = `mailto:contato@alurageek.com?${params
      .toString()
      .replaceAll("+", " ")}`;

   window.open(mailtoLink, "_blank");
});

// -----VALIDATION-----

const formFields = document.querySelectorAll("[required]");

formFields.forEach((field) => {
   field.addEventListener("blur", () => checkField(field));
   field.addEventListener("invalid", (event) => event.preventDefault());
});

const errorTypes = [
   "valueMissing",
   "typeMismatch",
   "patternMismatch",
   "tooShort",
   "customError",
];

const errorMessages = {
   name: {
      valueMissing: "O campo de nome não pode estar vazio.",
      patternMismatch: "Por favor, preencha um nome válido.",
      tooShort: "Por favor, preencha um nome válido.",
   },

   message: {
      valueMissing: "O campo não pode estar vazio.",
      tooShort: "O campo não tem caracteres suficientes.",
   },
   email: {
      valueMissing: "O campo de e-mail não pode estar vazio.",
      typeMismatch: "Por favor, preencha um email válido.",
      tooShort: "Por favor, preencha um e-mail válido.",
   },
   password: {
      valueMissing: "O campo de senha não pode estar vazio.",
      tooShort: "A senha está muito curta",
   },
   itemName: {
      valueMissing: "O campo não pode estar vazio.",
      patternMismatch: "Por favor, preencha um nome válido.",
      tooShort: "Por favor, preencha um nome válido.",
   },
   url: {
      valueMissing: "O campo não pode estar vazio.",
      patternMismatch: "Por favor, preencha um endereço válido.",
      tooShort: "Muito curto. Por favor, preencha um endereço válido.",
   },
   category: {
      valueMissing: "O campo não pode estar vazio.",
      patternMismatch: "Por favor, preencha um nome válido.",
      tooShort: "Muito curto. Por favor, preencha um nome válido.",
   },
   price: {
      valueMissing: "O campo não pode estar vazio.",
      patternMismatch: "Por favor, preencha um valor válido.",
   },
   description: {
      valueMissing: "O campo não pode estar vazio.",
      tooShort: "Muito curto. Por favor, preencha um nome válido.",
   },
};

function checkField(field) {
   let message = "";
   field.setCustomValidity("");
   errorTypes.forEach((error) => {
      if (field.validity[error]) {
         message = errorMessages[field.name][error];
      }
   });

   const errorMessageField = field.parentNode.querySelector(".error-message");
   const inputValidityChecker = field.checkValidity();

   if (!inputValidityChecker) {
      errorMessageField.textContent = message;
   } else {
      errorMessageField.textContent = "";
   }
}
