import React, { useEffect, useRef } from "react";
import { useState } from "react";
import TradingViewWidget from "react-tradingview-widget";
import { AdvancedRealTimeChart } from "react-ts-tradingview-widgets";

const TradingChart = ({ symbol, exchange }) => {
  const [tradeSymbol, setTradeSymbol] = useState("ADAUSDT");
  const [Tradeexchange, setTradeExchange] = useState("BINANCE");
  const targetedElement = useRef(null);

//   const responsiveHander = () => {
//     if (window.innerWidth < 900) {
//       targetedElement.current.props.width
//         ? (targetedElement.current.width= 400)
//         : (targetedElement.current.width = 21);
//     }
//   };
//   window.addEventListener("resize", responsiveHander);

  useEffect(() => {
    setTradeExchange(exchange);
    if (symbol === "usdt") {
      setTradeSymbol(symbol + "USD");
      setTradeExchange("COINBASE");
    } else setTradeSymbol(symbol + "USDT");
  }, [tradeSymbol]);
  return (
    <TradingViewWidget
      allow_symbol_change={false}
      ref={targetedElement}
      symbol={`${Tradeexchange}:${tradeSymbol}`}
      autosize
    />
  );
};
export default TradingChart;
