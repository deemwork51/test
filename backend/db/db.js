var mysql = require('mysql');


var async= require('async');
var bycrypt=require('bcryptjs')
var jwt = require('jsonwebtoken');
const { Console } = require('console');


//connection to mysql
var db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Root@123",
  database: "task"
});

db.connect(function (err) {
  if (err) throw err;
  console.log("Connected to Mysql!");
});

// db.connect(function(err) {
//     if (err) throw err;
//     console.log("Connected!");
//     var sql = "CREATE TABLE todo (id int(16) auto_increment,name VARCHAR(255) NOT NULL, sequence int(16) NOT NULL,PRIMARY KEY(id))";
//     //var sql = "ALTER TABLE users ADD noOfOrders Int(16)";
//     //var sql = "UPDATE users SET noOfOrders="+0;
//     db.query(sql, function (err, result) {
//       if (err) throw err;
//       console.log("Table created");
//     });
//   });


// db.connect(function(err) {
//     if (err) throw err;
//     console.log("Connected!");
//     var sql = "CREATE TABLE usersLogin (orderId int(16) auto_increment,id int(16),subtotal int(32), date VARCHAR(255), PRIMARY KEY (orderId), FOREIGN KEY(id) REFERENCES users(id))";
//     db.query(sql, function (err, result) {
//       if (err) throw err;
//       console.log("Table created");
//     });
//   });

//register module\

var login = function (username, password, res) {
  
  var sql = "SELECT * FROM user where username='" + username+"'"
  db.query(sql, function (err, response) {
    if (err) {
      res.status(500).send({ message: err })

    }
    else {
      if (response.length > 0) {
        var dbpassword=response[0].password
        bycrypt.compare(password, dbpassword, function(err, isMatch) {
          if (err) {
            res.status(500).send({ message: err })
          } else if (!isMatch) {
            res.status(500).send({ message: 'Invalid Crediantials' })
          } else {
            var username = response[0].username
            const expiresIn = 24 * 60 * 60;
            const accessToken = jwt.sign({ username }, "secretkey23456", {
              expiresIn: expiresIn
            });
            res.status(200).send({ "user": response, "token": accessToken })
          }
        })          
      }
      else {
        res.status(500).send({ message: 'Invalid Crediantials' })
      }
    }
  });
}


function alreadyExistingUsername(username){
  return new Promise(resolve => {
    var sql="SELECT * FROM user where username='"+username+"'"
     db.query(sql,function(err,response){
     if(response.length > 0 ){
    resolve('exists')
     }
     else{
      resolve('not exists')
     }
    })
  });
}

var register=async function(username,password,res){
  alreadyExistingUsername(username).then(function(alreadyExisting){
  if(alreadyExisting!='exists'){
    var hashedPass=bycrypt.hashSync(password,8)
    var sql="INSERT INTO user(username,password) VALUES('"+username+"','"+hashedPass+"')";
    db.query(sql,function(err,response){
      if(err){
       res.status(500).send({message:'Some Error'})  
       }
      else{
        res.status(200).send({message:'success'})
      } 
    });
  }
  else{
    res.status(500).send({message:'Username Already Exist'})   
  }
})
}

var addTodo=function(name,order,res){
  var sql = "SELECT * FROM todo WHERE sequence ="+order;
  db.query(sql,function(err,response){
    if(response.length ==0){
      var sql = "INSERT INTO todo (name,sequence)VALUES('"+name+"',"+order+")"
      db.query(sql,function(err,response){
        if(err){
         res.status(500).send({message:'Some Error'})  
         }
        else{
          res.status(200).send({message:'Inserted'})
        } 
      });
    }
    else{
      res.status(500).send({message:'Please select some other sequence'})  
    }
  })
}


var getTodo=function(res){
  var sql = "SELECT * FROM todo order by sequence "
  db.query(sql,function(err,response){
    if(response.length > 0){
     
        if(err){
         res.status(500).send({message:'Some Error'})  
         }
        else{
          res.status(200).send({response})
        } 
      
    }
    else{
      res.status(500).send({message:err})  
    }
  })
}


var updateTodo=function(name,id,res){
  var sql = "UPDATE todo SET name='"+name+"'where id="+id
  db.query(sql,function(err,response){
  
     
        if(err){
         res.status(500).send({message:'Some Error'})  
         }
        else{
          res.status(200).send({response})
        }   
  })
}


var reorderTodo=function(fromId,toId,res){
  var fromSequence;
  var toSequence;
  var sql="SELECT sequence from todo where id="+fromId
  var sql1="SELECT sequence from todo where id="+toId
  var return_data = {};
  async.parallel([
    function(parallel_done) {
        db.query(sql, {}, function(err, results) {
            if (err) return parallel_done(err);
            return_data.table1 = results;
            var sql2 = "UPDATE todo SET sequence='"+return_data.table1[0].sequence+"'where id="+toId
     db.query(sql2,function(err,response){
     })
            parallel_done();
        });
    },
    function(parallel_done) {
        db.query(sql1, {}, function(err, results) {
            if (err) return parallel_done(err);
            return_data.table2 = results;
            var sql3 = "UPDATE todo SET sequence='"+return_data.table2[0].sequence+"'where id="+fromId
     db.query(sql3,function(err,response){
     })
            parallel_done();
        });
    }
 ], function(err) {
      if (err) 
      res.send('ok ')
      
 });
 }

exports.register=register;
exports.login = login;
exports.addTodo=addTodo;
exports.getTodo=getTodo
exports.updateTodo=updateTodo;
exports.reorderTodo=reorderTodo;




