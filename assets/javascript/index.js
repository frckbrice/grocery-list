//* import  html objects

const submit = document.querySelector("#submit-btn");
const shoppingList = document.querySelector("#shopping-list");
const boughtList = document.querySelector("#bought-list");
const shoppingNum = document.querySelector("#shopping-num");
const boughtNum = document.querySelector("#bought-num");
const editButton = document.querySelector(".edit-button");

shoppingNum.style.color = "white";
boughtNum.style.color = "white";

//*  events
submit.addEventListener("click", addItemToshoppingList);
shoppingList.addEventListener("click", sendItemToBoughtList);
shoppingList.addEventListener("click", removeItemFromShoppingList);
boughtList.addEventListener("click", sendBackItemToShoppingList);
boughtList.addEventListener("click", removeItemFromBoughtList);
editButton.addEventListener("click", editContent);

//* function : add task */
function addItemToshoppingList(e) {
  e.preventDefault();
  // get input text from user
  const inputText = document
    .querySelector("#item-input")
    .value.toString()
    .trim();
  const inputQuantity = parseInt(
    document.querySelector("#quantity-input").value.trim()
  );
  if (inputText != "" && inputQuantity > 0) {
    //create li item (task)
    const li = document.createElement("li");
    li.style.position = "relative";

    const span1 = document.createElement("span");
    span1.textContent = inputText;
    span1.style.padding = "10px";

    //create delete button2
    // const moveButton = document.createElement("button");
    // moveButton.style.cursor = "pointer";
    // moveButton.appendChild(document.createTextNode("move"));
    // moveButton.className = "move";
    // moveButton.addEventListener("click", moveItemToCart(e));

    //create delete button1
    const deleteButton = document.createElement("button");
    deleteButton.style.cursor = "pointer";
    deleteButton.appendChild(document.createTextNode("X"));
    deleteButton.className = "delete";

    const span = document.createElement("span");
    span.textContent = inputQuantity;
    span.classList.add("quantity");

    li.appendChild(span1);
    li.appendChild(span);
    // li.appendChild(moveButton);
    li.appendChild(deleteButton);

    //add li to the end of list of tasks
    shoppingList.appendChild(li);

    shoppingNum.textContent = shoppingList.children.length;

    document.querySelector("#item-input").value = "";
    document.querySelector("#quantity-input").value = "";
  } else {
    alert("No empty input allowed");
  }
}

//* function to send item to bought list
function sendItemToBoughtList() {
  var touchtime = 0;
  Array.from(shoppingList.children).forEach((li) => {
    li.addEventListener("click", (e) => {
      e.preventDefault();
      //DoubleCLick function
      if (touchtime == 0) {
        touchtime = new Date().getTime();
      } else {
        if (
          // less than 800sec and 1440px
          new Date().getTime() - touchtime < 800 &&
          document.documentElement.scrollWidth < 1440
        ) {
          boughtList.appendChild(li);
          shoppingNum.textContent = shoppingList.children.length;
          boughtNum.textContent = boughtList.childElementCount;
          li.firstElementChild.contentEditable = false;
          touchtime = 0;
        } else {
          touchtime = new Date().getTime();
        }
      }
    });
  });
}

//*function to sendback item to shopping list
function sendBackItemToShoppingList(e) {
  e.preventDefault();
  Array.from(boughtList.children).forEach((li) => {
    li.addEventListener("click", () => {
      shoppingList.appendChild(li);
      boughtNum.textContent = boughtList.childElementCount;
      shoppingNum.textContent = shoppingList.children.length;
    });
  });
}

//* function :  remove item from shopping list */
function removeItemFromShoppingList(e) {
  const deleteBtn = e.target;
  if (deleteBtn.classList.contains("delete")) {
    if (confirm("Are you sure you want to delete this task?")) {
      const li = deleteBtn.parentElement;
      shoppingList.removeChild(li);
      shoppingNum.textContent = shoppingList.children.length;
    }
  }
}

//* function :  remove item from bought list
function removeItemFromBoughtList(e) {
  const deleteBtn = e.target;
  if (deleteBtn.classList.contains("delete")) {
    if (confirm("Are you sure you want to delete this task?")) {
      const li = deleteBtn.parentElement;
      boughtList.removeChild(li);
      boughtNum.textContent = boughtList.childElementCount;
    }
  }
}

//* function to edit content
function editContent() {
  const listOfItem = document.querySelectorAll("li");
  console.log(typeof listOfItem);
  Array.from(listOfItem).forEach((li) => {
    li.addEventListener("click", () => {
      li.firstElementChild.contentEditable = true;
    });
  });
}

// function moveItemToCart(e) {
//   e.preventDefault();
//   const move = document.querySelector('.move');
//   li = move.parentElement;
//   console.log(li,move)
//   boughtList.appendChild(li);
//   shoppingNum.textContent = shoppingList.children.length;
//   boughtNum.textContent = boughtList.childElementCount;
//   li.firstElementChild.contentEditable = false;
// }
