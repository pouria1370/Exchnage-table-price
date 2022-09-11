import { LinearProgress, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CoinInfo } from "../Components/CoinInfo";
import { SingleCoin } from "../config/api";
import { CryptoState } from "../CryptoContext";
import ReactHtmlParser from "react-html-parser";
import { numberWithCommas } from "../Components/Banner/Carousel";
export default function Coinpage() {
  const { id } = useParams();
  const [coin, setCoin] = useState();
  const { currency, symbol } = CryptoState();
  const fetchCoin = async () => {
    const { data } = await axios.get(SingleCoin(id));
    setCoin(data);
  };
  const useStyles = makeStyles((theme) => ({
    container: {
      display: "flex",
      [theme.breakpoints.down("md")]: {
        flexDirection: "column",
        alignItems: "center",
      },
    },
    sideBar: {
      width: "30%",
      [theme.breakpoints.down("md")]: {
        width: "100%",
      },
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      marginTop: 25,
      borderRight: "2px solid grey",
    },
    heading: {
      fontWeight: "bold",
      marginBottom: 20,
    },
    description: {
      padding: 25,
      paddingTop: 0,
      paddingBottom: 15,
      textAlign: "justify",
    },
    marketData:{
      alignSelf:"start",
      padding:10 ,
      paddingTop:10,
      width:'90%' ,
      [theme.breakpoints.down("md")]:{
        display:"flex",
        justifyContent:"space-around"
      },
      [theme.breakpoints.down("sm")]:{
        flexDirection:"column",
        alignItems:"center"
      },
      [theme.breakpoints.down("xs")]:{
        alignItems:"start",
        
      },

    },
    
  }));
  useEffect(() => {
    fetchCoin();
  }, []);
  const Classes = useStyles();
  if(!coin) return <LinearProgress style={{backgroundColor:"gold"}}/>
  return (
    <div className={Classes.container}>
      <div className={Classes.sideBar}>
        <img
          src={coin?.image.large}
          alt={coin?.name}
          height="200"
          style={{ marginBottom: 20 }}
        />
        <Typography variant="h3" className={Classes.heading}>
          {coin?.name}
        </Typography>
        <Typography variant="subtitle1" className={Classes.description}>
          {ReactHtmlParser(coin?.description.en.split(". ")[0])}.
        </Typography>
        <div className={Classes.marketData}>
          <span style={{ display: "flex" }}>
            <Typography variant="h5" className={Classes.heading}>
              رتبه :
            </Typography>
            &nbsp; &nbsp;
            <Typography variant="h5" >
            {coin?.market_cap_rank}
            </Typography>
          </span>
          <span style={{ display: "flex" }}>
            <Typography variant="h5" className={Classes.heading}>
              قیمت  :
            </Typography>
            &nbsp; &nbsp;
            <Typography variant="h5" >
            {numberWithCommas(
              coin?.market_data.current_price[currency.toLowerCase()]
            )}
            </Typography>
          </span>
          <span style={{ display: "flex" }}>
            <Typography variant="h5" className={Classes.heading}>
              حجم بازار :
            </Typography>
            &nbsp; &nbsp;
            <Typography variant="h5" >
            {symbol}{" "}
            {numberWithCommas(
              coin?.market_data.market_cap[currency.toLowerCase()]
              .toString()
              .slice(0,-7)
            )}M
            </Typography>
          </span>
        </div>
      </div>
      
      <CoinInfo coin={coin} />
      
    </div>
  );
}
