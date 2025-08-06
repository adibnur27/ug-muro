import React, { useRef } from "react";
import emailjs from "@emailjs/browser";
import Swal from "sweetalert2";
const WorkShopForm = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm("service_ictjgds", "template_3yh8kjq", form.current, "XYonCeVYHD5-PnQnj").then(
      (result) => {
        console.log(result.text);
        Swal.fire("Success!", "Your message has been sent.", "success");
        form.current.reset();
      },
      (error) => {
        console.log(error.text);
        Swal.fire("Oops!", "Something went wrong.", "error");
      }
    );
  };

  return (
    <div className="flex justify-center mx-auto lg:w-4/5">
      <div className=" lg:w-2/5 w-full pt-10 bg-black/50 text-white">
        <h1 className="font-orbitron text-center">DAFTAR WORKSHOP</h1>
        <form ref={form} onSubmit={sendEmail} className="flex flex-col p-5 gap-6 font-orbitron ">
          <div>
            <label className="block mb-1">Name</label>
            <input name="name" type="text" className="font-rajdhani w-full  border-b border-white outline-none p-1 text-black font-bold" placeholder="Enter your name" required />
          </div>

          <div>
            <label className="block mb-1">NPM</label>
            <input name="npm" type="text" className="font-rajdhani w-full  border-b border-white outline-none p-1 text-black font-bold" placeholder="Enter your phone number" required />
          </div>

          <div>
            <label className="block mb-1">E-mail</label>
            <input name="email" type="email" className="font-rajdhani w-full  border-b border-white outline-none p-1 text-black font-bold" placeholder="Enter your email" required />
          </div>
          <input name="type" type="type" defaultValue={"WORKSHOP"} className="hidden" />

          <div className="md:col-span-2 mx-auto">
            <button type="submit" className="bg-blue-800 text-white px-6 py-2 rounded shadow-md hover:bg-blue-600 transition font-rajdhani">
              Send Message
            </button>
          </div>
        </form>
      </div>
      <div className="lg:w-2/5 w-full bg-white/50 bg-cover md:block hidden" style={{ backgroundImage: `url(/images/background/ContactBg1.jpg)`, opacity: "0.8" }}>
        <img src="/images/background/robotic1.webp" alt="" className="mt-12" />
      </div>
    </div>
  );
};

export default WorkShopForm;
