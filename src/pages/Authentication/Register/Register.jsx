import React from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import GoogleLogin from "../soicalLogin/GoogleLogin";
import { Link } from "react-router";

const Register = () => {
    const {createUser}=useAuth()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    const{email,password}=data;
    createUser(email,password)
    .then(result=>{
        console.log(result.user)
    })
    .catch(error=>{
        console.log(error)
    })
  };
  return (
    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
      <div className="card-body">
        <h1 className="text-5xl font-bold text-center">Create a new account</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <fieldset className="fieldset">
            <label className="label">Email</label>
            <input
              type="email"
              {...register("email",{required:true})}
              className="input"
              placeholder="Email"
            />

            {
                errors.email?.type === "required" && <p className="text-red-600">email is required</p>
            }

            <label className="label">Password</label>
            <input
              type="password"
              {...register("password",{required:true,minLength:6})}
              className="input"
              placeholder="Password"
            />
            {
                errors.password?.type==="required" && <p className="text-red-600">password is required</p>
            }
            {
                errors.password?.type==="minLength" && <p className="text-red-600">password must be 6 character</p>
            }
            <button className="btn btn-primary text-black mt-4">Register</button>
            <p>Already have an account <Link className="btn p-0 btn-link" to="/login">Login</Link></p>
          </fieldset>
          <GoogleLogin></GoogleLogin>
        </form>
      </div>
    </div>
  );
};

export default Register;
