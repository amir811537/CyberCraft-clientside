/* eslint-disable react/prop-types */
import actionIcon1 from '../../assets/Chat Bubble.png';
import actionIcon2 from '../../assets/Send Email.png';
import actionIcon3 from '../../assets/Delete.png';
import { useEffect, useState } from 'react';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { motion } from 'framer-motion';
import Swal from 'sweetalert2';
import { FaFilePdf } from "react-icons/fa";
import { PDFDownloadLink, Document, Page, Text } from '@react-pdf/renderer';
const DashboardHome = () => {
    const [userInfo, setUserInfo] = useState([]);
    const [pageNumber, setPageNumber] = useState("");
    const paginationVariants = {
        hidden: {
            opacity: 0,
            y: 100,
        },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                stiffness: 260,
                damping: 20,
                duration: 0.5,
            }
        }
    }

   
useEffect(() => {
    axios.get(`http://localhost:5000/user?page=${pageNumber}`)
        .then(response => {
            setUserInfo(response.data);
        })
        .catch(error => {
            console.error('Error fetching team data:', error);
        });
}, [pageNumber]); // Fetch data when page number changes

const handlePageClick = (selectedPage) => {
    setPageNumber(selectedPage.selected + 1); // ReactPaginate uses zero-based index
};
// delete user data 
    const handleDelete = async (_id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await axios.delete(`http://localhost:5000/user/${_id}`);
                    if (response.data.deletedCount > 0) {
                        // User was deleted successfully
                        const updatedUserData = await axios.get('http://localhost:5000/user');
                        setUserInfo(updatedUserData.data);
                        Swal.fire("Deleted!", "The user has been deleted.", "success");
                    }
                } catch (error) {
                    console.error('Error deleting user:', error);
                    Swal.fire("Error!", "Failed to delete the user.", "error");
                }
            }
        });
    }
// copy user data functionality 
    const copyUserDataToClipboard = (user) => {
        const userDataString = `Name: ${user.name}\nPhone Number: ${user.number}\nEmail Address: ${user.email}`;
        navigator.clipboard.writeText(userDataString)
            .then(() => {
                Swal.fire("Copied!", `${user.name} data has been copied to clipboard`, "success");
            })
            .catch((error) => {
                console.error('Error copying user data:', error);
                Swal.fire("Error!", "Failed to copy user data.", "error");
            });
    };



    return (
        <div className='max-w-7xl mx-auto'>
            <div className="flex justify-between items-center">
                <h1 className="text-[32px] text-[#3366CC] font-bold">Contact Management</h1>
                <div className="relative w-[428px]">
                    <input className="w-full py-2 px-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" type="search" placeholder="Search By" />
                    <button className="absolute inset-y-0 right-0 flex items-center px-4 text-gray-700 bg-[#3366CC] border border-gray-300 rounded-r-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                        <svg className="h-5 text-white w-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M14.795 13.408l5.204 5.204a1 1 0 01-1.414 1.414l-5.204-5.204a7.5 7.5 0 111.414-1.414zM8.5 14A5.5 5.5 0 103 8.5 5.506 5.506 0 008.5 14z" />
                        </svg>
                    </button>
                </div>
            </div>

            <div className="overflow-x-auto max-w-5xl mx-auto py-16">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr className='bg-[#3366CC] text-white text-xl'>
                            <th>Name</th>
                            <th>Phone number</th>
                            <th>Email Address</th>
                            <th className='lg:pl-40'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Map over userInfo */}
                        {userInfo.map(user => (
                            <tr className='bg-[#EAEAEA]' key={user._id}>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div>
                                            <div className="font-bold">{user.name}</div>
                                        </div>
                                    </div>
                                </td>
                                <td>{user.number}</td>
                                <td>{user.email}</td>
                                <td className='flex gap-6 items-center'>
                                <button className="btn bg-[#EAEAEA] rounded-full border-black w-fit" onClick={() => copyUserDataToClipboard(user)}>
                            <img src={actionIcon1} alt="chat icon" />
                        </button>                                    <button className="btn bg-[#EAEAEA] rounded-full border-black w-fit">
                                        <a href={`mailto:${user.email}?subject=Your%20Subject&body=Your%20Email%20Body`}>
                                            <img src={actionIcon2} alt="email icon" />
                                        </a>
                                    </button>
                                    <button onClick={() => handleDelete(user._id)} className="btn bg-[#EAEAEA] rounded-full  border-black w-fit"><img src={actionIcon3} alt="chat icon" /></button>
                                    <PDFDownloadLink document={<PdfDocument user={user} />} fileName="user_data.pdf">
                                          <button  className="btn bg-[#EAEAEA] rounded-full border-black w-fit">
                                          <FaFilePdf  className='text-red-400'/>
                                          </button>
                                        </PDFDownloadLink>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Pagination */}
                <motion.div variants={paginationVariants} initial="hidden" animate="visible">
                    <ReactPaginate
                        breakLabel={<span className='mr-4'>...</span>}
                        nextLabel={
                            <span className='w-10 h-10 flex items-center justify-center rounded-md mr-4'>
                                <BsChevronRight />
                            </span>
                        }
                        onPageChange={handlePageClick}
                        pageRangeDisplayed={3}
                        pageCount={10}
                        previousLabel={
                            <span className='w-10 h-10 flex items-center justify-center rounded-md mr-4'>
                                <BsChevronLeft />
                            </span>
                        }
                        containerClassName='flex items-center justify-center mt-8'
                        pageClassName='block  hover:bg-gray-400 border-solid border-gray-400 w-10 h-10 flex justify-center items-center rounded-md mr-4 '
                        activeClassName='bg-purple-600 text-white'
                    />
                </motion.div>
            </div>
        </div>
    );
};
// PDF Document Component
const PdfDocument = ({ user }) => (
    <Document>
        <Page>
            <Text>{`Name: ${user.name}`}</Text>
            <Text>{`Phone Number: ${user.number}`}</Text>
            <Text>{`Email Address: ${user.email}`}</Text>
            <Text>{`User Message: ${user.message}`}</Text>
        </Page>
    </Document>
);

export default DashboardHome;
