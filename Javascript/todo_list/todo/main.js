
const addTodoBtn = document.getElementById('add-todo-btn');
const addTodoInput = document.getElementById('addtodo');

const todoListEl = document.getElementById('list');

/*
1.   상태 : p < 클릭 -> p 따로 저장, input으로 변경
2-1. 상태 : input < 엔터 -> p.value 수정, p로 변경
2-2. 상태 : input < esc -> 기존 p 그대로 변경
*/
let lastUpdateTodo;

function handleTodoUpdateInput(event) {
    switch (event.key) {
        case "Enter":
            lastUpdateTodo.innerText = event.currentTarget.value;
        case "Escape":
            event.currentTarget.replaceWith(lastUpdateTodo);
            break;
    }
}

function updateTodo(event) {
    lastUpdateTodo = event.currentTarget;
    const todoUpdateInputEl = document.createElement('input');
    todoUpdateInputEl.value = event.currentTarget.innerText;
    todoUpdateInputEl.addEventListener('keydown', handleTodoUpdateInput);
    event.currentTarget.replaceWith(todoUpdateInputEl);
}

function colorCurrentTargetRed(event) {
    console.log(event.target);
    console.log(event.currentTarget);
    event.currentTarget.style.backgroundColor = 'red';
}

function removeTodo(event) {
    event.target.parentElement.remove();
}

function createTodo(todoTitle) {
    // 1. 값을 받아옴
    // 2. 새로운 요소 생성
    // 3. 요소의 텍스트에 값 넣어주기
    // 4. dom에 추가
    // li 만들기
    if (todoTitle === "") return;
    const liEl = document.createElement('li');
    liEl.style.display = 'flex';
    const inputEl = document.createElement('input');
    inputEl.type = 'checkbox';
    liEl.appendChild(inputEl);
    const todoContentEl = document.createElement('p');
    todoContentEl.innerText = todoTitle;
    todoContentEl.addEventListener('click', updateTodo);
    liEl.appendChild(todoContentEl);
    const todoDeleteBtnEl = document.createElement('button');
    todoDeleteBtnEl.textContent = 'X';
    todoDeleteBtnEl.addEventListener('click', removeTodo);
    liEl.appendChild(todoDeleteBtnEl);
    document.getElementById('list').appendChild(liEl);
}

addTodoBtn.addEventListener('click', function() {
    createTodo(addTodoInput.value);
})

addTodoInput.addEventListener('keydown', function (event) {
    switch (event.key) {
        case "Enter":
            createTodo(addTodoInput.value);
        case "Escape":
            addTodoInput.value = '';
            break;
    }
})

createTodo('todo 1');
createTodo('todo 2');
createTodo('todo 3');

// ------------- 고정 --------------
/**
 * 1. 보여주기 (Read) renderTodos(todos)
 *      todos를 html요소로 만들어 뿌려주기
 * 2. 생성 (Create)
 *      todos 배열에 추가, html 요소도 생성
 * 3. 수정 (Update)
 *      todos 배열에서 수정, html 요소도 수정
 * 3. 삭제 (Update)
 *      todos 배열에서 삭제, html 요소도 삭제
 */
/*
{
    id : 정수, (마지막 원소의 id + 1)
    title : 문자열,
    completed : boolean,
} []
 */
const todos = [
    {
        id : 1,
        title : 'todo 1',
        completed: false,
    },
    {
        id : 2,
        title : 'todo 2',
        completed: false,
    },
    // 3이 삭제된 상황
    {
        id : 4,
        title : 'todo 4',
        completed: false,
    },
    // 그 다음 id는 5
]
function renderTodos(todos) {
    // todos 배열의 각 원소들로 html element를 만들고 뿌려줌
}
// main page
renderTodos(todos)
// completed
// renderTodos(todos.filter(...))