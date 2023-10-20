import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Profile = () => {
    const [fullName, setFullName] = useState('');
    const [dairyCode, setDairyCode] = useState('');
    const [email, setEmail] = useState('');
    const [contact, setContact] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [userRole, setUserRole] = useState('');
    const [loading, setLoading] = useState(false);
    const [isEditable, setIsEditable] = useState(false);

    useEffect(() => {
        // Fetch user details from the API
        const fetchUserDetails = async () => {
            const dairyCode = 1232; // Replace with the actual dairy code
            const userId = '6531472ec0ce273c0ce3d2f2'; // Replace with the actual user ID

            try {
                setLoading(true);
                const response = await axios.get(`/Getuser/${dairyCode}/${userId}`);
                const userData = response.data;
                setFullName(userData.name);
                setDairyCode(userData.dairyCode);
                setEmail(userData.email);
                setContact(userData.contact);
                setAddress(userData.address);
                setUserRole(userData.role);

                setLoading(false);
            } catch (error) {
                console.error(error);
                setLoading(false);
            }
        };

        fetchUserDetails();
    }, []);

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        const userData = {
            name: fullName,
            dairyCode: dairyCode,
            email: email,
            contact: contact,
            address: address,
            city: address,
            role: userRole,
        };

        try {
            const response = await axios.put(`/users/${dairyCode}`, userData);
            if (response.data.success) {
                console.log('User data updated successfully');
                setIsEditable(false); // Disable editing after updating
            } else {
                console.error('Failed to update user data');
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
                                <h6 className="text-blueGray-700 text-xl font-bold">Profile</h6>
                                <button
                                    onClick={() => setIsEditable(!isEditable)}
                                    className="text-blue-500 font-semibold"
                                >
                                    {isEditable ? 'Cancel' : 'Edit Profile'}
                                </button>
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
                                                className={`border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 ${isEditable ? '' : 'bg-gray-200'}`}
                                                value={fullName}
                                                onChange={(e) => setFullName(e.target.value)}
                                                placeholder="Full Name"
                                                readOnly={!isEditable}
                                            />
                                        </div>
                                    </div>
                                    <div className="w-full lg:w-6/12 px-4">
                                        <div className="relative w-full mb-3">
                                            <label htmlFor="DairyCode" className="block uppercase text-blueGray-600 text-xs font-bold mb-2">DairyCode</label>
                                            <input
                                                type="number"
                                                id="DairyCode"
                                                className={`border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 ${isEditable ? '' : 'bg-gray-200'}`}
                                                value={dairyCode}
                                                onChange={(e) => setDairyCode(e.target.value)}
                                                placeholder="DairyCode"
                                                readOnly={!isEditable}
                                            />
                                        </div>
                                    </div>
                                    <div className="w-full lg:w-6/12 px-4">
                                        <div className="relative w-full mb-3">
                                            <label htmlFor="email" className="block uppercase text-blueGray-600 text-xs font-bold mb-2">Email address</label>
                                            <input
                                                type="email"
                                                id="email"
                                                className={`border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 ${isEditable ? '' : 'bg-gray-200'}`}
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                placeholder="Email address"
                                                readOnly={!isEditable}
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
                                                className={`border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 ${isEditable ? '' : 'bg-gray-200'}`}
                                                value={contact}
                                                onChange={(e) => setContact(e.target.value)}
                                                placeholder="Contact"
                                                readOnly={!isEditable}
                                            />
                                        </div>
                                    </div>
                                    <div className="w-full lg:w-12/12 px-4">
                                        <div className="relative w-full mb-3">
                                            <label htmlFor="address" className="block uppercase text-blueGray-600 text-xs font-bold mb-2">Address</label>
                                            <input
                                                type="text"
                                                id="address"
                                                className={`border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 ${isEditable ? '' : 'bg-gray-200'}`}
                                                value={address}
                                                onChange={(e) => setAddress(e.target.value)}
                                                placeholder="Address"
                                                readOnly={!isEditable}
                                            />
                                        </div>
                                    </div>
                                    <div className="w-full lg:w-4/12 px-4">
                                        <div className="relative w-full mb-3">
                                            <label htmlFor="city" className="block uppercase text-blueGray-600 text-xs font-bold mb-2">City</label>
                                            <input
                                                type="text"
                                                id="city"
                                                className={`border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 ${isEditable ? '' : 'bg-gray-200'}`}
                                                value={address}
                                                onChange={(e) => setAddress(e.target.value)}
                                                placeholder="City"
                                                readOnly={!isEditable}
                                            />
                                        </div>
                                    </div>
                                    <div className="md:col-span-2">
                                        <label htmlFor="userRole">Select User Role</label>
                                        <div className="h-10 bg-gray-50 flex border border-gray-200 rounded items-center mt-1">
                                            <select
                                                name="userRole"
                                                id="userRole"
                                                className={`px-4 appearance-none outline-none text-gray-800 w-full bg-transparent ${isEditable ? '' : 'bg-gray-200'}`}
                                                value={userRole}
                                                onChange={(e) => setUserRole(e.target.value)}
                                                disabled
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
                                {isEditable && (
                                    <button
                                        type="submit"
                                        onClick={handleFormSubmit}
                                        className="mt-4 bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                                    >
                                        Update Profile
                                    </button>
                                )}
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Profile;
