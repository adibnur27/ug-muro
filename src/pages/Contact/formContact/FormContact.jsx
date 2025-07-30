import React, { useRef } from "react";
import emailjs from "@emailjs/browser";
import Swal from "sweetalert2"; 

const FormContact = () => {

    const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm("service_vpcx1a9", "template_il99taq", form.current, "XYonCeVYHD5-PnQnj")
      .then(
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
    <form ref={form} onSubmit={sendEmail} className="grid grid-cols-1 md:grid-cols-2 gap-6 w-[55%] font-orbitron">
      <div>
        <label className="block mb-1">Name</label>
        <input name="name" type="text" className="font-rajdhani w-full bg-transparent border-b border-white outline-none p-1 placeholder-white" placeholder="Enter your name" required />
      </div>

      <div>
        <label className="block mb-1">Phone</label>
        <input name="phone" type="text" className="font-rajdhani w-full bg-transparent border-b border-white outline-none p-1 placeholder-white" placeholder="Enter your phone number" required />
      </div>

      <div>
        <label className="block mb-1">E-mail</label>
        <input name="email" type="email" className="font-rajdhani w-full bg-transparent border-b border-white outline-none p-1 placeholder-white" placeholder="Enter your email" required />
      </div>

      <div>
        <label className="block mb-1">Whatsapp/Telegram</label>
        <input name="contact" type="text" className="font-rajdhani w-full bg-transparent border-b border-white outline-none p-1 placeholder-white" placeholder="Enter contact handle" />
      </div>

      <div className="md:col-span-2">
        <label className="block mb-1">How Can We Help You?</label>
        <textarea name="message" className="font-rajdhani w-full bg-transparent border-b border-white outline-none p-1 placeholder-white" rows="3" placeholder="Your message" required></textarea>
      </div>

      <div className="md:col-span-2 flex items-center gap-2">
        <input type="checkbox" id="updates" name="updates" className="accent-white font-rajdhani" />
        <label htmlFor="updates" className="text-sm">Would you like to get updates on IoT news?</label>
      </div>

      <div className="md:col-span-2">
        <button type="submit" className="bg-[#3b82f6] text-white px-6 py-2 rounded shadow-md hover:bg-blue-600 transition font-rajdhani">
          Send Message
        </button>
      </div>
    </form>
  )
}

export default FormContact