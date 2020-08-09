
import React, { Fragment } from "react";
import "../App.css";
import {Link , withRouter} from "react-router-dom";
import { signout } from "../auth/helper";
import M from 'materialize-css'



const Menu = ({history}) =>(

	<div >
	<nav >
	<div className="nav-wrapper white z-depth-2">
	<label  className="brand-logo left ">Portal</label>
	
	  <ul id="nav-mobile" className="right">
	
	         
	
            <li className="nav-item">
            <button type="button" class="btn btn-outline-danger mr-4"
            onClick = { () =>{
            signout ( ()=>{  
              M.toast({html: "Logout Succesfully",classes:"#43a047 green darken-1"})
              history.push("/")        })
            }}  >
            Signout
            </button>
            </li>
        
		
	  </ul>
	</div>
	</nav>
	</div>

  )



export default withRouter(Menu) ;
