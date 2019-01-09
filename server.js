const express = require('express');
const mysql = require('mysql');

// setup routes !!!!!!!!!!!!!!!! var url = require('url');

const app = express();
const server = require('http').createServer(app);
var io = require('socket.io').listen(server);

users = [];
connections = [];

server.listen(process.env.PORT || 3000);
console.log("Server runing, listening on port 3000...");

// serve the ww folder
app.use(express.static('www'));
console.log("ready to serve the app folder ...");

// create mysql connection
var mysqlcon = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "wilaya2018@",
    database: "wilayachat"
});
// coonecting to mysql
mysqlcon.connect(function(err, db) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }
    console.log('mysql connected as id :' + mysqlcon.threadId);

    //socket events
    io.on("connection", function(socket) {

        //connect
        connections.push(socket);
        console.log("a user connected: %s sockets connected id: %s ", connections.length, socket.id);

        //Disconect
        socket.on('disconnect', function(data) {
            connections.splice(connections.indexOf(socket), 1);
            console.log("a user disconnected: %s sockets connected  id: %s ", connections.length, socket.id);
        });

    });
});





// exmeple var sql = "INSERT INTO customers (name, address) VALUES ('Company Inc', 'Highway 37')";
/*
connection.query('SELECT 1', function (error, results, fields) {
  if (error) throw error;
  // connected!
});

con.connect(function(err) {
    if (err) throw err;
    console.log("mysql connected!");
    var sql = " INSERT INTO test ( message, time ,delever) VALUES ('hello form the other side' , '2018-02-22 12:39:40 ',' 1') ";
    con.query(sql, function(err, result) {
        if (err) throw err;
        console.log("records inserted:" + result.affectedRows);
    })
});
*/