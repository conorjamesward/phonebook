const express = require('express')
const app = express()

app.use(express.json())

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
  const persons = phonebook.find(persons => persons.id === id)
  if (persons){
    response.json(persons)
  } else {
    response.status(404).end()
  }
})

const PORT = 3001
app.listen(PORT)
console.log(`app listening on port ${PORT}`)