const elCard = document.querySelector(".card");
const singleTemplate = document.querySelector("#single-template");
const id = localStorage.getItem("id");
const h2 = document.querySelector("h2");
const h3 = document.querySelector("h5");
const h31 = document.querySelector("p");
const img = document.querySelector("img");

let post = {};

function generatedData(date) {
    const year = new Date(date).getFullYear();
    const month =
      new Date(date).getMonth() + 1 < 10
        ? "0" + (new Date(date).getMonth() + 1)
        : new Date(date).getMonth() + 1;
    const day = new Date(date).getDate();
    const hour = new Date(date).getHours();
    const minute = new Date(date).getMinutes();
  
    return `${hour}:${minute}/${day}.${month}.${year}`;
  }



const fetchData = async () => {
  const res = await fetch(`https://63c95fbc320a0c4c95473854.mockapi.io/posts/${id}`);
  const data = await res.json();
  console.log(data);

  const newData = generatedData(data.createdAt)
  h2.textContent = data.name;
  h3.textContent = data.subtitle;
  h31.textContent = newData
  img.src = data.avatar;
  
  post = data;
  renderPost(post);
};
fetchData();



function renderPost(post) {
  // const fragment = document.createDocumentFragment();

  // const elPost = singleTemplate.content.cloneNode(true);
  // console.log(elPost);
  // // const name = elPost.querySelector(".name");
  // // const username = elPost.querySelector(".username");
  // // const email = elPost.querySelector(".email");
  // // const phone = elPost.querySelector(".phone");

  // // name.textContent = post.name;
  // // username.textContent = post.username;
  // // email.textContent = post.email;
  // // phone.textContent = post.phone;

  // console.log(name, username, email, phone);

  // fragment.appendChild(singleTemplate);
  // elCard.appendChild(fragment);
}
