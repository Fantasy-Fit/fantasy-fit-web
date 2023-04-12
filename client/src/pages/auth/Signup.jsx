import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useCookies } from "react-cookie";
import { useDispatch } from "react-redux";
import { setUserInfo } from "../../store/auth/userSlice";
import { useSignupMutation } from "../../store/auth/authApiSlice";

import "./Signup.css";

function Signup() {
  const [signup, { isLoading }] = useSignupMutation();
  const dispatch = useDispatch();
  const [, setCookie] = useCookies();
  const navigate = useNavigate();
  const schema = yup.object().shape({
    username: yup.string().required(),
    email: yup.string().email().required(`Email can't be blank`),
    location: yup.string().required('Location is required'),
    password: yup
      .string()
      .min(4)
      .required("Password must be at least 4 characters"),
    passwordConfirm: yup
      .string()
      .oneOf([yup.ref("password"), null], "Password does not match")
      .required(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    const { username, email, password, location, avatar, gender } = data;
    const regData = await signup({ username, email, password, location, avatar, gender }).unwrap();
    dispatch(setUserInfo({ ...regData }));
    setCookie("token", regData?.token);
    localStorage.setItem("user", JSON.stringify(regData?.user));
    navigate("/profile");
  };

  return (
    <div className="signupScreen">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1>Sign Up</h1>
        <input placeholder="username" type="text" {...register("username")} />
        <input placeholder="email" type="email" {...register("email")} />
        <input placeholder="location" type="text" {...register("location")} />
        <input placeholder="avatar" type="text" {...register("avatar")} />
        <input placeholder="gender" type="text" {...register("gender")} />
        <input
          placeholder="password"
          type="password"
          {...register("password")}
        />
        <input
          placeholder="password confirmation"
          type="password"
          {...register("passwordConfirm")}
        />
        <button type="submit">Sign Up</button>
        {[
          errors.email?.message,
          errors.password?.message,
          errors.passwordConfirm?.message,
        ]}
      </form>
    </div>
  );
};

export default Signup;
