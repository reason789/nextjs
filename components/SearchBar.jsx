"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

const SearchBar = () => {
  const router = useRouter();
  const handleSearch = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name");

    if (name) {
      router.push(`/list?search=${name}`);
    }
  };

  return (
    <form
      className="flex justify-between items-center bg-gray-100 gap-4 p-2 rounded-md flex-1"
      onSubmit={handleSearch}
    >
      <input
        type="text"
        name="name"
        placeholder="Search"
        className="flex-1 bg-transparent outline-none text-sm"
      />
      <button className="cursor-pointer">
        <Image src={"/search.png"} alt="" width={16} height={16} />
      </button>
    </form>
  );
};

export default SearchBar;
