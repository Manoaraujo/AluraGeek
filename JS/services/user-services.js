// ---POST---

async function user(name, email, password) {
   const connection = await fetch(
      `https://64b5bca0f3dbab5a95c79f73.mockapi.io/Users`,
      {
         method: "POST",
         headers: {
            "content-type": "application/json",
         },
         body: JSON.stringify({
            name: name,
            email: email,
            password: password,
         }),
      }
   );

   if (!connection.ok) {
      throw new Error("Não foi possível cadastrar o usuário.");
   }

   const productsListConverted = await connection.json();
   return productsListConverted;
}

export const userServices = {
   user,
   userList,
   verifyUser,
};

async function userList() {
   const connection = await fetch(
      `https://64b5bca0f3dbab5a95c79f73.mockapi.io/Users`
   );
   const userData = await connection.json();
   return userData;
}

async function verifyUser(userEmail, userPassword) {
   const connection = await fetch(
      `https://64b5bca0f3dbab5a95c79f73.mockapi.io/Users`
   );
   const userData = await connection.json();

   try {
      const user = userData.find((user) => user.email === userEmail);

      if (user && user.password === userPassword) {
         return user;
      } else {
         return null;
      }
   } catch (e) {
      throw new Error(e);
   }
}
