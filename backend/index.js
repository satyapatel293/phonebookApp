const express = require("express");
const app = express();

app.use(express.json())


let persons = [
  {
    id: "1",
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: "2",
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: "3",
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: "4",
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

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
  response.json(persons);
});

app.get("/api/info", (request, response) => {
  response.send(`
    <p>Phonebook has info for ${persons.length} people</p>
    <p>${new Date()}</p>`);
});

app.get("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  const person = persons.find((person) => person.id === id);

  if (person) {
    response.json(person);
  } else {
    response.status(404).end();
  }
});

app.delete("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  persons = persons.filter((person) => person.id !== id);
  response.status(204).end()
});

app.post("/api/persons", (request, response) => {
  const name = request.body.name
  const number = request.body.number
  const error = invalidContact(name, number)
  if (error) {
    response.status(400).json({error})
  } else {
    const contact = {
      name,
      number,
      id: Math.trunc(Math.random() * 9999999999999)
    }
    persons = [...persons, contact]
    response.json(contact)
  }
});


const PORT = 3001;
app.listen(PORT);
console.log(`Server running on port ${PORT}`);
