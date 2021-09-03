//Server

const express = require('express');
const app = express();
const port = 3000;

//middleware
app.use(express.json())

//Random Id
let generateId = function () {
  return '_' + Math.random().toString(36).substr(2, 9);
};

//API
let books = [
    {
        id: generateId(),
        book: "A song of ice and fire"
    },
    // {
    //     id: generateId(),
    //     book: "Do androids dream of electric sheep?"
    // },
    {
        id: generateId(),
        book: "Dune"
    },
    {
        id: generateId(),
        book: "The stars my destination"
    }
]

//Endpoints

//hämtar books
app.get('/api', (req, res) => {
    try {
        res.json(books)
        res.json({ status: true })
    } catch (err) {
        console.error(err)
        res.json({status: false})
    }
})

//hämtar id på en enstaka bok
app.get('/api/id/:title', (req, res) => {
    let book = books.find(books => books.book === req.params.title)
    res.json(book.id)
})

//lägger till books
app.post('/api', (req, res) => {
    try {
        console.log(req.body)
        books.push(req.body)
        res.json({ status: true })
    } catch (err) {
        console.error(err)
        res.json({ status: false })
    }
})

app.delete('/api/:id', (req, res) => {
    try{
        let bookToRemove = books.findIndex(book => book.id === req.params.id)
        books.splice(bookToRemove, 1)
        res.json({ status: true })
    }catch(err){
        console.error(err)
        res.json({ status: false})
    }
})

app.put('/api/:title/:id', (req, res) => {
    
    let bookIndex = books.findIndex(book => book.id === req.params.id)
    books.splice(bookIndex, 1, {id: req.params.id, book: req.params.title})
    res.json(books)
    res.json({ status: true })
})


app.use(express.static('public'))

app.listen(port, () => console.log("Server is running"))