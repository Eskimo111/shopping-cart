import React from "react";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks";
import { fetchProductById, Product } from "./shoppingSlice";

const ProductItem = (props: { data: Product }) => {
  const dispatch = useAppDispatch();
  const product = props.data;
  //const [sizeId, setSizeId] = useState(product.variant_groups[0].id);

  return (
    <Link
      className="card"
      to={`/product/${product.id}`}
      onClick={() => dispatch(fetchProductById(product.id))}
    >
      <div className="font-inter">
        <div>
          <img
            className="object-cover transition-all ease-in-out duration-200 hover:grow hover:shadow-lg"
            src={product.image.url}
            alt={product.name}
          />
        </div>
        <div className="pt-4 flex flex-col gap-3">
          {/*<div className="flex items-center gap-2">
            <span className="badge">Stock ready</span>
  </div>*/}
          <h2 className="product-title">{product.name}</h2>
          {/* Price */}
          <div>
            <span className="text-md">{product.price.formatted}đ</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductItem;
