require('dotenv').config()
const express = require('express')
const fs = require('fs')
const path = require('path')
const {NodeSSH} = require('node-ssh')

const app = express()
const ssh = new NodeSSH()

app.get('/', (req, res) => {
  res.send('Hello Worlddd!')
})

app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`)
})