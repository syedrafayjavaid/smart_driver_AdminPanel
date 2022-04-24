
import Dashboard from "views/Dashboard.js";

import viewProducts from "components/ItemsViewPage";



import User from "views/User";
import Classes from "views/Classes";
import Assignment from "views/Assignment";
import Posts from "views/Posts";
import Profile from "views/Profile";
import Drivers from "views/Drivers";
import CarOwners from "views/carOwners";









const dashboardRoutes = [



  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "nc-icon nc-tv-2",
    component: Dashboard,
    layout: "/admin",
  },


  {
    path: "/Profile",
    name: "Profile",
    icon: "nc-icon nc-circle-09",
    component: Profile,
    layout: "/admin",
  },

  {
    path: "/Drivers",
    name: "Drivers",
    icon: "nc-icon nc-support-17",
    component: Drivers,
    layout: "/admin",
  },



 
 

  {
    path: "/CarOwners",
    name: "Car Owners",
    icon: "nc-icon nc-delivery-fast",
    component: CarOwners,
    layout: "/admin",
  },




 





  


];

export default dashboardRoutes;
