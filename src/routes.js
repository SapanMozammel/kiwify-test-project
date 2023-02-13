import Auth from "./components/layout/Auth";
import Login from "./components/auth/Login";
import SignUp from "./components/auth/SignUp";

export const routes = [
  {
    layout: "auth",
    path: "/",
    element: <Auth />,
    children: [
      {
        path: "login",
        index: false,
        name: "Login",
        element: <Login title="Login" />,
      },
      {
        path: "signup",
        index: false,
        name: "Sign Up",
        element: <SignUp title="Cadastro" />,
      },
    ],
  },
];
