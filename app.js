require('dotenv').config()
const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const routes = require('./routes')


app.use(express.json())
app.use(express.urlencoded({encoded: true}))

app.use('/', routes)

app.get('/*',(req,res)=>{
  res.send('404 not found')
})

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})

