import React from "react";
import "./App.css";
import Header from "./components/Header";
import BalanceManager from "./components/BalanceManager";

function App() {
  return (
    <div className="App">
      <div className="mainContent">
        <Header />
        <BalanceManager />
      </div>
    </div>
  );
}

export default App;
