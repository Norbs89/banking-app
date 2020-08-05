import React from "react";
import QuickAddButton from "./QuckAddButton";
import AddAmountForm from "./AddAmountForm";

class BalanceHandler extends React.Component {
  state = {
    currentBalance: "0.00",
    currency: "£",
    quickAddOpt: ["10", "25", "50", "100"],
    addValue: "",
    withdrawValue: "",
    warning: false,
  };

  addBalance = (number) => {
    this.setState((currentState) => {
      return {
        ...currentState,
        currentBalance: (Number(currentState.currentBalance) + number).toFixed(
          2
        ),
      };
    });
  };

  handleInput = (value, name) => {
    this.setState((currentState) => {
      return {
        ...currentState,
        [name]: value,
        warning: false,
      };
    });
  };

  addAmount = (e) => {
    e.preventDefault();
    if (this.state.addValue.match(/^\d+(\.\d+)?$/)) {
      this.addBalance(Number(this.state.addValue));
      this.setState({ addValue: "" });
    } else {
      this.setState({ warning: true });
    }
  };

  render() {
    const {
      currency,
      currentBalance,
      quickAddOpt,
      addValue,
      warning,
    } = this.state;
    return (
      <div>
        <section className="balanceDisplay">
          Current Balance: {currency}
          {currentBalance}
        </section>
        <section className="quickAdd">
          Quick Add:
          {quickAddOpt.map((number) => {
            return (
              <QuickAddButton
                key={number}
                currency={currency}
                addBalance={this.addBalance}
                amount={number}
              />
            );
          })}
        </section>
        <section>
          <AddAmountForm
            addAmount={this.addAmount}
            handleInput={this.handleInput}
            value={addValue}
            warning={warning}
            currency={currency}
          />
        </section>
      </div>
    );
  }
}

export default BalanceHandler;
