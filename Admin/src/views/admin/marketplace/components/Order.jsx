import React, { useState, useEffect } from "react";
import axios from "axios";
const Order = () => {
  // Create state variables for each input field
  const [fullName, setFullName] = useState("");
  const [dairyCode, setDairyCode] = useState("");
  const [contact, setContact] = useState("");
  const [address, setAddress] = useState("");
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState("");
  const [quantity, setQuantity] = useState("");
  useEffect(() => {
    axios
      .get("http://localhost:5000/get-products")
      .then((response) => {
        setProducts(response.data.products);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleSubmit = async () => {
    const orderData = {
      dairyCode,
      name: fullName,
      contact,
      address,
      productName: product,
      productQuantity: quantity,
    };

    try {
      const response = await axios.post(
        "http://localhost:5000/order-create",
        orderData
      );
      if (response.data.success) {
        console.log(response.data.message);
        setFullName("");
        setDairyCode("");
        setContact("");
        setAddress("");
        setProduct("");
        setQuantity("");
      } else {
        console.error(response.data.error);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-6">
      <div className="container mx-auto max-w-screen-lg">
        <div>
          <h2 className="text-xl font-semibold text-gray-600">Create Order</h2>

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
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label htmlFor="country">Product</label>
                    <div className="mt-1 flex h-10 items-center rounded border border-gray-200 bg-gray-50">
                      <select
                        name="country"
                        id="country"
                        className="bg-transparent w-full appearance-none px-4 text-gray-800 outline-none"
                        value={product}
                        onChange={(e) => setProduct(e.target.value)}
                      >
                        <option value="">Select a product</option>
                        {products.map((product) => (
                          <option
                            key={product._id}
                            value={product.attributes.title}
                          >
                            {product.attributes.title}
                          </option>
                        ))}
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
                    />
                  </div>

                  <div className="text-right md:col-span-5">
                    <div className="inline-flex items-end">
                      <button
                        onClick={handleSubmit}
                        className="rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700"
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;
