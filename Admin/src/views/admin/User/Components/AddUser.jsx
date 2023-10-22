import React, { useState } from "react";
import axios from "axios";

const AddUser = () => {
  const [fullName, setFullName] = useState("");
  const [dairyCode, setDairyCode] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [userRole, setUserRole] = useState("");
  const [errors, setErrors] = useState({});

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
    const validationErrors = {};

    // Validate the input fields
    if (fullName.trim() === "") {
      validationErrors.fullName = "Full Name is required";
    }
    if (dairyCode.trim() === "") {
      validationErrors.dairyCode = "DairyCode is required";
    }
    if (email.trim() === "") {
      validationErrors.email = "Email is required";
    }
    if (contact.trim() === "") {
      validationErrors.contact = "Contact No is required";
    }
    if (address.trim() === "") {
      validationErrors.address = "Address is required";
    }
    if (city.trim() === "") {
      validationErrors.city = "City is required";
    }
    if (userRole === "") {
      validationErrors.userRole = "User Role is required";
    }

    if (Object.keys(validationErrors).length > 0) {
      // If there are validation errors, don't submit the form
      setErrors(validationErrors);
    } else {
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
        const response = await axios.post(
          "http://localhost:5000/user-create",
          userData
        );
        if (response.data.success) {
          setFullName("");
          setDairyCode("");
          setEmail("");
          setAddress("");
          setContact("");
          setUserRole("");
          setErrors({});
          console.log(response.data.message);
        } else {
          console.error(response.data.error);
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div className="">
      <section className="bg-blueGray-50 py-1">
        <div className="mx-auto mt-6 w-full px-4 lg:w-8/12">
          <div className="bg-blueGray-100 relative mb-6 flex w-full min-w-0 flex-col break-words rounded-lg border-0 shadow-lg">
            <div className="mb-0 rounded-t bg-white px-6 py-6">
              <div className="flex justify between text-center">
                <h6 className="text-blueGray-700 text-xl font-bold">
                  Add User
                </h6>
              </div>
            </div>
            <div className="flex-auto px-4 py-10 pt-0 lg:px-10">
              <form>
                <h6 className="text-blueGray-400 mt-3 mb-6 text-sm font-bold uppercase">
                  User Information
                </h6>
                <div className="flex flex-wrap">
                  <div className="w-full px-4 lg:w-6/12">
                    <div className="relative mb-3 w-full">
                      <label
                        htmlFor="full_name"
                        className="text-blueGray-600 mb-2 block text-xs font-bold uppercase"
                      >
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="full_name"
                        className="placeholder-blueGray-300 text-blueGray-600 w-full rounded border-0 bg-white px-3 py-3 text-sm shadow transition-all duration-150 ease-linear focus:outline-none focus:ring"
                        value={fullName}
                        onChange={handleFullNameChange}
                        placeholder="Full Name"
                      />
                      {errors.fullName && (
                        <p className="text-red-500">{errors.fullName}</p>
                      )}
                    </div>
                  </div>
                  <div className="w-full px-4 lg:w-6/12">
                    <div className="relative mb-3 w-full">
                      <label
                        htmlFor="DairyCode"
                        className="text-blueGray-600 mb-2 block text-xs font-bold uppercase"
                      >
                        DairyCode
                      </label>
                      <input
                        type="number"
                        id="DairyCode"
                        className="placeholder-blueGray-300 text-blueGray-600 w-full rounded border-0 bg-white px-3 py-3 text-sm shadow transition-all duration-150 ease-linear focus:outline-none focus:ring"
                        value={dairyCode}
                        onChange={handleDairyCodeChange}
                        placeholder="DairyCode"
                      />
                      {errors.dairyCode && (
                        <p className="text-red-500">{errors.dairyCode}</p>
                      )}
                    </div>
                  </div>
                  <div className="w-full px-4 lg:w-6/12">
                    <div className="relative mb-3 w-full">
                      <label
                        htmlFor="email"
                        className="text-blueGray-600 mb-2 block text-xs font-bold uppercase"
                      >
                        Email address
                      </label>
                      <input
                        type="email"
                        id="email"
                        className="placeholder-blueGray-300 text-blueGray-600 w-full rounded border-0 bg-white px-3 py-3 text-sm shadow transition-all duration-150 ease-linear focus:outline-none focus:ring"
                        value={email}
                        onChange={handleEmailChange}
                        placeholder="Email address"
                      />
                      {errors.email && (
                        <p className="text-red-500">{errors.email}</p>
                      )}
                    </div>
                  </div>
                </div>
                <hr className="border-b-1 border-blueGray-300 mt-6" />
                <h6 className="text-blueGray-400 mt-3 mb-6 text-sm font-bold uppercase">
                  Contact Information
                </h6>
                <div className="flex flex-wrap">
                  <div className="lg:w-12/12 w-full px-4">
                    <div className="relative mb-3 w-full">
                      <label
                        htmlFor="contact"
                        className="text-blueGray-600 mb-2 block text-xs font-bold uppercase"
                      >
                        Contact No
                      </label>
                      <input
                        type="number"
                        id="contact"
                        className="placeholder-blueGray-300 text-blueGray-600 w-full rounded border-0 bg-white px-3 py-3 text-sm shadow transition-all duration-150 ease-linear focus:outline-none focus:ring"
                        value={contact}
                        onChange={handleContactChange}
                        placeholder="Contact"
                      />
                      {errors.contact && (
                        <p className="text-red-500">{errors.contact}</p>
                      )}
                    </div>
                  </div>
                  <div className="lg:w-12/12 w-full px-4">
                    <div className="relative mb-3 w-full">
                      <label
                        htmlFor="address"
                        className="text-blueGray-600 mb-2 block text-xs font-bold uppercase"
                      >
                        Address
                      </label>
                      <input
                        type="text"
                        id="address"
                        className="placeholder-blueGray-300 text-blueGray-600 w-full rounded border-0 bg-white px-3 py-3 text-sm shadow transition-all duration-150 ease-linear focus:outline-none focus:ring"
                        value={address}
                        onChange={handleAddressChange}
                        placeholder="Address"
                      />
                      {errors.address && (
                        <p className="text-red-500">{errors.address}</p>
                      )}
                    </div>
                  </div>
                  <div className="w-full px-4 lg:w-4/12">
                    <div className="relative mb-3 w-full">
                      <label
                        htmlFor="city"
                        className="text-blueGray-600 mb-2 block text-xs font-bold uppercase"
                      >
                        City
                      </label>
                      <input
                        type="text"
                        id="city"
                        className="placeholder-blueGray-300 text-blueGray-600 w-full rounded border-0 bg-white px-3 py-3 text-sm shadow transition-all duration-150 ease-linear focus:outline-none focus:ring"
                        value={city}
                        onChange={handleCityChange}
                        placeholder="City"
                      />
                      {errors.city && (
                        <p className="text-red-500">{errors.city}</p>
                      )}
                    </div>
                  </div>
                  <div className="md:col-span-2">
                    <label htmlFor="userRole">Select User Role</label>
                    <div className="mt-1 flex h-10 items-center rounded border border-gray-200 bg-gray-50">
                      <select
                        name="userRole"
                        id="userRole"
                        className="bg-transparent w-full appearance-none px-4 text-gray-800 outline-none"
                        value={userRole}
                        onChange={(e) => setUserRole(e.target.value)}
                      >
                        <option value="">Select a role</option>
                        <option value="farmer">Farmer</option>
                        <option value="veterinarian">Veterinarian</option>
                      </select>
                      {errors.userRole && (
                        <p className="text-red-500">{errors.userRole}</p>
                      )}
                    </div>
                  </div>
                </div>
                <button
                  type="submit"
                  onClick={handleFormSubmit}
                  className="mt-4 mr-1 mb-1 rounded bg-blue-500 px-6 py-3 text-sm font-bold uppercase text-white shadow outline-none hover:shadow-lg focus:outline-none active:bg-blue-600"
                >
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
