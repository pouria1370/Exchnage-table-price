import { makeStyles } from "@material-ui/core";
import React from "react";

const SelectButton = ({ children, selected, onClick }) => {
  const useStyles = makeStyles(() => ({
    selectButton: {
        border: "1px solid gold",
        borderRadius: 5,
        padding: 10,
        paddingLeft: 20,
        paddingRight: 20,
  
        cursor: "pointer",
        backgroundColor: selected ? "gold" : " ",
        color: selected ? "black" : "",
        fontWeight: selected ? 700 : 500,
        "&:hover": {
          backgroundColor: "gold",
          color: "black",
        },
        
      },
  }));
  const Classes = useStyles();
  return (
    <span onClick={onClick} className={Classes.selectButton}>
      {children}
    </span>
  );
};

export default SelectButton;
