import React from "react";
import "./App.css";
import Header from "./components/Header";
import BalanceHandler from "./components/BalanceHandler";

function App() {
  return (
    <div className="App">
      <Header />
      <BalanceHandler />
    </div>
  );
}

export default App;
