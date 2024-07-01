"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import CartModal from "./CartModal";
import PopupCart from "./PopupCart";
import Popup from "./Popup";

const NavIcons = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const pathName = usePathname();

  // TEMPORARY
  const isLoggedIn = false;

  const handleProfile = () => {
    if (!isLoggedIn) {
      router.push("/login");
    } else {
      setIsProfileOpen((prev) => !prev);
    }
  };

  const handleLogout = async () => {
    setIsLoading(true);
    setIsLoading(false);
    setIsProfileOpen(false);
    // router.push(logoutUrl);
  };

  return (
    <div className=" flex items-center gap-4 xl:gap-6 relative">
      {/* <Image
        src="/profile.png"
        alt=""
        width={22}
        height={22}
        className=" cursor-pointer"
        onClick={handleProfile}
      /> */}
      <Popup value="Profiile">
        <Image
          src="/profile.png"
          alt=""
          width={22}
          height={22}
          className=" cursor-pointer"
          onClick={handleProfile}
        />
      </Popup>
      {isProfileOpen && (
        <div className=" absolute p-4 top-12 left-0 bg-white text-sm rounded-md shadow-[0_3px_10px_rgb(0,0,0,0.2)] z-20">
          <Link href="/"> Profile</Link>
          <div className=" mt-2 cursor-pointer" onClick={handleLogout}>
            {isLoading ? "Logging out" : "Logout"}
          </div>
        </div>
      )}

      {/* <Image
        src="/notification.png"
        alt=""
        width={22}
        height={22}
        className=" cursor-pointer"
      /> */}
      <PopupCart />
    </div>
  );
};

export default NavIcons;
