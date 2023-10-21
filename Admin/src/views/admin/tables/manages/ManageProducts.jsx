import React, { useState, useEffect } from "react";
import axios from "axios";
import ImageUploading from "react-images-uploading";

export default function ManageProducts(props) {
  const { productID } = props;
  const [productName, setProductName] = useState("");
  const [productCompany, setProductCompany] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [packing, setPacking] = useState("");
  const [stock, setStock] = useState("");
  const maxNumber = 5;
  const [images, setImages] = useState([]);
  const [imageError, setImageError] = useState("");
  const [errors, setErrors] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [image, setImage] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (productID) {
          const response = await axios.get(`/products/${productID}`);
          const productData = response.data;

          setProductName(productData.attributes.title);
          setProductCompany(productData.attributes.company);
          setDescription(productData.attributes.description);
          setPrice(productData.attributes.price);
          setPacking(productData.attributes.packing);
          setImage(productData.attributes.image);
          setStock(productData.attributes.availableStock);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [productID]);

  const onChange = (imageList, addUpdateIndex) => {
    setImages(imageList);
    close();
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsEditing(false);
  };

  const open = () => {
    const modal = document.getElementById("Upload");
    modal.showModal();
  };

  const close = () => {
    const modal = document.getElementById("Upload");
    modal.close();
  };

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    if (!productName.trim()) {
      newErrors.productName = "Product Name is required";
      isValid = false;
    }

    if (!productCompany.trim()) {
      newErrors.productCompany = "Product Company is required";
      isValid = false;
    }

    if (!description.trim()) {
      newErrors.description = "Description is required";
      isValid = false;
    }

    if (!price) {
      newErrors.price = "Price is required";
      isValid = false;
    }

    if (!packing) {
      newErrors.packing = "Packing is required";
      isValid = false;
    }

    if (!stock) {
      newErrors.stock = "Available Stock is required";
      isValid = false;
    }

    if (images.length === 0) {
      setImageError("Please select an image");
      isValid = false;
    } else {
      setImageError("");
    }

    setErrors(newErrors);
    return isValid;
  };

  const enableEditing = () => {
    setIsEditing(true);
  };

  const saveChanges = () => {
    setIsEditing(false);
    // Additional logic to save changes if needed
  };

  const renderSaveButton = () => {
    if (isEditing) {
      return (
        <button
          onClick={saveChanges}
          className="mr-3 rounded-md bg-green-500 px-2 py-2 text-white"
        >
          Save
        </button>
      );
    }
  };

  const handleFormUpdate = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      const confirmed = window.confirm(
        "Are you sure you want to update this product?"
      );
      if (confirmed) {
        try {
          const formData = new FormData();
          formData.append("photos", images[0].file);

          const response = await axios.post("/upload", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });

          if (response.status === 200) {
            const uploadedFiles = response.data.files;

            if (uploadedFiles.length > 0) {
              const imageUrl = uploadedFiles[0].filename;
              console.log(imageUrl);
              const now = new Date();
              const productData = {
                attributes: {
                  title: productName,
                  company: productCompany,
                  description,
                  featured: true,
                  price,
                  packing,
                  availableStock: stock,
                  image: imageUrl,
                  shipping: false,
                  category: "CattleFeed",
                  updatedAt: now,
                },
              };

              // Send a PUT request to update the product
              const productResponse = await axios.put(
                `/product-update/${productID}`,
                productData
              );

              if (productResponse.data.success) {
                console.log(
                  "Product updated successfully:",
                  productResponse.data.updatedProduct
                );
                // Handle success, e.g., show a success message

                // Clear form and related state variables
                setProductName("");
                setProductCompany("");
                setDescription("");
                setPrice("");
                setPacking("");
                setStock("");
                setErrors({});
                setImages([]);
                setImageError("");
                closeModal()
              } else {
                console.error("Error:", productResponse.data.error);
                closeModal()

              }
            } else {
              console.error("No files were uploaded");
              closeModal()

            }
          }
        } catch (error) {
          console.error(error);
          closeModal()

        }
      }
    }
  };

  const handleDeleteProduct = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (confirmed) {
      try {
        if (productID) {
          const response = await axios.delete(`/product-delete/${productID}`);

          if (response.data.success) {
            closeModal()
          } else {
            console.error("Error:", response.data.error);
            closeModal()

          }
        }
      } catch (error) {
        console.error(error);
        closeModal()

      }
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
              <div className="relative mt-72 flex w-full flex-col rounded-lg border-0 bg-white shadow-lg outline-none focus:outline-none">
                <div className="my-2 mb-4 flex flex-col rounded bg-white px-8 pt-6 pb-8 shadow-md">
                  <div className="-mx-3 mb-6 md:flex">
                    <div className="w-full items-center space-y-4 p-4  md:inline-flex md:space-y-0">
                      <h2 className="mx-auto max-w-sm rounded-lg border-solid border-teal-500 md:w-1/3">
                        Upload Product Image
                      </h2>
                      <div className="mr-2 w-24 rounded">
                        <img src={`/getImage/${image}`} alt="Product" />
                      </div>
                      <div className="mx-auto max-w-sm md:w-2/3">
                        <button
                          className={`btn ${images.length > 0
                            ? "text-green-600"
                            : "rounded-lg border-solid border-teal-500 text-blue-500 hover:text-blue-600"
                            }`}
                          onClick={open}
                        >
                          {images.length > 0
                            ? "Image selected"
                            : "Select Image"}
                        </button>
                        {imageError && (
                          <p className="mt-1 text-sm text-red-500">
                            {imageError}
                          </p>
                        )}
                        <dialog
                          id="Upload"
                          className="modal modal-bottom sm:modal-middle rounded-lg px-2 py-3"
                        >
                          <form method="dialog" className="modal-box px-2 py-3">
                            <h3 className="text-lg font-bold">
                              Upload Product Image
                            </h3>
                            <div className="App mt-5 flex justify-center">
                              <ImageUploading
                                multiple
                                value={images}
                                onChange={onChange}
                                maxNumber={maxNumber}
                                dataURLKey="data_url"
                              >
                                {({
                                  imageList,
                                  onImageUpload,
                                  onImageRemoveAll,
                                  onImageUpdate,
                                  onImageRemove,
                                  isDragging,
                                  dragProps,
                                }) => (
                                  <div className="upload__image-wrapper px-2 py-3">
                                    <button
                                      className={`btn ${isDragging
                                        ? "border-red-600 bg-white text-red-600"
                                        : "m-5 border-blue-500 bg-white text-blue-500 hover:border-blue-600 hover:text-blue-600"
                                        }`}
                                      onClick={onImageUpload}
                                      {...dragProps}
                                    >
                                      {images.length > 0
                                        ? "Update Image"
                                        : "Click here"}
                                    </button>
                                    {imageList.map((image, index) => (
                                      <div key={index} className="image-item ">
                                        <img
                                          src={image["data_url"]}
                                          alt=""
                                          width="100"
                                          className="content-center"
                                        />
                                        <div className="image-item__btn-wrapper mt-2">
                                          <button
                                            className="btn mt-3 rounded-lg bg-red-500 py-2 px-4 text-white hover:bg-red-600"
                                            onClick={() => onImageRemove(index)}
                                          >
                                            Remove
                                          </button>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                )}
                              </ImageUploading>
                            </div>
                            <div className="modal-action">
                              <button
                                className="btn rounded-lg bg-blue-500 py-2 px-4 text-white hover:bg-blue-600"
                                onClick={close}
                              >
                                Close
                              </button>
                            </div>
                          </form>
                        </dialog>
                      </div>
                    </div>

                    <div className="mb-6 px-3 md:mb-0 md:w-1/2">
                      <label
                        className="text-grey-darker mb-2 block text-xs font-bold uppercase tracking-wide"
                        htmlFor="grid-first-name"
                      >
                        Product Name
                      </label>
                      <div className="flex">
                        <input
                          className={`bg-grey-lighter text-grey-darker block w-full appearance-none border ${isEditing
                            ? "border-red rounded"
                            : "rounded-lg border-red-200"
                            } mb-3 py-3 px-4`}
                          id="grid-first-name"
                          type="text"
                          placeholder="Product Name"
                          value={productName}
                          onChange={(e) => setProductName(e.target.value)}
                          disabled={!isEditing}
                        />
                      </div>
                      {errors.productName && (
                        <p className="text-xs italic text-red-500">
                          {errors.productName}
                        </p>
                      )}
                    </div>
                    <div className="px-3 md:w-1/2">
                      <label
                        className="text-grey-darker mb-2 block text-xs font-bold uppercase tracking-wide"
                        htmlFor="grid-last-name"
                      >
                        Product Company
                      </label>
                      <div className="flex">
                        <input
                          className={`bg-grey-lighter text-grey-darker block w-full appearance-none border ${isEditing
                            ? "border-grey-lighter rounded"
                            : "border-grey-lighter rounded-lg"
                            } py-3 px-4`}
                          id="grid-last-name"
                          type="text"
                          placeholder="Product Company"
                          value={productCompany}
                          onChange={(e) => setProductCompany(e.target.value)}
                          disabled={!isEditing}
                        />
                      </div>
                      {errors.productCompany && (
                        <p className="text-xs italic text-red-500">
                          {errors.productCompany}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="-mx-3 mb-6 md:flex">
                    <div className="px-3 md:w-full">
                      <label
                        className="text-grey-darker mb-2 block text-xs font-bold uppercase tracking-wide"
                        htmlFor="Description"
                      >
                        Description
                      </label>
                      <div className="flex">
                        <textarea
                          className={`bg-grey-lighter text-grey-darker block w-full appearance-none border ${isEditing
                            ? "border-grey-lighter rounded"
                            : "border-grey-lighter rounded-lg"
                            } mb-3 py-3 px-4`}
                          id="Description"
                          placeholder="Description"
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                          disabled={!isEditing}
                        />
                      </div>
                      {errors.description && (
                        <p className="text-xs italic text-red-500">
                          {errors.description}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="-mx-3 mb-2 md:flex">
                    <div className="mb-6 px-3 md:mb-0 md:w-1/2">
                      <label
                        className="text-grey-darker mb-2 block text-xs font-bold uppercase tracking-wide"
                        htmlFor="Price"
                      >
                        Price
                      </label>
                      <div className="flex">
                        <input
                          className={`bg-grey-lighter text-grey-darker block w-full appearance-none border ${isEditing
                            ? "border-grey-lighter rounded"
                            : "border-grey-lighter rounded-lg"
                            } py-3 px-4`}
                          id="Price"
                          type="number"
                          placeholder="Price"
                          value={price}
                          onChange={(e) => setPrice(e.target.value)}
                          disabled={!isEditing}
                        />
                      </div>
                      {errors.price && (
                        <p className="text-xs italic text-red-500">
                          {errors.price}
                        </p>
                      )}
                    </div>

                    <div className="px-3 md:w-1/2">
                      <label
                        className="text-grey-darker mb-2 block text-xs font-bold uppercase tracking-wide"
                        htmlFor="Packing"
                      >
                        Packing
                      </label>
                      <div className="flex">
                        <input
                          className={`bg-grey-lighter text-grey-darker block w-full appearance-none border ${isEditing
                            ? "border-grey-lighter rounded"
                            : "border-grey-lighter rounded-lg"
                            } py-3 px-4`}
                          id="Packing"
                          type="number"
                          placeholder="Packing"
                          value={packing}
                          onChange={(e) => setPacking(e.target.value)}
                          disabled={!isEditing}
                        />
                      </div>
                      {errors.packing && (
                        <p className="text-xs italic text-red-500">
                          {errors.packing}
                        </p>
                      )}
                    </div>
                    <div className="px-3 md:w-1/2">
                      <label
                        className="text-grey-darker mb-2 block text-xs font-bold uppercase tracking-wide"
                        htmlFor="Stock"
                      >
                        Available Stock
                      </label>
                      <div className="flex">
                        <input
                          className={`bg-grey-lighter text-grey-darker block w-full appearance-none border ${isEditing
                            ? "border-grey-lighter rounded"
                            : "border-grey-lighter rounded-lg"
                            } py-3 px-4`}
                          id="Stock"
                          type="number"
                          placeholder="Stock"
                          value={stock}
                          onChange={(e) => setStock(e.target.value)}
                          disabled={!isEditing}
                        />
                      </div>
                      {errors.stock && (
                        <p className="text-xs italic text-red-500">
                          {errors.stock}
                        </p>
                      )}
                    </div>
                  </div>
                  <div>
                    {isEditing ? (
                      <button
                        type="submit"
                        onClick={handleFormUpdate}
                        className="rounded bg-blue-500 py-2 px-4 pr-2 font-bold text-white hover:bg-blue-700"
                      >
                        Update Product
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => enableEditing()}
                        className="rounded bg-blue-500 py-2 px-4 pr-2 font-bold text-white hover:bg-blue-700"
                      >
                        Edit Product
                      </button>
                    )}
                    <button
                      onClick={handleDeleteProduct}
                      className="ml-5 mr-3 rounded-md bg-red-500 px-2 py-2 text-white"
                    >
                      Delete Product
                    </button>
                    <div className="border-blueGray-200 flex items-center justify-end rounded-b border-t border-solid p-6">
                      <button
                        className="active-bg-gray-100 hover-shadow-lg focus-outline-none mt-3 mr-1 mb-1 rounded bg-white px-6 py-3 text-sm font-bold uppercase text-gray-900 shadow outline-none"
                        type="button"
                        onClick={closeModal}
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
