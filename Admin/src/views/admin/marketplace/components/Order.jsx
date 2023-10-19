import React, { useState, useEffect } from 'react';
import axios from 'axios';
const Order = () => {
  // Create state variables for each input field
  const [fullName, setFullName] = useState('');
  const [dairyCode, setDairyCode] = useState('');
  const [contact, setContact] = useState('');
  const [address, setAddress] = useState('');
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState('');
  const [quantity, setQuantity] = useState('');
  useEffect(() => {
    axios.get('http://localhost:5000/get-products')
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
      const response = await axios.post('http://localhost:5000/order-create', orderData);
      if (response.data.success) {
        console.log(response.data.message);
        setFullName('');
        setDairyCode('');
        setContact('');
        setAddress('');
        setProduct('');
        setQuantity('');
      } else {
        console.error(response.data.error);
      }
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <div className="min-h-screen p-6 bg-gray-100 flex items-center justify-center">
      <div className="container max-w-screen-lg mx-auto">
        <div>
          <h2 className="font-semibold text-xl text-gray-600">Create Order</h2>

          <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
            <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
              <div className="text-gray-600">
                <p className="font-medium text-lg">Order Details</p>
                <p>Please fill out all the fields.</p>
              </div>

              <div className="lg:col-span-2">
                <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                  <div className="md:col-span-5">
                    <label htmlFor="full_name">Full Name</label>
                    <input
                      type="text"
                      name="full_name"
                      id="full_name"
                      className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
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
                      className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
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
                      className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
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
                      className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="Address"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label htmlFor="country">Product</label>
                    <div className="h-10 bg-gray-50 flex border border-gray-200 rounded items-center mt-1">
                      <select
                        name="country"
                        id="country"
                        className="px-4 appearance-none outline-none text-gray-800 w-full bg-transparent"
                        value={product}
                        onChange={(e) => setProduct(e.target.value)}
                      >
                        <option value="">Select a product</option>
                        {products.map((product) => (
                          <option key={product._id} value={product.attributes.title}>
                            {product.attributes.title}
                          </option>
                        ))}
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

                  <div className="md:col-span-5">
                    <label htmlFor="Quantity">Product Quantity</label>
                    <input
                      type="number"
                      name="Quantity"
                      id="Quantity"
                      className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                      placeholder="1235"
                    />
                  </div>

                  <div className="md:col-span-5 text-right">
                    <div className="inline-flex items-end">
                      <button
                        onClick={handleSubmit}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
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
