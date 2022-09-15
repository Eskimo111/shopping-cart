import React, { useState } from "react";
import { useParams } from "react-router-dom";
import {
  useAppDispatch,
  useAppSelector,
  useDelayUnmount,
} from "../../../app/hooks";
import { RootState } from "../../../app/store";
import Message from "../../../common/message/Message";
import { addToCartAsync } from "../../cart/cartSlice";
import { fetchProductById, Product } from "../shoppingSlice";

const emptyProduct = {
  id: "",
  name: "",
  image: {
    id: "",
    url: "",
  },
  description: "",
  price: {
    raw: 0,
    formatted: "",
  },
  variant_groups: [],
};

const ProductPage = () => {
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
    <div className="flex flex-col md:flex-row p-8 font-inter gap-12 justify-between">
      {shouldRenderMessage && (
        <Message showing={messageShow} type={messageType} message={message} />
      )}
      <div className="basis-2/4">
        <img
          className="w-full h-3/4 object-cover"
          src={product.image.url}
          alt={product.name}
        />
      </div>
      <div className="flex flex-col basis-2/5 gap-4">
        <h2 className="text-2xl overflow-ellipsis overflow-hidden whitespace-nowrap;">
          {product.name}
          <h3 className="text-lg">Men's shoes</h3>
        </h2>

        {/*<div className="flex items-center gap-2">
          <span className="badge">Stock ready</span>
  </div>*/}
        {/* Price */}
        <div>
          <span className="text-lg">
            {product.price.formatted}
            <span className="text-sm">₫</span>
          </span>
        </div>
        <div className="my-3">
          <p className="text-lg">Select Size</p>
          <div className="flex flex-wrap gap-2">
            {/* Size selection */}
            {product.variant_groups[0] &&
              product.variant_groups[0].options.map((size, index) => (
                <div
                  key={index}
                  onClick={() => setSizeSelected(index)}
                  className={
                    (sizeSelected === index ? "border-black " : "") +
                    "px-4 lg:px-8 py-1.5 text-md rounded-lg border border-gray-300 cursor-pointer"
                  }
                >
                  {size.name}
                </div>
              ))}
          </div>
        </div>
        <div className=" flex flex-wrap items-center gap-4 gap-y-8">
          <button
            className="flex basis-full btn-primary py-3 order-2 justify-center"
            onClick={() =>
              dispatch(
                addToCartAsync({
                  id: product.id,
                  quantity: quantity,
                  variant_id: product.variant_groups[0].id,
                  option_id: product.variant_groups[0].options[sizeSelected].id,
                })
              )
                .unwrap()
                .then(() => {
                  showMessage(
                    `Add ${quantity} ${product.name} to cart successfully!`,
                    "success"
                  );
                })
                .catch(() => {
                  showMessage("Error. Can't add product to cart", "fail");
                })
            }
          >
            Add to cart
          </button>
          <h2 className="text-lg">Quantity</h2>
          <div className="flex basis-1/6 py-1 items-center rounded-lg border border-black">
            <button
              onClick={() => {
                if (quantity > 1) setQuantity(quantity - 1);
              }}
              className=" text-black basis-1/3 rounded-l"
            >
              -
            </button>
            <span className="basis-1/3  text-center bg-white">{quantity}</span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="  text-black  basis-1/3 rounded-r"
            >
              +
            </button>
          </div>
        </div>
        <hr className="mb-6 bg-gray-600" />
        <div>{product.description}</div>
      </div>
    </div>
  );
};

export default ProductPage;
