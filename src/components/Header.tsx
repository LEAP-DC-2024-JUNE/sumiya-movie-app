"use client";
import { Movielogo } from "./svg";
import Themeswitch from "./Themeswitch";
import SearchInput from "./SearchInput";
import { useState } from "react";
export const Header = ({}) => {
  const [isShow, setIsShow] = useState(true);
  return (
    <div>
      <div className="flex justify-between items-center px-5 py-5 md:px-[80px] md:hidden">
        {isShow && (
          <div className="flex gap-2 items-center">
            <Movielogo />
            <h1 className="text-lg text-[#4338CA]">Movie Z</h1>
          </div>
        )}
        <div className="flex items-center gap-3">
          <button onClick={() => setIsShow(false)}>
            <SearchInput />
          </button>
          {isShow && <Themeswitch />}
        </div>
      </div>
      <div className="hidden md:block md:px-[80px] md:py-3">
        <div className="md:flex md:flex-row md:justify-between md:items-center">
          <div className="flex gap-2 items-center">
            <Movielogo />
            <h1 className="text-lg text-[#4338CA]">Movie Z</h1>
          </div>
          <div>
            <SearchInput />
          </div>
          <div>
            <Themeswitch />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Header;
