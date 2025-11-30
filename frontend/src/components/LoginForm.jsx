import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // LOGIN existing user
  const onLogin = async (data) => {
    try {
      const res = await axios.post("http://localhost:8080/api/users/login", {
        email: data.email,
        password: data.password,
      });

      console.log("Login response:", res.data);
        if (res.data && res.data.data && res.data.data.token) {
        localStorage.setItem("token", res.data.data.token);
      }
      
      alert("Login successful");
      // here you can store user info in localStorage if you want
      // localStorage.setItem("userEmail", res.data.email);
    } catch (err) {
      console.error("Login error:", err);

      const msg =
        err.response?.data?.message || //If err.response exists, then look inside it for data.If data exists, look for message.If any of them do NOT exist, return undefined instead of crashing.
        "Login failed. Please check email and password.";

      alert(msg);
    }
  };

  // REGISTER new user and save in DB
  const onRegister = async (data) => {
    try {
      const res = await axios.post("http://localhost:8080/api/users/register", {
        name: data.name,
        email: data.email,
        password: data.password,
      });

      console.log("Register response:", res.data);
      alert("User registered successfully");
      reset(); // clear the form
      } catch (err) {
        console.error("Login error:", err);

        const msg =
          err.response?.data?.message ||
          "Registration failed. Maybe the email already exists.";

        alert(msg);
      }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>LoginPage</h1>

      <h2>Login / Register</h2>

      <form>
        {/* Name (only used for register, optional for login) */}
        <div style={{ marginBottom: "1rem" }}>
          <label>Name</label>
          <br />
          <input
            {...register("name")}
            placeholder="Your name (for register)"
            style={{ width: "250px" }}
          />
        </div>

        {/* Email */}
        <div style={{ marginBottom: "1rem" }}>
          <label>Email</label>
          <br />
          <input
            type="email"
            {...register("email", { required: "Email is required" })}
            placeholder="email@example.com"
            style={{ width: "250px" }}
          />
          {errors.email && (
            <p style={{ color: "red" }}>{errors.email.message}</p>
          )}
        </div>

        {/* Password */}
        <div style={{ marginBottom: "1rem" }}>
          <label>Password</label>
          <br />
          <input
            type="password"
            {...register("password", { required: "Password is required" })}
            style={{ width: "250px" }}
          />
          {errors.password && (
            <p style={{ color: "red" }}>{errors.password.message}</p>
          )}
        </div>

        {/* Two buttons, same form, different actions */}
        <button
          type="button"
          onClick={handleSubmit(onLogin)}
          style={{ marginRight: "1rem" }}
        >
          Login
        </button>

        <button type="button" onClick={handleSubmit(onRegister)}>
          Register
        </button>
      </form>
    </div>
  );
}
