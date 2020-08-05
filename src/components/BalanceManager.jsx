import React from "react";
import QuickAddButton from "./QuckAddButton";
import ModifyAmountForm from "./ModifyAmountForm";

class BalanceManager extends React.Component {
  state = {
    currentBalance: "0.00",
    currency: "£",
    quickAddOpt: ["10", "25", "50", "100"],
    modifyValue: "",
    warning: false,
    accountHistory: [],
    historyShown: false,
    buttonText: "Show Account History",
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

  modifyAmount = (name) => {
    const { modifyValue } = this.state;
    if (modifyValue.match(/^\d+(\.\d+)?$/)) {
      if (name === "withdraw") {
        this.addBalance(-Number(modifyValue));
        this.addToHistory("withdraw", Number(modifyValue));
      } else {
        this.addBalance(Number(modifyValue));
        this.addToHistory("add", Number(modifyValue));
      }
      this.setState({ modifyValue: "" });
    } else {
      this.setState({ warning: true });
    }
  };

  showHistory = () => {
    this.setState((currentState) => {
      return { ...currentState, historyShown: !currentState.historyShown };
    });
    this.state.buttonText === "Close Account History"
      ? this.setState({ buttonText: "Show Account History" })
      : this.setState({ buttonText: "Close Account History" });
  };

  addToHistory = (action, number) => {
    action === "withdraw"
      ? this.setState((currentState) => {
          return {
            ...currentState,
            accountHistory: [
              ...currentState.accountHistory,
              `You have withdrawn ${
                this.state.currency + number
              } from your account`,
            ],
          };
        })
      : this.setState((currentState) => {
          return {
            ...currentState,
            accountHistory: [
              ...currentState.accountHistory,
              `You have deposited ${
                this.state.currency + number
              } to your account`,
            ],
          };
        });
  };

  render() {
    const {
      currency,
      currentBalance,
      quickAddOpt,
      modifyValue,
      warning,
      buttonText,
      historyShown,
      accountHistory,
    } = this.state;
    return (
      <div>
        <section className="balanceDisplay">
          Current Balance: {currency}
          {currentBalance}
        </section>
        <section className="quickAdd">
          Choose an amount to deposit:
          {quickAddOpt.map((number) => {
            return (
              <QuickAddButton
                key={number}
                currency={currency}
                addBalance={this.addBalance}
                amount={number}
                addToHistory={this.addToHistory}
              />
            );
          })}
        </section>
        <p>OR</p>
        <section>
          <ModifyAmountForm
            modifyAmount={this.modifyAmount}
            handleInput={this.handleInput}
            value={modifyValue}
            currency={currency}
          />
          {warning && <p>Please enter a valid amount!</p>}
        </section>
        <section>
          <button onClick={this.showHistory}>{buttonText}</button>
          {historyShown &&
            accountHistory.map((entry) => {
              return <p>{entry}</p>;
            })}
        </section>
      </div>
    );
  }
}

export default BalanceManager;
