const express = require('express')
const app = express()
const morgan = require('morgan')
const fs = require('fs')
const path = require('path')
const data = require('./data.js')


console.log(data)
const PORT = process.env.PORT || 1337
app.listen(PORT, ()=>{
  console.log(`Server is running at http://localhost:${PORT}`)
})


app.use(morgan('dev'))
app.use(express.static(path.join(__dirname,'public')))

app.get('/', (req,res)=>{
    res.send(
        `<html>
          <head>
            <link rel="stylesheet" href="/main.css">
          </head>
          <body>
          <header> 24 SOLAR TERMS</header>
          <div></div>
          ${data.map(season => {
              console.log(season.title)
             return `<h1><a href=${season.url}>${season.title}</a></h1>` 
          }).join('')}     
          </body>
          <script type="text/javascript" src="/season.js"></script>
        </html>`
    )
})


app.get('/:name', (req, res)=>{
  //console.log('name')
  //console.log(req.params.name)
  //console.log((req.params.name).toString())
  const names = data.map(element=>{
    return element.name
  })
 // console.log(names)
 // console.log(names.includes((req.params.name).toString()))
  if(names.includes((req.params.name).toString())){  
    fs.readFile(path.join(__dirname,`public/${req.params.name}.html`), (err,content)=>{
      if (err){
        res.statusCode = 500
        res.setHeader('Content-Type','text/html')
        res.send(`<h1>File reading error <a href='/'>back</a></h1>`)
      }else{
        res.statusCode = 200
        res.setHeader('Content-Type','text/html')
        res.send(content)
      }
      })
  }else{
      res.statusCode = 404
      res.setHeader('Content-Type','text/html')
      res.send(`<h1>404 Page ${req.params.name} not Found <a href='/'>back</a></h1>`)   
 }
})



