import {
  Container,
  createTheme,
  LinearProgress,
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  ThemeProvider,
  Typography,
} from "@material-ui/core";
import { Pagination } from "@material-ui/lab";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Classnames } from "react-alice-carousel";
import { useHistory } from "react-router-dom";
import { CoinList } from "../config/api";
import { CryptoState } from "../CryptoContext";
import { numberWithCommas } from "./Banner/Carousel";

const Coinstable = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1)
  const history = useHistory();
  const { currency,symbol} = CryptoState();
  const fetchCoins = async () => {
    setLoading(true);
    const { data } = await axios.get(CoinList(currency));
    setCoins(data);
    setLoading(false);
  };
  console.log(coins);
  useEffect(() => {
    fetchCoins();
  }, [currency]);

  const darkTheme = createTheme({
    palette: {
      primary: { main: "#fff" },
      type: "dark",
    },
  });
  const handleSearch = () => {
    return coins.filter(
      (coin) =>
        coin.name.toLowerCase().includes(search) ||
        coin.symbol.toLowerCase().includes(search)
    );
  };
  const useStyles = makeStyles({
    row:{
      backgroundColor:"#16171a",
      cursor:"pointer" ,
      "&:hover":{
        backgroundColor:"#131111"
      },
    },
    pagination:{
      "& .MuiPaginationItem-root":{
        color:"gold",
      },
    }
  });
  const Classes = useStyles();
  return (
    <ThemeProvider theme={darkTheme}>
      <Container style={{ textAlign: "center" }}>
        <Typography variant="h4" style={{ margin: 18 }}>
          قیمت ارزهای دیجیتال بر پایه حجم بازار
        </Typography>
        <TextField
          style={{ marginBottom: 20, width: "100%" }}
          onChange={(e) => setSearch(e.target.value)}
          variant="outlined"
          label="جستجوی ارز دیجیتال"
        />
        <TableContainer>
          {loading ? (
            <LinearProgress style={{ backgroundColor: "gold" }} />
          ) : (
            <Table>
              <TableHead style={{ backgroundColor: "#EEBC1D" }}>
                <TableRow>
                  {["ارز", "قیمت", "تغیرات روزانه", "حجم بازار"].map((head) => (
                    <TableCell
                      style={{ color: "black", fontWeight: "700" }}
                      key={head}
                      align={head === "coin" ? "" : "right"}
                    >
                      {head}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {handleSearch().slice((page-1)*10,(page-1)*10+10).map((row) => {
                  const profit = row.price_change_percentage_24h > 0;
                  return (
                    <TableRow
                      onClick={() => history.push(`/coins/${row.id}`)}
                      className={Classes.row}
                      key={row.name}
                    >
                      <TableCell
                        component="th"
                        scope="row"
                        style={{
                          display: "flex",
                          gap: 15,
                        }}
                      >
                        <img
                          src={row?.image}
                          alt={row.name}
                          height="30"
                          style={{ marginBottom: 10 }}
                        />
                        <div style={{ display: "flex", flexDirection: "column" }}
                          >
                          <span style={{ textTransform: "uppercase", fontSize: 22 }}
                          >
                            {row.symbol}
                          </span>
                          <span style={{ color: "darkgray" }}>{row.name}</span>
                        </div>
                      </TableCell>
                      <TableCell align="right">
                      {symbol}{" "}
                      {numberWithCommas(row.current_price.toFixed(2))}
                      </TableCell>
                      <TableCell
                      align="right"
                      style={{fontWeight:500,color:profit>0?"rgb(14,203,129)":"red"}}     
                      >
                      {profit&&'+'}
                      {row.price_change_percentage_24h.toFixed(2)}%
                      </TableCell>
                      <TableCell
                      align="right"
                      >
                      {symbol}{" "}
                      {numberWithCommas(row.market_cap.toString()).slice(0,-8)}M
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          )}
        </TableContainer>
        <Pagination 
        style={{
          padding:20,
          width:"100%",
          display:'flex',
          justifyContent:"center",
          scrollBehavior:"smooth"
        }}
        classes={{ul:Classes.pagination}}
        count={(handleSearch()?.length/10).toFixed(0)}
        onChange={(_,value)=>{
          setPage(value);
          window.scroll(0,450);
        }}
        />
      </Container>
    </ThemeProvider>
  );
};

export default Coinstable;
