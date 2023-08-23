//* import  html objects

const submit = document.querySelector('#submit-btn')
const shoppingList = document.querySelector('#shopping-list')
const boughtList = document.querySelector('#bought-list')
const shoppingNum = document.querySelector('#shopping-num')
const boughtNum = document.querySelector('#bought-num')
// const text = document.querySelector(".span-edit");
shoppingNum.style.color = 'white'
boughtNum.style.color = 'white'

//*  events
submit.addEventListener('click', addItemToshoppingList)
// shoppingList.addEventListener("click", sendItemToBoughtList);
shoppingList.addEventListener('click', removeItemFromShoppingList)
boughtList.addEventListener('click', sendBackItemToShoppingList)
boughtList.addEventListener('click', removeItemFromBoughtList)
// editButton.addEventListener("click", editContent);

//* function : add task */
function addItemToshoppingList (e) {
  e.preventDefault()
  // get input text from user
  const inputText = document
    .querySelector('#item-input')
    .value.toString()
    .trim()
  const inputQuantity = parseInt(
    document.querySelector('#quantity-input').value.trim()
  )
  let exit = false
  if (inputText !== '' && inputQuantity) {
    // create li item (task)
    const li = document.createElement('li')
    li.style.position = 'relative'

    const span1 = document.createElement('span')
    span1.textContent = inputText
    span1.style.padding = '10px'

    // create edit button1
    const i = document.createElement('i')
    i.classList.add('fa-pencil')

    const editButton = document.createElement('button')
    editButton.style.cursor = 'pointer'
    editButton.appendChild(document.createTextNode('✏️'))
    editButton.className = 'edit'
    editButton.addEventListener('click', editContent)

    // create delete button1
    const deleteButton = document.createElement('button')
    deleteButton.style.cursor = 'pointer'
    deleteButton.appendChild(document.createTextNode('X'))
    deleteButton.className = 'delete'

    const span = document.createElement('span')
    span.textContent = inputQuantity
    span.classList.add('quantity')

    li.appendChild(span1)
    li.appendChild(span)
    li.appendChild(editButton)
    li.appendChild(deleteButton)

    // add li to the end of list of tasks
    // avoid duplicate
    const arr = Array.from(shoppingList.children)
    arr.forEach((li) => {
      const sum = +li.children[1].textContent + +inputQuantity
      if (li.children[0].textContent === inputText) {
        li.children[1].textContent = sum
        exit = true
      }
    })

    if (exit) {
      document.querySelector('#item-input').value = ''
      document.querySelector('#quantity-input').value = ''
      return
    } else {
      shoppingList.appendChild(li)
      shoppingNum.textContent = shoppingList.children.length

      document.querySelector('#item-input').value = ''
      document.querySelector('#quantity-input').value = ''
    }

    li.addEventListener('click', sendItemToBoughtList)
  } else {
    window.alert('No empty input allowed')
  }
}

//* function to send item to bought list
function sendItemToBoughtList () {
  let touchtime = 0
  Array.from(shoppingList.children).forEach((li) => {
    li.addEventListener('click', (e) => {
      e.preventDefault()
      // DoubleCLick function
      if (touchtime === 0) {
        touchtime = new Date().getTime()
      } else {
        if (
          // less than 800sec and 1440px
          new Date().getTime() - touchtime < 800 &&
          document.documentElement.scrollWidth <= 1536
        ) {
          boughtList.appendChild(li)
          shoppingNum.textContent = shoppingList.children.length
          boughtNum.textContent = boughtList.childElementCount
          li.firstElementChild.contentEditable = false
          touchtime = 0
          // text.style.visibility = "visible";
        } else {
          touchtime = new Date().getTime()
          // list__label.children[2].innerHTML = ``;
        }
      }
    })
  })
}
//* function to sendback item to shopping list
function sendBackItemToShoppingList (e) {
  e.preventDefault()
  Array.from(boughtList.children).forEach((li) => {
    li.addEventListener('click', () => {
      shoppingList.appendChild(li)
      boughtNum.textContent = boughtList.childElementCount
      shoppingNum.textContent = shoppingList.children.length
    })
  })
}

//* function :  remove item from shopping list */
function removeItemFromShoppingList (e) {
  const deleteBtn = e.target
  if (deleteBtn.classList.contains('delete')) {
    if (window.confirm('Are you sure you want to delete this task?')) {
      const li = deleteBtn.parentElement
      shoppingList.removeChild(li)
      shoppingNum.textContent = shoppingList.children.length
    }
  }
}

//* function :  remove item from bought list
function removeItemFromBoughtList (e) {
  const deleteBtn = e.target
  if (deleteBtn.classList.contains('delete')) {
    if (window.confirm('Are you sure you want to delete this task?')) {
      const li = deleteBtn.parentElement
      boughtList.removeChild(li)
      boughtNum.textContent = boughtList.childElementCount
    }
  }
}

//* function to edit content
function editContent (e) {
  const liElements = document.getElementsByName('li')
  console.log('originalText')
  console.log(liElements)
  Array.from(shoppingList.children).forEach((li) => {
    if (li.contains(e.target)) {
      const originalText = li.firstChild.innerHTML
      const input = document.createElement('input')
      input.setAttribute('type', 'text')
      input.setAttribute('value', originalText)
      input.className = 'inputcreated'
      input.addEventListener('keypress', saveData)
      input.addEventListener('click', saveData)
      li.firstChild.replaceWith(input)
      input.select()
    }

    console.log('in array ')
  })

  console.log('out array ')
}

function saveData (e) {
  if ((e.target.value.length > 0) && ((e.keyCode === 13) || e.type === 'click')) {
    const span = document.createElement('span')
    span.textContent = e.target.value
    e.target.replaceWith(span)
  }
}
