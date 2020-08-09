import { API } from "../../backend";


//Add leads
export const AddLead=( userId , token , lead) =>{
    console.log("LEAD",lead)
    return fetch(`${API}/AddLeads/${userId}` , {
        method:"POST",
        headers:{
            Accept:"Application/json",
            "Content-Type":"application/json",
            Authorization:`Bearer ${token}`
        },
        body:JSON.stringify(lead)

    })
    .then(response =>{
        return response.json()
    })
    .catch(err =>console.log(err))
};



//getAllLead
export const getAllLead = ( userId) => {
    return fetch(`${API}/getLead/${userId}` , {
        method:"GET"
    })
    
    .then( response =>{
         return response.json();
        })
    .catch( err =>console.log(err));
};

//get  a single Lead
export const getSingleLead = (leadId)  => {
    return fetch(`${API}/getaLead/${leadId}` , {
         method:"GET"
    })
    .then(response =>{
        return response.json();
      })
    .catch(err => console.log(err));

};

//useFul update
export const usefulLead=( leadId,  userId , token , lead) =>{
    console.log("LEAD",lead)
    return fetch(`${API}/usefulLead/${leadId}/${userId}` , {
        method:"POST",
        headers:{
            Accept:"Application/json",
            "Content-Type":"application/json",
            Authorization:`Bearer ${token}`
        },
        body:JSON.stringify(lead)

    })
    .then(response =>{
        return response.json()
    })
    .catch(err =>console.log(err))
};


//delete lead
export const deleteLead = ( leadId, userId , token) => {
    return fetch (`${API}/deleteLead/${leadId}/${userId}`,{
        method:"DELETE",
        headers:{
            Accept:"Application/json",
            Authorization:`Bearer ${token}`
        }
   
    })
    .then( response =>{
        return response.json
    })
    .catch( err => console.log( err))
   }

  

  //update Lead
export const updateLead =( leadId, userId , token , lead) =>{
  
    return fetch(`${API}/updateLead/${leadId}/${userId}` ,  {   
        method:"PUT",
        headers:{
            Accept:"Application/json",
            Authorization:`Bearer ${token}`,
            "Content-Type":"application/json"
        },
        body:JSON.stringify(lead)

    })
    .then(response =>{
        return response.json()
    })
    .catch(err =>console.log(err))
};
 

