import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import productApi from "../../../../../utils/customer_services/product.service";
import LoadingSpinner from "../../../../../components/loading-spinner/LoadingSpinner";
import { addToCartAsync } from "../../../../../slices/cart";
import ProductNotFound from "./ProductNotFound";
import { Product } from "../../../../../slices/products";
import { useAppDispatch } from "../../../../../hooks/use-app-dispatch";
import useMessage from "../../../../../hooks/use-message";

const emptyProduct: Product = {
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
  variant_groups: [
    {
      id: "",
      name: "",
      options: [
        {
          id: "",
          name: "",
        },
      ],
    },
  ],
  categories: [],
};

const fetchProductById = async (productId: string) => {
  const response = await productApi.getById(productId);
  //console.log(response);
  //console.log(response.data);
  return response;
};

const ProductPage = () => {
  const messenger = useMessage();
  const { productId } = useParams();
  const [product, setProduct] = useState(emptyProduct);
  const [loading, setLoading] = useState(true);
  const [sizeSelected, setSizeSelected] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const dispatch = useAppDispatch();

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchProductById(productId!).then((result) => {
      setProduct(result as any);
      setLoading(false);
    });
  }, []);

  if (!product) return <ProductNotFound />;

  return (
    <>
      {loading ? (
        <LoadingSpinner />
      ) : (
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
                {product.categories.map((category) => (
                  <div className="pr-2 py-2 " key={category.id}>
                    {category.name} -
                  </div>
                ))}
              </div>
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
                      option_id:
                        product.variant_groups[0].options[sizeSelected].id,
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
                      messenger.showMessage(`Error. Try again!`, "failed");
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
      )}
    </>
  );
};

export default ProductPage;
