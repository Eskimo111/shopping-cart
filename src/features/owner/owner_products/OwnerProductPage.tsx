import React, { useState } from "react";
import { useParams } from "react-router-dom";
import {
  useAppDispatch,
  useAppSelector,
  useDelayUnmount,
} from "../../../app/hooks";
import { RootState } from "../../../app/store";
import Message from "../../../common/message/Message";
import { Product } from "../../shopping/shoppingSlice";

const emptyProduct = {
  id: "",
  name: "",
  image: {
    id: "",
    url: "",
  },
  description: "",
  status: false,
  price: {
    raw: 0,
    formatted: "",
  },
  variant_groups: [],
};

const OwnerProductPage = () => {
  const { productId } = useParams();
  const productList = useAppSelector((state: RootState) => state.shopping);
  let product: Product = productList.filter((item) => item.id === productId)[0];
  if (!product) product = emptyProduct;
  const [sizeSelected, setSizeSelected] = useState(0);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [messageShow, setMessageShow] = useState(false);
  const shouldRenderMessage = useDelayUnmount(messageShow, 500);
  const [quantity, setQuantity] = useState(1);
  const dispatch = useAppDispatch();

  const showMessage = (message: string, type: string) => {
    setMessage(message);
    setMessageType(type);
    setMessageShow(true);
    setTimeout(() => setMessageShow(false), 2000);
  };

  return (
    <div className="flex flex-col mx-auto w-2/5 mt-12 p-4 font-inter gap-4 justify-between border flex-wrap rounded-lg">
      <div className="w-full flex flex-wrap gap-2 text-sm">
        <h3 className="w-full text-xs font-semibold">
          DETAILS
          <hr className=" w-8"></hr>
        </h3>
        <div className="relative w-full text-gray-400 ">
          <input
            type="text"
            name="name"
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
            value={product.name}
            className="product-input"
            id="product-name"
          />
          <label
            htmlFor="product-name"
            className="absolute top-0 left-0 text-xs mt-1 ml-3 leading-5"
          >
            Name(Required)
          </label>
        </div>
        <div className="relative w-full">
          <textarea
            name="description"
            value={product.description}
            rows={7}
            className="product-input"
          />
          <label className="absolute top-0 left-0 text-xs mt-1 ml-3 leading-5">
            Description
          </label>
        </div>
      </div>
      <div className="w-full flex flex-wrap gap-2 text-sm">
        <h3 className="w-full text-xs font-semibold">
          PRICE
          <hr className=" w-8"></hr>
        </h3>
        <div className="relative w-full  ">
          <input
            type="text"
            name="name"
            value={product.price.raw}
            className="product-input pl-5"
          />
          <span className="absolute bottom-0 left-0 text-xs mb-2.5 ml-3 leading-5">
            ₫
          </span>
          <label className="absolute top-0 left-0 text-xs mt-1 ml-3 leading-5">
            Price(Required)
          </label>
        </div>
      </div>
    </div>
  );
};

export default OwnerProductPage;
