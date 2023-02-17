let booksHtml = document.querySelector("#cards");
let template = document.querySelector("#template");
let bookmarks = document.querySelector(".bookmarks");
let elInput = document.querySelector("#input");
let tokenBtn = document.querySelector("#login");
let adminLink = document.querySelector("#admin");
let token = localStorage.getItem("token");
let modalForm = document.querySelector("#modal-form");
let moreBtn = document.querySelector(".btn-light");
let modalImg = document.querySelector(".modal-img");
let modalName = document.querySelector(".modal-h3");
let modalDesc = document.querySelector(".modal-desc");
let modalDate = document.querySelector(".modal-date");
let elThemeBtn = document.querySelector("#toggle");
let body = document.querySelector('body')


// token
if (token) {
  tokenBtn.textContent = "Logout";
} else {
  adminLink.style.display = "none";
}

tokenBtn.addEventListener("click", function(){
if(!token) {
  window.location.href = "index.html"
}
else{
  localStorage.removeItem("token")
  tokenBtn.textContent = "Login";
  adminLink.style.display = "none";  
}
})

// dark-light theme
elThemeBtn.addEventListener("click", ()=>{
  body.classList.toggle('dark')
  elInput.classList.toggle('dark')
})

let posts = [];


//search
elInput.addEventListener("input", () => {
  const value = elInput.value;
const resultProducts = []
  console.log(value);

  posts.forEach((product) => {

    const title = product.name;
    const lengthValue = value.length;
    const searchedProduct =title.slice(0, lengthValue);

    console.log(value.toLowerCase(), searchedProduct.toLowerCase());
    if(value.toLowerCase() === searchedProduct.toLowerCase()){
      resultProducts.push(product)
    }

  })
  renderPost(resultProducts)
});



//posts
fetch("https://63c95fbc320a0c4c95473854.mockapi.io/posts")
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
    posts = data;
    renderPost(posts, booksHtml);
  });

function renderPost(array) {
  booksHtml.innerHTML = null;

  array.forEach((element) => {
    const newTemplate = template.content.cloneNode(true);

    const title = newTemplate.querySelector(".title");
    const desc = newTemplate.querySelector(".description");
    const img = newTemplate.querySelector(".img");
    const bookmarkBtn = newTemplate.querySelector(".btn-warning");
    const moreInfo = newTemplate.querySelector(".btn-light");

    const newDate = generatedData(element.createdAt);
    title.textContent = element.name;
    desc.textContent = newDate;
    img.src = element.avatar;
    bookmarkBtn.dataset.id = element.id;
    moreInfo.dataset.id = element.id;

    booksHtml.appendChild(newTemplate);
  });
}

//date
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

// booksHtml.addEventListener("click", (evt) => {
//   if (evt.target.matches(".btn-warning")) {
//     const id = evt.target.dataset.id;
//     console.log(id);
//     fetch("https://63c95fbc320a0c4c95473854.mockapi.io/posts")
//       .then((res) => res.json())
//       .then((data) => {
//         // booksHtml.innerHTML = null;
//         let findData = data.find((e) => e.id === evt.target.id);
//         if (!bookmarks.includes(findData)) {
//           bookmarks.push(findData);
//         }
//         renderPost(bookmarks, elCard);
//       });
//   }
// });

// let modalPosts = {};

// booksHtml.addEventListener("click", (e) => {
//   const target = e.target;
//   if (target.matches(".btn-light")) {
//     const id2 = target.dataset.id;
//     console.log(id2);

// const fetchData = async () => {
//   const res = await fetch("https://63c95fbc320a0c4c95473854.mockapi.io/posts/" + id2);
//   const data = await res.json();
//   console.log(data);
//   const newDate = generatedData(data.createdAt);
//   modalName.textContent = data.name;
//   modalDesc.textContent = data.subtitle;
//   modalDate.textContent = newDate
//   modalImg.src = data.avatar;
//   modalPosts = data;
//   renderPost(modalPosts);

// };
// fetchData();
//   }
// });



//single page
let modalPosts = {};

booksHtml.addEventListener("click", (e) => {
  const target = e.target;
  if (target.matches(".btn-light")) {
    const id2 = target.dataset.id;
    console.log(id2);
    localStorage.setItem("id", id2);
    window.location.href = "http://127.0.0.1:5500/single-page.html";
  }
});

//swiper
var swiper = new Swiper(".mySwiper", {
  spaceBetween: 30,
  centeredSlides: true,
  autoplay: {
    delay: 2500,
    disableOnInteraction: false,
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});
