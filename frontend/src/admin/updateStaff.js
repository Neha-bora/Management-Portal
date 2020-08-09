import React, { useState , useEffect } from "react"
import Base from "../core/Base"
import { Link, Redirect } from "react-router-dom";
import { isAutheticated } from "../auth/helper";
import M from 'materialize-css'
import { updateStaff, getSingleStaff } from "./helper/adminapicall";

const UpdateStaff = ({match}) =>{
 
  const {user , token} = isAutheticated()
  
  const [values , setValues]= useState({
    name:"",
    email:"",
    password:"",
    error:"",
    userType:"staff",
    getaRedirect:false

  });

  const {name ,email, password,userType , getaRedirect}  = values;

  
  const preload = staffId =>{
     console.log("STAFFID" , staffId)
    getSingleStaff(staffId).then(data =>{ 
      console.log("THENDATA" , data)
       if(data.error){       
      console.log("DATA" , data.error)  
         setValues({...values , error:data.error});
        }else{
            setValues({ 
                ...values,    
                name:data.name,
                email:data.email,
                password:data.encry_password,
                        
               });
              
              

              
        }
    });
    }; 

    useEffect( ()=>{
        preload( match.params.staffId); 

     } ,[] )



 
  const onSubmit = event => {
 
    event.preventDefault();
    setValues({...values , error:""})
  
    updateStaff(match.params.staffId, user._id, token, {name,email, password,userType})
    .then( data =>{
      console.log("DATA",data) 
    if(data.errors){
      console.log("ERROR" , data.errors)
      M.toast({html: data.errors,classes:"#c62828 red darken-3"})
    setValues({...values , error:data.errors })
   
    }else{  
    M.toast({html: "updated Succesfully",classes:"#43a047 green darken-1"})
    setValues({  
      ...values,
      name:"",
      email:"",
      password:"",
      getaRedirect:true    

    });
    }
    },()=>console.log("Error in SignUp") )
     
       
}

const performRedirect = ()=>{
  if(getaRedirect){
  
      return <Redirect to="/admin"/>    
  }
 };

 const handleChange = name => event =>{
  setValues({...values, error:false , [name]:event.target.value });
};

  const updateForm = () =>{

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
        <input className="form-control" rows="50" cols="25"
         placeholder="Enter Email"
         onChange={handleChange("email")}
            value={email}
        ></input>

        </div>

        <div className="col-lg">
        <h5 className="mt-4">Password:</h5> 
        <input className="form-control" rows="50" cols="25"
         placeholder="Enter Password" type="password" 
     
         onChange={handleChange("password")}
            value={password}
        ></input>
        </div>

        <div className=" col-lg ">
        <button type="button" onClick={onSubmit} class="btn btn-primary btn-rounded  button-style mr-4" >Update</button>
      
        </div>

      </div>
      )
  }
   
  

    return(
        <Base>
    <h3 className="text-center mb-4">Update Staff </h3>
    <Link type="button" class="btn btn-link mt-2" to="/admin"><i class="fas fa-backward"></i>
        Back  </Link>   
        {updateForm()}
        {performRedirect()}
              
    
                  
        </Base>
    )
}
export default UpdateStaff;