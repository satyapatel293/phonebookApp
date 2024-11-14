import Input from "./Input";

const PersonForm = ({
  handleSubmit,
  name,
  number,
  handleName,
  handleNumber,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        name: <Input value={name} handleChange={handleName} />
      </div>
      <div>
        number: <Input value={number} handleChange={handleNumber} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default PersonForm 