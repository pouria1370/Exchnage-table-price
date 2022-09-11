import { makeStyles } from '@material-ui/styles'
import axios from 'axios';
import React from 'react'
import CryptoContext, { CryptoState } from '../../CryptoContext';
import {TrendingCoins} from '../../config/api'
import { useState,useEffect } from 'react';
import AliceCarousel from 'react-alice-carousel';
import { Link } from 'react-router-dom';
const useStyles=makeStyles((theme)=>({
    Carousel:{
        height:"50%" ,
        display:"flex" ,
        alignItems:"center",
    },
    CarouselItem:{
        display:'flex' ,
        flexDirection:"column",
        alignItems:"center",
        cursor:"pointer",
        textTransform:"uppercase",
        color:"white" ,
        textDecoration:"none",
        fontSize:'12px'
        
    }
}))
export function numberWithCommas(x) 
{
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",")
}
const Carousel = () => {
    const[trending,setTrending]=useState([])
    const Classes=useStyles();
    const {currency,symbol}=CryptoState()
    const fetchTrendingCoins=async ()=>{
      const {data}=await  axios.get(TrendingCoins(currency))
    setTrending(data)
    };
    console.log(trending)
    useEffect(() => { fetchTrendingCoins();
    }, [currency])
    const responsive={
        0:{
            items:2
        },
        512:{
            items:4
        },
        900:{
            items:5
        }
    }

    const items=trending.map((coin)=>{
        let profit=coin.price_change_percentage_24h>=0;
        return(
            <Link
            className={Classes.CarouselItem}
            to={`/coins/${coin.id}`}>
            <img src={coin.image}
            alt={coin.name}
            height="70"
            
            style={{marginBottom:10}}/>
            <span>{coin.symbol} 
            &nbsp;
            <span style={{
                color:profit>0 ?"rgb(14,203,129)":"red",
                fontWeight:500
            }}>
            {profit && "+" }{coin?.price_change_percentage_24h?.toFixed(2)}%
            </span>
            </span>
            <span style={{fontSize:13,fontWeight:500}}>
            {symbol} {numberWithCommas(coin?.current_price.toFixed(3))}
            </span>
            </Link>
        ) 
    })
  return (
    <div className={Classes.Carousel}>
    <AliceCarousel
    mouseTracking
    infinite
    autoPlayInterval={1000}
    animationDuration={1500}
    disableDotsControls
    disableButtonsControls
    responsive={responsive }
    autoPlay
    items={items}
    />
    </div>
  )
}

export default Carousel