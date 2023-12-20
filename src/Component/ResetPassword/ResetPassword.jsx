import React from "react";
import { Link } from "react-router-dom";

function ResetPassword() {
  return (
    <div className="bg-white flex flex-col items-stretch">
      <div className="flex-col relative flex min-h-[600px] mt-0 w-full justify-center items-stretch max-md:max-w-full">
        <img
          src="../../public/assets/masuk-daftar/bg-login-regis.png"
          className="absolute h-full w-full object-cover object-center inset-0"
        />
        <div className="relative bg-black bg-opacity-60 flex w-full flex-col justify-center items-center px-16 py-12 max-md:max-w-full max-md:px-5">
          <div className="flex w-full max-w-[1095px] items-center justify-between gap-5 mt-3.5 mb-11 max-md:max-w-full max-md:flex-wrap max-md:mb-10">
            <div className="justify-center text-white text-left text-5xl font-mons font-bold grow shrink basis-auto my-auto max-md:max-w-full max-md:text-4xl">
              <span className="mb-5">Selamat datang</span>
              <br />
              <span className="pl-10">Visual Store</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
