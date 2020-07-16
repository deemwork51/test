2 tables are made 

db name is task 
please change crediantials according to you 


1.user in that we have field id ,username,password 
below query to run

var sql = "CREATE TABLE user (id int(16) auto_increment,name VARCHAR(255) NOT NULL,password VARCHAR(255) NOT NULL,PRIMARY KEY(id))";

2.Todo Table is created 

have fields id ,name,sequence 

var sql = "CREATE TABLE todo (id int(16) auto_increment,name VARCHAR(255) NOT NULL, sequence int(16) NOT NULL,PRIMARY KEY(id))";


//run these 2 queries at starting to start the project 