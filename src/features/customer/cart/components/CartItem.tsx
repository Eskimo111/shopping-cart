import { Skeleton, Space } from "antd";
import React, { useState } from "react";
import { useAppDispatch } from "../../../../hooks/use-app-dispatch";
import useMessage from "../../../../hooks/use-message";
import { CartItemType } from "../../../../models/cart";
import { removeFromCartAsync, updateCartAsync } from "../../../../slices/cart";

type CartItemProps = {
  data: CartItemType;
};

const formatPrice = (price: number) => {
  return price.toLocaleString("vi", { style: "currency", currency: "VND" });
};

const CartItem = (props: CartItemProps) => {
  const product = props.data;
  const message = useMessage();
  const dispatch = useAppDispatch();
  const [quantity, setQuantity] = useState(product.quantity);
  const [loading, setLoading] = useState(false);

  const handleChangeQuantity = (event: React.SyntheticEvent) => {
    let target = event.target as HTMLInputElement;
    setQuantity(Number.parseInt(target.value));
  };
  const handleSubmitQuantity = (event: React.SyntheticEvent) => {
    dispatchQuantity(quantity);
    event.preventDefault();
  };
  const handleRemoveItem = () => {
    setLoading(true);
    dispatch(removeFromCartAsync(product.id))
      .unwrap()
      .then(() => {
        setLoading(false);
        message.showMessage("Item(s) removed.", "fail");
      })
      .catch(() => {
        setLoading(false);
        message.showMessage("Error. Try again.", "fail");
      });
  };
  const dispatchQuantity = (quantity: number) => {
    setQuantity(quantity);
    setLoading(true);
    dispatch(updateCartAsync({ line_id: product.id, quantity: quantity }))
      .unwrap()
      .then(() => {
        setLoading(false);
        message.showMessage("Update quantity succesfully!", "success");
      })
      .catch(() => {
        setLoading(false);
        message.showMessage("Error.Try again!", "fail");
      });
  };
  return (
    <>
      {loading ? (
        <Space className="card-item" style={{ gap: "2rem" }}>
          <Skeleton.Image style={{ height: 130, width: 130 }} active />
          <Skeleton
            active
            style={{ height: 20, width: "15rem" }}
            paragraph={{ rows: 2 }}
          />
        </Space>
      ) : (
        <div className="card-item font-inter justify-between border-b pb-12">
          {message.node}
          <div className="h-full flex flex-col items-center md:flex-row md:max-w-xl gap-4">
            <div className="w-20 h-20 md:w-32 md:h-32">
              <img
                className="w-full h-full object-cover"
                src={product.image.url}
                alt={product.name}
              />
            </div>
            <div className="flex flex-col justify-between p-4 leading-normal gap-2">
              <h2 className="text-lg overflow-ellipsis overflow-hidden whitespace-nowrap">
                {product.name}
              </h2>
              <span className="text-gray-600 ">Yellow</span>
              <div className="flex gap-6">
                {/* Size Drop Down */}
                <div className="text-gray-600">
                  Size {product.selected_options[0].option_name}
                </div>
                {/* Quantity Control */}
                <div className="border bg-white border-gray-400 rounded-md">
                  <form onSubmit={(e) => handleSubmitQuantity(e)}>
                    <button
                      type="button"
                      onClick={() => {
                        if (quantity > 1) {
                          dispatchQuantity(quantity - 1);
                        }
                      }}
                      className=" text-black w-6 rounded-l"
                    >
                      -
                    </button>

                    <input
                      type="number"
                      className="w-8 text-center bg-white"
                      onChange={(e) => handleChangeQuantity(e)}
                      value={quantity}
                    />

                    <button
                      type="button"
                      onClick={() => {
                        dispatchQuantity(quantity + 1);
                      }}
                      className="  text-black w-6 rounded-r"
                    >
                      +
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div className="flex w-3/4 md:w-auto md:h-full md:flex-col justify-between items-end pt-4">
            <span>{formatPrice(product.line_total.raw)}</span>
            <div className="cursor-pointer" onClick={handleRemoveItem}>
              <svg
                aria-hidden="true"
                focusable="false"
                viewBox="0 0 24 24"
                role="img"
                width="24px"
                height="24px"
                fill="none"
              >
                <path
                  stroke="currentColor"
                  strokeMiterlimit="10"
                  strokeWidth="1.5"
                  d="M14.25 7.5v12m-4.5-12v12M5.25 6v13.5c0 1.24 1.01 2.25 2.25 2.25h9c1.24 0 2.25-1.01 2.25-2.25V5.25h2.75m-2.75 0H21m-12-3h5.25c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5H3"
                ></path>
              </svg>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CartItem;
