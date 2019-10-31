const express = require('express');
const mongoose = require('mongoose');
const graphHTTP = require('express-graphql');
const schema = require('./schema/schema'); // User For mlab
// const schema = require('./schema/schema2'); // User For Dummy Data

const app = express();
const host = "localhost";
const port = 4000;

//connect to database 
mongoose.connect('mongodb://test:test1234@ds235251.mlab.com:35251/todo_sheiblu');
mongoose.connection.once('open', () => {
    console.log("Open mLab Server");
});

app.use('/graphql', graphHTTP({
    schema,
    graphiql: true

}))

app.listen(port, () => {
    console.log(`App is running in ${host}:${port}`);
})