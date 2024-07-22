import { NavLink } from "react-router-dom";
import taLogo from "../assets/taLogo.png"

export default function Home() {
  return (
    <>
      <div className="min-h-[80vh] flex justify-center items-center bg-cover bg-center ml-auto mr-auto lg:w-5/12">
        <img
          src={taLogo}
          alt="logo"
          className="fade-in"
        />
      </div>
    </>
  );
}
