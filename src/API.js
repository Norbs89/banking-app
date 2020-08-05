import axios from "axios";

const GetUSD = () => {
  return axios.get(
    "https://api.exchangeratesapi.io/latest?base=GBP&symbols=USD"
  );
};

const GetGBP = () => {
  return axios.get(
    "https://api.exchangeratesapi.io/latest?base=USD&symbols=GBP"
  );
};

export { GetUSD, GetGBP };
