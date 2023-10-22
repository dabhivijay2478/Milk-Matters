import React, { useState, useEffect } from "react";
import axios from "axios";

export default function ManageOrders(props) {
  const { OrderData } = props;

  const [order, setOrder] = useState(null);
  const [fullName, setFullName] = useState("");
  const [dairyCode, setDairyCode] = useState("");
  const [contact, setContact] = useState("");
  const [address, setAddress] = useState("");
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState("");
  const [quantity, setQuantity] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // Function to fetch order data based on OrderData._id
  const fetchOrderData = async () => {
    try {
      const response = await axios.get(`/orders/${OrderData._id}`);
      const orderData = response.data.order;
      setOrder(orderData);
      setFullName(orderData.name);
      setDairyCode(orderData.dairyCode);
      setContact(orderData.contact);
      setAddress(orderData.address);
      setProducts([orderData.product.attributes.title]);
      setProduct(orderData.product.attributes.title);
      setQuantity(orderData.productQuantity);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (OrderData._id) {
      fetchOrderData();
    }
  }, [OrderData._id]);

  const openModal = () => {
    setIsModalOpen(true);
    setIsEditing(false); // When opening the modal, we are not in edit mode.
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleEditClick = () => {
    setIsEditing(true); // Activate edit mode when the edit button is clicked.
  };

  const updateOrder = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to update this order?"
    );
    if (!confirmed) return;

    try {
      const response = await axios.put(`/orders/${OrderData._id}`, {
        name: fullName,
        dairyCode,
        contact,
        address,
        product: product,
        productQuantity: quantity,
      });
      const updatedOrderData = response.data.order;
      setOrder(updatedOrderData);
      setIsEditing(false); // Exit edit mode after updating.
      closeModal();
    } catch (error) {
      console.error(error);
      closeModal();
    }
  };

  // Function to delete the order with a confirmation alert
  const deleteOrder = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this order?"
    );
    if (!confirmed) return;

    try {
      const response = await axios.delete(`/orders/${OrderData._id}`);
      if (response.data.success) {
        // Handle successful deletion, e.g., show a message and close the modal.
        console.log("Order deleted successfully");
        closeModal();
      } else {
        // Handle deletion failure.
        console.error("Failed to delete the order");
        closeModal();
      }
    } catch (error) {
      console.error(error);
      closeModal();
    }
  };

  return (
    <>
      <div>
        <button
          onClick={openModal}
          className="rounded-md bg-blue-500 text-white"
        >
          Manage Orders
        </button>
        {isModalOpen && (
          <div className="fixed inset-0 z-10 mt-24 flex items-center justify-center overflow-y-auto overflow-x-hidden outline-none focus:outline-none">
            <div className="relative mx-auto my-6 w-auto max-w-3xl">
              {/* Modal content */}
              <div className="relative mt-72 flex w-full flex-col rounded-lg border-0 bg-white shadow-lg outline-none focus:outline-none">
                <div className="border-blueGray-200 flex items-start justify-between rounded-t border-b border-solid p-5">
                  <h3 className="text-3xl font-semibold">Manage Order</h3>
                  <button
                    className="text-black float-right ml-auto border-0 p-1 text-3xl font-semibold leading-none outline-none focus:outline-none"
                    onClick={closeModal}
                  >
                    ×
                  </button>
                </div>
                <div>
                  <div className="mb-6 rounded bg-white p-4 px-4 shadow-lg md:p-8">
                    <div className="grid grid-cols-1 gap-4 gap-y-2 text-sm lg:grid-cols-3">
                      <div className="text-gray-600">
                        <p className="text-lg font-medium">Order Details</p>
                        <p>Please fill out all the fields.</p>
                      </div>

                      <div className="lg:col-span-2">
                        <div className="grid grid-cols-1 gap-4 gap-y-2 text-sm md:grid-cols-5">
                          <div className="md:col-span-5">
                            <label htmlFor="full_name">Full Name</label>
                            <input
                              type="text"
                              name="full_name"
                              id="full_name"
                              className="mt-1 h-10 w-full rounded border bg-gray-50 px-4"
                              value={fullName}
                              onChange={(e) => setFullName(e.target.value)}
                              placeholder="Full Name"
                              disabled={!isEditing}
                            />
                          </div>

                          <div className="md:col-span-5">
                            <label htmlFor="DairyCode">DairyCode</label>
                            <input
                              type="number"
                              name="DairyCode"
                              id="DairyCode"
                              className="mt-1 h-10 w-full rounded border bg-gray-50 px-4"
                              value={dairyCode}
                              onChange={(e) => setDairyCode(e.target.value)}
                              placeholder="DairyCode"
                              disabled={!isEditing}
                            />
                          </div>

                          <div className="md:col-span-5">
                            <label htmlFor="Contact">Contact No</label>
                            <input
                              type="number"
                              name="Contact"
                              id="Contact"
                              className="mt-1 h-10 w-full rounded border bg-gray-50 px-4"
                              value={contact}
                              onChange={(e) => setContact(e.target.value)}
                              placeholder="Contact No"
                              disabled={!isEditing}
                            />
                          </div>
                          <div className="md:col-span-3">
                            <label htmlFor="address">Address / Street</label>
                            <input
                              type="text"
                              name="address"
                              id="address"
                              className="mt-1 h-10 w-full rounded border bg-gray-50 px-4"
                              value={address}
                              onChange={(e) => setAddress(e.target.value)}
                              placeholder="Address"
                              disabled={!isEditing}
                            />
                          </div>

                          <div className="md:col-span-2">
                            <label htmlFor="productname">Product</label>
                            <div className="mt-1 flex h-10 items-center rounded border border-gray-200 bg-gray-50">
                              <select
                                name="productname"
                                id="productname"
                                className="bg-transparent w-full appearance-none px-4 text-gray-800 outline-none"
                                value={product}
                                onChange={(e) => setProduct(e.target.value)}
                                disabled={!isEditing}
                              >
                                <option value="">Select a product</option>
                                {product && (
                                  <option value={product}>{product}</option>
                                )}
                              </select>

                              <button
                                tabIndex="-1"
                                className="cursor-pointer text-gray-300 outline-none transition-all hover:text-red-600 focus:outline-none"
                              ></button>
                              <button
                                tabIndex="-1"
                                className="cursor-pointer border-l border-gray-200 text-gray-300 outline-none transition-all hover:text-blue-600 focus:outline-none"
                              ></button>
                            </div>
                          </div>

                          <div className="md:col-span-5">
                            <label htmlFor="Quantity">Product Quantity</label>
                            <input
                              type="number"
                              name="Quantity"
                              id="Quantity"
                              className="mt-1 h-10 w-full rounded border bg-gray-50 px-4"
                              value={quantity}
                              onChange={(e) => setQuantity(e.target.value)}
                              placeholder="1235"
                              disabled={!isEditing}
                            />
                          </div>

                          <div className="text-right md:col-span-5">
                            <div className="inline-flex items-end">
                              {isEditing ? (
                                <button
                                  onClick={updateOrder}
                                  className="rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700"
                                >
                                  Update
                                </button>
                              ) : (
                                <button
                                  onClick={handleEditClick}
                                  className="rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700"
                                >
                                  Edit
                                </button>
                              )}

                              <button
                                onClick={deleteOrder}
                                className="rounded bg-red-500 py-2 px-4 font-bold text-white hover:bg-red-700"
                              >
                                Delete
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
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
