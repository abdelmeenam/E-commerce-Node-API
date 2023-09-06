const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')
dotenv.config({ path: 'config.env' })
const mongoose = require('mongoose');

// DB

mongoose.connect(process.env.DB_URI).then((con) => {
    console.log('DB connection successful!')
}).catch((err) => {
    console.log(err)
});

// app
const app = express()
// Middlewares always before routes
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}


// 1- Category schema
const categorySchema = new mongoose.Schema({
    name: {
        type: String
    }
})

// 2- Category model
const categoryModel = mongoose.model('Category', categorySchema)



//Routes
app.get('/', (req, res) => res.send('Our api 1!'))


const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Example app listening on port ${port}!`))


