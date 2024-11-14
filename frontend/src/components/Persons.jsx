import Contact from "./Contact";

const Persons = ({ persons }) => {
  return persons.map((person) => (
    <Contact key={person.id} name={person.name} number={person.number} />
  ));
};

export default Persons