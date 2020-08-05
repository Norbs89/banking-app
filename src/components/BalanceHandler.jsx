import React from "react";
import QuickAddButton from "./QuckAddButton";

class BalanceHandler extends React.Component {
  state = {
    currentBalance: "0.00",
    currency: "£",
    quickAddOpt: ["10", "25", "50", "100"],
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

  render() {
    const { currency, currentBalance, quickAddOpt } = this.state;
    return (
      <div>
        <section>
          Current Balance: {currency}
          {currentBalance}
        </section>
        <section>
          Quick Add:
          {quickAddOpt.map((number) => {
            return (
              <QuickAddButton
                currency={currency}
                addBalance={this.addBalance}
                amount={number}
              />
            );
          })}
        </section>
      </div>
    );
  }
}

export default BalanceHandler;
