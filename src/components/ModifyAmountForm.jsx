import React from "react";

const ModifyAmountForm = ({ modifyAmount, handleInput, value, currency }) => {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <label htmlFor="addCustomValue">Please Enter Amount:</label>
      <span> {currency}</span>
      <input
        type="text"
        id="addCustomValue"
        name="modifyValue"
        placeholder="5.00"
        onChange={(e) => handleInput(e.target.value, e.target.name)}
        value={value}
      />
      <button
        type="submit"
        onClick={(e) => {
          modifyAmount("add");
        }}
        className="addButton"
      >
        Add
      </button>
      <button
        type="submit"
        onClick={(e) => {
          modifyAmount("withdraw");
        }}
        className="addButton"
      >
        Withdraw
      </button>
    </form>
  );
};

export default ModifyAmountForm;
