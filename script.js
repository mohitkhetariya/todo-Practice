let input = document.querySelector("#todo-input");
let addBtn = document.querySelector(".add-btn");
let list = document.querySelector("#todo-list");

// load saved todos from localStorage
const saved = localStorage.getItem("todos");
const todos = saved ? JSON.parse(saved) : [];

const saveTodos = () => {
  localStorage.setItem("todos", JSON.stringify(todos));
};

// create a DOM node for a todo object
const createTodoNode = (todo, index) => {
  const li = document.createElement("li");

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = !!todo.completed;

  checkbox.addEventListener("change", () => {
    todo.completed = checkbox.checked;
    textSpan.style.textDecoration = todo.completed ? "line-through" : "none";
    saveTodos();
  });

  const textSpan = document.createElement("span");
  textSpan.textContent = todo.text;
  textSpan.style.margin = "0 8px";
  if (todo.completed) {
    textSpan.style.textDecoration = "line-through";
  }

  // double-click to edit
  textSpan.addEventListener("dblclick", () => {
    const newText = prompt("Edit todo", todo.text);

    if (newText !== null) {
      const trimmed = newText.trim();

      if (trimmed) {
        todo.text = trimmed;
        textSpan.textContent = todo.text;
        saveTodos();
      }
    }
  });

  // delete button
  const delBtn = document.createElement("button");
  delBtn.textContent = "delete";
  delBtn.addEventListener("click", () => {
    todos.splice(index, 1); // remove from array
    saveTodos();
    display(); // re-render
  });

  li.appendChild(checkbox);
  li.appendChild(textSpan);
  li.appendChild(delBtn);

  return li;
};

// display whole todo list
const display = () => {
  list.innerHTML = "";

  todos.forEach((todo, index) => {
    const node = createTodoNode(todo, index);
    list.appendChild(node);
  });
};

// add a new todo
function addTodo() {
  const text = input.value.trim();
  if (!text) {
    return;
  }
  todos.push({ text, completed: false });
  input.value = "";
  saveTodos();
  display();
}

addBtn.addEventListener("click", addTodo);

// optional: add via Enter key
input.addEventListener("keyup", (e) => {
  if (e.key === "Enter") addTodo();
});

// initial render
display();
