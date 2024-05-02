import { useState } from "react";
import MenuItem from "../Dashboard/MenuItem";
// Icons
import { FaRegWindowClose } from "react-icons/fa";
import logo from "../../assets/Screenshot 2023-12-20 104907 7.png";
import { Link } from "react-router-dom";
import { GrLogout } from 'react-icons/gr';
import { FcHome } from 'react-icons/fc';
import { AiOutlineBars } from 'react-icons/ai';
import { MdEmail } from "react-icons/md";

const Sidebar = () => {
  const [isActive, setActive] = useState(true);

  // Sidebar Responsive Handler
  const handleToggle = () => {
    setActive(!isActive);
  };

  return (
    <>
      {/* Toggle button */}
      <div className="bg-white text-gray-800 flex justify-end">
        <button
          onClick={handleToggle}
          className="mobile-menu-button bg-white p-4 focus:outline-none"
        >
          {isActive ? (
            <AiOutlineBars className="h-7 w-7" />
          ) : (
            <FaRegWindowClose className="h-7 w-7" />
          )}

        </button>
      </div>
      {/* Sidebar */}
      <div
        className={`z-10 fixed flex flex-col justify-between min-h-screen overflow-x-hidden bg-[#E6E6E6] shadow-xl w-80 space-y-6 px-2 py-4 ${isActive ? "" : "-translate-x-full"
          } transition duration-200 ease-in-out`}

      >
        <div>
          {/* Nav Items */}
          <div className="bg-white flex justify-center items-center p-1" >
            <Link to="/">
              <img className="w-44" src={logo} alt="" />
            </Link>
          </div>

          <br />
          <hr />
          <div className='flex flex-col justify-between flex-1'>
            {/* If a user is a host */}
            <nav>
              {/* admin dashboard */}

                  <MenuItem
                    icon={MdEmail}
                    label="Contact Management"
                    address="/dashboard"
                  />

            </nav>
          </div>
        </div>

        <div>
          <hr />
          <MenuItem icon={FcHome} label="Home" address="/" />
          <button
            className="flex w-full items-center px-4 py-2 my-3 text-red-300 hover:bg-gray-200 rounded hover:text-gray-700 transition-colors duration-300 transform"
          >
            <GrLogout className="w-5 h-5" />
            <span className="mx-4 font-medium">Logout</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
