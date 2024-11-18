const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]

console.log("name", name);
console.log('number', number);

const url =
`mongodb+srv://satyapatel293:${password}@phonebookcluster.wrosl.mongodb.net/phoneBookApp?retryWrites=true&w=majority&appName=PhoneBookCluster`

mongoose.set('strictQuery',false)

mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)



if (!name || !number) {
  Person.find({}).then(result => {
    result.forEach(person => console.log(person))
    mongoose.connection.close()
  })
} else {
  const person = new Person({
    name,
    number,
  })
  
  person.save().then(result => {
    console.log(`added ${name} number ${number} to phonebook`)
    mongoose.connection.close()
  })
}
