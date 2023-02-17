export const BASE_URL = 'https://fakestoreapi.com/'




export function generatedData(date) {
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
  
  
  //RenderPost
  export const elPosts = document.querySelector("#element-posts");
  export const template = document.querySelector("#posts");
  export const elForm = document.querySelector("#form");
  
  export default function renderPosts(array, isAdmin) {
    elPosts.textContent = "";
  
    const fragment = document.createDocumentFragment();
    array.reverse().forEach((element) => {
      const newTemplate = template.content.cloneNode(true);
  
      const elImage = newTemplate.querySelector("img");
      const elName = newTemplate.querySelector(".name");
      const elSubtitle = newTemplate.querySelector(".subtitle");
      const elDate = newTemplate.querySelector(".date");
      const deleteBtn = newTemplate.querySelector('.btn-danger')
      const editBtn = newTemplate.querySelector('.btn-primary')
  
      if(isAdmin) {
        deleteBtn.dataset.id = element.id;
        editBtn.dataset.id = element.id;
      }
  
      const newDate = generatedData(element.createdAt);
      elName.textContent = element.name;
      elSubtitle.textContent = element.subtitle;
      elDate.textContent = newDate;
      elImage.src = element.avatar;
  
      fragment.appendChild(newTemplate);
    });
    elPosts.appendChild(fragment);
  }
    