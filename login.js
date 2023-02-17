import { BASE_URL } from "./utils/helper.js";

const passwordInput = document.querySelector("#password");
const userInput = document.querySelector("#el-input");
const form = document.querySelector("#login-form");
const errorText = document.querySelector("#error-text");
const errorPassword = document.querySelector("#error-password");

form.addEventListener("submit", (e) => {
  e.preventDefault();


  (async function (){
try {
    const res = await fetch()
} catch (error) {
    console.log(error);
}
})()




  if (userInput.value.length == 0) {
    errorText.textContent = "Please enter your username";
    errorText.style.display = "block";
    const setTime = setTimeout(() => {
      errorText.style.display = "none";

      clearTimeout(setTime);
    }, 3000);
    return;
  }

  if (passwordInput.value.length < 6) {
    errorPassword.textContent = "Password must be at least 6 characters";
    errorPassword.style.display = "block";

    const setTime = setTimeout(() => {
      errorPassword.style.display = "none";

      clearTimeout(setTime);
    }, 3000);
  }

  const user = {
    // "email": "eve.holt@reqres.in",
    // "password": "cityslicka"

    email: userInput.value,
    password: passwordInput.value,
  };
  fetch("https://reqres.in/api/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  })
    .then((res) => res.json())
    .then((dat) =>{
        if(dat.token){
            const token = dat.token;
            localStorage.setItem("token", token)
            window.location.href = "http://127.0.0.1:5500/main.html"
        }
    });
});
