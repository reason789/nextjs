import React from "react";

const LoginPage = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md space-y-6">
        <h2 className="text-center text-3xl font-extrabold text-gray-900">
          No need to create an account to place an order
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          You can place an order without logging in
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
