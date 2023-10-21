import React, { useState } from "react";
import axios from "axios";
import ImageUploading from "react-images-uploading";

export default function AddCatteFeeds() {
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

  const onChange = (imageList, addUpdateIndex) => {
    setImages(imageList);
    close();
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
    } else {
      setImageError("");
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
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
            const filename = uploadedFiles[0].filename;
            const imageUrl = filename;
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

            // Send a POST request to your server
            const productResponse = await axios.post(
              "/product-create",
              productData
            );

            if (productResponse.data.success) {
              // Handle success, e.g., show a success message
              console.log(
                "Product created successfully:",
                productResponse.data.product
              );

              setProductName("");
              setProductCompany("");
              setDescription("");
              setPrice("");
              setPacking("");
              setStock("");
              // Clear other state variables as needed
            } else {
              // Handle any errors from the server
              console.error("Error:", productResponse.data.error);
            }

            setErrors({});
            setImages([]);
            setImageError("");
          } else {
            console.error("No files were uploaded");
          }
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div>
      <div className="my-2 mb-4 flex flex-col rounded bg-white px-8 pt-6 pb-8 shadow-md">
        <div className="-mx-3 mb-6 md:flex">
          <div className="w-full items-center space-y-4 p-4  md:inline-flex md:space-y-0">
            <h2 className="mx-auto max-w-sm rounded-lg border-solid border-teal-500 md:w-1/3">
              Upload Product Image
            </h2>
            <div className="mx-auto max-w-sm md:w-2/3">
              <button
                className={`btn ${
                  images.length > 0
                    ? "text-green-600"
                    : "rounded-lg border-solid border-teal-500 text-blue-500 hover:text-blue-600"
                }`}
                onClick={open}
              >
                {images.length > 0 ? "Image selected" : "Select Image"}
              </button>
              {imageError && (
                <p className="mt-1 text-sm text-red-500">{imageError}</p>
              )}
              <dialog
                id="Upload"
                className="modal modal-bottom sm:modal-middle rounded-lg px-2 py-3"
              >
                <form method="dialog" className="modal-box px-2 py-3">
                  <h3 className="text-lg font-bold">Upload Product Image</h3>
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
                            className={`btn ${
                              isDragging
                                ? "border-red-600 bg-white text-red-600"
                                : "m-5 border-blue-500 bg-white text-blue-500 hover:border-blue-600 hover:text-blue-600"
                            }`}
                            onClick={onImageUpload}
                            {...dragProps}
                          >
                            {images.length > 0 ? "Update Image" : "Click here"}
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
            <input
              className="bg-grey-lighter text-grey-darker border-red mb-3 block w-full appearance-none rounded border py-3 px-4"
              id="grid-first-name"
              type="text"
              placeholder="Product Name"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
            />
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
            <input
              className="bg-grey-lighter text-grey-darker border-grey-lighter block w-full appearance-none rounded border py-3 px-4"
              id="grid-last-name"
              type="text"
              placeholder="Product Company"
              value={productCompany}
              onChange={(e) => setProductCompany(e.target.value)}
            />
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
            <textarea
              className="bg-grey-lighter text-grey-darker border-grey-lighter mb-3 block w-full appearance-none rounded border py-3 px-4"
              id="Description"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
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
            <input
              className="bg-grey-lighter text-grey-darker border-grey-lighter block w-full appearance-none rounded border py-3 px-4"
              id="Price"
              type="number"
              placeholder="Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            {errors.price && (
              <p className="text-xs italic text-red-500">{errors.price}</p>
            )}
          </div>

          <div className="px-3 md:w-1/2">
            <label
              className="text-grey-darker mb-2 block text-xs font-bold uppercase tracking-wide"
              htmlFor="Packing"
            >
              Packing
            </label>
            <input
              className="bg-grey-lighter text-grey-darker border-grey-lighter block w-full appearance-none rounded border py-3 px-4"
              id="Packing"
              type="number"
              placeholder="Packing"
              value={packing}
              onChange={(e) => setPacking(e.target.value)}
            />
            {errors.packing && (
              <p className="text-xs italic text-red-500">{errors.packing}</p>
            )}
          </div>
          <div className="px-3 md:w-1/2">
            <label
              className="text-grey-darker mb-2 block text-xs font-bold uppercase tracking-wide"
              htmlFor="Stock"
            >
              Available Stock
            </label>
            <input
              className="bg-grey-lighter text-grey-darker border-grey-lighter block w-full appearance-none rounded border py-3 px-4"
              id="Stock"
              type="number"
              placeholder="Stock"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
            />
            {errors.stock && (
              <p className="text-xs italic text-red-500">{errors.stock}</p>
            )}
          </div>
        </div>
        <div>
          <button
            type="submit"
            onClick={handleFormSubmit}
            className="rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700"
          >
            Create Product
          </button>
        </div>
      </div>
    </div>
  );
}
