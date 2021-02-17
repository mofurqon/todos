const express = require('express'); 
const bodyParser = require('body-parser');
const axios = require('axios');
const app = express();

app.use(bodyParser.json());

app.get('/todos', async (req, res) => {
    const {idstart, idend} = req.query
    try {
        const todos = await axios.get('https://jsonplaceholder.typicode.com/todos');
        if (idstart && idend) {
            const todosFiltered = todos.data.filter(todo => todo.id >= idstart && todo.id <= idend);
            res.json(todosFiltered);
        } else {
            res.json(todos.data);
        }
    } catch (err) {
        console.log(err);
    }
});

app.get('/transform/:id', async (req, res) => {
    const user = req.params.id;
    try {
        const todos = await axios.get('https://jsonplaceholder.typicode.com/todos');
        const transform = todos.data.filter(todos => todos.userId == user);
        const result = [{
            userId: transform[0].userId,
            todos: transform.map(todo => ({
                id: todo.id,
                title: todo.title,
                completed: todo.completed
            }))
        }]

        res.json(result);
    } catch (err) {
        console.log(err);
    }
});

const port = process.env.PORT || 8181;
app.listen(port, () => {  
    console.log(`Listening on Port ${port}`);
});

module.exports = app;