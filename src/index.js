import "./styles.css";

const progress = document.querySelector(".progress");
const coinList = document.querySelector(".coin");

const API_URL = "https://api.coinpaprika.com/v1/tickers";

progress.innerHTML = "Getting coin prices...💰";

//html안에 그려주기
const paintCoin = (coin) => {
  progress.innerHTML = "Bitcoin";
  const {
    rank,
    name,
    quotes: {
      USD: {
        price
      }
    }
  } = coin;
  const h2 = document.createElement("h2");
  h2.innerHTML = `${rank}st.`
  const h3 = document.createElement("h3");
  h3.innerHTML = name
  const h4 = document.createElement("h3");
  h4.innerHTML = price
  const div = document.createElement("div");
  div.append(h2, h3, h4);
  coinList.appendChild(div);
};

//가져온 데이터를 map함수로
const paintCoins = (coins) => {
  coinList.innerHTML = "";
  coins.sort((a, b) => (a.rank < b.rank ? -1 : a.rank > b.rank ? 1 : 0));
  coins.forEach((coin) => paintCoin(coin));
};

//데이터 가져오기
const getPrices = () => {
  fetch(API_URL)
    .then((response) => response.json())
    .then((data) => {
      progress.innerHTML = "";
      paintCoins(data);
    })
    .catch((error) => console.log(error));
};

getPrices();
setInterval(getPrices, 60000);