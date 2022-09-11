import { makeStyles } from "@material-ui/styles";
import { Container, Typography } from "@material-ui/core";
import img from "../../assets/homepage3-1.jpg";
import React from "react";
import Carousel from "./Carousel";
const useStyles = makeStyles({
  banner: {
    backgroundImage: `url(${img})`,
    backgroundRepeat:"no-repeat",
    backgroundPosition:"center center",
    backgroundSize:"100% " 
  },
  bannerContent: {
    height: 400,
    display: "flex",
    flexDirection: "column",
    paddingTop: 25,
    justifyContent: "space-around",
  },
  tagline:{
    display:'flex' ,
    height:"40%",
    flexDirection:"column",
    justifyContent:"center",
    textAlign:"center",
     
  }
});
function Banner() {
  const Classes = useStyles();
  return (
    <div className={Classes.banner}>
      <Container className={Classes.bannerContent}>
        <div className={Classes.tagline}>
          <Typography
            variant="h2"
            style={{
              fontWeight: "bold",
              marginBottom: 15,
            }}
          >
            Vira Crypto
          </Typography>
          <Typography
            variant="subtitle2"
            style={{ color: "darkgrey", textTransform: "capitalize" }}
          >
               تمام انچه که از دنیای رمز ارزهای دیجیتال میخواهید
          </Typography>
        </div>
        <Carousel/>
      </Container>
    </div>
  );
}

export default Banner;
