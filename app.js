require('dotenv').config();
const express = require('express');
const { engine } = require('express-handlebars');
const fs = require('fs');
const path = require('path');
const {NodeSSH} = require('node-ssh');
const YAML = require('yaml')

const app = express();
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

const ssh = new NodeSSH();



app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.get('/', (req, res) => {
  const file = fs.readFileSync(process.env.PATH_INSTANCE_FILE, 'utf8');
  const data = YAML.parse(file);
  
  console.log(data);

  res.render('index', {
    instances: data
  });
})

app.get('/instance/:name', (req, res) => {
  ssh.connect({
    host: data[req.params.name].host,
    username: data[req.params.name].user,
    password: data[req.params.name].pass
  }).then(function () {
    ssh.exec('elma365ctl', ['repair'], { stdin: 'y', stream: 'both' }).then(function (result) {
      res.render('instance', {
        id: data[req.params.name].name,
        log: result.stdout
      });
    })
  });
})

app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`);
})