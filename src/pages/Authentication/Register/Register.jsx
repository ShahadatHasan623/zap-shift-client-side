import React, { useState } from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import GoogleLogin from "../soicalLogin/GoogleLogin";
import { Link } from "react-router";
import axios from "axios";
import useAxios from "../../../hooks/useAxios";

const Register = () => {
  const { createUser,updateProfileUser } = useAuth();
  const [photurl,setPhotUrl]=useState('');
  const axiosUser =useAxios();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    const { email, password } = data;
    createUser(email, password)
      .then(async(result) => {
        console.log(result.user);

        // updated userinfo in the databse
        const userInfo={
          email:email,
          role:'user', //default role
          created_at:new Date().toISOString(),
          last_log_in:new Date().toISOString()
        }
        const userRes =await axiosUser.post('/users',userInfo)
        console.log(userRes)
        // update user profile in firebase 
        const userProfile ={
          displayName :data.name,
          photoURL:photurl
        }
        updateProfileUser(userProfile)
        .then(()=>{
          console.log("updated profile")
        })
        .catch(error=>{
          console.log(error)
        })
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleImageChange =async (e) => {
    const image =e.target.files[0];
    console.log(image)
    const formData =new FormData();
    formData.append('image',image);

    const imageUrl =`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_key}`

    const res =await axios.post(imageUrl,formData);
    setPhotUrl(res.data.data.url)
  };
  return (
    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
      <div className="card-body">
        <h1 className="text-5xl font-bold text-center">Create a new account</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <fieldset className="fieldset">
            {/* Name field */}
            <label className="label">Your Name</label>
            <input
              type="text"
              {...register("name", { required: true })}
              className="input"
              placeholder="Your Name"
            />

            {errors.email?.type === "required" && (
              <p className="text-red-600">email is required</p>
            )}
            {/* image field */}
            <label className="label">Your Image</label>
            <input
              onChange={handleImageChange}
              type="file"
              className="input"
              placeholder="Your Image"
            />

            {errors.email?.type === "required" && (
              <p className="text-red-600">email is required</p>
            )}
            {/* Email field */}
            <label className="label">Email</label>
            <input
              type="email"
              {...register("email", { required: true })}
              className="input"
              placeholder="Email"
            />

            {errors.email?.type === "required" && (
              <p className="text-red-600">email is required</p>
            )}

            <label className="label">Password</label>
            <input
              type="password"
              {...register("password", { required: true, minLength: 6 })}
              className="input"
              placeholder="Password"
            />
            {errors.password?.type === "required" && (
              <p className="text-red-600">password is required</p>
            )}
            {errors.password?.type === "minLength" && (
              <p className="text-red-600">password must be 6 character</p>
            )}
            <button className="btn btn-primary text-black mt-4">
              Register
            </button>
            <p>
              Already have an account{" "}
              <Link className="btn p-0 btn-link" to="/login">
                Login
              </Link>
            </p>
          </fieldset>
          <GoogleLogin></GoogleLogin>
        </form>
      </div>
    </div>
  );
};

export default Register;
