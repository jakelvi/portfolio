"use client";
import React from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import { toast, Toaster } from "react-hot-toast";
import { FieldValues, useForm } from "react-hook-form";
import EarthCanvas from "./Earth";
import { SubmitHandler } from "react-hook-form";
import { validationSchema } from "../../validation/email-validation";
import { yupResolver } from "@hookform/resolvers/yup";

const Contact = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      name: "",
      from: "",
      text: "",
    },
  });
  const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "";
  const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "";
  const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "";

  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    try {
      await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: values.name,
          to_name: "Web Simple",
          from_email: values.from,
          to_email: "yjhl1708@gmail.com",
          message: values.text,
        },
        publicKey
      );

      toast("Thank you. I will get back to you as soon as possible.");

      reset();
    } catch (error) {
      console.error(error);
      toast.error("Ahh, something went wrong. Please try again.");
    }
  };
  return (
    <div className="flex flex-col items-center lg:flex-row justify-center gap-10 overflow-hidden mt-5">
      <Toaster position="top-center" reverseOrder={false}></Toaster>

      <motion.div
        variants={{
          hidden: { opacity: 0, y: 100 },
          visible: { opacity: 1, y: 0 },
        }}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.5 }}
        className="max-w-lg flex-grow"
      >
        <form onSubmit={handleSubmit(onSubmit)} className="xl:ms-[40px]">
          <div className="relative mt-10">
            <input
              id="name"
              type="text"
              placeholder="Your name"
              autoComplete="off"
              {...register("name")}
              className="border-b py-1 focus:outline-none focus:border-purple-600 focus:border-b-2 transition-colors peer bg-transparent w-full text-white"
            />
            {errors.name && (
              <span className="text-red-500">{errors.name.message}</span>
            )}
          </div>
          <div className="relative mt-10">
            <input
              id="from"
              type="email"
              placeholder="Your email"
              autoComplete="off"
              {...register("from")}
              className="border-b py-1 focus:outline-none focus:border-purple-600 focus:border-b-2 transition-colors peer bg-transparent w-full text-white"
            />
            {errors.from && (
              <span className="text-red-500">{errors.from.message}</span>
            )}
          </div>
          <div className="relative mt-10">
            <textarea
              id="text"
              placeholder="Your message"
              {...register("text")}
              className="border-b py-1 focus:outline-none focus:border-purple-600 focus:border-b-2 transition-colors peer bg-transparent w-full text-white"
            />
            {errors.text && (
              <span className="text-red-500">{errors.text.message}</span>
            )}
          </div>
          <button
            type="submit"
            className="mt-5 py-3 button-primary text-center text-white cursor-pointer rounded-lg w-full max-w-[500px] justify-center items-center"
          >
            Submit
          </button>
        </form>
      </motion.div>

      <motion.div
        variants={{
          hidden: { opacity: 0, x: -100 },
          visible: { opacity: 1, x: 0 },
        }}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.5 }}
        className="xl:flex-1 xl:h-[750px] w-[750px] md:h-[550px] h-[350px]"
      >
        <EarthCanvas />
      </motion.div>
    </div>
  );
};

export default Contact;
