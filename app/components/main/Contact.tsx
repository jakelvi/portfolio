import React from "react";
import Contact from "../sub/ContactContent";

const ContactMe = () => {
  return (
    <section id="contact">
      <div className=" flex flex-col justify-center py-20">
        <h1 className="text-[40px] font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500 py-20 text-center">
          Let&apos;s work together
        </h1>
        <Contact />
      </div>
    </section>
  );
};

export default ContactMe;
