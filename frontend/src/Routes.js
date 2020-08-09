import React from "react"
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Signin from "./core/signin";
import  "./App.css";
import Admin from "./admin/admin";
import AdminRoute from "./auth/helper/AdminRoute";
import Staff from "./staff/staff";
import StaffRoute from "./auth/helper/StaffRoutes";
import Update from "./staff/update";
import Leads from "./admin/viewLeads";
import UpdateStaff from "./admin/updateStaff";


const Routes = () =>{
    return(
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Signin} />
                <AdminRoute  path="/admin" exact component={Admin} />
                <AdminRoute  path="/admin/viewLeads" exact component={Leads} />
                <AdminRoute  path="/admin/updateStaff/:staffId" exact component={UpdateStaff} />


                <StaffRoute  path="/staff" exact component={Staff} />
                <StaffRoute  path="/LeadUpdate/:leadId" exact component={Update} />



            </Switch>
        </BrowserRouter>
    )
}

export default Routes;