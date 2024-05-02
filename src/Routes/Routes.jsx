import { createBrowserRouter } from "react-router-dom";
import Mainlayout from "../Layouts/Mainlayout";
import Home from "../Components/pages/Home";
import Dashboard from "../Components/Dashboard/Dashboard";
import DashboardHome from "../Components/Dashboard/DashboardHome";



const router=createBrowserRouter([
    {
        path:'/',
        element:<Mainlayout></Mainlayout>,
        children:[
            {
                path:'/',
                element:<Home></Home>
            }
        ]
    },


    // this is dashboard route ..............
    {
        path:"dashboard",
        element:(
            <Dashboard></Dashboard>
        ),
        children:[

            {
             path:"/dashboard" ,
             element:<DashboardHome></DashboardHome>  
            }
        ]

    }
]);
export default router;