import { generatedData, elPosts, elForm, template } from "./utils/helper.js";
import renderPosts from "./utils/helper.js";

const elCards = document.querySelector("#element-posts");
const editForm = document.querySelector("#edit-form");
const editBtn = document.querySelector("#edit");


// 1. select btn 
//2.  

let todos = [];

fetch("https://63c95fbc320a0c4c95473854.mockapi.io/posts")
  .then((res) => res.json())
  .then((data) => {
    todos = data;
    console.log(todos);
    renderPosts(todos, true); // in order to call the function we must call it in the fetch not after the function.
  })
  .catch((error) => console.log(error));

// add post
elForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const title = e.target.title.value;
  const subtitle = e.target.subtitle.value;
  const date = e.target.date.value;
  const img = e.target.img.value;

  const post = {
    name: title,
    avatar: img,
    createdAt: date,
    subtitle: subtitle,
  };

  fetch("https://63c95fbc320a0c4c95473854.mockapi.io/posts", {
    method: "POST",
    body: JSON.stringify(post),
    headers: { "content-type": "application/json; charset=utf-8" },
  })
    .then((res) => res.json())
    .then((data) => {
      alert("post added successfully");
      elForm.reset();
      window.location.href = "http://127.0.0.1:5500/main.html";
    });
});

// edit part
elCards.addEventListener("click", (e) => {
  const target = e.target;

  if (target.matches(".btn-primary")) {
    const id = target.dataset.id;
    console.log(id);
    fetch("https://63c95fbc320a0c4c95473854.mockapi.io/posts/" + id)
      .then((res) => res.json())
      .then((data) => {
        const title = editForm.title;
        const subtitle = editForm.subtitle;
        // const date = editForm.date;
        const img = editForm.img;

        title.value = data.name;
        subtitle.value = data.subtitle;
        // date.value = data.createdAt;
        img.value = data.avatar;
        editForm.newImg.src = data.avatar;

        editBtn.addEventListener("click", () => {
           
        let post = {
          name: title.value,
          avatar: img.value,
          // createdAt: date.value,
          subtitle: subtitle.value,
        };
          fetch("https://63c95fbc320a0c4c95473854.mockapi.io/posts/" + id, {
            method: "PUT",
            body: JSON.stringify(post),
            headers: {
              "content-type": "application/json; charset=utf-8",
            },
          })
            .then((res) => res.json())
            .then((data) => window.location.reload())
        });
      })
      .catch((err) => console.log(err));
  }

  // delete part
  if (target.matches(".btn-danger")) {
    const id = target.dataset.id;
    fetch("https://63c95fbc320a0c4c95473854.mockapi.io/posts/" + id, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => window.location.reload())
      .catch((err) => console.log(err));
  }
});
