import {
  CircularProgress,
  createTheme,
  makeStyles,
  ThemeProvider,
} from "@material-ui/core";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { HistoricalChart } from "../config/api";
import { CryptoState } from "../CryptoContext";
import { chartDays } from "../config/data";
import SelectButton from "./SelectButton";
import TradingChart from "./TradingChart";
export const CoinInfo = ({ coin }) => {
  const [historicalData, setHistoricalData] = useState();
  const [days, setDays] = useState(1);
  const { currency } = CryptoState();
  const fetchHistoicalData = async () => {
    const { data } = await axios.get(HistoricalChart(coin.id, days, currency));
    setHistoricalData(data.prices);
  };
  useEffect(() => {
    fetchHistoicalData();
  }, [currency, days]);

  const darkTheme = createTheme({
    palette: {
      primary: { main: "#fff" },
      type: "dark",
    },
  });

  const useStyles = makeStyles((theme) => ({
    container: {
      width: "75%",
      height:"80vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      marginTop: 25,
      padding: 40,
      [theme.breakpoints.down("md")]: {
        width: "80%",
        marginTop: 0,
        padding: 20,
        paddingTop: 0,
      height:"60vh",

      },
      [theme.breakpoints.down("s")]: {
        width: "100%",
        marginTop: 0,
        padding: 40,
        paddingTop: 0,
      height:"60vh",

      },
      [theme.breakpoints.down("xs")]: {
        width: "80%",
        marginTop: 0,
        padding: 20,
        paddingTop: 0,
      height:"60vh",

      },
    },
    
   
  }));

  const Classes = useStyles();

  return (
    <ThemeProvider theme={darkTheme}>
      <div className={Classes.container}>
        {!historicalData ? (
          <CircularProgress style={{ color: "gold" }} size={250} thickness={1} />
        ) : (
  
          
              <TradingChart symbol={coin.symbol} exchange="BINANCE"/>
          
        )}
      </div>
    </ThemeProvider>
  );
};
