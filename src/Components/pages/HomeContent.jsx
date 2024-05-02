
import { IoMdPerson } from "react-icons/io";
import { MdEmail } from "react-icons/md";
import img from '../../assets/Screenshot_5.png';
import { FaPhoneAlt } from "react-icons/fa";
import { useForm } from "react-hook-form";
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from "react-router-dom";

const HomeContent = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
const navigate =useNavigate()
    const onSubmit = async (data) => {
        try {
            const response = await axios.post('http://localhost:5000/user', data);
            if(response.data.insertedId){
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Your work has been saved",
                    showConfirmButton: false,
                    timer: 1500
                });
                // Reset & navigate the form after successful submission
                reset();
                navigate('/dashboard')
                
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Something went wrong!",
                    footer: '<a href="#">Why do I have this issue?</a>'
                });
            }
            // Log the response from the backend
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="gap-32 flex justify-between items-center">
            <div className="w-full mx-auto">
                <form onSubmit={handleSubmit(onSubmit)} className="bg-white px-8 pt-6 pb-8 mb-4">
                    <h1 className="text-left text-5xl font-semibold text-gray-600 mb-4">Contact us</h1>
                    <div className="mb-4">
                        <div className="flex items-center border-2 py-2 px-3 rounded-full bg-gray-100 mb-4">
                            <IoMdPerson className="text-2xl text-gray-600" />
                            <input {...register("name", { required: true })} className="pl-2 bg-gray-100 border-none w-full" name="name" type="text" placeholder="Name" />
                        </div>
                        {errors.name && <p className="text-red-500">Name is required</p>}
                        <div className="flex items-center border-2 py-2 px-3 rounded-full bg-gray-100 mb-4">
                            <MdEmail className="text-2xl text-gray-600" />
                            <input {...register("email", { required: true })} className="pl-2 bg-gray-100 border-none w-full" name="email" type="email" placeholder="Email" />
                        </div>
                        {errors.email && <p className="text-red-500">Email is required</p>}
                        <div className="flex items-center border-2 py-2 px-3 rounded-full bg-gray-100 mb-4">
                            <FaPhoneAlt className="text-2xl text-gray-600" />
                            <input {...register("number", { required: true })} className="pl-2 bg-gray-100 border-none w-full" type="number" name="number" placeholder="Number" />
                        </div>
                        {errors.number && <p className="text-red-500">Phone number is required</p>}
                        <textarea
                            rows="5"
                            {...register("message", { required: true })}
                            className="resize-none w-full bg-gray-200 text-gray-700 border border-gray-200 rounded-3xl py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            placeholder="Message"
                        ></textarea>
                        {errors.message && <p className="text-red-500">Message is required</p>}
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-[#3366CC] text-white py-2 rounded-full text-lg tracking-wide transition duration-1000"
                    >
                        Send Message
                    </button>
                </form>
            </div>
            <div className="w-full mx-auto">
                <img src={img} alt="" />
            </div>
        </div>
    );
};

export default HomeContent;
