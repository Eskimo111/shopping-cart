import React from "react";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../../../../hooks/use-app-dispatch";
import { Product } from "../../../../models/product";

type ProductItemProps = {
  data: Product;
};

const ProductItem = (props: ProductItemProps) => {
  const { image, name, id, price } = props.data;

  return (
    <Link className="card" to={`/product/${id}`}>
      <div className="font-inter">
        <div>
          <img
            className="object-cover transition-all ease-in-out duration-200 hover:grow hover:shadow-lg"
            src={image.url}
            alt={name}
          />
        </div>
        <div className="pt-4 flex flex-col gap-3">
          {/*<div className="flex items-center gap-2">
            <span className="badge">Stock ready</span>
  </div>*/}
          <h2 className="product-title">{name}</h2>
          <div>
            <span className="text-md">{price.formatted}đ</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductItem;
