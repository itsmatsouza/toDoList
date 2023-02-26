const input = document.querySelector('#input')
const addBtn = document.querySelector('#new-task-btn')
const tasksList = document.querySelector('#tasks-list')
const form = document.querySelector('form')
const confirmContent = document.querySelector('#confirm')
const confirmContentDiv = document.querySelector('.confirm-content')
const confirmText = document.querySelector('.confirm-text')
const yesBtn = document.querySelector('.yes-btn')
const noBtn = document.querySelector('.no-btn')

function openEditConfirm(parentLi) {
  confirmContent.style.display = 'flex'
  confirmText.innerText = 'Digite a nova tarefa?'
  const newInput = document.createElement('input')
  newInput.value = parentLi.childNodes[0].innerText
  newInput.className = 'new-task-input-confirm'
  newInput.setAttribute('autofocus', '')
  confirmText.appendChild(newInput)
  document.addEventListener('click', (ev) => {
    const elementEv = ev.target
    if(elementEv.classList.contains('yes')) {
      const parentSpan = parentLi.childNodes[0]
      parentSpan.innerText = newInput.value
      closeConfirm()
    }
    if(elementEv.classList.contains('no')) {
      closeConfirm()
    }
  })
}

function closeConfirm() {
  confirmContent.style.display = "none"
}

function openRemoveConfirm(parentLi) {
  confirmContent.style.display = 'flex'
  confirmText.innerText = 'Deseja realmente apagar uma tarefa ainda não feita?'
  document.addEventListener('click', (ev) => {
    const elementEv = ev.target
    if(elementEv.classList.contains('yes')) {
      tasksList.removeChild(parentLi)
      closeConfirm()
    }
    if(elementEv.classList.contains('no')) {
      closeConfirm()
    }
  })
}

const createNewTask = () => {
  const li = document.createElement('li')
  li.className = 'task-line'

  const span = document.createElement('span')
  span.className = 'task-text'
  span.innerText = input.value

  const div = document.createElement('div')
  div.className = 'icons'

  const editBtn = document.createElement('button')
  editBtn.id = 'edit-btn'
  editBtn.className = 'editBtn'

  const editIcon = document.createElement('i')
  editIcon.className = 'fa fa-pencil editBtn'

  const removeBtn = document.createElement('button')
  removeBtn.id = 'remove-btn'
  removeBtn.className = 'removeBtn'

  const removeIcon = document.createElement('i')
  removeIcon.className = 'fa fa-trash removeBtn'

  tasksList.append(li)
  li.appendChild(span)
  li.appendChild(div)
  div.appendChild(editBtn)
  editBtn.appendChild(editIcon)
  div.appendChild(removeBtn)
  removeBtn.appendChild(removeIcon)

  input.value = ''
}

  document.addEventListener('click', (ev) => {
    const targetEv = ev.target
    const parentLi = targetEv.closest('li')
    if(targetEv.classList.contains('removeBtn')) {
      if(parentLi.classList.contains('done')) {
        tasksList.removeChild(parentLi)
      } else {
        openRemoveConfirm(parentLi)
      }
    }
    if(targetEv.classList.contains('task-text')) {
      parentLi.classList.toggle('done')
    }
    if(targetEv.classList.contains('editBtn')) {
      openEditConfirm(parentLi)
    }
  })

form.addEventListener('submit', (ev) => {
  ev.preventDefault()

    createNewTask()
})