import React from "react";

const ModifyAmountForm = ({ modifyAmount, handleInput, value, currency }) => {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <label className="addLabel" htmlFor="addCustomValue">
        Please Enter Amount:
      </label>
      <span> {currency}</span>
      <input
        type="text"
        id="addCustomValue"
        name="modifyValue"
        placeholder="5.00"
        onChange={(e) => handleInput(e.target.value, e.target.name)}
        value={value}
      />
      <span className="valueButtons">
        <button
          type="submit"
          onClick={(e) => {
            modifyAmount("add");
          }}
          className="button addButton"
        >
          Add
        </button>
        <button
          type="submit"
          onClick={(e) => {
            modifyAmount("withdraw");
          }}
          className="button withdrawButton"
        >
          Withdraw
        </button>
      </span>
    </form>
  );
};

export default ModifyAmountForm;
