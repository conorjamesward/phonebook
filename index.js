//https://git.heroku.com/whispering-headland-24080.git
const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')

app.use(cors())
app.use(express.json())
app.use(express.static('build'))

morgan.token('body', function (request, response){
  if (request.method === 'POST'){
    return JSON.stringify(request.body)
  }
})

app.use(morgan(':method :url :status :response-time ms :body'))

let phonebook = [
  { 
    "id": 1,
    "name": "Arto Hellas", 
    "number": "040-123456"
  },
  { 
    "id": 2,
    "name": "Ada Lovelace", 
    "number": "39-44-5323523"
  },
  { 
    "id": 3,
    "name": "Dan Abramov", 
    "number": "12-43-234345"
  },
  { 
    "id": 4,
    "name": "Mary Poppendieck", 
    "number": "39-23-6423122"
  }
]

app.get('/api/persons', (request, response) => {
  response.json(phonebook)
})

app.get('/info', (request, response) => {
  response.send(
    `<p>Phonebook has info for ${phonebook.length} people</p>
    <p>${new Date()}</p>`
  )
})

app.get('/api/persons/:id',(request, response) => {
  const id = Number(request.params.id)
  const person = phonebook.find(person => person.id === id)
  if (person){
    response.json(person)
  } else {
    response.status(404).end()
  }
})

app.delete('/api/persons/:id',(request, response) => {
  const id = Number(request.params.id)
  phonebook = phonebook.filter(person => person.id !== id)
  response.status(204).end()
})

app.post('/api/persons',(request, response) => {
  const body = request.body

  if(!body.name || !body.number){
    return response.status(400).json({ 
      error: 'name or number missing' 
    })
  } else if (phonebook.some(person => person.name === body.name)){
    return response.status(400).json({ 
      error: 'name already in phonebook' 
    })
  }

  const person = {
    id: Math.floor(Math.random() * 1000000),// x in 1,000,000 chance of getting duplicate id
    name: body.name,
    number: body.number
  }
  phonebook = phonebook.concat(person)
  response.json(phonebook)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`app listening on port ${PORT}`)
})