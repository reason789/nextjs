import Link from "next/link";
import Menu from "./Menu";
import SearchBar from "./SearchBar";
import Image from "next/image";
import dynamic from "next/dynamic";
import NavIcons from "./NavIcons";

// const NavIcons = dynamic(() => import("./NavIcons"), { ssr: false });

const Navbar = () => {
  return (
    <div className=" h-16 md:h-20 px-4 md:px-8 lg:px-16  m-auto  max-w-screen-xl relative">
      {/* MOBILE */}
      <div className=" h-full flex items-center justify-between md:hidden">
        <Link href="/">
          <div className=" text-2xl tracking-wide ">
            <Image src="/logoText.png" width="120" height="30" />
          </div>
        </Link>
        <Menu />
      </div>
      {/* BIGGER SCREENS */}
      <div className=" hidden md:flex items-center justify-between gap-8 h-full">
        {/* LEFT */}
        <div className=" w-1/3 xl:2/3 2xl:w-[55%] flex-1  flex items-center gap-12">
          <Link href="/" className=" flex items-center gap-3">
            {/* <div className=" text-2xl tracking-wide">FOODVELA</div> */}
            <div className=" text-2xl tracking-wide ">
              <Image src="/logoText.png" width="120" height="30" />
            </div>
          </Link>
          <div className=" hidden xl:flex gap-4 ">
            <Link
              className=" hover:text-[#face14]"
              href="/list?category=food-sachet "
            >
              {" "}
              Food Sachet
            </Link>
            <Link
              className=" hover:text-[#face14]"
              href="/list?category=restaurant-item "
            >
              {" "}
              Restaurant Item
            </Link>
            <Link
              className=" hover:text-[#face14]"
              href="/list?category=office-item "
            >
              {" "}
              Office Item
            </Link>
          </div>
        </div>
        {/* RIGHT */}
        <div className=" w-2/3 xl:w-1/3 2xl:w-[45%] flex items-center justify-between gap-8">
          <SearchBar />
          <NavIcons />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
