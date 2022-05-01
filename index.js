const express = require('express');
let dbdata = require('./db.json');
var fs = require('fs');
const { json } = require('express/lib/response');
const app = express();
const port = 3000;
app.use(express.json());

app.get('/jira/:jiraId', (req, res) => {
    const { jiraId } = req.params;
    task = JSON.parse(fs.readFileSync('./db.json', 'utf8'));
    const updatedJson = task.Jira.filter(element => element.id === parseInt(jiraId));
    task.Jira = updatedJson;
    res.send(task)

});

app.get('/jira', (req, res) => {
    const { jiraId } = req.params;
    task = JSON.parse(fs.readFileSync('./db.json', 'utf8'));
    res.send(task)

});

app.post('/jira', (req, res) => {
    const { id, description, title } = req.body;
    if (id === undefined || id === null || id.toString().trim() === "") {
        throw new Error("Id cannot be null or undefined or empty.")
    }
    if (description === undefined || description === null || description.toString().trim() === "") {
        throw new Error("description cannot be null or undefined or empty.")
    }
    if (title === undefined || title === null || title.toString().trim() === "") {
        throw new Error("title cannot be null or undefined or empty.")
    }
    const task = JSON.parse(fs.readFileSync('./db.json', 'utf8'));
    task.Jira.push(req.body);
    fs.writeFileSync('./db.json', JSON.stringify(task));
    res.json(task);

});

app.delete('/jira/:jiraId', (req, res) => {

    task = JSON.parse(fs.readFileSync('./db.json', 'utf8'));
    const { jiraId } = req.params;

    const updatedJson = task.Jira.filter(element => element.id !== parseInt(jiraId));
    task.Jira = updatedJson;

    fs.writeFileSync('./db.json', JSON.stringify(task));

    res.json(task);
});



app.put('/jira/:jiraId', (req, res) => {
    const task = JSON.parse(fs.readFileSync('./db.json', 'utf8'));
    const { jiraId } = req.params;
    const { description, title } = req.body;
    const jiraObjs = task.Jira;

    const updatedJiraObjs = jiraObjs.filter(element => element.id === parseInt(jiraId));
    if (updatedJiraObjs.length === 0) {
        res.status(404).send("Cannot find jira with this id.")
    } else {
        updatedJiraObjs[0].title = title;
        updatedJiraObjs[0].description = description;
        fs.writeFileSync('./db.json', JSON.stringify(task));
        res.json(task);
    }
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`)
});

