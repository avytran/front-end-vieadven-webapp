import * as yup from 'yup';

const registerSchema = yup.object({
    name: yup.string()
        .required('Vui lòng nhập tên'),

    email: yup
        .string()
        .email("Email không hợp lệ")
        .required('Vui lòng nhập Email'),

    password: yup
        .string()
        .min(8, 'Mật khẩu bắt buộc có ít nhất có 8 ký tự')
        .required('Vui lòng nhập Mật khẩu'),
});

export { registerSchema }