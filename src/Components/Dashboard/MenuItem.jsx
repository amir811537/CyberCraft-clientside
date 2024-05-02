import { NavLink } from 'react-router-dom';



// eslint-disable-next-line react/prop-types
const MenuItem = ({ label, address:address, icon: Icon }) => {
  return (
    <NavLink
      to={address}
      end
      className={({ isActive }) =>
        `flex items-center px-4 py-2 my-3 transition-colors duration-300 transform hover:bg-gray-200 hover:text-gray-700 rounded ${
          isActive ? 'bg-gray-200 font-bold rounded text-[#3366CC]' : 'text-black'
        }`
      }
    >
      <Icon className='w-5 text-gray-400 h-5' />
      <span className='mx-4 font-medium'>{label}</span>
    </NavLink>
  );
};

export default MenuItem;
