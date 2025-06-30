import React from "react";
import { useForm } from "react-hook-form";
import GoogleLogin from "../soicalLogin/GoogleLogin";
import { Link, useLocation, useNavigate } from "react-router";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";

const Login = () => {
  const { singinUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    const { email, password } = data;
    singinUser(email, password)
      .then((result) => {
        console.log(result.user);
        Swal.fire({
          position: "top-center",
          icon: "success",
          title: "login Successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate(location.state ? location.state : "/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
      <div className="card-body">
        <form onSubmit={handleSubmit(onSubmit)}>
          <h1 className="text-center text-4xl font-bold">Login Now</h1>
          <fieldset className="fieldset">
            <label className="label">Email</label>
            <input
              type="email"
              {...register("email", { required: true })}
              className="input"
              placeholder="Email"
            />

            <label className="label">Password</label>
            <input
              type="password"
              {...register("password", { required: true, minLength: 6 })}
              className="input"
              placeholder="Password"
            />
            {errors.password?.type === "required" && (
              <p className="text-red-600">password is required </p>
            )}

            {errors.password?.type === "minLength" && (
              <p className="text-red-600">password must be 6 charactor </p>
            )}

            <div>
              <a className="link link-hover">Forgot password?</a>
            </div>
            <button className="btn btn-primary text-black mt-4">Login</button>
            <p>
              Don't have an acoount?{" "}
              <Link to="/register" className="btn btn-link p-0">
                register
              </Link>{" "}
            </p>
          </fieldset>
          <GoogleLogin></GoogleLogin>
        </form>
      </div>
    </div>
  );
};

export default Login;
