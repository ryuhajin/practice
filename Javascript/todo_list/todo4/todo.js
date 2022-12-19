//  input 요소에서 이벤트 리스너를 등록 -> 이벤트 캐치 후 입력받은 input 데이터를 배열에 순차적으로 담기
const todoInputEl = document.querySelector('.todo-input');
const todoListEl = document.querySelector('.todo-list');

let todos = []; // todo를 담을 배열
let id = 0; // todo를 구별하기 위한 키 값

const setTodos = (newTodos) => {
    todos = newTodos;
}

const getAllTodos = () => {
    return todos;
}

const appendTodos = (text) => {
    const newId = id++;

    // 스프레드 연산자. ES6부터 사용
    const newTodos = [...getAllTodos(), { id: newId, isCompleted: false, content: text }];

    // concat 사용
    // const newTodos = getAllTodos().concat({ id: newId, isCompleted: false, content: text });
    setTodos(newTodos);
    paintTodos();
}

const deleteTodo = (todoId) => {
    console.log(`deleteTodo 함수 실행 : id ${todoId}`);
    const newTodos = getAllTodos().filter(todo => todo.id !== todoId);
    setTodos(newTodos);
    paintTodos();
}

const completeTodo = (todoId) => {
    const newTodos = getAllTodos().map(todo => todo.id === todoId ? {...todo, isCompleted: !todo.isCompleted} : todo );
    setTodos(newTodos);
    paintTodos();
}

const updateTodo = (text, todoId) => {
    const newTodos = getAllTodos().map(todo => todo.id === todoId ? {...todo, content: text} : todo );
    setTodos(newTodos);
    paintTodos();
}


const onDblclicktTodo = (event, todoId) => {
    const todoEl = event.target;
    const inputText = event.target.innerText;
    const todoItemEl = todoEl.parentNode;
    const inputEl = document.createElement('input');
    inputEl.value = inputText;
    inputEl.classList.add('edit-input');

    // todo 수정 완료 시 발생할 이벤트 등록
    inputEl.addEventListener('keypress', (event) => {
        if(event.key === 'Enter') {
            updateTodo(event.target.value, todoId); //todo 수정
            document.body.removeEventListener('click', onClickBody); // body click event 제거
        }
    })

    // todoitemEl 요소를 제외한 영역 클릭 시, 수정모드 종료
    const onClickBody = (event) => {
        if(event.target !== inputEl) {
            todoItemEl.removeChild(inputEl);
            document.body.removeEventListener('click', onClickBody);
        }
    }

    // body click event 등록
    document.body.addEventListener('click', onClickBody);
    todoItemEl.appendChild(inputEl); // DOM에 자식 요소 추가.
}

const paintTodos = () => {
    todoListEl.innerHTML = null; // todoListEl 안의 html 초기화
    const allTodos = getAllTodos(); //todos 배열 가져오기

    // <ul id = "todo-list"> 태그 안에 <li><div> 등의 태그 추가해주기
    allTodos.forEach(todo => {
        const todoItemEl = document.createElement('li');
        todoItemEl.classList.add('todo-item');

        const checkboxEl = document.createElement('div');
        checkboxEl.classList.add('checkbox');
        checkboxEl.addEventListener('click', () => completeTodo(todo.id));

        const todoEl = document.createElement('div');
        todoEl.classList.add('todo');
        todoEl.addEventListener('dblclick', (event) => {
            onDblclicktTodo(event, todo.id); // 더블클릭 시 todo.content 수정
        })
        todoEl.innerText = todo.content;

        const delBtnEl = document.createElement('button');
        delBtnEl.classList.add('delBtn');

        // delBtn cilck시 해당 투두 삭제
        delBtnEl.addEventListener('click', () => deleteTodo(todo.id)); 
        delBtnEl.innerHTML = 'X';

        if (todo.isCompleted) {
            todoItemEl.classList.add('checked');
            checkboxEl.innerText = '✔';
        }

        // <li> 태그 안에 자식 추가
        todoItemEl.appendChild(checkboxEl);
        todoItemEl.appendChild(todoEl);
        todoItemEl.appendChild(delBtnEl);

        // <ul> 태그 안에 <li> 태그 자식으로 추가
        todoListEl.appendChild(todoItemEl);
    })
}

const init = () => {
    todoInputEl.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            appendTodos(event.target.value);
            todoInputEl.value = '';
        }
    })
}

init(); //todo.js 파일 실행되자마자 호출되는 함수. main === input에 keypress eventlisner 등록