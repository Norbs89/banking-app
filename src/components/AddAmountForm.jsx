import React from "react";

const AddAmountForm = ({
  addAmount,
  handleInput,
  value,
  warning,
  currency,
}) => {
  return (
    <form onSubmit={addAmount}>
      <label htmlFor="addCustomValue">Add Other Amount:</label>
      <span> {currency}</span>
      <input
        type="text"
        id="addCustomValue"
        name="addValue"
        placeholder="5.00"
        onChange={(e) => handleInput(e.target.value, e.target.name)}
        value={value}
      />
      <button type="submit" className="addButton">
        Add
      </button>
      {warning && <p>Please enter a valid amount!</p>}
    </form>
  );
};

export default AddAmountForm;
