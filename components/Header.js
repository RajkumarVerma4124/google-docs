import Button from "@material-tailwind/react/Button";
import Icon from "@material-tailwind/react/Icon";
import { signOut, useSession } from "next-auth/client";
import { useState } from "react";

function Header() {
  const [showName, setShowName] = useState(false);
  const [session] = useSession();

  return (
    <header className="sticky top-0 z-50 flex items-center px-4 py-2 shadow-md bg-white w-full">
      <Button
        color="gray"
        buttonType="outline"
        rounded={true}
        iconOnly={true}
        ripple="dark"
        className="hidden md:inline-flex mr-2 h-20 w-20 border-0 text-gray-600"
        style={{ width: "3.0rem", height: "3.0rem" }}
      >
        <Icon name="menu" size="2xl" />
      </Button>

      {/* <Icon name="description" size="5xl" color="blue" /> */}
      <img
        src={
          "https://www.gstatic.com/images/branding/product/1x/docs_2020q4_48dp.png"
        }
        className="h-10 w-10"
      />
      <h1 className="hidden md:inline-flex ml-2 text-gray-700 text-xl">Docs</h1>

      <div className="mx-5 md:mx-20 flex flex-grow items-center px-5 py-3 bg-gray-100 text-gray-600 rounded-lg focus-within:text-gray-600 focus-within:shadow-md">
        <Icon name="search" size="2xl" color="darkgray" />
        <input
          type="text"
          placeholder="Search"
          className="flex-grow focus:outline-none bg-transparent ml-2 text-base placeholder-gray-500"
        />
      </div>

      <Button
        color="gray"
        buttonType="outline"
        rounded={true}
        iconOnly={true}
        ripple="dark"
        className="hidden md:inline-flex ml-5 md:ml-20 h-20 w-20 border-0"
        style={{ width: "3.1rem", height: "3.1rem" }}
        onClick={() => setShowName((value => !value))}
      >
        <Icon name="apps" size="3xl" color="gray" />
      </Button>

      <img
        onClick={signOut}
        loading="lazy"
        className="cursor-pointer h-12 w-12 rounded-full ml-2"
        src={session?.user?.image}
        alt=""
      />
      <div className={`${showName ? "absolute right-0 bottom-0 text-xs px-3 text-blue-700 font-normal" : "hidden"}`}>
        <p className="">{session?.user?.name}</p>
      </div>
    </header>
  );}


export default Header;
 