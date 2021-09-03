//Events
//addEventListener("load", collectBooks)

//Globals
let body = document.getElementsByTagName("body")
let renderedList = document.getElementById("books")

//Endpoints

//hämtar och visar booklista
async function collectBooks() {

    const booksToDisplay = await makeRequest("http://localhost:3000/api", "GET")
    let booksContainer = document.createElement("div")
    booksContainer.id = "booksContainer"
    const header = document.createElement("h2")
    header.id = "header"
    header.innerText = "Booklist:"
    
    
    renderListItems = () => {
        renderedList.appendChild(header)
        renderedList.appendChild(booksContainer)
        booksToDisplay.forEach(book => {
            let card = document.createElement("div")
            let title = document.createElement("h3")
            let removeBtn = document.createElement("button")
            let updateBtn = document.createElement("button")
            let updateField = document.createElement("input")
            let getIdBtn = document.createElement("button")
            
            booksContainer.appendChild(card)
            card.appendChild(title)
            card.appendChild(removeBtn)
            card.appendChild(getIdBtn)
            card.appendChild(updateBtn)
            card.appendChild(updateField)
            
            title.innerText = book.book
            removeBtn.innerText = "Remove book"
            updateBtn.innerText = "Update title"
            getIdBtn.innerText = "get book ID"
            
            removeBtn.addEventListener("click", () => {
                deleteBook(book.id)     
            })
            updateBtn.addEventListener("click", () => {
                updateTitle(updateField.value, book.id)
            })
            getIdBtn.addEventListener("click", () => {
                collectBookId(book.book)
            })

        });
        // let divider = document.createElement("hr")
        // booksContainer.appendChild(divider)
    }
    //Visar ett meddelande som berättar att listan är uppdaterad
    if(document.getElementById("booksContainer") != null) {
        alert("List of books is updated")
    }
    //tar bort den gamla listan
    removeOldList()
    //skapar den nya listan
    renderListItems()
}

function removeOldList(){
    if((document.getElementById("booksContainer") != null)) {
        document.getElementById("booksContainer").remove()
        document.getElementById("header").remove()   
    }
}

//externt api
async function externalFetch() {
    let response = await fetch("https://www.boredapi.com/api/activity")
    let result = await response.json()

    let ideaContainer = document.getElementById("ideaContainer")
    document.getElementById("linkContainer").innerText = result.link
    
    ideaContainer.innerText = result.activity
    console.log(true)
}
externalFetch()

//lägger till books i listan
async function addBook() {
    const bookToAdd = document.getElementById("inputField").value
    const status = await makeRequest("http://localhost:3000/api", "POST", { book: bookToAdd })
    console.log(status)
    await collectBooks()
}
    //kör in parameter som värde i slutet på url
    async function updateTitle(newTitle, id) {
    const status = await makeRequest("http://localhost:3000/api/" + newTitle + "/" + id, "PUT", { book: newTitle, book: id })
    console.log(status)
    await collectBooks()
}

//tar bort en bok från api
async function deleteBook(id) {
    const status = await makeRequest("http://localhost:3000/api/" + id, "DELETE")
    console.log(status)
    await collectBooks()
}

async function collectBookId(title) {
    const status = await makeRequest("http://localhost:3000/api/id/" + title, "GET")
    alert("ID: " + status)
    console.log(status)
}

//skickar bodyn till rätt endpoint och retunerar result
async function makeRequest(url, method, body) {
    try {
        const response = await fetch(url, {
            headers: { "Content-type": "application/json" },
            method,
            body: JSON.stringify(body)
        })
        const result = await response.json()
        return result

    } catch (err) {
        console.error(err)
    }
}