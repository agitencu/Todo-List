// Tüm elemetleri seçme

const form = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo");
const todoList = document.querySelector(".list-group");
const firstCardBody = document.querySelectorAll(".card-body")[0];
const secondCardBody = document.querySelectorAll(".card-body")[1];
const filter = document.querySelector("#filter");
const clearButton = document.querySelector("#clear-todos");

eventListener();

function eventListener(){ // Tüm event Listenerler
    form.addEventListener("submit",addTodo);
    document.addEventListener("DOMContentLoaded",loadAllTodosToUI);
    secondCardBody.addEventListener("click",deleteTodo);
    filter.addEventListener("keyup",filterTodos);
    clearButton.addEventListener("click",clearAllTodos);
}

function clearAllTodos(e){
    if(confirm("Tümünü silmek istediğinize wmin misiniz?")){
        // Arayüzden todoları temizleme
        // todoList.innerHTML = ""; // Yavaş
        // console.log(todoList.firstElementChild);
        while(todoList.firstElementChild != null) {
        todoList.removeChild(todoList.firstElementChild);
        }
        localStorage.removeItem("todos");

    }


}


function filterTodos(e){
    // console.log(e.target.value);
    const filterValue = e.target.value.toLowerCase();
    const listItems = document.querySelectorAll(".list-group-item");

    listItems.forEach(function(listItem){
        const text = listItem.textContent.toLowerCase();

        if(text.indexOf(filterValue) === -1){
            // Bulamadı
            listItem.setAttribute("style","display : none !important");
        }
        else{
            listItem.setAttribute("style","display : block");

        }
    });
}

function deleteTodo(e){
    if(e.target.className === "fa fa-remove"){
        // console.log("Silme işlemi");
        e.target.parentElement.parentElement.remove();
        deleteTodoFromStorage(e.target.parentElement.parentElement.textContent);
        showAlert("success","Todo başarıyla silindi.");
    }
}

function deleteTodoFromStorage(deletetodo){
    let todos = getTodosFromStorage();

    todos.forEach(function(todo,index){
        if(todo === deletetodo){
            todos.splice(index,1); // Arrayden değeri silebiliriz
        }
    });

    localStorage.setItem("todos",JSON.stringify(todos));
}


function loadAllTodosToUI(){
    let todos = getTodosFromStorage();
    todos.forEach(function(todo){
        addTodoToUI(todo);
    })
}

function addTodo(e){
    const newTodo = todoInput.value.trim(); //trim() sağ ve soldaki başlıkları siler
    console.log(newTodo);
    
    if(newTodo === ""){
        /*
        <div class="alert alert-danger" role="alert">
        This is a danger alert—check it out!
        </div>
        */
        showAlert("danger","Lütfen bir Todo girin.");
    }
    else{
    addTodoToUI(newTodo);
    addTodoToStorage(newTodo);
    showAlert("success","Todo başarıyla eklendi.")

    }

    e.preventDefault();
}

function getTodosFromStorage(){ // Storage'den Todoları almak
    let todos;

    if(localStorage.getItem("todos") === null){
        todos = [];
    }

    else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    return todos;
}


function addTodoToStorage(newTodo){
    let todos = getTodosFromStorage();
    todos.push(newTodo);

    localStorage.setItem("todos",JSON.stringify(todos));
}


function showAlert(type,message){
    const alert = document.createElement("div");
    alert.className = `alert alert-${type}`;
    alert.textContent = message;
    firstCardBody.appendChild(alert);

    // SetTimeout

    setTimeout(function(){
        alert.remove();
    },1000)


}



function addTodoToUI(newTodo){ // String değerini list item olarak UI'a ekleyecek 
    /*
    <li class="list-group-item d-flex justify-content-between">
        Todo 1
        <a href = "#" class ="delete-item">
        <i class = "fa fa-remove"></i>
        </a>

    </li>
    */

    // List Item oluşturma
   const listItem = document.createElement("li");

   //Link oluşturma
   const link = document.createElement("a");
   link.href ="#";
   link.className = "delete-item";
   link.innerHTML = "<i class = 'fa fa-remove'></i>";
   listItem.className = "list-group-item d-flex justify-content-between";

   // Text Node ekleme
    listItem.appendChild(document.createTextNode(newTodo));
    listItem.appendChild(link);

    // Todo liste'e List Item'ı ekleme
    todoList.appendChild(listItem);
    todoInput.value = "";

}



















