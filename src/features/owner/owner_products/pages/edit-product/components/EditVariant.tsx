import React from "react";
import "tw-elements";
import TagInput from "../../../../../../components/tag_input/TagInput";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { Product } from "../../../../../../models/product";

const EditVariant = (props: { onHide: Function; product: Product }) => {
  const product = props.product;
  return (
    <div
      className="modal fixed top-0 left-0  w-full h-full outline-none overflow-x-hidden overflow-y-auto"
      id="exampleModalLg"
      tabIndex={-1}
      aria-labelledby="exampleModalLgLabel"
      aria-modal="true"
      role="dialog"
    >
      <div
        onClick={() => props.onHide()}
        className="modal-backdrop fade show -z-50"
      ></div>
      <div className="modal-dialog modal-lg relative w-auto pointer-events-none">
        <div className="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
          <div className="modal-header flex flex-shrink-0 items-center justify-between p-4 border-b shadow-sm rounded-t-md">
            <h5 className="text-xl font-medium leading-normal text-gray-800">
              Edit variants
            </h5>
            <button
              type="button"
              className="btn-close box-content w-2 h-2 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
              onClick={() => props.onHide()}
            />
          </div>
          <div className="modal-body relative p-4 bg-gray-100 font-medium text-xl text-gray-800">
            <div>
              <h2 className="py-3">Group</h2>
              <table className="w-full shadow-md rounded-lg overflow-hidden">
                <colgroup>
                  <col span={1} style={{ width: "30%" }} />
                  <col span={1} style={{ width: "60%" }} />
                  <col span={1} style={{ width: "10%" }} />
                </colgroup>
                <thead>
                  <tr className="text-xs text-left text-gray-700 bg-gray-200 px-2">
                    <th className="p-3">GROUP</th>
                    <th className="">OPTIONS</th>
                    <th className="text-right p-3">ACTION</th>
                  </tr>
                </thead>
                <tbody>
                  {product.variant_groups!.map((group) => (
                    <tr className="justify-between text-sm bg-white w-full ">
                      <td className="p-2">
                        <input
                          className="product-input pt-2"
                          value={group.name}
                        />
                      </td>
                      <td className="flex gap-1.5 text-xs p-2">
                        <TagInput
                          tags={group.options.map((option) => option.name)}
                        />
                      </td>
                      <td className="pr-4 text-right">
                        <button>
                          <BiDotsHorizontalRounded size={20} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="flex w-full justify-end text-sm pt-4">
                <button className="py-3 px-4">Cancel</button>
                <button className="py-3 px-4 border border-white bg-black text-white rounded-lg hover:text-black hover:bg-white hover:border-black">
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditVariant;
