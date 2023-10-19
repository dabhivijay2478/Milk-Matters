import React, { useState } from 'react';
import axios from 'axios';

const AddUser = () => {
    const [fullName, setFullName] = useState('');
    const [dairyCode, setDairyCode] = useState('');
    const [email, setEmail] = useState('');
    const [contact, setContact] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [userRole, setUserRole] = useState('');

    const handleFullNameChange = (e) => {
        setFullName(e.target.value);
    };

    const handleDairyCodeChange = (e) => {
        setDairyCode(e.target.value);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handleContactChange = (e) => {
        setContact(e.target.value);
    };

    const handleAddressChange = (e) => {
        setAddress(e.target.value);
    };

    const handleCityChange = (e) => {
        setCity(e.target.value);
    };


    const handleFormSubmit = async (e) => {
        e.preventDefault();

        // Create an object with the data you want to send
        const userData = {
            dairyCode,
            name: fullName,
            email,
            address,
            contact,
            role: userRole,
            password: contact,
        };

        try {
            const response = await axios.post('http://localhost:5000/user-create', userData);
            if (response.data.success) {
                setFullName('');
                setDairyCode('');
                setEmail('');
                setAddress('');
                setContact('');
                setUserRole('');
                console.log(response.data.message);
            } else {
                console.error(response.data.error);
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="">
            <section className="py-1 bg-blueGray-50">
                <div className="w-full lg:w-8/12 px-4 mx-auto mt-6">
                    <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
                        <div className="rounded-t bg-white mb-0 px-6 py-6">
                            <div className="text-center flex justify-between">
                                <h6 className="text-blueGray-700 text-xl font-bold">Add User</h6>
                            </div>
                        </div>
                        <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                            <form>
                                <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">User Information</h6>
                                <div className="flex flex-wrap">
                                    <div className="w-full lg:w-6/12 px-4">
                                        <div className="relative w-full mb-3">
                                            <label htmlFor="full_name" className="block uppercase text-blueGray-600 text-xs font-bold mb-2">Full Name</label>
                                            <input
                                                type="text"
                                                id="full_name"
                                                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                value={fullName}
                                                onChange={handleFullNameChange}
                                                placeholder="Full Name"
                                            />
                                        </div>
                                    </div>
                                    <div className="w-full lg:w-6/12 px-4">
                                        <div className="relative w-full mb-3">
                                            <label htmlFor="DairyCode" className="block uppercase text-blueGray-600 text-xs font-bold mb-2">DairyCode</label>
                                            <input
                                                type="number"
                                                id="DairyCode"
                                                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                value={dairyCode}
                                                onChange={handleDairyCodeChange}
                                                placeholder="DairyCode"
                                            />
                                        </div>
                                    </div>
                                    <div className="w-full lg:w-6/12 px-4">
                                        <div className="relative w-full mb-3">
                                            <label htmlFor="email" className="block uppercase text-blueGray-600 text-xs font-bold mb-2">Email address</label>
                                            <input
                                                type="email"
                                                id="email"
                                                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                value={email}
                                                onChange={handleEmailChange}
                                                placeholder="Email address"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <hr className="mt-6 border-b-1 border-blueGray-300" />
                                <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">Contact Information</h6>
                                <div className="flex flex-wrap">
                                    <div className="w-full lg:w-12/12 px-4">
                                        <div className="relative w-full mb-3">
                                            <label htmlFor="contact" className="block uppercase text-blueGray-600 text-xs font-bold mb-2">Contact No</label>
                                            <input
                                                type="number"
                                                id="contact"
                                                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                value={contact}
                                                onChange={handleContactChange}
                                                placeholder="Contact"
                                            />
                                        </div>
                                    </div>
                                    <div className="w-full lg:w-12/12 px-4">
                                        <div className="relative w-full mb-3">
                                            <label htmlFor="address" className="block uppercase text-blueGray-600 text-xs font-bold mb-2">Address</label>
                                            <input
                                                type="text"
                                                id="address"
                                                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                value={address}
                                                onChange={handleAddressChange}
                                                placeholder="Address"
                                            />
                                        </div>
                                    </div>
                                    <div className="w-full lg:w-4/12 px-4">
                                        <div className="relative w-full mb-3">
                                            <label htmlFor="city" className="block uppercase text-blueGray-600 text-xs font-bold mb-2">City</label>
                                            <input
                                                type="text"
                                                id="city"
                                                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                value={city}
                                                onChange={handleCityChange}
                                                placeholder="City"
                                            />
                                        </div>
                                    </div>
                                    <div className="md:col-span-2">
                                        <label htmlFor="userRole">Select User Role</label>
                                        <div className="h-10 bg-gray-50 flex border border-gray-200 rounded items-center mt-1">
                                            <select
                                                name="userRole"
                                                id="userRole"
                                                className="px-4 appearance-none outline-none text-gray-800 w-full bg-transparent"
                                                value={userRole}
                                                onChange={(e) => setUserRole(e.target.value)}
                                            >
                                                <option value="">Select a role</option>
                                                <option value="farmer">Farmer</option>

                                                <option value="veterinarian">Veterinarian</option>
                                            </select>
                                            <button
                                                tabIndex="-1"
                                                className="cursor-pointer outline-none focus:outline-none transition-all text-gray-300 hover:text-red-600"
                                            >
                                            </button>
                                            <button
                                                tabIndex="-1"
                                                className="cursor-pointer outline-none focus:outline-none border-l border-gray-200 transition-all text-gray-300 hover:text-blue-600"
                                            >
                                            </button>
                                        </div>
                                    </div>

                                </div>
                                <button type="submit" onClick={handleFormSubmit} className="mt-4 bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1">
                                    Save
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AddUser;
