//STEP 2: REQUIRE DEPENDENCIES

const express = require('express')
const app = express()
const cors = require('cors')
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

//STEP 5: CREATE PORT

app.listen(process.env.PORT || PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})