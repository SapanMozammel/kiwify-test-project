import React from "react";
import { Outlet } from "react-router-dom";

const Auth = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <img
          src="/kiwify-green-logo.png"
          alt="Kiwify"
          className="mx-auto h-12 w-auto"
        />
        <Outlet />
      </div>
    </div>
  );
};

export default Auth;
