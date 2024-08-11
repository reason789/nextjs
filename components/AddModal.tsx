import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Facebook, MessageCircleWarning } from "lucide-react";

export default function AddModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 2000); // Show the modal after 3 seconds
    return () => clearTimeout(timer);
  }, []);

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
          <div className="relative bg-white rounded-lg shadow-lg w-11/12 md:w-2/3 lg:w-1/2 flex flex-col md:flex-row">
            {/* Left Side - Image */}
            <div className="w-full md:w-1/2">
              <img
                src="https://res.cloudinary.com/dmuslrdni/image/upload/v1723353087/foodvela/cheese_add_kygfke.png"
                alt="Product"
                className="w-full h-full object-cover rounded-l-lg"
              />
            </div>

            {/* Right Side - Text Info */}
            <div className="w-full md:w-1/2 flex flex-col justify-center p-4">
              <h2 className="text-xl font-semibold mb-4">
                All about{" "}
                <span className="text-yellow-500 font-bold italic  text-5xl">
                  Cheese
                </span>
              </h2>
              <p className="text-base font-medium text-gray-800 leading-relaxed mb-4">
                <span className="text-red-500 font-bold">বাংলাদেশের</span> মধ্যে
                আমরাই{" "}
                <span className="text-green-600 font-semibold underline">
                  সবচেয়ে কম দামে
                </span>{" "}
                <span className="text-blue-600 font-semibold underline">
                  সব ধরণের
                </span>{" "}
                Cheese বিক্রি করি{" "}
              </p>
              <div>
                <ul className="list-disc list-inside text-gray-700 ml-4">
                  <li className="mb-2">High-quality Cheese</li>
                  <li className="mb-2">
                    Special discount on your first purchase
                  </li>
                  <li className="mb-2">Fast and reliable shipping </li>
                  <li className="mb-2">24/7 customer support available</li>
                </ul>
              </div>
              <Button onClick={closeModal} className=" absolute top-0 right-0 ">
                ✖
              </Button>

              <div>
                <div>
                  <h3 className="text-lg font-bold mt-4  text-gray-800 mb-4">
                    Order Now by clicking{" "}
                    <span className="text-red-600 animate-bounce">↓↓</span>
                  </h3>
                </div>
                <div className="  space-x-2">
                  <Button className=" bg-green-500">
                    <MessageCircleWarning />{" "}
                    <a
                      href="https://wa.me/01606551727?text=I'm%20interested%20in%20your%20product"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Whatsapp
                    </a>
                  </Button>
                  <Button className=" bg-blue-400">
                    <Facebook />{" "}
                    <a
                      href="https://m.me/foodvela71"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Facebook
                    </a>
                  </Button>
                </div>
                <p className=" mt-2 text-gray-700 font-semibold ">Or</p>
                <p className=" text-lg font-bold text-blue-600">
                  Call:{" "}
                  <a
                    href="tel:+8801606551727"
                    className="underline hover:text-blue-800"
                  >
                    0160 655 1727
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
