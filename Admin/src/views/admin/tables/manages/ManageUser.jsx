import React, { useState, useEffect } from "react";
import axios from "axios";

export default function ManageUser(props) {
  const { userData } = props;

  const [fetchUserData, setFetchUserData] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // Initialize state for input fields
  const [fullName, setFullName] = useState("");
  const [dairyCode, setDairyCode] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [address, setAddress] = useState("");

  const [userRole, setUserRole] = useState("");

  const [validationErrors, setValidationErrors] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `/Getuser/${userData.dairyCode}/${userData._id}`
        );
        const data = response.data;
        setFetchUserData(data);
        // Initialize state with user data
        setFullName(data.name);
        setDairyCode(data.dairyCode);
        setEmail(data.email);
        setContact(data.contact);
        setAddress(data.address);

        setUserRole(data.role);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [userData]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const validate = () => {
    const errors = {};

    if (!fullName || fullName.length < 3) {
      errors.fullName = "Name must be at least 3 characters.";
    }

    if (!dairyCode || isNaN(dairyCode)) {
      errors.dairyCode = "DairyCode must be number.";
    }

    if (!email) {
      errors.email = "Invalid email address.";
    }

    if (!contact || isNaN(contact) || contact.length !== 10) {
      errors.contact = "Contact must be a 10-digit number.";
    }

    if (!address || address.length < 5) {
      errors.address = "Address must be at least 5 characters.";
    }

    if (!userRole) {
      errors.userRole = "Please select a user role.";
    }

    setValidationErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const handleUpdateUser = async (e) => {
    e.preventDefault();
    const isValid = validate();

    if (isValid) {
      // Display a confirmation dialog
      const confirmUpdate = window.confirm(
        "Are you sure you want to update this user?"
      );

      if (confirmUpdate) {
        const updatedUser = {
          name: fullName,
          dairyCode,
          email,
          contact,
          address,
          role: userRole,
        };

        try {
          const response = await axios.put(
            `/users/${fetchUserData._id}`,
            updatedUser
          );
          if (response.data.success) {
            // Handle the success case
            console.log("User updated successfully");
            alert("User updated successfully");
            setIsEditing(false);
            closeModal();
          } else {
            // Handle the error case
            console.error("Failed to update user");
          }
        } catch (error) {
          console.error("Error while updating user", error);
        }
      } else {
        // User canceled the update
        console.log("User canceled the update");
      }
    }
  };

  const handleDeleteUser = async (e) => {
    e.preventDefault();

    // Display a confirmation dialog
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );

    if (confirmDelete) {
      try {
        const response = await axios.delete(
          `/delete-user/${fetchUserData._id}`
        );
        if (response.data.success) {
          // Handle the success case, e.g., show a success message or remove the user from the UI.
          console.log("User deleted successfully");
          alert("User Deleted Successfully");
          setIsEditing(false);
          closeModal();
        } else {
          // Handle the error case.
          console.error("Failed to delete user");
        }
      } catch (error) {
        console.error("Error while deleting user", error);
      }
    } else {
      // User canceled the deletion
      console.log("User canceled the deletion");
      setIsEditing(false);
    }
  };

  return (
    <>
      <div>
        <button
          onClick={openModal}
          className="mr-3 rounded-md bg-blue-500 px-2 py-2 text-white"
        >
          Manage
        </button>
        {isModalOpen && (
          <div className="fixed inset-0 z-10 mt-2 flex items-center justify-center overflow-y-auto overflow-x-hidden outline-none focus:outline-none">
            <div className="relative mx-auto my-6 w-auto max-w-3xl">
              {/* Modal content */}
              <div className="relative mt-72 flex w-full flex-col rounded-lg border-0 bg-white shadow-lg outline-none focus:outline-none">
                <div className="border-blueGray-200 flex items-start justify-between rounded-t border-b border-solid p-5">
                  <h3 className="text-3xl font-semibold">Edit User</h3>
                  <button
                    className="text-black float-right ml-auto border-0 p-1 text-3xl font-semibold leading-none outline-none focus:outline-none"
                    onClick={closeModal}
                  >
                    ×
                  </button>
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
                          {isEditing ? (
                            <>
                              <input
                                type="text"
                                id="full_name"
                                className={`placeholder-blueGray-300 text-blueGray-600 w-full rounded border-0 bg-white px-3 py-3 text-sm shadow transition-all duration-150 ease-linear focus:outline-none focus:ring ${
                                  validationErrors.fullName
                                    ? "border-red-500"
                                    : ""
                                }`}
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                placeholder="Full Name"
                              />
                              {validationErrors.fullName && (
                                <span className="text-red-500">
                                  {validationErrors.fullName}
                                </span>
                              )}
                            </>
                          ) : (
                            <span>{fetchUserData.name}</span>
                          )}
                          <button
                            type="button"
                            className="ml-2 text-sm text-blue-500"
                            onClick={() => setIsEditing(!isEditing)}
                          >
                            {isEditing ? "Save" : "Edit"}
                          </button>
                        </div>
                      </div>
                      {/* Other input fields */}
                      <div className="w-full px-4 lg:w-6/12">
                        <div className="relative mb-3 w-full">
                          <label
                            htmlFor="DairyCode"
                            className="text-blueGray-600 mb-2 block text-xs font-bold uppercase"
                          >
                            DairyCode
                          </label>
                          {isEditing ? (
                            <>
                              <input
                                type="number"
                                id="DairyCode"
                                className={`placeholder-blueGray-300 text-blueGray-600 w-full rounded border-0 bg-white px-3 py-3 text-sm shadow transition-all duration-150 ease-linear focus:outline-none focus:ring ${
                                  validationErrors.dairyCode
                                    ? "border-red-500"
                                    : ""
                                }`}
                                value={dairyCode}
                                onChange={(e) => setDairyCode(e.target.value)}
                                placeholder="DairyCode"
                              />
                              {validationErrors.dairyCode && (
                                <span className="text-red-500">
                                  {validationErrors.dairyCode}
                                </span>
                              )}
                            </>
                          ) : (
                            <span>{fetchUserData.dairyCode}</span>
                          )}
                          <button
                            type="button"
                            className="ml-2 text-sm text-blue-500"
                            onClick={() => setIsEditing(!isEditing)}
                          >
                            {isEditing ? "Save" : "Edit"}
                          </button>
                        </div>
                      </div>

                      {/* Email field */}
                      <div className="w-full px-4 lg:w-6/12">
                        <div className="relative mb-3 w-full">
                          <label
                            htmlFor="email"
                            className="text-blueGray-600 mb-2 block text-xs font-bold uppercase"
                          >
                            Email address
                          </label>
                          {isEditing ? (
                            <>
                              <input
                                type="email"
                                id="email"
                                className={`placeholder-blueGray-300 text-blueGray-600 w-full rounded border-0 bg-white px-3 py-3 text-sm shadow transition-all duration-150 ease-linear focus:outline-none focus:ring ${
                                  validationErrors.email ? "border-red-500" : ""
                                }`}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Email address"
                              />
                              {validationErrors.email && (
                                <span className="text-red-500">
                                  {validationErrors.email}
                                </span>
                              )}
                            </>
                          ) : (
                            <span>{fetchUserData.email}</span>
                          )}
                          <button
                            type="button"
                            className="ml-2 text-sm text-blue-500"
                            onClick={() => setIsEditing(!isEditing)}
                          >
                            {isEditing ? "Save" : "Edit"}
                          </button>
                        </div>
                      </div>

                      {/* Contact field */}
                      <div className="w-full px-4 lg:w-6/12">
                        <div className="relative mb-3 w-full">
                          <label
                            htmlFor="contact"
                            className="text-blueGray-600 mb-2 block text-xs font-bold uppercase"
                          >
                            Contact No
                          </label>
                          {isEditing ? (
                            <>
                              <input
                                type="number"
                                id="contact"
                                className={`placeholder-blueGray-300 text-blueGray-600 w-full rounded border-0 bg-white px-3 py-3 text-sm shadow transition-all duration-150 ease-linear focus:outline-none focus:ring ${
                                  validationErrors.contact
                                    ? "border-red-500"
                                    : ""
                                }`}
                                value={contact}
                                onChange={(e) => setContact(e.target.value)}
                                placeholder="Contact"
                              />
                              {validationErrors.contact && (
                                <span className="text-red-500">
                                  {validationErrors.contact}
                                </span>
                              )}
                            </>
                          ) : (
                            <span>{fetchUserData.contact}</span>
                          )}
                          <button
                            type="button"
                            className="ml-2 text-sm text-blue-500"
                            onClick={() => setIsEditing(!isEditing)}
                          >
                            {isEditing ? "Save" : "Edit"}
                          </button>
                        </div>
                      </div>

                      {/* Address field */}
                      <div className="w-full px-4 lg:w-6/12">
                        <div className="relative mb-3 w-full">
                          <label
                            htmlFor="address"
                            className="text-blueGray-600 mb-2 block text-xs font-bold uppercase"
                          >
                            Address
                          </label>
                          {isEditing ? (
                            <>
                              <input
                                type="text"
                                id="address"
                                className={`placeholder-blueGray-300 text-blueGray-600 w-full rounded border-0 bg-white px-3 py-3 text-sm shadow transition-all duration-150 ease-linear focus:outline-none focus:ring ${
                                  validationErrors.address
                                    ? "border-red-500"
                                    : ""
                                }`}
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                placeholder="Address"
                              />
                              {validationErrors.address && (
                                <span className="text-red-500">
                                  {validationErrors.address}
                                </span>
                              )}
                            </>
                          ) : (
                            <span>{fetchUserData.address}</span>
                          )}
                          <button
                            type="button"
                            className="ml-2 text-sm text-blue-500"
                            onClick={() => setIsEditing(!isEditing)}
                          >
                            {isEditing ? "Save" : "Edit"}
                          </button>
                        </div>
                      </div>

                      {/* User Role select field */}
                      <div className="md:col-span-2">
                        <label htmlFor="userRole">User Role</label>
                        {isEditing ? (
                          <>
                            <div className="mt-1 flex h-10 items-center rounded border border-gray-200 bg-gray-50">
                              <select
                                name="userRole"
                                id="userRole"
                                className={`bg-transparent w-full appearance-none px-4 text-gray-800 outline-none ${
                                  validationErrors.userRole
                                    ? "border-red-500"
                                    : ""
                                }`}
                                value={userRole}
                                onChange={(e) => setUserRole(e.target.value)}
                              >
                                <option value="">Select a role</option>
                                <option value="farmer">Farmer</option>
                                <option value="veterinarian">
                                  Veterinarian
                                </option>
                              </select>
                            </div>
                            {validationErrors.userRole && (
                              <span className="text-red-500">
                                {validationErrors.userRole}
                              </span>
                            )}
                          </>
                        ) : (
                          <span> : {fetchUserData.role}</span>
                        )}
                        <button
                          type="button"
                          className="ml-2 text-sm text-blue-500"
                          onClick={() => setIsEditing(!isEditing)}
                        >
                          {isEditing ? "Save" : "Edit"}
                        </button>
                      </div>
                    </div>
                    <hr className="border-b-1 border-blueGray-300 mt-6" />
                    <button
                      type="submit"
                      onClick={handleUpdateUser}
                      className="mt-4 mr-1 mb-1 rounded bg-blue-500 px-6 py-3 text-sm font-bold uppercase text-white shadow outline-none hover:shadow-lg focus:outline-none active:bg-blue-600"
                    >
                      Update User
                    </button>
                    <button
                      onClick={handleDeleteUser}
                      className="mr-1 mb-1 rounded bg-red-500 px-6 py-3 text-sm font-bold uppercase text-white shadow outline-none hover:shadow-lg focus:outline-none active:bg-red-600"
                      type="button"
                    >
                      Delete User
                    </button>
                  </form>
                </div>
                <div className="border-blueGray-200 flex items-center justify-end rounded-b border-t border-solid p-6">
                  <button
                    className="mt-3 mr-1 mb-1 rounded bg-white px-6 py-3 text-sm font-bold uppercase text-gray-900 shadow outline-none hover:shadow-lg focus:outline-none active:bg-gray-100"
                    type="button"
                    onClick={closeModal}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
