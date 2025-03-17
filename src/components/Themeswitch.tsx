"use client";
import { useTheme } from "next-themes";
import { Sun } from "./svg/Sun";
import { Moon } from "./svg/Moon";
export const Themeswitch = () => {
  const { setTheme, resolvedTheme } = useTheme();
  if (resolvedTheme === "light") {
    return (
      <div>
        <button onClick={() => setTheme("dark")}>
          <Moon />
        </button>
      </div>
    );
  }
  if (resolvedTheme === "dark") {
    return (
      <div>
        <button onClick={() => setTheme("light")}>
          <Sun />
        </button>
      </div>
    );
  }
};
export default Themeswitch;
