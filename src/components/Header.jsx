import React from "react";
import Banner from "../imgs/banner.png";

// displays a page header

export default function Header() {
  return (
    <>

    <div>
      <img src={Banner} style={{ 
        width: "100%",
        }} alt="banner"></img>
        </div>
    </>
  );
}
