import React from "react";
import Instagram from "./component/Instagram";
import Email from "./component/Email";
import WhatsApp from "./component/WhatsApp";
import GoogleMaps from "./component/GoogleMaps";

const Footer = () => {
  return (
    <div className="bg-white  flex justify-around md:flex-row flex-col gap-5 md:gap-0 relative p-8">
      <div className=" md:w-2/5 text-black px-4 mx-auto">
        <div className="flex gap-3 items-center justify-center md:justify-start md:ms-10">
          
            <img src="/images/logo.png" alt="logo" className="z-0 w-[25%] md:w-[15%]" />
          <div className="flex flex-col justify-center border-l-2 ps-2 border-black">
            <h1 className="font-bold text-lg md:text-sm font-rajdhani">PUSAT STUDI</h1>
            <h1 className="font-bold text-lg md:text-sm font-rajdhani">MULTIMEDIA & ROBOTIKA</h1>
          </div>
        </div>
      </div>
      <div className="text-black flex  md:w-3/5 md:justify-around  justify-between">
        <div>
          <GoogleMaps size="20" />
          <p className="font-rajdhani font-bold mt-2">Alamat Gedung</p>
        </div>
        <div>
          <Instagram size="20" />
          <p className="font-rajdhani font-bold mt-2">Instagram</p>
        </div>
        <div className="">
          <Email size="20" />
          <p className="font-rajdhani font-bold mt-2">Email</p>
        </div>
        <div>
          <WhatsApp size="22" />
          <p className="font-rajdhani font-bold mt-2">Contact Person</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
