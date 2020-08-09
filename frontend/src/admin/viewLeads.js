import React, { useState, useEffect } from "react"
import Base from "../core/Base"
import { Link } from "react-router-dom"
import { isAutheticated } from "../auth/helper"
import { getUsefulLead} from "./helper/adminapicall"

const Leads = () =>{
  const { user , token}  = isAutheticated();
  const [error, setError] = useState(false);

  const [items, setItems] = useState([]);

  const loadUsefulLead = () => {
    getUsefulLead().then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setItems(data);
      }
    });
  };

  useEffect(() => {
    loadUsefulLead ();
  }, []);
 
    
    
    const formLeads=() =>{
        return(

            <div>
        
            <Link type="button" class="btn btn-link " to="/admin"><i class="fas fa-backward"></i>
            Back  </Link> 
            <h3 className="text-center lead-heading">All Leads</h3>
            
            
            <table class="table table-bordered  table-hover">
            <thead class="thead-dark">
              <tr>
              <th  scope="col">S No.</th>
                <th scope="col">Lead Name</th>
                <th scope="col">Email </th>
                <th scope="col">Added by(staff)</th>
                
      
              </tr>
            </thead>
           <tbody>
            { items.map( (lead , index) =>{
              return(
                <tr key={index}>
             <td>{index+1}</td>   
            <td>{lead.name}</td>
            <td>{lead.email}</td> 
            <td>{lead.staffName}</td>  
                          
            </tr>

              )
            })

           
             
               
            }
                
          </tbody>
       
          </table>

          </div>
            
        )
    }
 

    return(
        <div>
        <Base>
        {formLeads()}
        </Base>
        </div>
    )
}
export default Leads;