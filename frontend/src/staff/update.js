import React, { useState, useEffect } from "react"
import Base from "../core/Base"
import { Link, Redirect } from "react-router-dom"
import { isAutheticated } from "../auth/helper"
import { updateLead , getSingleLead } from "./helper/staffapicall"
import M from 'materialize-css'

const Update = ({match}) =>{

    const {user , token} = isAutheticated()
    

  const [values , setValues] = useState({ 

    name:"",
    email:"",
    error:"",   
    getaRedirect:false,
     
  });

  const{name ,email ,getaRedirect } = values;

   
  const preload = leadId =>{

    getSingleLead(leadId).then(data =>{ 
       if(data.error){      
           console.log("ERROR",data.error)
         setValues({...values , error:data.error});
        }else{
            setValues({ 
                ...values,    
                name:data.name,
                email:data.email
               
               });
              
        }
    });
    }; 

    useEffect( ()=>{
        preload( match.params.leadId); 

     } ,[] )


   
  const onSubmit = event =>{
    event.preventDefault();
    setValues({  ...values , error:"" , loading:true});
    updateLead(match.params.leadId, user._id, token, {name , email})     
    .then( data =>{
      console.log(data)
      if(data.errors){
          M.toast({html: data.errors,classes:"#c62828 red darken-3"}) 
       setValues({ ...values , error:data.error});
      }else{
        M.toast({html: "Updated Succesfully",classes:"#43a047 green darken-1"})
        setValues({
          ...values,
         name:"",
         email:"",
        getaRedirect:true
       
         
        });
        console.log("success")
      }
    });
   
  };
  
  
const performRedirect = ()=>{
  if(getaRedirect){
  
      return <Redirect to="/staff"/>    
  }
 };
 
const handleChange = name => event =>{
  setValues({...values, error:false , [name]:event.target.value });
  };

     const updateForm = () =>{
         return(
           
             <div>         
     <div className="row mt-4 updateForm">
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
        <button type="button" onClick={ onSubmit}  class="btn btn-primary btn-rounded  button-update" >Update Confirm</button>
        </div>

      </div>
      </div>
         )
     }

    return(
       
        <Base>
       <Link type="button" class="btn btn-link " to="/staff"><i class="fas fa-backward"></i>
            Back  </Link>
      <h3 className="text-center mb-4">Update Staff </h3>
        {updateForm()}
        {performRedirect()}
     
        </Base>

    )
}
export default Update;