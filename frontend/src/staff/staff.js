import React, { useState } from "react"
import Base from "../core/Base"
import { Link } from "react-router-dom";

import M from 'materialize-css'
import { AddLead } from "./helper/staffapicall";
import { isAutheticated } from "../auth/helper";
import Table from "./table";


const Staff = () =>{
 
   
  const {user , token} = isAutheticated()

  const [values , setValues] = useState({
     
    name:"",
    email:"",
    error:""   
});

const { name , email , error } = values


const refreshPage = () =>{
  window.location.reload(false);
}

const onSubmit = event =>{
  event.preventDefault();
  setValues({  ...values , error:"" , loading:true});
  AddLead(user._id, token, {name ,email})
  .then( data =>{
    console.log(data)
    if(data.errors){  
      
      M.toast({html: data.errors,classes:"#c62828 red darken-3"}) 
      setValues({ ...values , error:data.error}); 
    }else{
      refreshPage()
      M.toast({html: "Added Succesfully ",classes:"#43a047 green darken-1"})
      setValues({
        ...values,
       name:"",
       email:"",
     
       
      });
    }
  });
 
};

const handleChange = name => event =>{
  setValues({...values, error:false , [name]:event.target.value });
  };

  const addForm = () =>{

      return(         
      <div className="row mt-4">
      <div className="col-lg">       
          
           <h5 className="mt-4">Name:</h5> 
            <input className="form-control" rows="50" cols="25"
            placeholder="Enter Name"
            onChange={handleChange("name")}
            value={name}
             ></input>
           
      </div>
        <div className="col-lg">
        <h5 className="mt-4">Email:</h5> 
        <input className="form-control" rows="50" cols="25"
         placeholder="Enter Email"
         onChange={handleChange("email")}
            value={email}
        ></input>

        </div>

      

        <div className=" col-lg ">
        <button type="button"  onClick={onSubmit} class="btn btn-primary btn-rounded  button-style" >Add</button>
        </div>

      </div>
      )
  }



    return(
        <Base>
    <h3 className="text-center mb-4">Welcome ,{user.name} </h3>

        {addForm()}
                <hr className="mt-4 mb-4"/>
       <Table/>
                  
        </Base>
    )
}
export default Staff;