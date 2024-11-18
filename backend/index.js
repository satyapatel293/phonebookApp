require('dotenv').config()
const express = require('express');
const morgan = require('morgan')
const cors = require('cors')
const app = express();
const Person = require('./models/person')

const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}

morgan.token('body',function (req) {
  return JSON.stringify(req.body)
})

app.use(express.json())
app.use(cors())
app.use(express.static('dist'))
app.use(requestLogger)
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))


const invalidContact = (name, number) => {
  if (!name || !number) {
    return "must provide name and number"
  }

  let duplicateName = persons.find(person => person.name === name)
  let duplicateNumber = persons.find(person => person.number === number)

  if (duplicateName) {
    return 'name must be unique'
  } else if (duplicateNumber) {
    return 'number must be unique'
  }
}


app.get("/api/persons", (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons);
  })
});

app.get("/api/info", (request, response) => {
  response.send(`
    <p>Phonebook has info for ${persons.length} people</p>
    <p>${new Date()}</p>`);
});

app.get("/api/persons/:id", (request, response, next) => {
  Person.findById(request.params.id)
    .then(person => {
      response.json(person)
    })
    .catch(error => next(error))
});

app.delete("/api/persons/:id", (request, response, next) => {
  Person.findByIdAndDelete(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
});

app.post("/api/persons", (request, response) => {
  const name = request.body.name
  const number = request.body.number
  console.log('name: ', name)
  console.log('number: ', number)
  // const error = invalidContact(name, number)
  // if (error) {
  //   response.status(400).json({error})
  // } else {
  //   const contact = {
  //     name,
  //     number,
  //     id: Math.trunc(Math.random() * 9999999999999)
  //   }
  //   persons = [...persons, contact]
  //   response.json(contact)
  // }

  let person = new Person({
    name: name, 
    number: number,
  })

  person.save().then(addedPerson => {
    console.log(addedPerson)
    response.json(addedPerson)
  })
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } 

  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT);
console.log(`Server running on port ${PORT}`);
