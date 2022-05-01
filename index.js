const express = require('express');
let dbdata = require('./db.json');
var fs = require('fs');
const { json } = require('express/lib/response');
const app = express();
const port = 3000;
app.set("view engine", "ejs");
app.use(express.json());

var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.get('/jira/:jiraId', (req, res) => {
    const { jiraId } = req.params;
    task = JSON.parse(fs.readFileSync('./db.json', 'utf8'));
    const updatedJson = task.Jira.filter(element => element.id === parseInt(jiraId));
    task.Jira = updatedJson;
    //res.send(task)
    res.render('homepage1', {task,jiraId});
});

app.get('/jira', (req, res) => {
    const { jiraId } = req.params;
    task = JSON.parse(fs.readFileSync('./db.json', 'utf8'));
    res.render('homepage', {task})

});

app.post('/jira', (req, res) => {
    const { id, description, title } = req.body;
    console.log(id)
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
    res.render('homepage', { task })

});

app.delete('/jira/:jiraId', (req, res) => {

    task = JSON.parse(fs.readFileSync('./db.json', 'utf8'));
    const { jiraId } = req.params;

    const updatedJson = task.Jira.filter(element => element.id !== parseInt(jiraId));
    task.Jira = updatedJson;

    fs.writeFileSync('./db.json', JSON.stringify(task));

    res.render('homepage', {task})
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
        res.render('homepage', {task})
    }
});

app.post('/jira/:jiraId', (req, res) => {
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
        res.render('homepage', {task})
    }
});

app.post('/jira-delete/:jiraId', (req, res) => {

    task = JSON.parse(fs.readFileSync('./db.json', 'utf8'));
    const { jiraId } = req.params;

    const updatedJson = task.Jira.filter(element => element.id !== parseInt(jiraId));
    task.Jira = updatedJson;

    fs.writeFileSync('./db.json', JSON.stringify(task));

    res.render('homepage', {task})
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`)
});

