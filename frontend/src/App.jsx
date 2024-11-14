import { useState, useEffect } from "react";
import Persons from "./components/Persons";
import PersonForm from "./components/PersonForm";
import Filter from "./components/Filter";
import personService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNNumber] = useState("");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    personService.getAll().then((allPeople) => {
      setPersons(allPeople);
    });
  }, []);

  const handleChangeNewName = (event) => setNewName(event.target.value);
  const handleChangeNewNumber = (event) => setNewNNumber(event.target.value);
  const handleAddName = (event) => {
    event.preventDefault();
    if (persons.some((person) => person.name === newName)) {
      alert(`${newName} is already added to the phonebook`);
    } else {
      let newContact = {
        name: newName,
        number: newNumber,
      };

      personService.create(newContact).then((createdPerson) => {
        setPersons([...persons, createdPerson]);
        setNewName("");
        setNewNNumber("");
      });
    }
  };

  const handleFilter = (event) => setFilter(event.target.value.toLowerCase());
  const filteredPersons = persons.filter((person) => {
    return person.name.toLowerCase().includes(filter);
  });

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleChange={handleFilter} />
      <h3>add a new</h3>
      <PersonForm
        name={newName}
        number={newNumber}
        handleName={handleChangeNewName}
        handleNumber={handleChangeNewNumber}
        handleSubmit={handleAddName}
      />
      <h3>Numbers</h3>
      <Persons persons={filteredPersons} />
    </div>
  );
};

export default App;
