import React from "react";
import { useState, useEffect } from "react";

function App() {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  const [amount, setAmount] = useState(0);
  const [selectedCoinPrice, setSelectedCoinPrice] = useState(0);

  const onChange = (event) => setAmount(event.target.value);
  const onSelect = (event) => {
    const selectedCoin = coins.find(
      (coin) => coin.symbol === event.target.value
    );
    setSelectedCoinPrice(selectedCoin.quotes.USD.price);
  };

  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers?limit=10")
      .then((response) => response.json())
      .then((json) => {
        setCoins(json);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <h1>The Coins! {loading ? "" : `(${coins.length})`}</h1>
      <span>코인선택 : </span>
      {loading ? (
        <strong>Loading...</strong>
      ) : (
        <select onChange={onSelect}>
          {coins.map((coin) => (
            <option key={coin.id} value={coin.symbol}>
              {coin.name} ({coin.symbol}) : ${coin.quotes.USD.price}
            </option>
          ))}
        </select>
      )}
      <br />
      <span>구매할 금액(USD) : </span>
      <input
        onChange={onChange}
        value={amount}
        type="number"
        placeholder="USD를 입력하세요..."
      />
      <br />
      <span>구매가능 개수 : </span>
      <span>
        {loading
          ? ""
          : `${
              selectedCoinPrice ? amount / selectedCoinPrice : "Select a coin"
            }개`}
      </span>
    </div>
  );
}

export default App;
