// variables

let tittle = document.getElementById('tittle')
let author = document.getElementById('author')
let isbn = document.getElementById('isbn')
let submit = document.getElementById('submit')
let tableBody = document.getElementById('table_body')

// Class

class Book {
    constructor(tittle, author, isbn) {
        this.tittle = tittle
        this.author = author
        this.isbn = isbn
    }
}



// Functions

const addNewBook = (e) => {

    let book = new Book(tittle.value, author.value, isbn.value)
    addLocalStorage(book)
    getLocalStorage()

    tittle.value = ''
    author.value = ''
    isbn.value = ''
    e.preventDefault()
}



const addLocalStorage = book => {
    let book_storage
    if (localStorage.getItem('book_storage') === null) {
        book_storage = []
    }
    else {
        book_storage = JSON.parse(localStorage.getItem('book_storage'))
    }
    book_storage.push(book)
    localStorage.setItem('book_storage', JSON.stringify(book_storage))
}




const getLocalStorage = () => {
    tableBody.innerHTML = ''
    let book_storage
    if (localStorage.getItem('book_storage') != null) {
        book_storage = JSON.parse(localStorage.getItem('book_storage'))

        book_storage.forEach((item, index) => {
            let tr = document.createElement('tr')
            for (var i in item) {
                let th = document.createElement('th')
                th.appendChild(document.createTextNode(item[i]))
                tr.appendChild(th)
                // console.log(th);

            }
            let th = document.createElement('th')
            let btn = document.createElement('button')
            btn.classList.add('btn', 'btn-danger')
            // btn.setAttribute('id', 'remove_btn')
            btn.appendChild(document.createTextNode('remove'))

            btn.addEventListener('click', (e) => {
                e.target.parentElement.parentElement.remove()
                deleteFromLocalStorage(index)
            })

            th.appendChild(btn)
            tr.appendChild(th)

            tableBody.appendChild(tr)

            // console.log(book_storage);

        })

    }
}




const deleteFromLocalStorage = index => {

    let book_storage
    if (localStorage.getItem('book_storage') != null) {
        book_storage = JSON.parse(localStorage.getItem('book_storage'))
    }
    book_storage.splice(index, 1)
    localStorage.setItem('book_storage', JSON.stringify(book_storage))

    
}




// Event listener
submit.addEventListener('click', addNewBook)
document.addEventListener('DOMContentLoaded', getLocalStorage)




