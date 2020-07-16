var express=require('express');
var cors=require('cors')
// var route = require('./route');
var db=require('./db/db')
var bodyParser = require('body-parser')
var app=express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))

app.use(cors());
// app.use('/api', route);



app.post('/register',(req,res)=>{
   db.register(req.body.username,req.body.password,res)  
})


app.post('/login',(req,res)=>{
   db.login(req.body.username,req.body.password,res)  
})

app.post('/api/todo/add',(req,res)=>{
   db.addTodo(req.body.todoName,req.body.order,res)  
})

app.get('/api/todo/get',(req,res)=>{
   db.getTodo(res)  
})

app.put('/api/todo/update/:id',(req,res)=>{
   db.updateTodo(req.body.todoName,req.params.id,res)  
})

app.post('/api/Todo/Reorder/:fromId/:toId',(req,res)=>{
   db.reorderTodo(req.params.fromId,req.params.toId,res)  
})



app.get('/gettodolist',(req,res)=>{
    db.getTodo(res)
 
 })


app.get('/check',function(req,res){
	res.send('ok');
});

app.listen(4000,function(){
	console.log('listening on port 4000');
});
