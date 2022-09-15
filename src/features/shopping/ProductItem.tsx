import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks";
import { addToCart, addToCartAsync } from "../cart/cartSlice";
import { fetchProductById, Product } from "./shoppingSlice";

const ProductItem = (props: { data: Product }) => {
  const dispatch = useAppDispatch();
  const product = props.data;
  const [quantity, setQuantity] = useState(1);
  const [sizeSelected, setSizeSelected] = useState(0);
  //const [sizeId, setSizeId] = useState(product.variant_groups[0].id);

  return (
    <Link
      className="card "
      to={`/product/${product.id}`}
      onClick={() => dispatch(fetchProductById(product.id))}
    >
      <div className="font-inter">
        <div className="w-full h-full">
          <img
            className="w-full h-auto object-cover"
            src={product.image.url}
            alt={product.name}
          />
        </div>
        <div className="p-5 flex flex-col gap-3">
          {/*<div className="flex items-center gap-2">
            <span className="badge">Stock ready</span>
  </div>*/}
          <h2 className="product-title">{product.name}</h2>
          {/* Price */}
          <div>
            <span className="text-xl font-medium">
              {product.price.formatted}đ
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductItem;
