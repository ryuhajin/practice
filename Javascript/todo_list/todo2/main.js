console.log('start');

let inputEl = document.getElementById('inputField'); //todo text input
let addEl = document.getElementById('addToDo'); // button
let listEl = document.getElementById('list'); // list

function addtodo (todo) {
    if (inputEl.value === '') {
        alert('내용을 입력해 주세요!');
        return;
    }
    let todoEl = document.createElement('li');
    todoEl.innerText = inputEl.value; // <li> input text <li>
    listEl.appendChild(todoEl);
    inputEl.value = '';

    todoEl.addEventListener('click', () => {
        todoEl.style.textDecoration = "line-through";
    })

    todoEl.addEventListener('dblclick', () => {
        listEl.removeChild(todoEl);
    })
}

addEl.addEventListener('click', addtodo);
