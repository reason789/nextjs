"use client";

// components/Navbar.js
import { useEffect, useState } from "react";
import Navbars from "./Navbar";

const Navbar = () => {
  const [lastScrollTop, setLastScrollTop] = useState(0);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      if (scrollTop > lastScrollTop) {
        setHidden(true);
      } else {
        setHidden(false);
      }
      setLastScrollTop(scrollTop);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollTop]);

  return (
    <header
      id="navbar"
      className={`fixed w-full bg-white shadow-md z-50 ${
        hidden ? "hidden-nav" : ""
      }`}
    >
      <Navbars />
    </header>
  );
};

export default Navbar;
