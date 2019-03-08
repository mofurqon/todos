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

app.get("/todos", function(req, res)  { 
        request(options, function(err, output, body) {  
        let results = JSON.parse(body); 
        res.json(results);
    });

});


app.get("/todos/transform", function(req, res)  { 
    request(options, function(err, output, body) {  
    let results = JSON.parse(body); 
    res.json({"userId": req.params.userId, "todos": [
        { "id": req.params.id, "title": req.params.title, "completed": req.params.completed }
    ]});
    });

});

const port = process.env.PORT || 8181;
app.listen(port, () => {  
    console.log(`Listening on Port ${port}`);
});

module.exports = app;