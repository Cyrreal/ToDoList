button.addEventListener("click", (elem) => {
  let todoItem = {
    name: input.value,
    isDone: 0,
    user_id: 45,
  };
  list.push(todoItem);
  addTask();
  if (buttonBar.classList == "delete-complite-inactive") {
    input.value = "";
  } else {
    buttonBar.classList.remove("delete-complite-inactive");

    input.value = "";
  }
});

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

// function createDiv(value, name, checkbox, id) {
//   const checkBox = document.createElement("input");
//   checkBox.setAttribute("type", "checkbox");
//   checkBox.className = "checkBox";

//   const li = document.createElement("li");
//   li.className = "li";

//   const buttonCross = document.createElement("button");
//   buttonCross.className = "crossBtn";
//   buttonCross.innerHTML = "❌";

//   const span = document.createElement("span");
//   span.className = "span";
//   span.innerHTML = value;

//   buttonCross.addEventListener("click", (element) => {
//     ul.removeChild(li);
//   });

//   checkBox.addEventListener("click", (element) => {
//     span.classList.toggle("active");
//     li.classList.toggle("for-delete");
//   });

//   li.appendChild(checkBox);
//   li.appendChild(span);
//   li.appendChild(buttonCross);
//   ul.appendChild(li);
// }
