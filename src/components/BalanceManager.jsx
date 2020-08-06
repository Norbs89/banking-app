import React from "react";
import QuickAddButton from "./QuckAddButton";
import ModifyAmountForm from "./ModifyAmountForm";
import { GetGBP, GetUSD } from "../API";

class BalanceManager extends React.Component {
  state = {
    currentBalance: "0.00",
    currency: "£",
    quickAddOpt: ["10", "25", "50", "100"],
    modifyValue: "",
    warning: false,
    historyShown: false,
    accountHistory: [],
    buttonText: "Show Account History",
    converterText: "GBP to USD",
    gbp: 0,
    usd: 0,
  };

  componentDidMount() {
    GetUSD().then((res) => {
      this.setState({ usd: res.data.rates.USD });
    });
    GetGBP().then((res) => {
      this.setState({ gbp: res.data.rates.GBP });
    });
  }

  convert = () => {
    this.state.currency === "£"
      ? this.setState((currentState) => {
          return {
            ...currentState,
            currentBalance: (
              Number(currentState.currentBalance) * currentState.usd
            ).toFixed(2),
            currency: "$",
            converterText: "USD to GBP",
          };
        })
      : this.setState((currentState) => {
          return {
            ...currentState,
            currentBalance: (
              Number(currentState.currentBalance) * currentState.gbp
            ).toFixed(2),
            currency: "£",
            converterText: "GBP to USD",
          };
        });
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
              `Withdraw: - ${this.state.currency + number}`,
            ],
          };
        })
      : this.setState((currentState) => {
          return {
            ...currentState,
            accountHistory: [
              ...currentState.accountHistory,
              `Deposit: + ${this.state.currency + number}`,
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
      converterText,
    } = this.state;
    return (
      <div className="balanceMainDiv">
        <section className="balanceDisplay">
          Current Balance: {currency}
          {currentBalance}
          <button className="button" onClick={this.convert}>
            {converterText}
          </button>
        </section>
        <section>
          <p>Choose an amount to deposit:</p>
          <div className="buttonRow">
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
          </div>
        </section>
        <p>OR</p>
        <section className="balanceForm">
          <ModifyAmountForm
            modifyAmount={this.modifyAmount}
            handleInput={this.handleInput}
            value={modifyValue}
            currency={currency}
          />
          {warning && <p>Please enter a valid amount!</p>}
        </section>
        <section className="history">
          <button className="button" onClick={this.showHistory}>
            {buttonText}
          </button>
          <div className="historyList">
            {historyShown &&
              (accountHistory.length === 0 ? (
                <p>No transactions to show!</p>
              ) : (
                accountHistory.map((entry) => {
                  return entry.match("Deposit") ? (
                    <p className="deposit">{entry}</p>
                  ) : (
                    <p className="withdraw">{entry}</p>
                  );
                })
              ))}
          </div>
        </section>
      </div>
    );
  }
}

export default BalanceManager;
