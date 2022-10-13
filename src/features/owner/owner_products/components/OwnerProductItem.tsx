import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../../app/hooks";
import { fetchProductById, Product } from "../../../../slices/products";

const OwnerProductItem = (props: { data: Product }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const product = props.data;

  //const [sizeId, setSizeId] = useState(product.variant_groups[0].id);

  return (
    <tr
      className="border-b border-gray-200 hover:bg-gray-100 cursor-pointer"
      onClick={() => {
        dispatch(fetchProductById(product.id));
        navigate(`${product.id}`);
      }}
    >
      <td className="py-3 px-6 text-center whitespace-nowrap">
        <span>{product.id}</span>
      </td>
      <td className="py-3 px-6 text-center">
        <span className="font-medium">{product.name}</span>
      </td>
      <td className="py-3 px-6 text-center">
        <span>{product.price.formatted}₫</span>
      </td>
      <td className="py-3 px-6 text-center">
        {product.active ? (
          <span className="bg-green-200 green-purple-600 py-1 px-3 rounded-full text-xs">
            Active
          </span>
        ) : (
          <span className="bg-red-200 text-red-600 py-1 px-3 rounded-full text-xs">
            Pending
          </span>
        )}
      </td>
      <td className="py-3 px-6 text-center">
        <div className="flex item-center justify-center">
          <div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
              />
            </svg>
          </div>
        </div>
      </td>
    </tr>
  );
};

export default OwnerProductItem;
