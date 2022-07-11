//STEP 2: REQUIRE DEPENDENCIES

const express = require('express')
const app = express()
const cors = require('cors')
const { response } = require('express')
const MongoClient = require('mongodb').MongoClient
require('dotenv').config()
const PORT = 8000

//STEP 3: DECLARE VARIABLES

let db,
    dbConnectionString = process.env.DB_STRING,
    dbName = 'movies',
    collection 

//STEP 4: CONNECT TO MONGODB

MongoClient.connect(dbConnectionString)
    .then(client => {
        console.log('Connected to Database!!!')
        db = client.db(dbName)
        collection = db.collection('oscar-winning-movies')
    })

//STEP 6: SET MIDDLEWARE

    //sets EJS as view engine
    app.set('view engine', 'ejs')

    //creates public folder to serve to client
    app.use(express.static('public'))

    //helps us parse URLs
    app.use(express.urlencoded({extended:true}))

    //helps parse JSON and read data that is being sent back and forth
    app.use(express.json())

    //stops CORS error from happening in browser
    app.use(cors())

//STEP 9: SET SERVER TO REQUEST AND RESPOND

    app.get ('/', async (request, response) => {
        try {
          response.render('index.ejs')  
        }
        catch (error) {
          response.status(500).send({message: error.message})  
        }
    })


//STEP 5: CREATE PORT

app.listen(process.env.PORT || PORT, () => {
    console.log(`Server is running on Port ${PORT}!!!`)
})