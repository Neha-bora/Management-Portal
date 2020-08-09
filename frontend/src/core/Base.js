import React, { Children } from "react";
import Menu from "./Menu";
import Footer from "./Footer";

const Base = ({
  
    className = "p-4 ",
    children 

}) =>(
        <div>
        <Menu/>

           <div className="container">

             

           <div className={className}>{children}</div>

           </div> 
         {/* <Footer/> */}
        </div>
    );


export default Base;