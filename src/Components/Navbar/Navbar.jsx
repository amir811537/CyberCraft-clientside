/* eslint-disable react/no-unescaped-entities */
import { RiMenu3Line } from "react-icons/ri";
const Navbar = () => {

    const search_bar =<>

<div className="bg-gray-200 rounded">
            <input type="text" className="h-[44px] w-[457px] pr-8 pl-5 rounded z-0 focus:shadow text-black focus:outline-none" placeholder="Search"/>

</div>

</>

    return (
        <div className="navbar flex items-center  md:justify-between p-8 h-[76px] w-[1280px] mx-auto bg-[#3366cc]">
        <div className="flex justify-between items-center">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <RiMenu3Line className="text-white text-2xl" />
                        </label>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box text-black lg:text-white w-52">
             {
                search_bar
             }
            </ul>
          </div>


<h2 className="text-white text-3xl font-bold">DEMO LOGO</h2>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 text-black lg:text-white">
            {
                search_bar
            }
          </ul>
        </div>

      </div>
    );
};

export default Navbar;