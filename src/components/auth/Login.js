import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { validateFormFields } from "../utils/validations";

const validationRules = () => {
  return {
    email: {
      email: {
        message: "Esse campo é obrigatório",
      },
    },
    password: {
      required: {
        value: true,
        message: "Esse campo é obrigatório",
      },
    },
  };
};

const Login = ({ title }) => {
  useEffect(() => {
    document.title = title;
    return () => {
      document.title = "React App";
    };
  }, []);

  const [formFields, setFormFields] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const [submitLoading, setSubmitLoading] = useState(false);
  const [submitError, setSubmitError] = useState(false);

  const checkError = (field = undefined) => {
    const validated = validateFormFields(formFields, validationRules());
    if (!validated.valid) {
      field != undefined
        ? setErrors({ ...errors, [field]: validated?.errors?.[field] })
        : setErrors(validated.errors);
    } else
      setErrors({
        email: "",
        password: "",
      });
    return validated.valid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const valid = checkError();
    if (valid) {
      setSubmitLoading(true);
      setTimeout(() => {
        setSubmitLoading(false);
        setSubmitError(true);
      }, 1000);
    }
  };

  return (
    <>
      <h2 className="mt-6 text-center text-3xl leading-9 font-extrabold text-gray-900">
        Entrar na sua conta
      </h2>
      <p className="mt-2 text-center text-base leading-5 text-gray-600">
        Ou{" "}
        <Link
          to="/signup?redirect"
          className="font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:underline transition ease-in-out duration-150"
        >
          fazer cadastro
        </Link>
      </p>
      <form
        className="mt-8 bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10"
        onSubmit={handleSubmit}
      >
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium leading-5 mb-1 text-gray-700"
          >
            E-mail
          </label>
          <div>
            <input
              type="text"
              autoComplete="username"
              name="email"
              value={formFields?.email ?? ""}
              onChange={(e) =>
                setFormFields({
                  ...formFields,
                  email: e.target.value,
                })
              }
              onBlur={() => checkError("email")}
              className="form-input block py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5 w-full"
            />
          </div>
          {errors?.email?.length ? (
            <div className="mt-1 first-line:text-xs text-red-500">
              {errors?.email}
            </div>
          ) : null}
        </div>
        <div className="mt-6">
          <label
            htmlFor="password"
            className="block text-sm font-medium leading-5 text-gray-700"
          >
            Senha
          </label>
          <div>
            <input
              type="password"
              autoComplete="current-password"
              value={formFields?.password}
              name="password"
              onChange={(e) =>
                setFormFields({
                  ...formFields,
                  password: e.target.value,
                })
              }
              onBlur={() => checkError("password")}
              className="form-input block py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5 w-full"
            />
          </div>
          {errors?.password?.length ? (
            <div className="text-xs text-red-500">{errors?.password}</div>
          ) : null}
        </div>
        <div className="mt-2 flex items-center justify-end">
          <div className="text-sm leading-5">
            <a
              href="/ResetPassword"
              className="font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:underline transition ease-in-out duration-150"
            >
              Esqueceu a senha?
            </a>
          </div>
        </div>
        {submitError ? (
          <div className="mt-4 bg-red-50 border-l-4 border-red-400 p-4 mb-8">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  width="24px"
                  height="24px"
                  className="text-red-400"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </div>{" "}
              <div className="ml-3">
                <p className="text-sm leading-5 text-red-700">
                  Não existe um usuário com esse e-mail
                </p>
              </div>
            </div>
          </div>
        ) : null}
        <div className="mt-6">
          <span className="block w-full rounded-md shadow-sm">
            <button
              type="submit"
              className={`w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out ${
                submitLoading ? "opacity-50" : ""
              }`}
            >
              {submitLoading ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                >
                  <circle
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    stroke-width="4"
                    class="opacity-25"
                  ></circle>{" "}
                  <path
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    class="opacity-75"
                  ></path>
                </svg>
              ) : null}
              Entrar
            </button>
          </span>
        </div>
      </form>
    </>
  );
};

export default Login;
