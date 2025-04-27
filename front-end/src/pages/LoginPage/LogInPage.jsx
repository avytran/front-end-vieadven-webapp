import React, { useState } from "react";
import "./LogInPage.css"
import { loginUser } from "../../api/auth.service";
import { useAuth } from "../../context/useAuth";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { logInSchema } from "../../schemas/logInSchema";
import { TextFieldController } from "../../components/TextFieldController";
import { PasswordController } from "../../components/PasswordController";
import { blackWhiteVieAdven } from "../../assets/images/login";

export const LogInPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [serverError, setServerError] = useState("");

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(logInSchema),
    defaultValues: {
      email: "",
      password: ""
    },
    mode: "onBlur"
  });

  const handleLogin = async (payload) => {
    const { email, password } = payload;

    try {
      const token = await loginUser({ email, password });
      login(token);
      navigate('/');
    } catch (error) {
      console.error("Login failed:", error);
      setServerError("Đăng nhập thất bại. Vui lòng kiểm tra lại tài khoản hoặc mật khẩu.");
    }
  };

  return (
    <div className="log-in-page">
      <div className="welcome-back-section">
        <img src={blackWhiteVieAdven} alt="VieAdven" />
        <div className="content">
          <div>
            <h1>Hi, newbie!</h1>
            <p>Nếu bạn chưa có tài khoản, vui lòng đăng ký!</p>
          </div>
          <button className="navigate-button" onClick={() => { navigate('/register') }}>Đăng ký</button>
        </div>
      </div>
      <div className="log-in-form">
        <div className="content">
          <h1>Đăng nhập</h1>
        </div>
        <form onSubmit={handleSubmit(handleLogin)}>
          <div className="form-input">
            <TextFieldController
              name="email"
              control={control}
              label="Tên tài khoản"
              errors={errors}
            />
            <PasswordController
              name="password"
              control={control}
              label="Mật khẩu"
              setValue={setValue}
              errors={errors}
            />
          </div>
          {serverError && <p className="log-in-error">{serverError}</p>}
          <button className="submit-button" type="submit">Đăng nhập</button>
        </form>
      </div>
    </div>
  );
};