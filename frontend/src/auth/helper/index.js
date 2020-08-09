import { API } from "../../backend";



//signup service
export const signup =user =>{
  
     return fetch(`${API}/signup`,{
       method:"POST",
       headers:{
           Accept:"Application/json",
           "Content-Type":"application/json"
       },

        body:JSON.stringify(user)
     })
     .then(response =>{
         return response.json();
     })
     .catch(err => console.log(err)); 
};


//signin service
export const signin =user =>{
    console.log("USER", user)
    return fetch(`${API}/signin`,{
      method:"POST",
      headers:{
          Accept:"Application/json",
          "Content-Type":"application/json"
      },

       body:JSON.stringify(user)
    })
    .then(response =>{
        return response.json();
    })
    .catch(err => console.log(err)); 
};


export const authenticate =(data,next) => {
    if(typeof window !=="undefined"){
        localStorage.setItem("jwt" , JSON.stringify(data))
        console.log("AUTH" ,data)
        next();
    }
};


export const signout =next =>{
    
    if(typeof window !=="undefined"){
        localStorage.removeItem("jwt")
        next();

     return fetch(`${API}/signout`,{
         method:"GET"
     })
    .then(response =>console.log("signout successful"))
    .catch(err=> console.log(err))
    } 
};



export  const isAutheticated = () =>{
    if(typeof window == "undefined"){
        return false;
    }
    if(localStorage.getItem("jwt")){
        return JSON.parse(localStorage.getItem("jwt"));
    }else{
        return false;
    }

};