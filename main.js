function showTime() {
  var date = new Date();
  var h = date.getHours(); // 0 - 23
  var m = date.getMinutes(); // 0 - 59
  var s = date.getSeconds(); // 0 - 59
  var session = "AM";

  if (h == 0) {
    h = 12;
  }

  if (h > 12) {
    h = h - 12;
    session = "PM";
  }

  h = h < 10 ? "0" + h : h;
  m = m < 10 ? "0" + m : m;
  s = s < 10 ? "0" + s : s;

  var time = h + ":" + m + ":" + s + " " + session;
  document.getElementById("digitalClock").innerText = time;
  document.getElementById("digitalClock").textContent = time;

  setTimeout(showTime, 1000);
}

showTime();

let todoList = [];
let todoListElement = [];
let inProgresses = [];
let inProgressesElement = [];
let completed = [];
let completedElement = [];
let difficulty = document.getElementsByName("difficulty");
let words = document.getElementById("words");
const inProgress = document.getElementById("inProgress");
const todos = document.getElementById("todos");
const emptyToDo = document.getElementById("emptyArray");
const emptyInProgress = document.getElementById("emptyArray1");
const emptyCompleted = document.getElementById("emptyArray2");
const complete = document.getElementById("completedList");
const wordsValidation = document.getElementById("words-validation");
wordsValidation.style.display = "none";

function addNewTodo() {
  if (words.value == 0) {
    wordsValidation.style.display = "inherit";
    return;
  } else {
    wordsValidation.style.display = "none";
    if (document.getElementById("hard").checked) {
      difficulty = "Zor";
    } else if (document.getElementById("middle").checked) {
      difficulty = "Orta";
    } else {
      difficulty = "Kolay";
    }
    const result = {
      title: words.value,
      difficulty,
      id: Math.random().toString(),
    };
    todoList.push(result);
    todotodo();
  }
}

function todotodo() {
  todos.innerHTML = "";
  for (let i = 0; i < todoList.length; i++) {
    const cb = document.createElement("INPUT");
    cb.type = "checkbox";
    const li = document.createElement("li");
    li.appendChild(cb);
    li.append(todoList[i].title + " - " + todoList[i].difficulty);
    todos.appendChild(li);
    const todo = { cb, li, id: todoList[i].id };
    todoListElement.push(todo);
    words.value = "";
  }
}

function addToInProgress() {
  todoListElement.forEach((item) => {
    if (item.cb.checked) {
      const data = todoList.find((x) => x.id === item.id);
      inProgresses.push(data);
      inProgressesElement.push(item);
      inProgress.appendChild(item.li);
      todoList = todoList.filter((x) => x.id !== item.id);
      todoListElement = todoListElement.filter((x) => x.id !== item.id);
      item.cb.checked = false;
    }
  });
  if (inProgressesElement.length === 0) {
    emptyInProgress.style.display = "unset";
  } else {
    emptyInProgress.style.display = "none";
  }
  if (todoListElement.length === 0) {
    emptyToDo.style.display = "unset";
  }
}

function removeFromProgress() {
  inProgressesElement.forEach((item) => {
    if (item.cb.checked) {
      const data = inProgresses.find((x) => x.id === item.id);
      todoList.push(data);
      todoListElement.push(item);
      todos.appendChild(item.li);
      inProgresses = inProgresses.filter((x) => x.id !== item.id);
      inProgressesElement = inProgressesElement.filter((x) => x.id !== item.id);
      item.cb.checked = false;
    }
  });
  if (inProgressesElement.length === 0) {
    emptyInProgress.style.display = "unset";
  } else {
    emptyInProgress.style.display = "none";
    if (todoList.length === 0) {
      emptyToDo.style.display = "unset";
    } else {
      emptyToDo.style.display = "none";
    }
  }
}

function addToCompleted() {
  inProgressesElement.forEach((item) => {
    if (item.cb.checked) {
      const data = inProgresses.find((x) => x.id === item.id);
      completed.push(data);
      completedElement.push(item);
      complete.appendChild(item.li);
      inProgresses = inProgresses.filter((x) => x.id !== item.id);
      inProgressesElement = inProgressesElement.filter((x) => x.id !== item.id);
      item.cb.checked = false;
    }
  });
  if (completedElement.length === 0) {
    emptyCompleted.style.display = "unset";
  } else {
    emptyCompleted.style.display = "none";
  }
  if (inProgressesElement.length === 0) {
    emptyInProgress.style.display = "unset";
  } else {
    emptyInProgress.style.display = "none";
  }
}

function removeFromCompleted() {
  completedElement.forEach((item) => {
    if (item.cb.checked) {
      const data = completed.find((x) => x.id === item.id);
      inProgresses.push(data);
      inProgressesElement.push(item);
      inProgress.appendChild(item.li);
      completed = completed.filter((x) => x.id !== item.id);
      completedElement = completedElement.filter((x) => x.id !== item.id);
      item.cb.checked = false;
    }
  });
  if (completedElement.length === 0) {
    emptyCompleted.style.display = "unset";
  } else {
    emptyCompleted.style.display = "none";
  }
  if (inProgressesElement.length === 0) {
    emptyInProgress.style.display = "unset";
  } else {
    emptyInProgress.style.display = "none";
  }
}

function removeCompletedTasks() {
  completedElement.forEach((item) => {
    if (item.cb.checked) {
      complete.removeChild(item.li);
      completed = completed.filter((x) => x.id !== item.id);
      completedElement = completedElement.filter((x) => x.id !== item.id);
    }
  });
  if (completedElement.length === 0) {
    emptyCompleted.style.display = "unset";
  } else {
    emptyCompleted.style.display = "none";
  }
  if (inProgressesElement.length === 0) {
    emptyInProgress.style.display = "unset";
  } else {
    emptyInProgress.style.display = "none";
  }
}
