"use strict";

let data = [];

// elements
const list = document.querySelector(".list");
const form = document.querySelector(".form");
let listItems;
let id; // Variable to store the id of the item being edited

// buttons
const plusBtn = document.querySelector(".plus-btn");
const createBtn = document.querySelector(".button");

// input
const input = document.querySelector(".input");

// logics
// ===============================================
plusBtn?.addEventListener("click", (e) => {
  form?.classList.remove("hidden");
  plusBtn?.classList.add("hidden");
});

const createElement = () => {
  list.innerHTML = "";
  if (data.length > 0) {
    data.forEach((d) => {
      list.insertAdjacentHTML(
        "afterbegin",
        `<li class="list-item ${d.isChecked ? "isChecked" : ""}" data-set="${d.id}">
          <span class="check">${d.isChecked ? "checked" : "check"}</span>
          <p class="name">${d.listName}</p>
          <span class="edit-s">edit</span>
          <span class="del-s">del</span>
          <div class="createdAt"><span>${d.createdAt}</span></div>
        </li>`
      );
    });
  }
};

createBtn?.addEventListener("click", (e) => {
  e?.preventDefault();
  list.innerHTML = "";
  const date = new Date();
  const hour = date.getHours();
  const listObj = {
    id: date.getTime(),
    isChecked: false,
    listName: input?.value,
    createdAt: `${Math.abs(hour - 12)}.${
      date.getMinutes() <= 9 ? "0" + date.getMinutes() : date.getMinutes()
    } ${hour < 12 ? "AM" : "PM"}`,
  };
  data.push(listObj);
  createElement();
  input.value = "";
  form.classList.add("hidden");
  plusBtn.classList.remove("hidden");
});

list.addEventListener("click", (e) => {
  listItems = document.querySelectorAll(".list-item");
  listItems?.forEach((item) => {
    const dataset = +item.dataset.set;
    const target = e.target.className;
    if (target === "check") {
      data = data.map((d) => {
        if (d.id === dataset) {
          const newObj = {
            id: d.id,
            listName: d.listName,
            createdAt: d.createdAt,
            isChecked: !d.isChecked,
          };
          return newObj;
        } else {
          return d;
        }
      });
      createElement();
    } else if (target === "del-s") {
      data = data.filter((d) => d.id !== dataset);
      createElement();
    } else if (target === "edit-s") {
      form?.classList.remove("hidden");
      plusBtn?.classList.add("hidden");
      id = dataset;
    }
  });
});

 