import React from "react";
import "../styles/Register.scss";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { newUser } from "../redux/auth/auth.actions";
import { API } from "../shared/services/api";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm();
  let navigate = useNavigate();
  const dispatch = useDispatch();

  const registerUser = async (formdata) => {
    dispatch(newUser(formdata, navigate));
  };

  return (
    <div>
      <form onSubmit={handleSubmit(registerUser)} className="login-form">
        <div className="div-text">
          <p className="p-label">Registrate!</p>
        </div>
        <div className="div-label">
          <label>
            Email
            <input
              type="text"
              name="email"
              {...register("email", {
                required: "Introduce un email, por favor",
                minLength: {
                  value: 2,
                  message: "el email tiene que ser mas largo",
                },
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                  message: "Introduce un email con formato valido",
                },
              })}
            />
          </label>
          {errors.email ? (
            <>
              {errors.email.type === "required" && (
                <p>{errors.email.message}</p>
              )}
              {errors.email.type === "minLength" && (
                <p>{errors.email.message}</p>
              )}
              {errors.email.type === "pattern" && <p>{errors.email.message}</p>}
            </>
          ) : null}
          <label>
            Password
            <input
              type="password"
              name="password"
              {...register("password", {
                required: "El password tiene que existir",
                pattern:
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,12}$/,
              })}
            />
          </label>
          {errors.password ? <p>El password no es correcto</p> : null}
          <button disabled={!isValid}>Enviar</button>
        </div>
      </form>
    </div>
  );
};

export default Register;
