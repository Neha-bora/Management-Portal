import React, { useEffect, useState } from "react"
import { getAllStaff, deleteStaff } from "./helper/adminapicall";
import M from 'materialize-css'
import { isAutheticated } from "../auth/helper";
import { Link } from "react-router-dom";

const Table = () =>{
  const { user , token}  = isAutheticated();

    const [items, setItems] = useState([]);
    const [error, setError] = useState(false);
   
    const loadAllStaff = () => {
      getAllStaff().then((data) => {
        if (data.error) {
          setError(data.error);
        } else {
            setItems(data);
        }
      });
    };
  
    useEffect(() => {
        loadAllStaff  ();
    }, []);
  
    const deleteThisLead= staffId =>{
      // console.log(staffId)
      return(
        deleteStaff(staffId , user._id , token).then(data =>{
              if(data.error ){
                  console.log(data.error);
              }else{
                loadAllStaff();
                  M.toast({html: "Deleted Succesfully",classes:"#43a047 green darken-1"})
                  
              }

          })

      )};
      



  const tableForm = () =>{
    return(
      <table class="table table-bordered  table-hover">
      <thead class="thead-dark">
        <tr>
        <th scope="col">S No. </th>
          <th scope="col">Staff Name</th>
          <th scope="col">Email </th>
          <th scope="col">Password</th>
          <th scope="col">Action</th>

        </tr>
      </thead>
     <tbody>
   
   { items.map( (staff ,index ) =>{
            return(
              <tr key={index}>
              <td>{index+1}</td>
              <td>{staff.name}</td>
                <td>{staff.email}</td>   
                <td>{staff.encry_password.substring(0 ,4)}***</td>
                <td><Link  className="update-icon" type="button" to={`admin/updateStaff/${staff._id}` }> <i class="fas fa-edit fa-2x mr-4 "></i>  </Link>
                <i class="fas fa-trash-alt fa-2x " onClick={ () => { deleteThisLead(staff._id)}}></i> </td>               
                </tr>

            )
        })}

     </tbody>
 
 </table>

    )
  }


    return(
    <div>
        {tableForm()}
    </div>
    )
  }

 export default Table;