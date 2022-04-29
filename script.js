const input = document.querySelector("#input");
const button = document.querySelector("#addButton");
const deleteButtonComp = document.querySelector(".delete-comp");
const deleteButtonAll = document.querySelector(".delete-all");
const deleteBtn = document.querySelector(".delete-buttons");
const ul = document.querySelector("#ul");
const buttonBar = document.querySelector(".delete-buttons");

//////Для сохранения в локал
let list = [];
// const addToLocal = JSON.parse(localStorage.getItem("tasks"));

button.addEventListener("click", (elem) => {
  const todoItem = {
    name: input.value,
    checkbox: false,
  };
  list.push(todoItem);

  if (buttonBar.classList == "delete-complite-inactive") {
    createDiv(input.value);
    input.value = "";
  } else {
    buttonBar.classList.remove("delete-complite-inactive");
    createDiv(input.value);
    input.value = "";
  }
  function addToStorage() {
    localStorage.setItem("todos", JSON.stringify(list));
  }
  addToStorage();
});

const getFromLocalStorage = () => {
  const reference = localStorage.getItem("todos");
  // if (localStorage.lenght > 0) {
  //   list = JSON.parse(reference);
  //   createDiv(list);
  // }
  // reference.forEach((element) => {
  //   for (name in element) {
  //     createDiv(name.value);
  //   }
  // });
  console.log(reference);
  // if (reference) {
  //   list = JSON.parse(reference);
  //   createDiv(list);
  // }
};
getFromLocalStorage();

// document.addEventListener("keypress", (event) => {
//   if (event.keyCode == 13) {
//     createDiv(input.value);
//     input.value = "";
//   } else {
//     buttonBar.classList.remove("delete-complite-inactive");
//     createDiv(input.value);
//     input.value = "";
//   }
// });

deleteButtonComp.addEventListener("click", (event) => {
  const activeBox = document.querySelectorAll(".for-delete");
  for (element of ul) {
    console.log(element);
  }

  for (let element of activeBox) {
    ul.removeChild(element);
  }
});

deleteButtonAll.addEventListener("click", (elem) => {
  const liCheck = document.querySelectorAll(".li");
  localStorage.clear();
  for (let element of liCheck) {
    ul.removeChild(element);
  }
  if (buttonBar.classList !== "delete-complite-inactive") {
    buttonBar.classList.add("delete-complite-inactive");
  }
});

function createDiv(value) {
  const checkBox = document.createElement("input");
  checkBox.setAttribute("type", "checkbox");
  checkBox.className = "checkBox";

  const li = document.createElement("li");
  li.className = "li";

  const buttonCross = document.createElement("button");
  buttonCross.className = "crossBtn";
  buttonCross.innerHTML = "❌";

  const span = document.createElement("span");
  span.className = "span";
  span.innerHTML = value;

  buttonCross.addEventListener("click", (element) => {
    ul.removeChild(li);
  });

  checkBox.addEventListener("click", (element) => {
    span.classList.toggle("active");
    li.classList.toggle("for-delete");
  });
  console.log(span.text);
  li.appendChild(checkBox);
  li.appendChild(span);
  li.appendChild(buttonCross);
  ul.appendChild(li);
}

setTimeout(() => {
  console.log(list);
}, 10000);
