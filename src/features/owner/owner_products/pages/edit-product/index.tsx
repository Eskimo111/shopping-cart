import React, { useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import { useParams } from "react-router-dom";
import {
  useAppDispatch,
  useAppSelector,
  useDelayUnmount,
} from "../../../../../app/hooks";
import { RootState } from "../../../../../app/store";
import BackButton from "../../../../../common/button/BackButton";
import Message from "../../../../../common/message/Message";
import { Product, updateProduct } from "../../../../shopping/productsSlice";
import EditVariant from "./components/EditVariant";

const emptyProduct = {
  id: "",
  name: "",
  image: {
    id: "",
    url: "",
  },
  description: "",
  active: false,
  price: {
    raw: 0,
    formatted: "",
  },
  variant_groups: [],
};

const OwnerProductPage = () => {
  const { productId } = useParams();
  const productList = useAppSelector((state: RootState) => state.products);
  let product: Product = productList.filter((item) => item.id === productId)[0];
  if (!product) product = emptyProduct;
  const [name, setName] = useState(product.name);
  const [description, setDescription] = useState(product.description);
  const [price, setPrice] = useState(product.price.raw);
  const [active, setActive] = useState(product.active);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [messageShow, setMessageShow] = useState(false);
  const shouldRenderMessage = useDelayUnmount(messageShow, 500);
  const [deleteBox, setDeleteBox] = useState(false);
  const dispatch = useAppDispatch();
  const [editVariant, setEditVariant] = useState(false);

  const showMessage = (message: string, type: string) => {
    setMessage(message);
    setMessageType(type);
    setMessageShow(true);
    setTimeout(() => setMessageShow(false), 2000);
  };

  const handleInputChange = (event: React.SyntheticEvent) => {
    const target = event.target as HTMLInputElement;
    const value = target.value;
    const name = target.name;

    switch (name) {
      case "name":
        setName(value);
        break;
      case "description":
        setDescription(value);
        break;
      case "price":
        setPrice(Number.parseInt(value));
        break;
    }
  };

  const handleSubmit = () => {
    dispatch(
      updateProduct({
        id: product.id,
        name: name,
        description: description,
        price: price,
        active: active,
      })
    )
      .unwrap()
      .then(() => {
        showMessage("Changes saved", "success");
      })
      .catch(() => {
        showMessage("Error. Try again!", "failed");
      });
  };
  return (
    <div className="w-full px-auto flex flex-wrap justify-center pt-4 font-inter pb-12 bg-gray-100">
      <BackButton />
      {editVariant && (
        <EditVariant
          onHide={() => {
            setEditVariant(false);
          }}
          product={product}
        />
      )}
      {shouldRenderMessage && (
        <Message showing={messageShow} type={messageType} message={message} />
      )}
      {/*<div className="w-1/6"></div>*/}
      <div className="flex flex-col w-2/5 px-2 gap-4 justify-between flex-wrap">
        {/*DETAIL */}
        <div className="input-group__container">
          <h3 className="input-group__title">
            DETAILS
            <hr className=" w-8"></hr>
          </h3>
          <div className="relative w-full text-gray-400 ">
            <input
              type="text"
              name="id"
              value={product.id}
              readOnly
              className="product-input"
            />
            <label className="absolute top-0 left-0 text-xs mt-1 ml-3 leading-5">
              Product Id
            </label>
          </div>
          <div className="relative w-full">
            <input
              type="text"
              name="name"
              value={name}
              className="product-input"
              id="product-name"
              onChange={(e) => handleInputChange(e)}
            />
            <label
              htmlFor="product-name"
              className="absolute top-0 left-0 text-xs mt-1 ml-3 leading-5"
            >
              Name<span className="text-gray-600">(required)</span>
            </label>
          </div>
          <div className="relative w-full">
            <textarea
              name="description"
              value={description}
              rows={7}
              className="product-input"
              onChange={(e) => handleInputChange(e)}
            />
            <label className="absolute top-0 left-0 text-xs mt-1 ml-3 leading-5">
              Description
            </label>
          </div>
        </div>
        {/*PRICE */}
        <div className="input-group__container">
          <h3 className="input-group__title">
            PRICE
            <hr className=" w-8"></hr>
          </h3>
          <div className="relative w-full  ">
            <input
              type="number"
              name="price"
              value={price}
              onChange={(e) => handleInputChange(e)}
              className="product-input pl-5"
            />
            <span className="absolute bottom-0 left-0 text-xs mb-2.5 ml-3 leading-5">
              ₫
            </span>
            <label className="absolute top-0 left-0 text-xs mt-1 ml-3 leading-5">
              Price <span className="text-gray-600">(required)</span>
            </label>
          </div>
        </div>
        {/*VARIANT */}
        <div className="input-group__container pt-3">
          <div className="flex justify-between w-full items-center pb-3">
            <h3 className="input-group__title">
              VARIANTS
              <hr className="w-8"></hr>
            </h3>
            <button
              onClick={() => setEditVariant(true)}
              className="text-xs font-semibold bg-gray-700 text-white shadow-md rounded-full p-1.5 px-3"
            >
              EDIT
            </button>
          </div>
          <table className="w-full shadow-md rounded-lg overflow-hidden">
            <thead>
              <tr className="flex justify-between text-gray-700 bg-gray-200 p-2 ">
                <th className="text-left text-xs">GROUP</th>
                <th className="text-right text-xs">OPTION</th>
              </tr>
            </thead>
            <tbody>
              {product.variant_groups.map((group) => (
                <tr className="flex justify-between text-xs bg-white p-2 ">
                  <td className="text-left">{group.name}</td>
                  <td className="flex text-right gap-1.5 ">
                    {group.options.map((option) => (
                      <div className="bg-gray-500 text-white p-1 px-2 rounded-xl">
                        {option.name}
                      </div>
                    ))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="w-1/5 px-2">
        <div className="input-group__container">
          <div className="flex items-center w-full justify-between relative">
            <button
              onClick={() => handleSubmit()}
              className="btn-primary font-semibold basis-5/6 shadow-md overflow-hidden"
            >
              Save Changes
            </button>
            <BsThreeDots
              className="basis-1/12 text-center cursor-pointer"
              onClick={() => setDeleteBox(!deleteBox)}
            />
            {deleteBox && (
              <div className="p-3 px-4 text-red-700 bg-white border text-sm border-gray-300 shadow-sm absolute -bottom-10 right-0 rounded-lg hover:text-red-500 cursor-pointer">
                Delete
              </div>
            )}
          </div>
          <hr className="w-full" />
          <div className="flex justify-center">
            <div className="form-check form-switch flex items-center gap-1 p-0">
              <input
                className="form-check-input checked:bg-black appearance-none w-9  rounded-full h-5 align-top  bg-no-repeat bg-contain  bg-gray-300 focus:outline-none cursor-pointer shadow-sm"
                type="checkbox"
                role="switch"
                id="flexSwitchCheckDefault"
                checked={active}
                onClick={() => setActive(!active)}
              />
              <label
                className="form-check-label inline-block text-gray-800 text-xs font-medium"
                htmlFor="flexSwitchCheckDefault"
              >
                ACTIVE
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OwnerProductPage;
