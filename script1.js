let input = document.querySelector("#todo-input");

let addBtn = document.querySelector(".add-btn");

let list = document.querySelector("#todo-list");


function addTodo(){

    let todoText = input.value;

    let text = input.value.trim();

    // prevent empty text
    if(text === ""){
        return;
    }


    // create li
    let li = document.createElement("li");

    li.style.cursor = "pointer";
    li.style.fontSize = "50px";
    li.innerText = todoText;

    // mark completed
    li.addEventListener("click", ()=>{

        li.classList.toggle("done");

    });

    // delete todo
    li.addEventListener("dblclick", ()=>{

        li.remove();
    });

    // append li into ul
    list.appendChild(li);

    // clear input
    input.value = "";

    if(text.length > 10){
        alert("more then capacity")
        li.remove();
    }

}


// button click
addBtn.addEventListener("click", ()=>{
    addTodo();
});


// Enter key
input.addEventListener("keyup",(e)=>{

    if(e.key === "Enter"){

        addTodo();

    }

});