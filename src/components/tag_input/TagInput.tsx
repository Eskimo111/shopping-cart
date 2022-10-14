import React, { useState } from "react";
import { IoMdCloseCircle } from "react-icons/io";

const TagInput = (props: { tags?: string[] }) => {
  const [tagData, setTagData] = useState(props.tags ? props.tags : []);

  const removeTagData = (indexToRemove: number) => {
    setTagData([
      ...tagData.filter((element, index) => index !== indexToRemove),
    ]);
  };
  const addTagData = (event: React.SyntheticEvent) => {
    const target = event.target as HTMLInputElement;
    if (target.value !== "") {
      setTagData([...tagData, target.value]);
      target.value = "";
    }
  };
  return (
    <div className="flex flex-wrap p-2 px-4 rounded-sm border shadow-md focus:outline-gray-500/50 focus:border-gray-700 focus:outline-4 outline-offset-2">
      <ul className="flex flex-wrap items-center gap-1">
        {tagData.map((tag, index) => (
          <li
            key={index}
            className="flex items-center justify-center gap-1 bg-gray-100 list-none p-1.5 px-2 rounded-sm border
            shadow-md"
          >
            <span className="tag-title">{tag}</span>
            <IoMdCloseCircle
              className="cursor-pointer"
              onClick={() => removeTagData(index)}
            >
              x
            </IoMdCloseCircle>
          </li>
        ))}
      </ul>
      <input
        className="focus:outline-none flex-1 p-2"
        type="text"
        onKeyUp={(event) => (event.key === "Enter" ? addTagData(event) : null)}
        placeholder="Add options"
      />
    </div>
  );
};

export default TagInput;
