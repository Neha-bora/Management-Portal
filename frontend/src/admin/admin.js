import React, { useState , useEffect } from "react"
import Base from "../core/Base"
import { Link } from "react-router-dom";
import { isAutheticated, signup } from "../auth/helper";
import M from 'materialize-css'

import { getAllStaff } from "./helper/adminapicall";
import Table from "./table";


const Admin = () =>{
  // const {user:{name , email } } = isAutheticated();
  
  const [values , setValues]= useState({
    name:"",
    email:"",
    password:"",
    error:"",
    success: false,
    userType:"staff"

  });

  const {name ,email, password,error , success,userType}  = values;

  const handleChange = name => event =>{
    setValues({...values, error:false , [name]:event.target.value });
  };
  const refreshPage = () =>{
    window.location.reload(false);
}

  const onSubmit = event => {
    console.log("in onSubmit")
    event.preventDefault();
    setValues({...values , error:false})
    console.log("userType",userType)
    signup({name,email, password,userType})
    .then( data =>{
      console.log(data) 
    if(data.errors){
      M.toast({html: data.errors,classes:"#c62828 red darken-3"})
    setValues({...values , error:data.errors , success:false})
   
    }else{  
    refreshPage()
    M.toast({html: "Added Succesfully",classes:"#43a047 green darken-1"})
    setValues({
     
      ...values,
      name:"",
      email:"",
      password:"",
      error:"",
      success:true,     

    });
    }
    },()=>console.log("Error in SignUp") )
     
       
}


  const signinForm = () =>{

      return(         
      <div className="row mt-4">
      <div className="col-lg">       
          
           <h5 className="mt-4">Name:</h5> 
            <input  className="form-control" rows="50" cols="25"
            placeholder="Enter Name"
            onChange={handleChange("name")}
            value={name}
             ></input>
           
      </div>
        <div className="col-lg">
        <h5 className="mt-4">Email:</h5> 
        <input  className="form-control" rows="50" cols="25"
         placeholder="Enter Email"
         onChange={handleChange("email")}
            value={email}
        ></input>

        </div>

        <div className="col-lg">
        <h5 className="mt-4">Password:</h5> 
        <input  className="form-control" rows="50" cols="25"
         placeholder="Enter Password" type="password" 
         onChange={handleChange("password")}
            value={password}
        ></input>
        </div>

        <div className=" col-lg ">
        <button type="button" onClick={onSubmit} class="btn btn-primary btn-rounded  button-style mr-4" >Add</button>
      
        <Link type="button"  to="/admin/viewLeads" class="btn btn-outline-secondary view">View leads</Link>
        
        </div>

      </div>
      )
  }
   
  

    return(
        <Base>
    <h3 className="text-center mb-4">Welcome ,Admin </h3>

        {signinForm()}
                <hr/>
     <Table/>
                  
        </Base>
    )
}
export default Admin;