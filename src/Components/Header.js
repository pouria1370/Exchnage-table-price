import React from "react";
import { AppBar, Typography,MenuItem, Toolbar, Container,Select ,createTheme } from "@material-ui/core";
import { makeStyles, ThemeProvider} from "@material-ui/styles";
import { useHistory } from "react-router-dom";
import { CryptoState } from "../CryptoContext";


const useStyles=makeStyles({
    title:{
        flex:1 ,
        color:"gold",
        fontWeight:"bold",
        
        cursor:"pointer" 
    }
})
export default function Header() {
    const Classes=useStyles()
    const history=useHistory();
    const { currency,setCurrency}=CryptoState()
    const darkTheme=createTheme({
        palette:{
            primary:{
                main:"#fff",
            },
            type:'dark',
        }       
    })
 
  return (
    <ThemeProvider theme={darkTheme} >
    <AppBar color="transparent" position="static">
      <Container>
        <Toolbar>
          <Typography variant="h6" onClick={()=>history.push('/')} className={Classes.title}>Vira Crypto</Typography>
          <Select variant="outlined"
          style={{
            width:100,
            height:40,
            marginLeft:15
          }}
          value={currency}
          onChange={(e)=>{setCurrency(e.target.value)}}
          >
            <MenuItem value={'USD'}>USD</MenuItem>
            <MenuItem value={'RIAL'}>RIAL</MenuItem>
          </Select>
        </Toolbar>
      </Container>
    </AppBar>
    </ThemeProvider>
  );
}
