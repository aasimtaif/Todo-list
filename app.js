const port = 3000
const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const e = require('express');

const app = express()

mongoose.connect('mongodb+srv://Aasim_taif:Aasim2002@cluster0.79abnmz.mongodb.net/todoListDB')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static("public"));
app.set('view engine', 'ejs');

const itemsSchema = {
    name: String
}
const Item = mongoose.model('Item', itemsSchema)

const item1 = new Item({
    name: "Add tasks into the list"
})

let defaultItems = []


app.get('/', (req, res) => {
    const date = require(__dirname + "/date.js")
    const day = date.getDate()   
    //date module
    Item.find({}, (err, foundItems) => {
        // if (foundItems.length === 0) {
        //     defaultItems.push(item1)

        //     Item.insertMany(defaultItems, (err) => {
        //         if (err) {
        //             console.log("err")
        //         }
        //         else {
        //             console.log("ok")
        //         }
        //     }) 
        //     res.redirect('/')
        // } else {
        //     defaultItems.pop()
        // }
        res.render('list', { kindOfDay: day , newListItems: foundItems })
    })
})

app.post('/delete', (req, res) => {
    const checkedItemId = req.body.checkbox

    Item.findByIdAndRemove(checkedItemId, (err) => {
        if (!err) {
            console.log("Successfully removed")
        }
    })
    res.redirect('/')
})



app.post('/', (req, res) => {
    const itemName = req.body.newItem
    const item = new Item({
        name: itemName
    })
    item.save()
    res.redirect('/')
})

app.listen(3000, () => {
    console.log("Listening on port 3000;");
})




