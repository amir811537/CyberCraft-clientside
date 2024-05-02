import { Outlet } from "react-router-dom";
import DashboardSlider from "../Dashboard/DashboardSlider";



const Dashboard = () => {
    return (
        <div className='relative max-h-screen md:flex'>
        {/* Sidebar Component */}
        <div className="">
        <DashboardSlider></DashboardSlider>
        </div>
        <div className='flex-1  md:ml-72'>
          <div className='p-5'>
            {/* Outlet for dynamic contents */}
            <Outlet></Outlet>
          </div>
        </div>
      </div>
    );
};

export default Dashboard;