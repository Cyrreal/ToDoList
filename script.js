const input = document.querySelector("#input");
const button = document.querySelector("#addButton");
const deleteButtonComp = document.querySelector(".delete-comp");
const deleteButtonAll = document.querySelector(".delete-all");
const deleteBtn = document.querySelector(".delete-buttons");
const ul = document.querySelector("#ul");
const buttonBar = document.querySelector(".delete-buttons");

const form = document.querySelector("#regestration-form");
const registrationButton = document.querySelector(".reg-btn");
const registrationDiv = document.querySelector(".registration");
const wrapp = document.querySelector(".wrapp");
const signUp = document.querySelector("#signUp");

//////Для сохранения в локал
//////Для создания юзера

const getUser = async () => {
  let response = await fetch("http://24api.ru/rest-user?page=3");
  if (response.ok) {
    let data = response.json();
    console.log(data);
  }
};
getUser();

const getUserTasksById = async () => {
  let response = await fetch("http://24api.ru/rest-todo/items-by-id?id=42");

  let list = await response.json();
  if (response.ok) {
    console.log(list);
    renderTask(list);
  }
  return list;
};

const createItem = async (name) => {
  const data = {
    name: name,
    isDone: 0,
    user_id: 42,
  };

  const response = await fetch("http://24api.ru/rest-todo", {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  listDat = [];
  getUserTasksById();
  listDat.push(data);
  renderTask(listDat);

  return await response.json();
};
getUserTasksById();

let dataTask = getUserTasksById();
console.log(dataTask);
// getUserTasksById();

let items = []; ////Массив для id и удаления всех элементов из массива
let checkedTask = []; ////Массив для id чекнутых елементов

///Функция для добавления задачи
const renderTask = (elem) => {
  ul.innerHTML = "";
  elem.forEach(function (item) {
    // li.insertAdjacentHTML("afterbegin", `<input type="checkbox"/>
    //                                       <span>${}</span>`)

    const li = document.createElement("li");
    const checkBox = document.createElement("input");
    const span = document.createElement("span");
    const buttonCross = document.createElement("button");

    items.push(item.id);
    // console.log(items);
    li.className = "li";

    checkBox.setAttribute("type", "checkbox");
    checkBox.setAttribute("name", "isDone");
    checkBox.setAttribute("id", `${item.id}`);
    checkBox.setAttribute("isDone", `${item.isDone}`);
    checkBox.className = "checkBox";

    span.className = "span";
    span.innerHTML = `${item.name}`;

    buttonCross.className = "crossBtn";
    buttonCross.innerHTML = "❌";

    buttonCross.addEventListener("click", (element) => {
      ul.removeChild(li);
      // console.log(item.id);
      deleteById(item.id);
    });

    checkBox.addEventListener("click", (element) => {
      checkedTasks();
      checkedTask.push(item.id);
      console.log(updateTask(item.id));

      span.classList.toggle("active");
      li.classList.toggle("for-delete");
    });

    li.appendChild(checkBox);
    li.appendChild(span);
    li.appendChild(buttonCross);
    ul.appendChild(li);
  });
};

console.log(items);
const submitReg = async (elem) => {
  elem.preventDefault();
  let formData = new FormData(form);
  console.log(formData);

  let response = await fetch("http://24api.ru/rest-user", {
    method: "POST",
    body: formData,
  });
  if (response.ok) {
    let result = await response.json();
    hideSign();
    console.log(result);
    form.reset();
  } else {
    alert("error");
  }
};

let checkedTasks = () => {
  const checkBox = document.querySelectorAll(".checkBox");
  for (let checked in checkBox)
    if (checked == true) {
      isDone = 1;
    } else {
      isDone = 0;
    }
};

const deleteById = async (id) => {
  const response = await fetch(`http://24api.ru/rest-todo/${id}`, {
    method: "DELETE",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response;
};

let myObj = {};
myObj.items = items;
let objForChecked = {};
objForChecked.items = checkedTask;
console.log(myObj);
const deleteAll = async (object) => {
  const response = await fetch("http://24api.ru/rest-todo/delete-items", {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(object),
  });
  return response;
};

deleteButtonComp.addEventListener("click", (event) => {
  const activeBox = document.querySelectorAll(".for-delete");
  for (let element of activeBox) {
    ul.removeChild(element);
  }
  deleteAll(objForChecked);
});

const updateTask = async (id) => {
  // console.log(elem);
  const response = await fetch(`http://24api.ru/rest-todo/${id}`, {
    method: "PUT",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ isDone: 1 }),
  });
  return response.json();
};

deleteButtonAll.addEventListener("click", (elem) => {
  const liCheck = document.querySelectorAll(".li");
  localStorage.clear();
  for (let element of liCheck) {
    ul.removeChild(element);
  }
  if (buttonBar.classList !== "delete-complite-inactive") {
    buttonBar.classList.add("delete-complite-inactive");
  }
  deleteAll(myObj);
});

button.addEventListener("click", (elem) => {
  // elem = input;
  let name = input.value;
  console.log(name);
  createItem(name);
  if (buttonBar.classList == "delete-complite-inactive") {
    input.value = "";
  } else {
    buttonBar.classList.remove("delete-complite-inactive");

    input.value = "";
  }
});
