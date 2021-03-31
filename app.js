const express = require('express')
const app = express()
const Joi = require('joi')
const fs = require('fs')


app.set('view engine', 'pug')
app.use('/static', express.static('public'))
app.use(express.urlencoded({extended: false}))

app.get('/', (req, res) => {
    res.render('home')
})


//IMPORTING ROUTE FOR CREATING A POST

const create = require('./routes/create.js')
app.use('/create', create)


//SHOWING ALL POSTS

app.get('/posts', (req, res) => {

    fs.readFile('./data/posts.json', (err, data) => {
        if (err) throw err
        
        const posts = JSON.parse(data)
        res.render('posts', {posts: posts})
    })
})

//ROUTE FOR SHOWING INDIVIDUAL POST 

app.get('/posts/:id', (req, res) => {
    const id = req.params.id
    fs.readFile('./data/posts.json', (err, data) => {
        if (err) throw err
        
        const posts = JSON.parse(data)
        const post = posts.filter(post => post.id == id)[0]
        res.render('post', {post: post})
    })
})

//404 ERROR HANDLING

app.use(function (req, res, next) {
    res.status(404).render('error_404')
})

app.listen(8000,  err => {
    if(err) console.log(err)

    console.log('Server is running on port 8000...')
})
