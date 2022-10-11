const express = require('express')
const cors = require('cors')
const app = express()
const bodyParser = require('body-parser')
const port = 3000


app.use(cors({
  origin: '*'
}))
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())


app.post('/', (req, res) => {
  
  //res.send('Hello World!')
  //console.log(req.body)
  const date_ob = new Date()
  let year = date_ob.getFullYear()
  let year_ = year.toString()
  let year2 = year_.slice(2)
  let year2_ = parseInt(year2)
  
  let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
  let month_ = parseInt(month)

  const cardNumber = req.body.cardNumber
  const expireDate = req.body.expireDate
  const token = req.body.token
  //console.log(cardNumber, expireDate, token)
  console.log(parseInt(cardNumber.slice(0, 2))) 
  console.log(parseInt(cardNumber.slice(0, 2)))
  console.log(token.length)
  console.log((parseInt(cardNumber.slice(0, 2)) !== 34 || parseInt(cardNumber.slice(0, 2)) !== 37) && (token.length === 3))
  
  if(cardNumber.length >= 16 && cardNumber.length <= 19){
    console.log(1)
    if((parseInt(expireDate.slice(0, 2)) >= month_)){
        console.log(2)
        if((parseInt(expireDate.slice(3)) >= year2_)){
            console.log(3)
            if((parseInt(cardNumber.slice(0, 2)) !== 34 && token.length === 3) && (parseInt(cardNumber.slice(0, 2)) !== 37 && token.length === 3)){
              res.status(200).send('Valid!')
              console.log(4)
            }else if((parseInt(cardNumber.slice(0, 2)) === 34 || parseInt(cardNumber.slice(0, 2)) === 37) && (token.length === 4)){
              res.status(200).send('Valid!')
              console.log(5)
            }else{
              res.status(500).send('not valid!')
            }
        }else{
          res.status(500).send('not valid!') 
        }
    }else{
      res.status(500).send('not valid!')
    }
}else{
  res.status(500).send('not valid!')
}

  app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something broke!')
  })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

