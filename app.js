require('dotenv').config();
const express = require('express');
const { engine } = require('express-handlebars');
const fs = require('fs');
const path = require('path');
const {NodeSSH} = require('node-ssh');
const { stdout } = require('process');

const app = express();
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

const ssh = new NodeSSH();

app.get('/', (req, res) => {
  res.render('index');
})

app.get('/instance/:name', (req, res) => {
  let stdoutLog;
  switch (req.params.name) {
    case '4': {
      ssh.connect({
        host: process.env.HOST1,
        username: process.env.USER1,
        password: process.env.PK1
      }).then(function(){
        ssh.exec('elma365ctl',['repair'],{stdin: 'y', stream: 'both'}).then(function(result) {
          res.render('instance',{
            id: req.params.name,
            log: result.stdout
          });
        })
      });
      break;
    }
    default: {
      res.render('error');
      break;
    }
  } 
})

app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`);
})