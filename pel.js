const submitButton = document.querySelector('#stuff');
const ul = document.querySelector('ul')
const text = document.querySelector('#textbox');
const todoArr = []
// const todoArr = localStorage.getItem('todos') ? JSON.parse(localStorage.getItem('todos')):[]



submitButton.addEventListener('submit', function(e){
    e.preventDefault();
    if(text.value !== '') {
        const addLi = document.createElement('li');
        const deleteBtn = document.createElement('button');
        deleteBtn.innerText = 'remove';
        addLi.innerText = text.value;
        addLi.appendChild(deleteBtn);
        ul.appendChild(addLi);
        // todoArr.push(text.value)
        localStorage.setItem('todos', JSON.stringify(todoArr))
        text.value = '';
    }
})

ul.addEventListener('click', function(e) {
    if(e.target.tagName === 'BUTTON') {
        e.target.parentElement.remove();
    } else if(e.target.tagName === 'LI'){
        e.target.classList.toggle('strike-thru')
    }
})