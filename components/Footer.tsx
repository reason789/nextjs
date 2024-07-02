import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <div className="py-24 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 bg-gray-100 text-sm mt-24">
      {/* TOP */}
      <div className=" flex flex-col md:flex-row justify-between gap-24">
        {/* LEFT */}
        <div className=" w-full md:w-1/2 lg:w-1/4 flex flex-col gap-8">
          <Link href="/">
            <div className=" text-2xl tracking-wide">FOODVELA</div>
          </Link>
          <p>Chawrasta, Mawna, Gazipur</p>
          <span className=" font-semibold">info@foodvela.com</span>
          <span className=" font-semibold">01606-551727</span>
          <div className=" flex gap-6">
            <Link href="https://www.facebook.com/foodvela71">
              <Image src="/facebook.png" alt="" width={20} height={20} />
            </Link>
          </div>
        </div>

        {/* CENTER */}
        <div className="hidden w-1/2 lg:flex justify-between">
          {/* <div className="flex flex-col justify-between">
            <h1 className=" font-medium text-lg">COMPANY</h1>
            <div className=" flex flex-col gap-6">
              <Link href="#">ABOUT Us</Link>
              <Link href="#">Careers</Link>
              <Link href="#">Affiliates</Link>
              <Link href="#">Blog</Link>
              <Link href="#">Contact Us</Link>
            </div>
          </div> */}

          <div className="flex flex-col justify-between">
            <h1 className=" font-medium text-lg">Shop</h1>
            <div className=" flex flex-col gap-6">
              <Link href="">Featured Products</Link>
              <Link href="/list?category=food-sachet">Food sachet</Link>
              <Link href="/list?category=restaurant-item">Restaurant item</Link>
              <Link href="/list">All products</Link>
            </div>
          </div>

          <div className="flex flex-col">
            <h1 className=" font-medium text-lg">HELP</h1>
            <div className=" flex flex-col gap-6">
              <Link href="https://www.facebook.com/foodvela71">Contact Us</Link>
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className=" w-full md:w-1/2 lg:w-1/4 flex flex-col gap-8">
          <h1 className=" font-semibold text-lg">SUBSCRIBE</h1>
          <p>
            Be the first to get latest newss about trends, promotions, and much
            more
          </p>
          <div className="flex">
            <input
              type="text"
              placeholder="Email address"
              className="p-4 w-3/4"
            />
            <button className="w-1/4 bg-[#face14] text-white ">JOIN</button>
          </div>
          {/* <div className=" ">
            <span className=" font-semibold text-pink-700">Bkash Payments</span>
            <p>Comming soon...</p>
          </div> */}
        </div>
      </div>
      {/* BOTTOM */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-8 mt-16">
        <div className="">© 2026 Foodvela </div>
        <div className=" flex flex-col items-center gap-8 md:flex-row">
          <div className="">
            <span className=" text-gray-500 mr-4">Language</span>
            <span className=" font-medium"> English | Bangla</span>
          </div>
          <div className="">
            <span className=" text-gray-500 mr-4">Currency</span>
            <span className=" font-medium"> ৳TAKA</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
