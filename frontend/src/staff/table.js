import React, { useState, useEffect } from "react"

import { getAllLead, deleteLead, usefulLead } from "./helper/staffapicall";
import { isAutheticated } from "../auth/helper";
import M from 'materialize-css'
import { Link } from "react-router-dom";



const Table = () =>{
    const { user , token}  = isAutheticated();
    
    const [items, setItems] = useState([]);
    const [error, setError] = useState(false);
   
    const loadAllLead = () => {   
   getAllLead(user._id).then((data) => {
        if (data.error) {
          setError(data.error);
        } else {
            setItems(data);
        }
      });
    };
  
    useEffect(() => {
        loadAllLead  ();
    }, []);
  



    const deleteThisLead= leadId =>{
        console.log(leadId)
        return(
            deleteLead(leadId , user._id , token).then(data =>{
                if(data.error ){
                    console.log(data.error);
                }else{
                    loadAllLead();
                    M.toast({html: "Deleted Succesfully",classes:"#43a047 green darken-1"})
                    
                }

            })

        )};


        const Useful = (leadId) =>{
           return(
            usefulLead( leadId , user._id , token).then( data =>{
                if(data.error){
                    console.log(data.error)
                }else{
                    loadAllLead();
                    M.toast({html: "Transferred Lead Succesfully",classes:"#43a047 green darken-1"})
                }
            }) 
           )
        }
        
    const Form = () => {
        return(
            <table class="table table-bordered  table-hover">
             <thead class="thead-dark"> 
              <tr>
                <th scope="col">S No.</th>
                <th scope="col">Lead Name</th>
                <th scope="col">Email </th>
                <th scope="col">Action</th>
                <th scope="col">Useful/NOT</th>
      
              </tr>
            </thead>
           <tbody>
          
        
        {items.map( ( lead , index) =>{
        return(
            <tr key={index} >
            <td>{index+1}</td>
            <td>{lead.name}</td>
            <td>{lead.email}</td>   
          
           
            <td><Link className="update-icon" type="button" to={`LeadUpdate/${lead._id}`}><i class="fas fa-edit fa-2x mr-2  "></i>  </Link>
            <i class="fas fa-trash-alt fa-2x "   onClick={ () => { deleteThisLead(lead._id)}} ></i> </td> 
           
            <td><i class="far fa-thumbs-up fa-2x mr-4" onClick= { () => {Useful(lead._id)}}></i> 
            <i class="far fa-thumbs-down fa-2x" onClick={ () => { deleteThisLead(lead._id)}}></i></td>
                    
            </tr>

        )
    })}
           
          </tbody>
       
          </table>
        )
    }
    return(
        <div>
        {Form()}
        </div>
    )
}

export default Table;