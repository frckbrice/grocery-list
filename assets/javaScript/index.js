//* import  html object

const submit = document.querySelector("#submit-btn");
const shoppingList = document.querySelector("#shopping-list");
const boughtList = document.querySelector("#bought-list");
const shoppingNum = document.querySelector("#shopping-num");
const boughtNum = document.querySelector("#bought-num");

//* add events
submit.addEventListener("click", addToshoppingList);
shoppingList.addEventListener("click", removeItemFromList);
shoppingList.addEventListener("click", addItemToBoughtList);
boughtList.addEventListener("click", removeItemFromList);

//* function : add task */
function addToshoppingList(e) {
  e.preventDefault();
  // get input text from user
  const inputText = document
    .querySelector("#item-input")
    .value.toString()
    .trim();
  const inputQuantity = parseInt(
    document.querySelector("#quantity-input").value.trim()
  );
  if (inputText && inputQuantity) {
    //create li item (task)
    const li = document.createElement("li");
li.textContent = inputText;

    //create delete button1
    const deleteButton = document.createElement("button");
    deleteButton.style.cursor = "pointer";
    deleteButton.appendChild(document.createTextNode("X"));
    deleteButton.className = "delete";

    const span = document.createElement("span");
    span.textContent = inputQuantity;
    span.classList.add("quantity");

    li.appendChild(span);
    li.appendChild(deleteButton);

    //add li to the end of list of tasks
    shoppingList.appendChild(li);
    li.addEventListener('click', () => {
    boughtList.appendChild(li); 
    boughtNum.textContent = boughtList.childElementCount;
    if(shoppingNum.textContent > 0){
      shoppingNum.textContent -=1;
    }else {
      shoppingNum.textContent = 0;
    }
    
    })
    
    shoppingNum.textContent = shoppingList.children.length;

    document.querySelector("#item-input") = "";
    document.querySelector("#quantity-input")= "";
  } else {
    alert("No empty input allowed");
  }
}

//function to add item to bought list
function addItemToBoughtList(e) {
  e.preventDefault();
  boughtList.appendChild(e.target);
}

