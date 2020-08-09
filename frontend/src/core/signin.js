import React , {useState} from "react"

import {signin ,  authenticate , isAutheticated } from "../auth/helper"
import { Redirect } from "react-router-dom"
import M from 'materialize-css'

const Signin = () =>{
  const [ values , setValues] = useState({
 
    email:"",
    password:"",
    error:"",
    loading:false,
    didRedirect:false,
    user:{}

    })
    
 //destructuring
const { email , password , error ,  loading , didRedirect,user} = values;
//const { user } = isAutheticated;

const handleChange = name => event =>{
  setValues({...values, error:false , [name]:event.target.value });
};
 

const onSubmit = event=>{
  event.preventDefault();
  setValues({ ...values , error:false , loading:true});
  signin({email, password})
  
  .then( data =>{
    console.log("DATA",data)
    if(data.errors){ 
      console.log("ERROR" , data.error)
      setValues({ ...values , error:data.errors , loading:false});
    }else{
      M.toast({html: "Login Succesfully",classes:"#43a047 green darken-1"})
      authenticate(data ,()=>{
        setValues({     
          ...values,
          didRedirect:true,
          user:data.user
        });

      });
    }
  })
  .catch(console.log("signin  process failed"));

}; 

const performRedirect = ()=>{

  if(didRedirect){
   
    if(user && user.role == 1){
      return <Redirect to="/staff"/>
    }else{    
       return <Redirect to="/admin"/>
    }
  }

 

};


const errorMessage = ()=>{
  return(

  <div className="row mt-4">
  <div className ="col-md-6 offset-sm-3 text-left"> 
  <div className="alert alert-danger" style={{display: error? "" :"none"}}>
  {error}
  <button type="button" class="close" data-dismiss="alert" aria-label="Close">
  <span aria-hidden="true">&times;</span>
</button>
  </div> 
  </div>
  </div>);

  };


    const signinForm = () =>{
        return(
         
    <div className="card main ">  
      <h3 className="text-center  heading"> Management Portal</h3>   
    <div className="row ">
      <form className="col s12 from1">
    
        <div className="row">
       
          <div className="input-field col s12 ml-4 mr-4">
          <i class="material-icons prefix">email</i>
            <input id="email" type="email"
            onChange={handleChange("email")} value={email} 
          
             className="validate " />
            <label for="email">Email</label>
          </div>
        </div>
  
        <div className="row">
          <div className="input-field col s12  ml-4 mr-4">
          <i class="material-icons prefix">lock</i>
            <input id="password" type="password" 
            onChange={handleChange("password")} value={password} 
            className="validate" />
            <label for="password">Password</label>
          </div>
        </div>
          
         <div className="text-center"> 
         <button class="btn waves-effect waves-light from-siginButton"  onClick={onSubmit} type="submit" >Login</button>
         </div>
      </form>
    </div>
   
    </div>  
        )
    }
    return(
        <div>
        {errorMessage()}
       {signinForm()}
       {performRedirect()}
       </div>
    )
}
export default Signin;