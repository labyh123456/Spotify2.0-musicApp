import Link from "next/link";
import React from "react";

const SearchedCategory = ({ name }) => {
  return (
    <div className="blackish-card-2 text-white px-4 py-1 text-[15px] rounded-full">
      <a href="#">{name}</a>
    </div>
  );
};
// #423a3a
export default SearchedCategory;
