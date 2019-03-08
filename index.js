const express = require('express'); 
const bodyParser = require('body-parser');
const app = express();
const request = require('request');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const options = {  
    url: 'https://jsonplaceholder.typicode.com/todos',
    method: 'GET',
    headers: {
        'Accept': 'application/json',
        'Accept-Charset': 'utf-8'
    }
};

app.get("/todos", (req, res) => { 
        request(options, (err, output, body) => {  
        let todos = JSON.parse(body); 

        let todo = todos.filter(todo => todo.id.length < 25);
        res.json(todos);
    });

});


app.get("/todos/transform", (req, res) => { 
    request(options, (err, output, body) => {  
    let results = JSON.parse(body); 
    
    res.json({userId: req.params.userId, todos: [
        { id: req.params.id, title: req.params.title, completed: req.params.completed }
    ]});
    });

});

const port = process.env.PORT || 8181;
app.listen(port, () => {  
    console.log(`Listening on Port ${port}`);
});

module.exports = app;