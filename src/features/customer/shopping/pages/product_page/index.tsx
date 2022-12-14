import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LoadingSpinner from "../../../../../components/loading-spinner/LoadingSpinner";
import { addToCartAsync } from "../../../../../slices/cart";
import ProductNotFound from "./ProductNotFound";
import { useAppDispatch } from "../../../../../hooks/use-app-dispatch";
import useMessage from "../../../../../hooks/use-message";
import { Product } from "../../../../../models/product";
import { fetchProductById } from "../../../../../slices/products";

const ProductPage = () => {
  const { productId } = useParams();
  const messenger = useMessage();
  const dispatch = useAppDispatch();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [sizeSelected, setSizeSelected] = useState(0);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (productId)
      fetchProductById(productId)
        .then((result) => {
          setProduct(result);
          setLoading(false);
        })
        .catch((reject) => {
          setLoading(false);
        });
  }, []);

  return (
    <>
      {loading ? (
        <LoadingSpinner />
      ) : product ? (
        <div className="flex flex-col md:flex-row p-8 font-inter gap-12 justify-between">
          {messenger.node}
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
              <div className="text-lg  flex">
                {product.categories?.map((category) => (
                  <div
                    className="category-item pr-2 py-2 "
                    key={category.id}
                  ></div>
                ))}
              </div>
            </h2>

            {/* Price */}
            <div>
              <span className="text-lg">
                {product.price.formatted}
                <span className="text-sm">???</span>
              </span>
            </div>
            {/* Size selection */}
            <div className="my-3">
              <p className="text-lg">Select Size</p>
              <div className="flex flex-wrap gap-2">
                {product.variant_groups &&
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
                      variant_id: product.variant_groups![0].id,
                      option_id:
                        product.variant_groups![0].options[sizeSelected].id,
                    })
                  )
                    .unwrap()
                    .then(() => {
                      messenger.showMessage(
                        `Add ${quantity} ${product.name} to cart successfully!`,
                        "success"
                      );
                    })
                    .catch(() => {
                      messenger.showMessage(`Error. Try again!`, "fail");
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
                <span className="basis-1/3  text-center bg-white">
                  {quantity}
                </span>
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
      ) : (
        <ProductNotFound />
      )}
    </>
  );
};

export default ProductPage;
