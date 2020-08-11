import React from "react";

const AccountHistory = ({ accountHistory }) => {
  return accountHistory.map((entry) => {
    return entry.msg.match("Deposit") ? (
      <div className="deposit">
        <p>{entry.msg}</p>
        <p>{entry.date}</p>
      </div>
    ) : (
      <div className="withdraw">
        <p>{entry.msg}</p>
        <p>{entry.date}</p>
      </div>
    );
  });
};

export default AccountHistory;
