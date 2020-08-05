import React from "react";

const QuickAddButton = ({ currency, addBalance, amount }) => {
  return (
    <button
      className="addButton"
      onClick={(e) => {
        addBalance(Number(amount));
      }}
    >
      {currency}
      {amount}
    </button>
  );
};

export default QuickAddButton;
