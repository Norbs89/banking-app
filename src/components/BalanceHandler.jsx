import React from "react";

class BalanceHandler extends React.Component {
  state = { currentBalance: "0.00", currency: "£" };
  render() {
    const { currency, currentBalance } = this.state;
    return (
      <div>
        Current Balance: {currency}
        {currentBalance}
      </div>
    );
  }
}

export default BalanceHandler;
