import { API } from "../../backend";


//getAllStaff
export const getAllStaff = () => {
    return fetch(`${API}/getStaff` , {
        method:"GET"
    })
    
    .then( response =>{
         return response.json();
        })
    .catch( err =>console.log(err));
};

//getAll useFul leads
export const getUsefulLead = () => {
    return fetch(`${API}/viewLead` , {
        method:"GET"
    })
    
    .then( response =>{
         return response.json();
        })
    .catch( err =>console.log(err));
};

//get  a single staff
export const getSingleStaff = (staffId)  => {
    console.log("GETSTAFF" , staffId)
    return fetch(`${API}/getaStaff/${staffId}` , {
         method:"GET"
        
    })
    .then(response =>{
        return response.json();
      })
    .catch(err => console.log(err));

};


//delete lead
export const deleteStaff = ( staffId, userId , token) => {
    return fetch (`${API}/deleteStaff/${staffId}/${userId}`,{
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

  //update staff
  export const updateStaff =( staffId, userId , token , staff) =>{
  
    return fetch(`${API}/updateStaff/${staffId}/${userId}` ,  {   
        method:"PUT",
        headers:{
            Accept:"Application/json",
            Authorization:`Bearer ${token}`,
            "Content-Type":"application/json"
        },
        body:JSON.stringify(staff)

    })
    .then(response =>{
        return response.json()
    })
    .catch(err =>console.log(err))
};
    