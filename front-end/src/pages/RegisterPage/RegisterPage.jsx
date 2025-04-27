import React, { useState } from "react";
import { register } from "../../api/auth.service";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerSchema } from "../../schemas/registerSchema";
import { TextFieldController } from "../../components/TextFieldController";
import { PasswordController } from "../../components/PasswordController";
import { blackWhiteVieAdven } from "../../assets/images/login";

export const RegisterPage = () => {
  const navigate = useNavigate();
  const [serverError, setServerError] = useState("");

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: ""
    },
    mode: "onBlur"
  });

  const handleLogin = async (payload) => {
    const { name, email, password } = payload;

    try {
      const token = await register({ name, email, password });
      navigate('/');
    } catch (error) {
      console.error("Register failed:", error);
      setServerError("Đăng ký thất bại.");
    }
  };

  return (
    <div className="log-in-page">
      <div className="welcome-back-section">
        <img src={blackWhiteVieAdven} alt="VieAdven" />
        <div className="content">
          <div>
            <h1>Welcome Back!</h1>
            <p>Nếu bạn đã có tài khoản, vui lòng đăng nhập!</p>
          </div>
          <button className="navigate-button" onClick={() => { navigate('/login') }}>Đăng nhập</button>
        </div>
      </div>
      <div className="log-in-form">
        <div className="content">
          <h1>Tạo tài khoản mới</h1>
        </div>
        <form onSubmit={handleSubmit(handleLogin)}>
          <div className="form-input">
            <TextFieldController
              name="name"
              control={control}
              label="Tên của bạn"
              errors={errors}
            />
            <TextFieldController
              name="email"
              control={control}
              label="Email"
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
          <button className="submit-button" type="submit">Đăng ký</button>
        </form>
      </div>
    </div>
  );
};