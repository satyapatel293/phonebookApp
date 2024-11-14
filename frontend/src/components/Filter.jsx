const Filter = ({ handleChange }) => {
  return (
    <div>
      filter shown with <input type="text" onChange={handleChange} />
    </div>
  );
};

export default Filter